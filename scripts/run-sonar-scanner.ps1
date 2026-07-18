Write-Host ""
Write-Host "========================================="
Write-Host " Running sonar-scanner Security Scan"
Write-Host "========================================="
Write-Host ""

docker compose `
-f docker-compose.yml `
-f docker-compose.security.yml `
run --rm sonar-scanner

Write-Host ""
Write-Host "========================================="
Write-Host " Scan Finished"
Write-Host "========================================="