# Deploy dressMio to App Store Without a Mac - Complete Guide

You can build and deploy dressMio to iOS **without a Mac** using **EAS (Expo Application Services)**. This guide walks you through the entire process from your Windows/Linux computer.

---

## Prerequisites

- [ ] Expo account (free at [expo.dev](https://expo.dev))
- [ ] Apple Developer account ($99/year)
- [ ] Node.js and npm installed on your computer
- [ ] EAS CLI installed
- [ ] Git installed
- [ ] Your app code (dressMio) ready to deploy

---

## Step 1: Set Up EAS CLI

### 1.1: Install EAS CLI

Open your terminal/command prompt and run:

```bash
npm install -g eas-cli
```

Verify installation:

```bash
eas --version
```

### 1.2: Log In to Expo

```bash
eas login
```

Enter your Expo credentials when prompted.

### 1.3: Link Your Project

Navigate to your project directory:

```bash
cd /home/ubuntu/smart-closet-app
```

Link your project to EAS:

```bash
eas project:create
```

This will create an EAS project and generate a project ID.

---

## Step 2: Configure Your App for iOS Build

### 2.1: Update app.config.ts

Your app.config.ts is already configured with:
- Bundle ID: `com.dressmio.app`
- App name: `dressMio`
- Version: `1.0.0`

Verify these are correct before building.

### 2.2: Create eas.json

In your project root, create a file named `eas.json`:

```bash
touch eas.json
```

Add this content:

```json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "distribution": "store"
    }
  },
  "submit": {
    "production": {
      "ios": {
        "serviceAccount": "path/to/service-account.json",
        "appleId": "your-apple-id@email.com",
        "appleTeamId": "YOUR_TEAM_ID",
        "ascAppId": "YOUR_APP_ID"
      }
    }
  }
}
```

---

## Step 3: Create Apple App Store Connect Record

### 3.1: Create App in App Store Connect

- [ ] Go to [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
- [ ] Click **My Apps**
- [ ] Click **+** and select **New App**
- [ ] Fill in:
  - **Platform**: iOS
  - **Name**: dressMio
  - **Bundle ID**: `com.dressmio.app`
  - **SKU**: dressmio-2026
- [ ] Click **Create**

### 3.2: Get Your App ID

- [ ] In App Store Connect, click on your app (dressMio)
- [ ] Click **App Information**
- [ ] Look for **Apple ID** (e.g., 1234567890)
- [ ] Save this number - you'll need it for EAS

### 3.3: Get Your Team ID

- [ ] Go to [developer.apple.com](https://developer.apple.com)
- [ ] Click **Account**
- [ ] Click **Membership**
- [ ] Look for **Team ID** (e.g., ABC123DEFG)
- [ ] Save this - you'll need it for EAS

---

## Step 4: Create Apple App-Specific Password

### 4.1: Generate App-Specific Password

- [ ] Go to [appleid.apple.com](https://appleid.apple.com)
- [ ] Sign in with your Apple ID
- [ ] Click **Security** (left sidebar)
- [ ] Under **App-Specific Passwords**, click **Generate password**
- [ ] Select **App Store Connect** from the dropdown
- [ ] Click **Generate**
- [ ] Copy the password (you'll use this for EAS)
- [ ] Save it securely

---

## Step 5: Build for iOS Using EAS

### 5.1: Start the Build

Run this command from your project directory:

```bash
eas build --platform ios --auto-submit
```

Or, if you want to build without auto-submitting:

```bash
eas build --platform ios
```

### 5.2: Provide Credentials When Prompted

When EAS asks for credentials, provide:

- [ ] **Apple ID**: your-apple-id@email.com
- [ ] **Apple ID Password**: Your app-specific password (from Step 4)
- [ ] **Team ID**: Your Apple Developer Team ID (from Step 3.3)

### 5.3: Wait for Build to Complete

- [ ] EAS will build your app in the cloud
- [ ] You'll see a build ID and progress updates
- [ ] Build typically takes 10-20 minutes
- [ ] You'll receive an email when the build is complete

### 5.4: Check Build Status

Monitor your build at:

```bash
eas build:list
```

Or view in the Expo dashboard: [expo.dev/builds](https://expo.dev/builds)

---

## Step 6: Auto-Submit to App Store (Optional)

If you used `--auto-submit`, EAS will automatically submit your build to App Store Connect.

### 6.1: Verify Submission

- [ ] Go to [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
- [ ] Click on your app (dressMio)
- [ ] Click **App Store** (left sidebar)
- [ ] Look for your build under **Build** section
- [ ] Verify it shows as "Ready to Submit"

### 6.2: Complete App Store Information

Before you can submit, you need to fill in:

- [ ] App icon (1024x1024 PNG)
- [ ] Screenshots (5-6 images, 1242x2208 px each)
- [ ] App description
- [ ] Keywords
- [ ] Support URL
- [ ] Privacy policy URL
- [ ] Content rating

See the iOS_SUBMISSION_DETAILED.md file for complete instructions.

---

## Step 7: Manual Submission to App Store

If you didn't use `--auto-submit`, follow these steps:

### 7.1: Download Your Build

- [ ] Go to [expo.dev/builds](https://expo.dev/builds)
- [ ] Find your completed iOS build
- [ ] Click **Download**
- [ ] The IPA file will download

### 7.2: Upload Using Transporter

**Option A: Using Transporter (Recommended)**

- [ ] Download Transporter from Mac App Store (or use online version)
- [ ] Open Transporter
- [ ] Click **+** to add the IPA file
- [ ] Select your downloaded IPA file
- [ ] Click **Deliver**
- [ ] Wait for upload to complete

**Option B: Using EAS Submit**

```bash
eas submit --platform ios
```

Follow the prompts to submit your build to App Store Connect.

---

## Step 8: Submit for Review

### 8.1: Complete App Information

- [ ] Go to [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
- [ ] Click on your app (dressMio)
- [ ] Fill in all required information (see iOS_SUBMISSION_DETAILED.md)

### 8.2: Select Build

- [ ] Click **App Store** (left sidebar)
- [ ] Under **Build**, click **Select a build before you submit your app**
- [ ] Select your uploaded build
- [ ] Click **Done**

### 8.3: Submit for Review

- [ ] Click **Version 1.0** (or current version)
- [ ] Scroll to top and click **Submit for Review**
- [ ] Answer the review questions:
  - [ ] **Export Compliance**: No
  - [ ] **Content Rights**: Yes
  - [ ] **Advertising Identifier**: No
  - [ ] **Alcohol, Tobacco, Gambling**: No
  - [ ] **Kids Category**: No
- [ ] Click **Submit**

### 8.4: Monitor Review Status

- [ ] Go to **App Store** → **Version 1.0**
- [ ] Check **Status** field:
  - **Waiting for Review**: Apple is reviewing
  - **In Review**: Apple is actively reviewing
  - **Ready for Sale**: Approved!
  - **Rejected**: Review rejection reason

---

## Step 9: Deploy to Google Play Store (Android)

### 9.1: Build for Android

```bash
eas build --platform android
```

### 9.2: Upload to Google Play

- [ ] Go to [play.google.com/console](https://play.google.com/console)
- [ ] Click on your app (dressMio)
- [ ] Click **Release** → **Production**
- [ ] Click **Create new release**
- [ ] Upload the AAB file from your EAS build
- [ ] Fill in release notes
- [ ] Click **Review release**
- [ ] Click **Start rollout to Production**

---

## Complete Workflow Summary

```
1. Install EAS CLI
   ↓
2. Create Expo account and link project
   ↓
3. Create App Store Connect record
   ↓
4. Create app-specific password
   ↓
5. Run: eas build --platform ios --auto-submit
   ↓
6. Fill in App Store information
   ↓
7. Submit for Review
   ↓
8. Wait for approval (1-3 days)
   ↓
9. App goes live on App Store!
```

---

## Troubleshooting

### Build Failed

**Error: "Invalid provisioning profile"**
- Solution: EAS will create provisioning profiles automatically. Make sure your Apple ID has permission to manage certificates.

**Error: "Authentication failed"**
- Solution: Verify your Apple ID and app-specific password are correct.

**Error: "Bundle ID mismatch"**
- Solution: Ensure your app.config.ts has `bundleIdentifier: "com.dressmio.app"`

### Submission Failed

**Error: "App not found in App Store Connect"**
- Solution: Make sure you created the app record in App Store Connect before building.

**Error: "Build not available for submission"**
- Solution: Wait a few minutes after the build completes. Sometimes there's a delay.

### Review Rejected

**Common rejection reasons:**
- Missing privacy policy (add URL to app.config.ts)
- Unclear app purpose (improve description)
- Crashes or bugs (test thoroughly)
- Inappropriate content (review app content)

---

## Advantages of Using EAS

✅ **No Mac required** - Build from Windows, Linux, or Mac

✅ **Faster builds** - Cloud infrastructure handles compilation

✅ **Automatic provisioning** - EAS manages certificates and profiles

✅ **Easy submission** - One command to submit to App Store

✅ **Version management** - Track all your builds in the dashboard

✅ **Android support** - Build Android and iOS with same workflow

---

## Important Notes

- **First build takes longer** - Subsequent builds are faster due to caching
- **Keep app-specific password safe** - Don't share it publicly
- **Update regularly** - Submit bug fixes and new features regularly
- **Monitor reviews** - Respond to user feedback and ratings
- **Test before submitting** - Use TestFlight for beta testing

---

## Next Steps

1. [ ] Install EAS CLI
2. [ ] Create Expo account
3. [ ] Link your dressMio project
4. [ ] Create App Store Connect record
5. [ ] Generate app-specific password
6. [ ] Run `eas build --platform ios --auto-submit`
7. [ ] Fill in App Store information
8. [ ] Submit for review
9. [ ] Monitor approval status
10. [ ] Celebrate your app launch! 🎉

---

## Support

- **EAS Documentation**: [docs.expo.dev/build](https://docs.expo.dev/build)
- **EAS Submit**: [docs.expo.dev/submit](https://docs.expo.dev/submit)
- **Expo Discord**: [discord.gg/expo](https://discord.gg/expo)
- **Apple App Store Review Guidelines**: [developer.apple.com/app-store/review/guidelines](https://developer.apple.com/app-store/review/guidelines)

---

**You've got this! 🚀 Deploy your dressMio app without a Mac using EAS.**
