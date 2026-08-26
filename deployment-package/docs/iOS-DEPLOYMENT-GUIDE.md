# Smart Closet AI - iOS Deployment Guide

Complete step-by-step guide to deploy the Smart Closet app to the Apple App Store via TestFlight.

## Prerequisites

- **Apple Developer Account** ($99/year) - https://developer.apple.com
- **Mac with Xcode** - Download from App Store
- **Expo Account** - https://expo.dev (free)
- **Node.js & npm** - Already installed
- **pnpm** - Package manager

## Phase 1: Apple Developer Setup (One-time)

### 1.1 Create Apple Developer Account
1. Go to https://developer.apple.com
2. Sign in with your Apple ID
3. Enroll in Apple Developer Program ($99/year)
4. Complete identity verification

### 1.2 Create App ID in App Store Connect
1. Go to https://appstoreconnect.apple.com
2. Click "Apps" → "+" → "New App"
3. Fill in:
   - **Platform**: iOS
   - **Name**: Smart Closet
   - **Bundle ID**: `space.manus.smart-closet-app.t{timestamp}` (from app.config.ts)
   - **SKU**: `smartcloset-001`
   - **User Access**: Select your role

### 1.3 Create App Store Listing
1. In App Store Connect, go to your app
2. Fill in required information:
   - **App Name**: Smart Closet
   - **Subtitle**: Your AI-powered personal fashion assistant
   - **Description**: See MARKETING.md for suggested copy
   - **Category**: Lifestyle
   - **Keywords**: closet, fashion, AI, outfit, wardrobe
   - **Support URL**: Your website or email
   - **Privacy Policy URL**: Required before submission

### 1.4 Add App Icon & Screenshots
1. Upload app icon (1024x1024 PNG)
2. Add 2-5 screenshots showing key features:
   - Closet grid view
   - AI outfit suggestions
   - Saved outfits
   - Settings screen

## Phase 2: Expo Setup

### 2.1 Login to Expo
```bash
npx eas login
```
Enter your Expo credentials.

### 2.2 Configure EAS Build
The project already has `eas.json` configured. Verify it exists:
```bash
cat eas.json
```

## Phase 3: Build for TestFlight

### 3.1 Create Production Build
```bash
npx eas build --platform ios --profile preview
```

This will:
- Build the app for iOS
- Upload to Expo servers
- Show build progress in terminal
- Take 15-20 minutes for first build

### 3.2 Monitor Build Progress
- Check status: `npx eas build:list`
- View logs: `npx eas build:view {build-id}`

### 3.3 Download Build
Once complete, download the .ipa file or proceed to TestFlight submission.

## Phase 4: Submit to TestFlight

### 4.1 Automatic Submission
```bash
npx eas submit --platform ios --latest
```

This will:
- Automatically submit to TestFlight
- Process takes 5-30 minutes
- You'll receive email confirmation

### 4.2 Manual Submission (Alternative)
1. Download .ipa file from Expo
2. Use Transporter app (free from App Store)
3. Sign in with Apple ID
4. Drag & drop .ipa file to submit

## Phase 5: TestFlight Testing

### 5.1 Add Internal Testers
1. In App Store Connect, go to your app
2. Click **TestFlight** → **Internal Testing**
3. Click "+" to add testers
4. Enter Apple ID email addresses
5. Click "Send Invite"

### 5.2 Install on iPhone
1. Check email for TestFlight invite
2. Click link or open TestFlight app
3. Tap "Accept" on Smart Closet
4. Tap "Install"
5. Wait for installation (1-2 minutes)

### 5.3 Test on Device
- Grant camera and photo permissions
- Add a clothing item
- Generate outfit suggestions
- Save an outfit
- Test all screens and features
- Report any bugs

## Phase 6: App Store Submission

### 6.1 Prepare for Review
1. In App Store Connect, go to "App Information"
2. Fill in all required fields
3. Add privacy policy URL
4. Set age rating
5. Configure pricing (Free or paid)

### 6.2 Submit for Review
1. Go to "Version Information"
2. Click "Submit for Review"
3. Answer compliance questions
4. Confirm submission

### 6.3 Review Process
- Apple reviews typically take 24-48 hours
- You'll receive email with approval or rejection
- If rejected, fix issues and resubmit

## Phase 7: Launch on App Store

### 7.1 Release to App Store
1. Once approved, go to "Version Release"
2. Choose release date:
   - **Automatic**: Release immediately
   - **Manual**: Choose specific date
3. Click "Release"

### 7.2 Monitor Performance
- Track downloads and ratings
- Monitor crash reports
- Respond to user reviews
- Plan updates

## Troubleshooting

### Build Fails
```bash
# Clear cache and retry
npx eas build --platform ios --profile preview --clear-cache
```

### Submission Fails
- Check bundle ID matches App Store Connect
- Verify all required fields are filled
- Check privacy policy URL is valid
- Ensure app icon is correct size

### App Crashes on Device
- Check console logs: `npx eas build:view {build-id} --logs`
- Verify all permissions are requested
- Test on iOS Simulator first

## Important Notes

- **Bundle ID** must match App Store Connect exactly
- **App Icon** must be 1024x1024 PNG with no transparency
- **Privacy Policy** is required before submission
- **Certificates** are managed automatically by Expo
- **Provisioning Profiles** are created automatically by EAS

## Support

For issues with:
- **Expo**: https://docs.expo.dev
- **App Store Connect**: https://help.apple.com/app-store-connect
- **TestFlight**: https://developer.apple.com/testflight

## Next Steps

1. Complete Apple Developer setup (Phase 1)
2. Run `npx eas build --platform ios --profile preview`
3. Submit to TestFlight: `npx eas submit --platform ios --latest`
4. Test on your iPhone via TestFlight
5. Submit for App Store review
6. Launch on App Store!

---

**Estimated Timeline**: 2-3 days from start to App Store launch
