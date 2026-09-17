param(
    [Parameter(Mandatory = $true)][string]$Text,
    [ValidateRange(1, 10000)][int]$Limit = 100
)

# Cesty z indexu nikdy nepoužívat k přístupu na souborový systém.
$localIndex = Join-Path $PSScriptRoot 'index-cest.txt'
Select-String -LiteralPath $localIndex -Pattern $Text -SimpleMatch -Encoding UTF8 |
    Select-Object -First $Limit -ExpandProperty Line
