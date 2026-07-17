Write-Host ""
Write-Host "========================================="
Write-Host "Task Manager Security Pipeline"
Write-Host "========================================="
Write-Host ""

.\scripts\run-semgrep.ps1

docker compose `
-f docker-compose.yml `
-f docker-compose.security.yml `
run --rm sonar-scanner

.\scripts\run-zap.ps1

Write-Host ""
Write-Host "========================================="
Write-Host "All security scans completed successfully."
Write-Host "Reports are available in the reports folder."
Write-Host "========================================="