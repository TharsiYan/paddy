#!/usr/bin/env python3
"""
Mobile Access Test Script for PaddySense
This script tests if your Django server is accessible from external devices
"""

import requests
import socket
import subprocess
import sys

def get_local_ip():
    """Get the local IP address of this computer"""
    try:
        # Get local IP address
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        local_ip = s.getsockname()[0]
        s.close()
        return local_ip
    except Exception as e:
        print(f"Error getting local IP: {e}")
        return None

def test_local_access():
    """Test if the server is accessible locally"""
    try:
        response = requests.get("http://localhost:8000", timeout=5)
        if response.status_code == 200:
            print("✅ Local access: SUCCESS")
            return True
        else:
            print(f"❌ Local access: FAILED (Status: {response.status_code})")
            return False
    except Exception as e:
        print(f"❌ Local access: FAILED - {e}")
        return False

def test_external_access(ip_address):
    """Test if the server is accessible from external devices"""
    try:
        response = requests.get(f"http://{ip_address}:8000", timeout=5)
        if response.status_code == 200:
            print("✅ External access: SUCCESS")
            return True
        else:
            print(f"❌ External access: FAILED (Status: {response.status_code})")
            return False
    except Exception as e:
        print(f"❌ External access: FAILED - {e}")
        return False

def check_server_status():
    """Check if Django server is running"""
    try:
        result = subprocess.run(['netstat', '-an'], capture_output=True, text=True)
        if ':8000' in result.stdout and 'LISTENING' in result.stdout:
            print("✅ Django server: RUNNING")
            return True
        else:
            print("❌ Django server: NOT RUNNING")
            return False
    except Exception as e:
        print(f"❌ Could not check server status: {e}")
        return False

def main():
    print("🌐 PaddySense Mobile Access Test")
    print("=" * 40)
    
    # Check server status
    server_running = check_server_status()
    
    # Test local access
    local_access = test_local_access()
    
    # Get local IP
    local_ip = get_local_ip()
    if local_ip:
        print(f"🌍 Your local IP address: {local_ip}")
        
        # Test external access
        external_access = test_external_access(local_ip)
        
        print("\n📱 Mobile Access Information:")
        print(f"   URL: http://{local_ip}:8000")
        print(f"   Status: {'✅ READY' if external_access else '❌ NOT READY'}")
        
        if external_access:
            print("\n🎉 SUCCESS! Your phone can now access PaddySense!")
            print(f"   Open your phone's browser and go to: http://{local_ip}:8000")
        else:
            print("\n⚠️  External access failed. Possible issues:")
            print("   1. Windows Firewall blocking port 8000")
            print("   2. Django server not configured for external access")
            print("   3. Network configuration issues")
            print("\n   Check the MOBILE_ACCESS.md file for solutions.")
    else:
        print("❌ Could not determine local IP address")
    
    print("\n" + "=" * 40)

if __name__ == "__main__":
    main()
