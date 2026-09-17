$ErrorActionPreference = 'Stop'
$projectDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$distDir = Join-Path $projectDir 'dist'
$sourceHtml = Get-Content -LiteralPath (Join-Path $distDir 'index.html') -Raw

$scriptMatch = [regex]::Match($sourceHtml, '<script type="module" crossorigin src="(?<path>[^"]+)"></script>')
$styleMatch = [regex]::Match($sourceHtml, '<link rel="stylesheet" crossorigin href="(?<path>[^"]+)">')

if (-not $scriptMatch.Success -or -not $styleMatch.Success) {
    throw 'V sestaveném index.html nebyly nalezeny očekávané odkazy na JavaScript a CSS.'
}

$scriptRelative = $scriptMatch.Groups['path'].Value.TrimStart('.', '/')
$styleRelative = $styleMatch.Groups['path'].Value.TrimStart('.', '/')
$scriptContent = Get-Content -LiteralPath (Join-Path $distDir $scriptRelative) -Raw
$styleContent = Get-Content -LiteralPath (Join-Path $distDir $styleRelative) -Raw
$scriptContent = $scriptContent -replace '</script', '<\/script'

$standaloneHtml = $sourceHtml.Replace($scriptMatch.Value, "<script type=`"module`">`n$scriptContent`n</script>")
$standaloneHtml = $standaloneHtml.Replace($styleMatch.Value, "<style>`n$styleContent`n</style>")
$outputPath = Join-Path $projectDir 'prototyp.html'
Set-Content -LiteralPath $outputPath -Value $standaloneHtml -Encoding utf8
Write-Host "Hotovo: $outputPath"
