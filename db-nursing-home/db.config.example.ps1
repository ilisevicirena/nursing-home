# Copy this file to db.config.ps1 and fill in the real values.
# db.config.ps1 is git-ignored and should never be committed.

$DB_SERVER          = "YOUR_SQL_SERVER_NAME"
$DB_NAME_BS         = "YOUR_DB_NAME_BOSNIAN"
$DB_NAME_EN         = "YOUR_DB_NAME_ENGLISH"
$DB_SCRIPT_FOLDER   = "C:\path\to\db-nursing-home"

# Set to $true to insert seed data (users, persons, services, packages, notes...)
$INCLUDE_INSERTS    = $true

# Set to $true to also insert bulk fake data (insert-proc-*.sql files)
$INCLUDE_BULK_DATA  = $false
