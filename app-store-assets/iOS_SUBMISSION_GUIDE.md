# iOS App Store Submission Guide for dressMio

## Prerequisites

### 1. Apple Developer Account
- **Cost:** $99/year
- **Sign up:** https://developer.apple.com/account
- **Enrollment:** Apple Developer Program enrollment required

### 2. Required Software
- macOS with latest Xcode
- Node.js and npm/pnpm
- Expo CLI (`npm install -g expo-cli`)
- EAS CLI (`npm install -g eas-cli`)

### 3. Apple Certificates & Provisioning
- Apple Distribution Certificate
- App Store Connect API Key (for automated builds)

---

## Step 1: Create Apple Developer Account

### 1.1 Sign Up
1. Visit https://developer.apple.com
2. Click **Account** → **Sign in**
3. Create or use existing Apple ID
4. Accept Developer Agreement

### 1.2 Enroll in Developer Program
1. Go to **Membership** → **Enroll**
2. Select **Individual** or **Organization**
3. Complete enrollment form
4. Pay $99 enrollment fee
5. Wait for approval (typically 24-48 hours)

---

## Step 2: Create App ID in Developer Portal

### 2.1 Access Developer Portal
1. Go to https://developer.apple.com/account
2. Navigate to **Certificates, Identifiers & Profiles**
3. Select **Identifiers** from left menu

### 2.2 Create App ID
1. Click **+** button to create new identifier
2. Select **App IDs** → **Continue**
3. Choose **App** → **Continue**
4. Fill in form:
   - **Description:** dressMio
   - **Bundle ID:** `com.dressmio.app` (Explicit)
   - **Capabilities:** Enable:
     - ✓ Push Notifications
     - ✓ HomeKit (optional)
5. Click **Continue** → **Register**

### 2.3 Enable Capabilities
1. Select the App ID you just created
2. Scroll to **Capabilities** section
3. Ensure these are enabled:
   - Push Notifications
   - App Groups (if needed for extensions)
   - HealthKit (if tracking fitness)

---

## Step 3: Create Distribution Certificate

### 3.1 Request Certificate Signing Request (CSR)
1. On Mac, open **Keychain Access**
2. Go to **Keychain Access** → **Certificate Assistant** → **Request a Certificate from a Certificate Authority**
3. Fill in:
   - **User Email Address:** Your Apple ID email
   - **Common Name:** Your name
   - **Request is:** Saved to disk
4. Click **Continue** → **Save**

### 3.2 Create Distribution Certificate
1. In Developer Portal, go to **Certificates**
2. Click **+** to create new certificate
3. Select **Apple Distribution** → **Continue**
4. Upload the CSR file you just created
5. Click **Continue** → **Download**
6. Double-click the certificate to install in Keychain

---

## Step 4: Create Provisioning Profile

### 4.1 Create Profile
1. In Developer Portal, go to **Profiles**
2. Click **+** to create new profile
3. Select **App Store Connect** → **Continue**
4. Select your App ID (dressMio) → **Continue**
5. Select the Distribution Certificate → **Continue**
6. Name it: `dressMio Distribution`
7. Click **Continue** → **Generate** → **Download**

### 4.2 Install Profile
1. Double-click the downloaded profile to install
2. Or drag it to Xcode

---

## Step 5: Create App Store Connect Record

### 5.1 Access App Store Connect
1. Go to https://appstoreconnect.apple.com
2. Sign in with Apple ID
3. Click **My Apps** → **+** → **New App**

### 5.2 Create App
1. Fill in form:
   - **Platform:** iOS
   - **Name:** dressMio
   - **Primary Language:** English
   - **Bundle ID:** com.dressmio.app (select from list)
   - **SKU:** dressmio-2026 (any unique identifier)
2. Click **Create**

---

## Step 6: Fill in App Information

### 6.1 App Information Section
1. **App Name:** dressMio
2. **Subtitle:** Your AI Fashion Assistant
3. **Privacy Policy URL:** [Your privacy policy URL]
4. **Category:** Lifestyle
5. **Content Rating:** Complete questionnaire (should be 4+)

### 6.2 Pricing and Availability
1. **Pricing Tier:** Free
2. **Availability:** Select countries
3. **Release Date:** Automatic or specific date

### 6.3 App Privacy
1. Click **App Privacy**
2. Fill in data collection details:
   - **Photos:** Yes (for clothing items)
   - **User ID:** No (unless using accounts)
   - **Device ID:** Yes (for analytics)
   - **Usage Data:** Yes (for improvement)
3. Declare: "We do not sell user data"

---

## Step 7: Upload Screenshots

### 7.1 Prepare Screenshots
- **Resolution:** 1242 x 2208 pixels (iPhone 6.7")
- **Format:** PNG or JPG
- **File Size:** Max 5 MB each
- **Count:** 2-5 screenshots

### 7.2 Upload Screenshots
1. In App Store Connect, go to **Screenshots**
2. Select device type (iPhone 6.7-inch)
3. Drag and drop or click to upload:
   - `01-landing-page.webp` - "Organize Your Wardrobe"
   - `02-closet-empty.webp` - "Capture Your Style"
   - `03-suggestions.webp` - "Smart Suggestions"
   - `04-saved-outfits.webp` - "Save Your Favorites"
   - `05-settings.webp` - "Manage Your Preferences"

### 7.3 Add Captions
1. For each screenshot, add caption:
   - Screenshot 1: "Organize Your Wardrobe"
   - Screenshot 2: "Capture Your Style"
   - Screenshot 3: "Smart Suggestions"
   - Screenshot 4: "Save Your Favorites"
   - Screenshot 5: "Manage Your Preferences"

---

## Step 8: Add App Description

### 8.1 Description
```
dressMio is your personal AI fashion assistant. Capture your wardrobe, 
get smart outfit suggestions, and never repeat an outfit again.

Features:
• AI-powered clothing detection and categorization
• Smart outfit suggestions based on your style
• Save your favorite outfit combinations
• Professional product photos with clean backgrounds
• Build your perfect digital wardrobe
• Track your outfit wear history
• Maximize your existing wardrobe
```

### 8.2 Keywords
```
fashion, wardrobe, outfit, AI, styling, closet, clothing, fashion assistant, outfit suggestions, wardrobe management
```

### 8.3 Support URL
```
https://dressmio.com/support
```

### 8.4 Marketing URL
```
https://dressmio.com
```

---

## Step 9: Build and Upload with EAS

### 9.1 Install EAS CLI
```bash
npm install -g eas-cli
```

### 9.2 Configure EAS
```bash
cd /home/ubuntu/smart-closet-app
eas build:configure
```

### 9.3 Build for App Store
```bash
eas build --platform ios --auto-submit
```

This command will:
1. Build the app for iOS
2. Upload to App Store Connect automatically
3. Prepare for submission

### 9.4 Alternative: Manual Build
```bash
eas build --platform ios
```

Then upload manually in App Store Connect.

---

## Step 10: Review and Submit

### 10.1 Verify Information
1. In App Store Connect, review all information
2. Check:
   - ✓ App name and subtitle
   - ✓ Screenshots and captions
   - ✓ Description and keywords
   - ✓ Privacy policy URL
   - ✓ Support URL
   - ✓ Category and content rating
   - ✓ Build uploaded and processed

### 10.2 Answer Review Questions
1. Click **Submission** section
2. Answer questions about app functionality:
   - "Does your app use encryption?" - Yes
   - "Does your app use IDFA?" - No
   - "Does your app require sign-in?" - No
   - "Does your app use location services?" - No

### 10.3 Submit for Review
1. Click **Submit for Review**
2. Select **Version** to submit
3. Confirm submission
4. Apple will review (typically 24-48 hours)

---

## Step 11: Monitor Review Status

### 11.1 Check Status
1. In App Store Connect, check **Version History**
2. Look for status:
   - **Waiting for Review** - In queue
   - **In Review** - Being reviewed
   - **Ready for Sale** - Approved! 🎉
   - **Rejected** - Fix issues and resubmit

### 11.2 If Rejected
1. Read rejection reason carefully
2. Fix the issue
3. Increment version number in `app.config.ts`
4. Rebuild and resubmit

---

## Troubleshooting

### Build Fails
- Check that all certificates are valid
- Verify Bundle ID matches App ID
- Ensure provisioning profile is installed

### App Rejected
- Common reasons:
  - Missing privacy policy
  - Broken links
  - Crashes or bugs
  - Misleading screenshots
  - Violates App Store guidelines

### Build Stuck
- Check EAS build logs: `eas build --platform ios --status`
- Contact EAS support if needed

---

## Post-Submission

### 11.1 Monitor Reviews
- Check App Store Connect daily
- Respond to user reviews
- Monitor crash reports

### 11.2 Plan Updates
- Increment version: 1.0.1, 1.0.2, etc.
- Add new features gradually
- Test thoroughly before each release

### 11.3 Analytics
- Set up App Analytics in App Store Connect
- Track downloads, crashes, ratings
- Use insights to improve app

---

## Important Notes

1. **Keep Certificates Safe:** Store certificates securely, backup to safe location
2. **Version Numbers:** Always increment for new submissions
3. **Testing:** Test on real iOS devices before submission
4. **Privacy:** Ensure privacy policy is accurate and accessible
5. **Support:** Provide working support email/URL
6. **Compliance:** Follow App Store Review Guidelines: https://developer.apple.com/app-store/review/guidelines

---

## Useful Links

- **Apple Developer:** https://developer.apple.com
- **App Store Connect:** https://appstoreconnect.apple.com
- **EAS Documentation:** https://docs.expo.dev/build/setup
- **App Store Guidelines:** https://developer.apple.com/app-store/review/guidelines
- **Certificates Help:** https://developer.apple.com/help/app-store-connect/manage-certificates

---

**Status:** Ready for submission
**Next Step:** Create Apple Developer account and start build process
