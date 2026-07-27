$ErrorActionPreference = 'Stop'

$repo = "krit22/cheatcode"
$binaryName = "cheatcode.exe"
$url = "https://github.com/$repo/releases/latest/download/cheatcode-cli-win.exe"

$installDir = "$env:LOCALAPPDATA\Programs\cheatcode"
if (-not (Test-Path $installDir)) {
    New-Item -ItemType Directory -Force -Path $installDir | Out-Null
}

$targetPath = Join-Path $installDir $binaryName

Write-Host "==> Downloading cheatcode for Windows..." -ForegroundColor Cyan
Invoke-WebRequest -Uri $url -OutFile $targetPath

# Add installDir to User PATH if missing
$userPath = [Environment]::GetEnvironmentVariable("PATH", "User")
if ($userPath -notlike "*$installDir*") {
    [Environment]::SetEnvironmentVariable("PATH", "$userPath;$installDir", "User")
    $env:PATH = "$env:PATH;$installDir"
}

Write-Host "==> Successfully installed cheatcode to $targetPath!" -ForegroundColor Green
Write-Host "==> Starting cheatcode..." -ForegroundColor Cyan

& $targetPath
