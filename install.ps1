$ErrorActionPreference = 'Stop'

# Enforce TLS 1.2 for GitHub HTTPS connections in Windows PowerShell
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12 -bor [Net.SecurityProtocolType]::Tls13

$repo = "krit22/cheatcode"
$binaryName = "cheatcode.exe"
$url = "https://github.com/$repo/releases/latest/download/cheatcode-cli-win.exe"

$installDir = "$env:LOCALAPPDATA\Programs\cheatcode"
if (-not (Test-Path $installDir)) {
    New-Item -ItemType Directory -Force -Path $installDir | Out-Null
}

$targetPath = Join-Path $installDir $binaryName

Write-Host "==> Downloading cheatcode for Windows..." -ForegroundColor Cyan

try {
    Invoke-WebRequest -Uri $url -OutFile $targetPath -UserAgent "Mozilla/5.0"
} catch {
    Write-Host "`nError downloading Windows binary from GitHub Releases!" -ForegroundColor Red
    Write-Host "Please ensure 'cheatcode-cli-win.exe' is uploaded to your GitHub Release (v1.0.0):" -ForegroundColor Yellow
    Write-Host "  https://github.com/$repo/releases/tag/v1.0.0" -ForegroundColor Yellow
    exit 1
}

# Add installDir to User PATH if missing
$userPath = [Environment]::GetEnvironmentVariable("PATH", "User")
if ($userPath -notlike "*$installDir*") {
    [Environment]::SetEnvironmentVariable("PATH", "$userPath;$installDir", "User")
    $env:PATH = "$env:PATH;$installDir"
}

Write-Host "==> Successfully installed cheatcode to $targetPath!" -ForegroundColor Green
Write-Host "==> Starting cheatcode..." -ForegroundColor Cyan

& $targetPath
