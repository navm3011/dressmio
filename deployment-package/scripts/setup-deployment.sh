#!/bin/bash

# Smart Closet AI - Deployment Setup Script
# Prepares the project for iOS deployment

set -e

echo "🚀 Smart Closet AI - Deployment Setup"
echo "======================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if we're in the project directory
if [ ! -f "app.config.ts" ]; then
    echo -e "${RED}❌ app.config.ts not found. Please run this script from the project root.${NC}"
    exit 1
fi

echo "📋 Deployment Checklist"
echo "======================"
echo ""

# 1. Check Node version
echo "1️⃣  Node.js version:"
node --version
echo ""

# 2. Check pnpm version
echo "2️⃣  pnpm version:"
pnpm --version
echo ""

# 3. Check if dependencies are installed
echo "3️⃣  Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠️  node_modules not found. Installing...${NC}"
    pnpm install
    echo -e "${GREEN}✅ Dependencies installed${NC}"
else
    echo -e "${GREEN}✅ Dependencies already installed${NC}"
fi
echo ""

# 4. Check Expo CLI
echo "4️⃣  Checking Expo CLI..."
if ! command -v npx &> /dev/null; then
    echo -e "${RED}❌ npx not found${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Expo CLI available${NC}"
echo ""

# 5. Check EAS CLI
echo "5️⃣  Checking EAS CLI..."
if ! npx eas --version &> /dev/null; then
    echo -e "${YELLOW}⚠️  EAS CLI not found. Installing...${NC}"
    npm install -g eas-cli
fi
echo -e "${GREEN}✅ EAS CLI available${NC}"
echo ""

# 6. Check Expo login
echo "6️⃣  Checking Expo login..."
if npx eas whoami &> /dev/null; then
    echo -e "${GREEN}✅ Logged in to Expo${NC}"
    npx eas whoami
else
    echo -e "${YELLOW}⚠️  Not logged in to Expo${NC}"
    echo "Run: npx eas login"
fi
echo ""

# 7. Check app.config.ts
echo "7️⃣  Checking app configuration..."
if grep -q "appName" app.config.ts; then
    echo -e "${GREEN}✅ App name configured${NC}"
else
    echo -e "${RED}❌ App name not configured in app.config.ts${NC}"
fi
echo ""

# 8. Check eas.json
echo "8️⃣  Checking EAS configuration..."
if [ -f "eas.json" ]; then
    echo -e "${GREEN}✅ eas.json found${NC}"
else
    echo -e "${YELLOW}⚠️  eas.json not found. Creating...${NC}"
    npx eas build:configure
fi
echo ""

# 9. TypeScript check
echo "9️⃣  Running TypeScript check..."
if pnpm check &> /dev/null; then
    echo -e "${GREEN}✅ No TypeScript errors${NC}"
else
    echo -e "${RED}❌ TypeScript errors found. Fix them before deploying.${NC}"
    pnpm check
    exit 1
fi
echo ""

# 10. Build check
echo "🔟 Testing build..."
if pnpm build &> /dev/null; then
    echo -e "${GREEN}✅ Build successful${NC}"
else
    echo -e "${RED}❌ Build failed. Fix errors before deploying.${NC}"
    exit 1
fi
echo ""

echo "📋 Pre-Deployment Checklist"
echo "=========================="
echo ""
echo "Before deploying, ensure you have:"
echo ""
echo -e "${BLUE}Apple Setup:${NC}"
echo "  ☐ Apple Developer Account ($99/year)"
echo "  ☐ App created in App Store Connect"
echo "  ☐ Bundle ID matches app.config.ts"
echo "  ☐ App icon (1024x1024 PNG)"
echo "  ☐ Privacy policy URL"
echo ""
echo -e "${BLUE}App Content:${NC}"
echo "  ☐ App name and description finalized"
echo "  ☐ Screenshots prepared (2-5 images)"
echo "  ☐ Keywords and category set"
echo "  ☐ Support email configured"
echo ""
echo -e "${BLUE}Testing:${NC}"
echo "  ☐ Tested on iOS Simulator"
echo "  ☐ Tested on physical iPhone via TestFlight"
echo "  ☐ All features working correctly"
echo "  ☐ No crashes or errors"
echo ""

echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Complete the pre-deployment checklist above"
echo "2. Run: ./scripts/deploy-ios.sh"
echo "3. Follow the iOS Deployment Guide: docs/iOS-DEPLOYMENT-GUIDE.md"
echo ""
