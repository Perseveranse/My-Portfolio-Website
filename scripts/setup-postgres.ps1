$ErrorActionPreference = "Stop"

$psql = "C:\Program Files\PostgreSQL\18\bin\psql.exe"
$createdb = "C:\Program Files\PostgreSQL\18\bin\createdb.exe"
$database = "my_portfolio"
$user = "postgres"
$hostName = "localhost"
$port = "5432"

if (!(Test-Path $psql) -or !(Test-Path $createdb)) {
  throw "PostgreSQL tools were not found at C:\Program Files\PostgreSQL\18\bin"
}

$securePassword = Read-Host "Enter the PostgreSQL password for user postgres" -AsSecureString
$bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePassword)
$plainPassword = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)

try {
  $env:PGPASSWORD = $plainPassword

  & $psql -U $user -h $hostName -p $port -d postgres -tc "SELECT 1 FROM pg_database WHERE datname = '$database'" | Select-String -Pattern "1" | Out-Null

  if ($LASTEXITCODE -ne 0) {
    throw "Could not connect to PostgreSQL. Check the password and try again."
  }

  $exists = & $psql -U $user -h $hostName -p $port -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname = '$database'"

  if ($exists -ne "1") {
    & $createdb -U $user -h $hostName -p $port $database
  }

  & $psql -U $user -h $hostName -p $port -d $database -f ".\server\schema.sql"

  Write-Host ""
  Write-Host "PostgreSQL is ready."
  Write-Host "Now replace PUT_YOUR_POSTGRES_PASSWORD_HERE in .env with your real PostgreSQL password."
}
finally {
  Remove-Item Env:\PGPASSWORD -ErrorAction SilentlyContinue
  if ($bstr) {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
  }
}
