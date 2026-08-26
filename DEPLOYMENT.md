# Smart Closet AI - Deployment Guide

This guide covers how to build, test, and deploy the Smart Closet AI app to iOS.

## Prerequisites

- **Expo CLI**: Already installed
- **Xcode**: For iOS builds (macOS only)
- **Apple Developer Account**: For TestFlight and App Store deployment
- **Node.js & pnpm**: Already installed

## Local Development

### Start the Dev Server

```bash
cd /home/ubuntu/smart-closet-app
pnpm dev
```

This starts both the Metro bundler and backend server. The app will be available at:
- **Metro**: https://8081-i2l0cixw0mo884myppp14-b799bdd4.us2.manus.computer
- **API**: http://127.0.0.1:3000

### Test on iOS Device

#### Option 1: Expo Go (Easiest for Testing)

1. Install Expo Go app from App Store on your iPhone
2. Run `pnpm dev` in the project directory
3. Scan the QR code displayed in the terminal with your iPhone camera
4. App opens in Expo Go

#### Option 2: iOS Simulator (macOS)

```bash
pnpm ios
```

This builds and runs the app in the iOS simulator.

## Building for iOS

### 1. Create an EAS Build Account

```bash
npx eas login
```

### 2. Configure EAS Build

The `app.config.ts` is already configured with:
- Bundle ID: `space.manus.smart-closet-app.t{timestamp}`
- iOS deployment target: iOS 13+
- Adaptive icons for Android

### 3. Build for TestFlight

```bash
npx eas build --platform ios --profile preview
```

This creates an iOS build suitable for TestFlight distribution.

### 4. Build for App Store

```bash
npx eas build --platform ios --profile production
```

This creates an optimized production build for App Store submission.

## App Store Submission

### 1. Prepare App Store Connect

1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Create a new app:
   - Name: Smart Closet
   - Bundle ID: `space.manus.smart-closet-app.t{timestamp}`
   - SKU: `smartcloset-001`
   - Platform: iOS

### 2. Add App Information

- **Description**: "Organize your wardrobe with AI. Capture photos of your clothes, get AI-powered categorization, and receive smart outfit suggestions."
- **Keywords**: closet, wardrobe, outfit, AI, fashion, clothing
- **Category**: Lifestyle
- **Content Rating**: 4+

### 3. Add Screenshots

Required sizes:
- iPhone 6.7-inch: 1284 x 2778 px
- iPhone 5.5-inch: 1242 x 2208 px
- iPad Pro 12.9-inch: 2048 x 2732 px

### 4. Add Privacy Policy

Create a privacy policy covering:
- Camera usage (for photo capture)
- Photo library access
- Local storage of clothing data
- AI image analysis (if using cloud)

### 5. Set Pricing & Availability

- Price: Free
- Availability: Select regions

### 6. Submit for Review

Once your build is ready in TestFlight, submit it for App Store review.

## Features & Permissions

### iOS Permissions Required

The app requests these permissions:
- **Camera**: To capture photos of clothing items
- **Photo Library**: To select existing photos

These are requested at runtime when the user tries to add an item.

### App Features

- **Camera Integration**: Capture photos of clothing items
- **Photo Library Access**: Select photos from device
- **AI Categorization**: Automatic clothing type detection
- **Outfit Suggestions**: AI-powered outfit recommendations
- **Local Storage**: All data stored on device (AsyncStorage)
- **Cloud Sync**: Optional cloud storage (future feature)

## Troubleshooting

### Build Fails with "Pod install error"

```bash
cd ios
pod install --repo-update
cd ..
pnpm ios
```

### Camera Permission Denied

1. Go to Settings → Smart Closet
2. Enable Camera and Photos permissions
3. Restart the app

### Images Not Displaying

- Ensure photos are saved to the app's document directory
- Check file permissions in iOS Settings

### AI Features Not Working

1. Verify backend server is running: `pnpm dev:server`
2. Check API endpoint in `lib/trpc.ts`
3. Ensure LLM credentials are set on the server

## Performance Optimization

### Image Handling

- Images are compressed to 80% quality on capture
- Thumbnails are cached for grid display
- Large images are resized for AI analysis

### Local Storage

- AsyncStorage is used for fast, local data persistence
- Data is automatically synced on app launch
- No network required for basic functionality

### AI Processing

- AI analysis happens on the server (not on device)
- Results are cached to avoid duplicate API calls
- Timeout set to 30 seconds for AI requests

## Version Management

Current version: **1.0.0**

Update version in `app.config.ts`:
```ts
version: "1.0.1",
```

## Support & Feedback

For issues or feature requests, contact the development team.

## Legal

- **License**: Proprietary
- **Privacy Policy**: [Link to privacy policy]
- **Terms of Service**: [Link to terms]

---

**Last Updated**: February 2026
**Maintained By**: Development Team
