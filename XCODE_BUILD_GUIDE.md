# Xcode Build Guide for dressMio iOS App

This guide will walk you through building and signing a production iOS IPA file for App Store submission using Xcode on your Mac.

## Prerequisites

- **Mac with Xcode installed** (Xcode 15.0 or later recommended)
- **Apple Developer Account** with valid signing certificates
- **iOS Signing Certificate** (.p12 file) - you already have this
- **Provisioning Profile** (.mobileprovision file) - you already have this
- **App Store Connect App ID**: 6771671395

## Time Estimate

The total build process typically takes:
- **First-time setup**: 15-30 minutes (installing dependencies, configuring signing)
- **Actual build**: 10-20 minutes (compiling and archiving)
- **Total**: 25-50 minutes depending on your Mac's performance

## Step-by-Step Instructions

### Step 1: Download the Project Files

1. Download the entire `smart-closet-app` project folder from this session
2. Extract it to a location on your Mac (e.g., `~/Projects/smart-closet-app`)

### Step 2: Install Dependencies

Open Terminal and navigate to the project:

```bash
cd ~/Projects/smart-closet-app
```

Install Node dependencies:

```bash
npm install
# or if you use pnpm:
pnpm install
```

Install iOS dependencies (CocoaPods):

```bash
cd ios
pod install
cd ..
```

### Step 3: Open the Project in Xcode

```bash
open ios/smartclosetapp.xcworkspace
```

**Important**: Open the `.xcworkspace` file, NOT the `.xcodeproj` file. The workspace includes CocoaPods dependencies.

### Step 4: Configure Signing & Capabilities

1. **Select the project** in Xcode's left sidebar
2. **Select the "smartclosetapp" target**
3. Go to the **"Signing & Capabilities"** tab
4. **Team**: Select your Apple Developer Team from the dropdown
5. **Bundle Identifier**: Should be `com.dressmio.app` (verify it matches)

### Step 5: Import Your Signing Certificate

1. Open **Keychain Access** on your Mac (Applications → Utilities → Keychain Access)
2. **File** → **Import Items**
3. Select your `.p12` certificate file
4. Enter the password when prompted
5. The certificate should now appear in Keychain

### Step 6: Import Your Provisioning Profile

1. **Finder** → Go to `~/Library/MobileDevice/Provisioning\ Profiles/`
2. Copy your `.mobileprovision` file into this directory
3. Xcode will automatically detect it

### Step 7: Verify Build Settings

1. In Xcode, select the **smartclosetapp** target
2. Go to **Build Settings**
3. Search for "Code Signing Identity"
4. Ensure it's set to your certificate (should show your name)
5. Search for "Provisioning Profile"
6. Ensure it's set to your provisioning profile

### Step 8: Build Archive

1. **Product** → **Scheme** → Make sure **"smartclosetapp"** is selected
2. **Product** → **Build For** → **Running** (to verify build succeeds)
3. Once that succeeds, **Product** → **Archive**

The build will begin. This typically takes **10-20 minutes**. You'll see a progress bar in Xcode.

### Step 9: Export as IPA

Once the archive completes:

1. The **Organizer** window will open automatically
2. Select your archive from the list
3. Click **"Distribute App"** button
4. Choose **"App Store Connect"** as the distribution method
5. Click **"Next"**
6. Select **"Upload"** (or "Export" if you want to save locally first)
7. Choose your signing certificate and provisioning profile
8. Click **"Next"** and follow the prompts

The app will be signed and uploaded to App Store Connect.

### Step 10: Verify Upload in App Store Connect

1. Go to https://appstoreconnect.apple.com
2. Sign in with your Apple Developer account
3. Navigate to **My Apps** → **dressMio**
4. Go to **TestFlight** tab
5. You should see your new build appearing (may take a few minutes to process)

## Troubleshooting

### "Code Signing Identity" Not Found

- Verify the `.p12` certificate is imported in Keychain Access
- The certificate name should match what's shown in Xcode's Code Signing Identity dropdown

### "Provisioning Profile" Not Found

- Verify the `.mobileprovision` file is in `~/Library/MobileDevice/Provisioning\ Profiles/`
- Restart Xcode after adding the provisioning profile

### Build Fails with "Bundle Identifier Mismatch"

- Verify in Xcode that the Bundle Identifier is exactly `com.dressmio.app`
- It must match the provisioning profile's bundle ID

### "No Matching Provisioning Profile"

- The provisioning profile may have expired
- Generate a new provisioning profile in App Store Connect
- Download and import it into Xcode

### Archive Fails

- Make sure you're using the `.xcworkspace` file, not `.xcodeproj`
- Run `pod install` again in the `ios/` directory
- Clean build folder: **Product** → **Clean Build Folder** (Shift + Cmd + K)

## Alternative: Export IPA Without Uploading

If you want to save the IPA file locally instead of uploading directly:

1. In the Organizer, select your archive
2. Click **"Distribute App"**
3. Choose **"Custom"** or **"Ad Hoc"** (for testing)
4. Follow the prompts to export the `.ipa` file
5. You can then manually upload this IPA to App Store Connect via the web interface

## Next Steps After Build

Once your build is in App Store Connect:

1. **Add app information** (screenshots, description, keywords) if not already done
2. **Set pricing and availability**
3. **Configure app review information**
4. **Submit for review**

The review process typically takes 24-48 hours.

## Support

If you encounter issues:

1. Check the Xcode build logs for specific error messages
2. Verify all signing credentials are correct
3. Ensure your Apple Developer account is in good standing
4. Check that your App Store Connect app is properly configured

---

**Good luck with your build! The dressMio app is ready for the App Store.** 🎉
