# copy-qr.ps1 — copies your QR image from Pictures into the project assets folder
# Run this from the project root (PowerShell)

$src = "C:\Users\LENOVO\Pictures\WhatsApp Image 2025-10-29 at 17.53.57_d3abf413.jpg"
$destDir = Join-Path -Path $PSScriptRoot -ChildPath "assets"
$dest = Join-Path -Path $destDir -ChildPath "qr.jpg"

if (-not (Test-Path $src)) {
    Write-Host "Source file not found: $src" -ForegroundColor Yellow
    Write-Host "Please make sure the path exists or update this script with the correct path." -ForegroundColor Yellow
    exit 1
}

New-Item -ItemType Directory -Path $destDir -Force | Out-Null
Copy-Item -Path $src -Destination $dest -Force
Write-Host "Copied QR to: $dest" -ForegroundColor Green
