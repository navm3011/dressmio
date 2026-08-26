#!/usr/bin/env python3

import subprocess
import os
import sys
import time

# Get credentials from environment
EXPO_TOKEN = os.environ.get('EXPO_TOKEN')
APPLE_ID_EMAIL = os.environ.get('APPLE_ID_EMAIL')
APPLE_ID_PASSWORD = os.environ.get('APPLE_ID_PASSWORD')

if not all([EXPO_TOKEN, APPLE_ID_EMAIL, APPLE_ID_PASSWORD]):
    print("ERROR: Missing required environment variables")
    print(f"  EXPO_TOKEN: {'✓' if EXPO_TOKEN else '✗'}")
    print(f"  APPLE_ID_EMAIL: {'✓' if APPLE_ID_EMAIL else '✗'}")
    print(f"  APPLE_ID_PASSWORD: {'✓' if APPLE_ID_PASSWORD else '✗'}")
    sys.exit(1)

print("=" * 60)
print("dressMio iOS Build via EAS CLI")
print("=" * 60)
print()

# Set environment for the build
env = os.environ.copy()
env['EXPO_TOKEN'] = EXPO_TOKEN

# Start the build process
print("Starting EAS build process...")
print()

process = subprocess.Popen(
    ['eas', 'build', '--platform', 'ios', '--profile', 'production'],
    cwd='/home/ubuntu/smart-closet-app',
    stdin=subprocess.PIPE,
    stdout=subprocess.PIPE,
    stderr=subprocess.STDOUT,
    env=env,
    text=True,
    bufsize=1
)

# Track what we've seen and sent
responses_sent = {
    'apple_account': False,
    'apple_id': False,
    'apple_password': False,
    'try_again': False,
}

# Process output and send inputs
try:
    for line in iter(process.stdout.readline, ''):
        if not line:
            break
        
        print(line, end='', flush=True)
        
        # Handle "Do you want to log in to your Apple account?"
        if 'Do you want to log in to your Apple account?' in line and not responses_sent['apple_account']:
            print("Sending: n (no, we'll provide credentials manually)")
            process.stdin.write('n\n')
            process.stdin.flush()
            responses_sent['apple_account'] = True
            time.sleep(0.5)
        
        # Handle "Apple ID:" prompt
        elif '? Apple ID:' in line and not responses_sent['apple_id']:
            print(f"Sending: {APPLE_ID_EMAIL}")
            process.stdin.write(f'{APPLE_ID_EMAIL}\n')
            process.stdin.flush()
            responses_sent['apple_id'] = True
            time.sleep(0.5)
        
        # Handle "Password:" prompt
        elif '? Password' in line and not responses_sent['apple_password']:
            print("Sending: [password]")
            process.stdin.write(f'{APPLE_ID_PASSWORD}\n')
            process.stdin.flush()
            responses_sent['apple_password'] = True
            time.sleep(1)
        
        # Handle "Would you like to try again?"
        elif 'Would you like to try again?' in line and not responses_sent['try_again']:
            print("Sending: yes (retrying with correct credentials)")
            process.stdin.write('yes\n')
            process.stdin.flush()
            responses_sent['try_again'] = True
            time.sleep(0.5)

except Exception as e:
    print(f"Error: {e}")
    process.kill()
    sys.exit(1)

# Wait for process to complete
return_code = process.wait()

print()
print("=" * 60)
if return_code == 0:
    print("✅ Build completed successfully!")
    print("=" * 60)
    print()
    print("Your iOS IPA is now being built on EAS servers.")
    print("Check the build status at:")
    print("  https://expo.dev/accounts/navneetmalik/projects/dressMio/builds")
else:
    print(f"❌ Build failed with exit code: {return_code}")
    print("=" * 60)
    sys.exit(return_code)
