Write-Host ""
Write-Host "========================================="
Write-Host " Running Semgrep Security Scan"
Write-Host "========================================="
Write-Host ""

New-Item -ItemType Directory -Force reports\semgrep | Out-Null

# JSON Report
docker compose `
-f docker-compose.yml `
-f docker-compose.security.yml `
--profile tools `
run --rm semgrep `
scan `
--config=p/owasp-top-ten `
--json `
--output=/src/reports/semgrep/semgrep.json `
.

# SARIF Report
docker compose `
-f docker-compose.yml `
-f docker-compose.security.yml `
--profile tools `
run --rm semgrep `
scan `
--config=p/owasp-top-ten `
--sarif `
--output=/src/reports/semgrep/semgrep.sarif `
.

Write-Host ""
Write-Host "Semgrep reports saved in reports/semgrep"