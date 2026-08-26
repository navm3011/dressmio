# Android Google Play Submission Guide for dressMio

## Prerequisites

### 1. Google Play Developer Account
- **Cost:** $25 one-time fee
- **Sign up:** https://play.google.com/console
- **Requirements:** Google account

### 2. Required Software
- Node.js and npm/pnpm
- Expo CLI (`npm install -g expo-cli`)
- EAS CLI (`npm install -g eas-cli`)
- Java Development Kit (JDK)

### 3. Android Keystore
- Signing key for app signing
- EAS can manage this automatically

---

## Step 1: Create Google Play Developer Account

### 1.1 Sign Up
1. Visit https://play.google.com/console
2. Click **Create account**
3. Sign in with Google account (create if needed)
4. Accept Developer Agreement
5. Pay $25 registration fee

### 1.2 Complete Developer Profile
1. Fill in developer information:
   - Developer name
   - Email address
   - Website (optional)
   - Phone number
2. Accept terms and conditions
3. Complete payment

### 1.3 Set Up Two-Factor Authentication
1. Go to **Account settings**
2. Enable 2FA on Google account
3. Recommended for security

---

## Step 2: Create App in Google Play Console

### 2.1 Create New App
1. In Google Play Console, click **Create app**
2. Fill in form:
   - **App name:** dressMio
   - **Default language:** English
   - **App or game:** App
   - **Free or paid:** Free
3. Click **Create app**

### 2.2 Fill in App Details
1. Go to **App details**
2. Fill in:
   - **Short description:** "Your personal AI fashion assistant" (80 chars max)
   - **Full description:** (see metadata document)
   - **App category:** Lifestyle
   - **Content rating:** Complete questionnaire

### 2.3 Complete Content Rating
1. Go to **Content rating**
2. Answer questionnaire:
   - Violence: No
   - Sexual content: No
   - Profanity: No
   - Alcohol/Tobacco: No
   - Gambling: No
3. Submit and receive rating

---

## Step 3: Upload Screenshots

### 3.1 Prepare Screenshots
- **Resolution:** 1080 x 1920 pixels
- **Format:** PNG or JPG
- **File Size:** Max 8 MB each
- **Count:** 2-8 screenshots (minimum 2)

### 3.2 Upload Screenshots
1. Go to **Screenshots** in app listing
2. Select device type (Phone)
3. Upload 5 screenshots:
   - `01-landing-page.webp` - "Organize Your Wardrobe"
   - `02-closet-empty.webp` - "Capture Your Style"
   - `03-suggestions.webp` - "Smart Suggestions"
   - `04-saved-outfits.webp` - "Save Your Favorites"
   - `05-settings.webp` - "Manage Your Preferences"

### 3.3 Upload Feature Graphic
1. Go to **Feature graphic**
2. Upload promotional image:
   - **Resolution:** 1024 x 500 pixels
   - **Format:** PNG or JPG
   - Shows app's key features

---

## Step 4: Add App Description

### 4.1 Short Description
```
Your personal AI fashion assistant
```

### 4.2 Full Description
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

### 4.3 Keywords
```
fashion, wardrobe, outfit, AI, styling, closet, clothing, fashion assistant, outfit suggestions, wardrobe management
```

### 4.4 Contact Information
- **Support email:** support@dressmio.com
- **Support website:** https://dressmio.com/support
- **Privacy policy:** [Your privacy policy URL]

---

## Step 5: Configure App Signing

### 5.1 Use EAS for Signing (Recommended)
EAS handles signing automatically. No manual configuration needed.

### 5.2 Manual Signing (Advanced)
If managing your own keystore:
1. Create keystore file
2. Store securely
3. Configure in EAS

---

## Step 6: Build for Google Play

### 6.1 Install EAS CLI
```bash
npm install -g eas-cli
```

### 6.2 Configure EAS
```bash
cd /home/ubuntu/smart-closet-app
eas build:configure
```

### 6.3 Build for Android
```bash
eas build --platform android --release
```

This creates an Android App Bundle (AAB) ready for Play Store.

### 6.4 Download Build
1. Wait for build to complete
2. Download the `.aab` file
3. Save for upload

---

## Step 7: Create Release

### 7.1 Create Production Release
1. In Google Play Console, go to **Releases**
2. Click **Create new release**
3. Select **Production** track
4. Click **Create release**

### 7.2 Upload App Bundle
1. In release form, click **Browse files**
2. Select the `.aab` file downloaded from EAS
3. Click **Upload**
4. Wait for processing (usually 5-10 minutes)

### 7.3 Review Release Information
1. **Release name:** Version 1.0.0
2. **Release notes:**
```
Welcome to dressMio! 🎉

Features in this release:
• Capture and organize your wardrobe with AI-powered categorization
• Get personalized outfit suggestions for any occasion
• Save your favorite outfit combinations
• Manage your digital closet with an intuitive interface
• Dark mode support for comfortable viewing
• Responsive design for all device sizes
```

---

## Step 8: Review and Submit

### 8.1 Verify Information
1. Review all app information:
   - ✓ App name and description
   - ✓ Screenshots and feature graphic
   - ✓ Keywords and category
   - ✓ Privacy policy
   - ✓ Support contact
   - ✓ Content rating
   - ✓ App bundle uploaded

### 8.2 Check Compliance
1. Go to **App content**
2. Answer questions:
   - "Does your app collect personal data?" - Yes
   - "Does your app have ads?" - No
   - "Does your app use location?" - No
   - "Does your app use camera?" - Yes
   - "Does your app use photos?" - Yes

### 8.3 Submit for Review
1. Click **Review release**
2. Review all information
3. Click **Start rollout to Production**
4. Confirm submission

---

## Step 9: Monitor Review Status

### 9.1 Check Status
1. In Google Play Console, go to **Releases**
2. Check release status:
   - **Preparing release** - Processing
   - **In review** - Being reviewed
   - **Completed** - Live on Play Store! 🎉

### 9.2 Review Timeline
- Google Play typically reviews within 1-3 hours
- Much faster than Apple App Store
- Usually approved on first submission

### 9.3 If Rejected
1. Read rejection reason
2. Fix the issue
3. Increment version number
4. Rebuild and resubmit

---

## Step 10: Post-Launch Monitoring

### 10.1 Monitor Reviews
1. In Google Play Console, go to **Reviews**
2. Read user feedback
3. Respond to reviews
4. Address issues quickly

### 10.2 Monitor Crashes
1. Go to **Crashes and ANRs**
2. Check for crash reports
3. Fix critical issues
4. Release updates

### 10.3 Monitor Ratings
1. Track app rating over time
2. Aim to maintain 4.0+ stars
3. Respond to negative reviews
4. Improve based on feedback

---

## Troubleshooting

### Build Fails
- Check Java version compatibility
- Verify Android SDK is installed
- Check EAS build logs

### Upload Fails
- Ensure AAB file is not corrupted
- Check file size (must be under 150 MB)
- Verify bundle ID matches

### App Rejected
- Common reasons:
  - Broken links
  - Missing privacy policy
  - Crashes on test devices
  - Violates Play Store policies
  - Misleading screenshots

### App Not Appearing
- May take 2-3 hours to appear in search
- Check if app is live in "Releases" section
- Verify it's not geo-restricted

---

## Useful Links

- **Google Play Console:** https://play.google.com/console
- **EAS Documentation:** https://docs.expo.dev/build/setup
- **Play Store Policies:** https://play.google.com/about/developer-content-policy
- **Android Guidelines:** https://developer.android.com/distribute
- **Content Rating Guide:** https://support.google.com/googleplay/android-developer/answer/188189

---

## Important Notes

1. **Keep Keystore Safe:** Store signing key securely, never share
2. **Version Numbers:** Always increment for new releases
3. **Testing:** Test on real Android devices before submission
4. **Privacy:** Ensure privacy policy is accurate and accessible
5. **Support:** Provide working support email/URL
6. **Compliance:** Follow Play Store policies and guidelines

---

## Quick Comparison: iOS vs Android

| Aspect | iOS | Android |
|--------|-----|---------|
| **Account Cost** | $99/year | $25 one-time |
| **Review Time** | 24-48 hours | 1-3 hours |
| **Screenshot Size** | 1242 x 2208 | 1080 x 1920 |
| **Complexity** | Higher | Lower |
| **Approval Rate** | ~90% | ~95% |

---

**Status:** Ready for submission
**Next Step:** Create Google Play Developer account and start build process
