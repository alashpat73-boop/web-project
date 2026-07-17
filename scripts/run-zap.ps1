Write-Host ""
Write-Host "========================================="
Write-Host " OWASP ZAP Baseline Scan"
Write-Host "========================================="
Write-Host ""

New-Item -ItemType Directory -Force reports\zap | Out-Null

docker compose `
-f docker-compose.yml `
-f docker-compose.security.yml `
--profile tools `
run --rm `
zap `
zap-baseline.py `
-t http://web `
-r reports/zap/report.html `
-w reports/zap/report.md `
-x reports/zap/report.xml `
-J reports/zap/report.json `
-I

Write-Host ""
Write-Host "========================================="
Write-Host " Scan Finished"
Write-Host "========================================="