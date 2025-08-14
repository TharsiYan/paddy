@echo off
echo ========================================
echo    PaddySense Firewall Fix
echo ========================================
echo.
echo This script will create a firewall rule to allow
echo mobile access to your PaddySense application.
echo.
echo Please run this as Administrator!
echo.
pause

echo.
echo Creating firewall rule for Django server...
netsh advfirewall firewall add rule name="PaddySense Django Server" dir=in action=allow protocol=TCP localport=8000

echo.
echo Creating outbound rule...
netsh advfirewall firewall add rule name="PaddySense Django Server Outbound" dir=out action=allow protocol=TCP localport=8000

echo.
echo Firewall rules created successfully!
echo.
echo Now you should be able to access your app from your phone at:
echo http://192.168.80.211:8000
echo.
echo If you still have issues, try:
echo 1. Ensure both devices are on the same WiFi network
echo 2. Restart your Django server
echo 3. Check your router settings
echo.
pause
