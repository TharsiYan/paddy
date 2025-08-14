# PaddySense Firewall Fix Script
# Run this in PowerShell

Write-Host "========================================" -ForegroundColor Green
Write-Host "    PaddySense Firewall Check" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Check if port 8000 is accessible
Write-Host "Checking if port 8000 is accessible..." -ForegroundColor Yellow
try {
    $connection = Test-NetConnection -ComputerName localhost -Port 8000 -InformationLevel Quiet
    if ($connection.TcpTestSucceeded) {
        Write-Host "✅ Port 8000 is accessible locally" -ForegroundColor Green
    } else {
        Write-Host "❌ Port 8000 is not accessible locally" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Error checking port 8000: $_" -ForegroundColor Red
}

Write-Host ""

# Check current firewall rules
Write-Host "Checking current firewall rules for port 8000..." -ForegroundColor Yellow
$rules = Get-NetFirewallRule | Where-Object { $_.LocalPort -eq 8000 -or $_.LocalPort -eq "8000" }
if ($rules) {
    Write-Host "✅ Found firewall rules for port 8000:" -ForegroundColor Green
    $rules | ForEach-Object { Write-Host "   - $($_.DisplayName) ($($_.Direction))" -ForegroundColor Cyan }
} else {
    Write-Host "❌ No firewall rules found for port 8000" -ForegroundColor Red
    Write-Host "   This might be blocking external access" -ForegroundColor Yellow
}

Write-Host ""

# Check network connectivity
Write-Host "Checking network configuration..." -ForegroundColor Yellow
$localIP = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -like "192.168.*" }).IPAddress
if ($localIP) {
    Write-Host "✅ Your local IP: $localIP" -ForegroundColor Green
    
    # Test external access
    Write-Host "Testing external access..." -ForegroundColor Yellow
    try {
        $response = Invoke-WebRequest -Uri "http://$localIP`:8000" -TimeoutSec 5 -UseBasicParsing
        if ($response.StatusCode -eq 200) {
            Write-Host "✅ External access: SUCCESS" -ForegroundColor Green
            Write-Host "   Your phone should be able to access: http://$localIP`:8000" -ForegroundColor Cyan
        } else {
            Write-Host "❌ External access failed with status: $($response.StatusCode)" -ForegroundColor Red
        }
    } catch {
        Write-Host "❌ External access failed: $_" -ForegroundColor Red
    }
} else {
    Write-Host "❌ Could not determine local IP address" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "If external access failed, try these solutions:" -ForegroundColor Yellow
Write-Host "1. Run the fix_firewall.bat file as Administrator" -ForegroundColor Cyan
Write-Host "2. Manually add firewall rule for port 8000" -ForegroundColor Cyan
Write-Host "3. Check if both devices are on same WiFi network" -ForegroundColor Cyan
Write-Host "4. Restart Django server with: python manage.py runserver 0.0.0.0:8000" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Green
