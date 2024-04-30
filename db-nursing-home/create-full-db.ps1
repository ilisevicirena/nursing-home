# Define your database name and the folder containing SQL scripts
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$databaseName = "ENV09_NURSING_HOME"
$scriptFolderPath = "C:\nursing-home\db-nursing-home"
$executeOrderFile = "$scriptFolderPath\execute-order.txt"

# SQL Server connection details
$serverName = "LAPTOP-F98M3C9R"

# Build the connection string
$masterConnectionString = "Server=$serverName;Database=master;Integrated Security=true;"
$databaseConnectionString = "Server=$serverName;Database=$databaseName;Integrated Security=true;"

try {
    # Establish a connection to the master database
    $masterConnection = New-Object System.Data.SqlClient.SqlConnection
    $masterConnection.ConnectionString = $masterConnectionString
    $masterConnection.Open()

    # Create a command to create the new database
    $createDatabaseQuery = "CREATE DATABASE [$databaseName];"
    $createDatabaseCommand = $masterConnection.CreateCommand()
    $createDatabaseCommand.CommandText = $createDatabaseQuery
    $createDatabaseCommand.ExecuteNonQuery()

    # Close the connection to the master database
    $masterConnection.Close()

    Write-Host "Database '$databaseName' created successfully."

    # Establish a connection to the newly created database
    $databaseConnection = New-Object System.Data.SqlClient.SqlConnection
    $databaseConnection.ConnectionString = $databaseConnectionString
    $databaseConnection.Open()

      # Read the execution order from execute-order.txt
    $executionOrder = Get-Content $executeOrderFile
	
	foreach ($scriptName in $executionOrder) {
    # Trim any leading or trailing whitespace
    
    $scriptName = $scriptName.Trim()

    # Build the full path to the script file
    $scriptFile = Join-Path -Path $scriptFolderPath -ChildPath $scriptName

    # Check if the script file exists
    if (Test-Path $scriptFile) {
        $scriptContent = Get-Content $scriptFile -Raw -Encoding UTF8

        # Create a command and execute the script
        $executeScriptCommand = $databaseConnection.CreateCommand()
        $executeScriptCommand.CommandText = $scriptContent
        $executeScriptCommand.ExecuteNonQuery()

        Write-Host "Script '$scriptName' executed successfully."
    } else {
        Write-Host "Script '$scriptName' not found in the script folder."
    }
}

    # Close the connection to the new database
    $databaseConnection.Close()
}
catch {
    Write-Host "Error: $_.Exception.Message"
}
finally {
    $masterConnection.Dispose()
    $databaseConnection.Dispose()
}
