#!/bin/bash

# EAS CLI Build Script for dressMio iOS App

set -e

cd /home/ubuntu/smart-closet-app

echo "=========================================="
echo "dressMio iOS Build via EAS CLI"
echo "=========================================="
echo ""

# Check if EAS CLI is installed
if ! command -v eas &> /dev/null; then
    echo "Installing EAS CLI..."
    npm install -g eas-cli
fi

echo "Logging in to Expo..."
# Use expect to handle interactive prompts
expect << EOF
set timeout 30
spawn eas login --no-browser
expect "Email or username"
send "$EXPO_USERNAME\r"
expect "Password"
send "$EXPO_PASSWORD\r"
expect {
    "Your username, email, or password was incorrect" {
        puts "ERROR: Login failed. Please check your credentials."
        exit 1
    }
    eof {
        puts "Login successful!"
    }
}
EOF

echo ""
echo "Starting iOS build..."
echo "This may take 10-20 minutes..."
echo ""

# Build for iOS production
eas build --platform ios --profile production

echo ""
echo "=========================================="
echo "Build complete!"
echo "=========================================="
echo ""
echo "Your build is now available in EAS."
echo "Check the build status at: https://expo.dev/accounts/$EXPO_USERNAME/projects/smart-closet-app/builds"
