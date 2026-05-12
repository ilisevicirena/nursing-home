[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$configFile = Join-Path $PSScriptRoot "db.config.ps1"
if (-not (Test-Path $configFile)) {
    Write-Host "[ERROR] db.config.ps1 not found. Copy db.config.example.ps1 to db.config.ps1 and fill in your values." -ForegroundColor Red
    exit 1
}
. $configFile

$databaseName             = $DB_NAME_EN
$scriptFolderPath         = $DB_SCRIPT_FOLDER
$scriptFolderEnPath       = "$DB_SCRIPT_FOLDER\en"
$executeOrderFile         = "$scriptFolderPath\en\execute-order.txt"
$executeOrderEnSpecificFile = "$scriptFolderPath\en\execute-en-specific-order.txt"
$serverName               = $DB_SERVER

$masterConnectionString   = "Server=$serverName;Database=master;Integrated Security=true;"
$databaseConnectionString = "Server=$serverName;Database=$databaseName;Integrated Security=true;"

$successCount  = 0
$failCount     = 0
$notFoundCount = 0
$startTime     = Get-Date

$masterConnection   = $null
$databaseConnection = $null

function Invoke-SqlScript {
    param($Connection, $ScriptPath, $Label)
    if (-not (Test-Path $ScriptPath)) {
        Write-Host "  [MISSING] $Label" -ForegroundColor Yellow
        return "notfound"
    }
    $content = Get-Content $ScriptPath -Raw -Encoding UTF8
    $cmd = $Connection.CreateCommand()
    $cmd.CommandText = $content
    $cmd.ExecuteNonQuery() | Out-Null
    Write-Host "  [OK] $Label" -ForegroundColor Green
    return "success"
}

try {
    $masterConnection = New-Object System.Data.SqlClient.SqlConnection
    $masterConnection.ConnectionString = $masterConnectionString
    $masterConnection.Open()

    $cmd = $masterConnection.CreateCommand()
    $cmd.CommandText = "CREATE DATABASE [$databaseName];"
    $cmd.ExecuteNonQuery() | Out-Null
    $masterConnection.Close()

    Write-Host "Database '$databaseName' created." -ForegroundColor Cyan

    $databaseConnection = New-Object System.Data.SqlClient.SqlConnection
    $databaseConnection.ConnectionString = $databaseConnectionString
    $databaseConnection.Open()

    # --- Shared scripts --------------------------------------------------
    Write-Host ""
    Write-Host "Running shared scripts..." -ForegroundColor Cyan
    Write-Host "------------------------------------------------------------"

    foreach ($scriptName in (Get-Content $executeOrderFile)) {
        $scriptName = $scriptName.Trim()
        if ([string]::IsNullOrWhiteSpace($scriptName)) { continue }

        $scriptFile = Join-Path $scriptFolderPath $scriptName
        try {
            switch (Invoke-SqlScript -Connection $databaseConnection -ScriptPath $scriptFile -Label $scriptName) {
                "success"  { $successCount++ }
                "notfound" { $notFoundCount++ }
            }
        } catch {
            Write-Host "  [FAIL] $scriptName" -ForegroundColor Red
            Write-Host "         $($_.Exception.Message)" -ForegroundColor Red
            $failCount++
        }
    }

    # --- EN-specific scripts ---------------------------------------------
    Write-Host ""
    Write-Host "Running EN-specific scripts..." -ForegroundColor Cyan
    Write-Host "------------------------------------------------------------"

    foreach ($scriptName in (Get-Content $executeOrderEnSpecificFile)) {
        $scriptName = $scriptName.Trim()
        if ([string]::IsNullOrWhiteSpace($scriptName)) { continue }

        $scriptFile = Join-Path $scriptFolderEnPath $scriptName
        try {
            switch (Invoke-SqlScript -Connection $databaseConnection -ScriptPath $scriptFile -Label $scriptName) {
                "success"  { $successCount++ }
                "notfound" { $notFoundCount++ }
            }
        } catch {
            Write-Host "  [FAIL] $scriptName" -ForegroundColor Red
            Write-Host "         $($_.Exception.Message)" -ForegroundColor Red
            $failCount++
        }
    }

    # --- Seed data (insert-db-data.sql) ---------------------------------
    if ($INCLUDE_INSERTS) {
        Write-Host ""
        Write-Host "Running seed data..." -ForegroundColor Cyan
        Write-Host "------------------------------------------------------------"
        $insertFile = Join-Path $scriptFolderPath "insert-db-data.sql"
        try {
            switch (Invoke-SqlScript -Connection $databaseConnection -ScriptPath $insertFile -Label "insert-db-data.sql") {
                "success"  { $successCount++ }
                "notfound" { $notFoundCount++ }
            }
        } catch {
            Write-Host "  [FAIL] insert-db-data.sql" -ForegroundColor Red
            Write-Host "         $($_.Exception.Message)" -ForegroundColor Red
            $failCount++
        }
    }

    # --- Bulk fake data (insert-proc-*.sql) ------------------------------
    if ($INCLUDE_BULK_DATA) {
        Write-Host ""
        Write-Host "Running bulk fake data..." -ForegroundColor Cyan
        Write-Host "------------------------------------------------------------"

        # Tag all bulk-insert activity as admin bulk so logUserActivity prefixes [BULK]
        $ctxCmd = $databaseConnection.CreateCommand()
        $ctxCmd.CommandText = "EXEC sp_set_session_context N'UserId', N'71028972-A6F2-410A-AA65-C0C671126523'; EXEC sp_set_session_context N'IsBulk', N'true';"
        $ctxCmd.ExecuteNonQuery() | Out-Null

        $bulkOrderFile = Join-Path $scriptFolderPath "en\insert-bulk-data-order.txt"
        foreach ($scriptName in (Get-Content $bulkOrderFile)) {
            $scriptName = $scriptName.Trim()
            if ([string]::IsNullOrWhiteSpace($scriptName)) { continue }
            $scriptFile = Join-Path $scriptFolderPath $scriptName
            try {
                switch (Invoke-SqlScript -Connection $databaseConnection -ScriptPath $scriptFile -Label $scriptName) {
                    "success"  { $successCount++ }
                    "notfound" { $notFoundCount++ }
                }
            } catch {
                Write-Host "  [FAIL] $scriptName" -ForegroundColor Red
                Write-Host "         $($_.Exception.Message)" -ForegroundColor Red
                $failCount++
            }
        }
    }

    $databaseConnection.Close()

    $elapsed = (Get-Date) - $startTime
    Write-Host ""
    Write-Host "============================================================" -ForegroundColor Cyan
    Write-Host "  Database : $databaseName"
    Write-Host "  OK       : $successCount" -ForegroundColor Green
    if ($notFoundCount -gt 0) { Write-Host "  Missing  : $notFoundCount" -ForegroundColor Yellow }
    if ($failCount     -gt 0) { Write-Host "  Failed   : $failCount"     -ForegroundColor Red    }
    Write-Host "  Duration : $([math]::Round($elapsed.TotalSeconds, 1))s"
    if      ($failCount     -gt 0) { Write-Host "  Status   : COMPLETED WITH ERRORS"   -ForegroundColor Red    }
    elseif  ($notFoundCount -gt 0) { Write-Host "  Status   : COMPLETED WITH WARNINGS" -ForegroundColor Yellow }
    else                           { Write-Host "  Status   : SUCCESS"                 -ForegroundColor Green  }
    Write-Host "============================================================" -ForegroundColor Cyan

    if ($failCount -gt 0) { exit 1 }
}
catch {
    Write-Host ""
    Write-Host "[ERROR] $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
finally {
    if ($null -ne $masterConnection)   { $masterConnection.Dispose() }
    if ($null -ne $databaseConnection) { $databaseConnection.Dispose() }
}
