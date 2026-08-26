#!/bin/bash

# Smart Closet AI - iOS Deployment Script
# This script automates the build and submission process to TestFlight

set -e

echo "🎯 Smart Closet AI - iOS Deployment"
echo "===================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    exit 1
fi

if ! command -v pnpm &> /dev/null; then
    echo -e "${RED}❌ pnpm is not installed${NC}"
    exit 1
fi

if ! command -v npx &> /dev/null; then
    echo -e "${RED}❌ npx is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ All prerequisites installed${NC}"
echo ""

# Check if user is logged in to Expo
echo "🔐 Checking Expo login..."
if ! npx eas whoami &> /dev/null; then
    echo -e "${YELLOW}⚠️  Not logged in to Expo${NC}"
    echo "Run: npx eas login"
    exit 1
fi
echo -e "${GREEN}✅ Logged in to Expo${NC}"
echo ""

# Get deployment options
echo "📦 Deployment Options:"
echo "1. Build only (for testing)"
echo "2. Build and submit to TestFlight"
echo "3. Submit latest build to TestFlight"
echo ""
read -p "Select option (1-3): " option

case $option in
    1)
        echo ""
        echo "🔨 Building for iOS..."
        npx eas build --platform ios --profile preview
        echo -e "${GREEN}✅ Build complete!${NC}"
        echo "Check build status: npx eas build:list"
        ;;
    2)
        echo ""
        echo "🔨 Building for iOS..."
        npx eas build --platform ios --profile preview
        echo -e "${GREEN}✅ Build complete!${NC}"
        echo ""
        read -p "Submit to TestFlight? (y/n): " submit
        if [ "$submit" = "y" ]; then
            echo "📤 Submitting to TestFlight..."
            npx eas submit --platform ios --latest
            echo -e "${GREEN}✅ Submitted to TestFlight!${NC}"
        fi
        ;;
    3)
        echo ""
        echo "📤 Submitting latest build to TestFlight..."
        npx eas submit --platform ios --latest
        echo -e "${GREEN}✅ Submitted to TestFlight!${NC}"
        ;;
    *)
        echo -e "${RED}❌ Invalid option${NC}"
        exit 1
        ;;
esac

echo ""
echo "📚 Next steps:"
echo "1. Check TestFlight: https://appstoreconnect.apple.com"
echo "2. Add internal testers"
echo "3. Test on your iPhone"
echo "4. Submit for App Store review"
echo ""
echo -e "${GREEN}Done!${NC}"
