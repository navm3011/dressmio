# dressMio App Store Registration Guide

This guide walks you through registering and preparing the dressMio app for submission to both the Apple App Store and Google Play Store.

---

## Part 1: Apple App Store (iOS)

### Step 1: Create an Apple Developer Account

1. Go to [developer.apple.com](https://developer.apple.com)
2. Click **Account** in the top navigation
3. Click **Sign in** (or create a new Apple ID if you don't have one)
4. Enroll in the **Apple Developer Program** ($99/year)
   - Go to **Membership** → **Enroll**
   - Complete the enrollment process
   - Wait for approval (usually 24-48 hours)

### Step 2: Create an App ID

1. Go to [developer.apple.com/account](https://developer.apple.com/account)
2. Navigate to **Certificates, Identifiers & Profiles** → **Identifiers**
3. Click the **+** button to create a new identifier
4. Select **App IDs** and click **Continue**
5. Choose **App** and click **Continue**
6. Fill in the form:
   - **Description**: dressMio
   - **Bundle ID**: Use the value from `app.config.ts` → `ios.bundleIdentifier` (currently: `space.manus.smart.closet.app.t...`)
   - **Capabilities**: Enable the following:
     - Push Notifications
     - HealthKit (optional, if using fitness features)
     - HomeKit (optional)
7. Click **Continue** and **Register**

### Step 3: Create Certificates

1. Go to **Certificates, Identifiers & Profiles** → **Certificates**
2. Click the **+** button to create a new certificate
3. Select **Apple Distribution** and click **Continue**
4. Follow the prompts to create a Certificate Signing Request (CSR)
   - Open **Keychain Access** on your Mac
   - Go to **Keychain Access** → **Certificate Assistant** → **Request a Certificate from a Certificate Authority**
   - Enter your email and name, save to disk
5. Upload the CSR and download the certificate
6. Double-click the certificate to install it in Keychain

### Step 4: Create Provisioning Profiles

1. Go to **Certificates, Identifiers & Profiles** → **Profiles**
2. Click the **+** button to create a new profile
3. Select **App Store Connect** and click **Continue**
4. Select your App ID (dressMio) and click **Continue**
5. Select the certificate you just created and click **Continue**
6. Name it "dressMio Distribution" and click **Continue**
7. Download the provisioning profile

### Step 5: Create an App Store Connect Record

1. Go to [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
2. Click **My Apps** → **+** → **New App**
3. Fill in the form:
   - **Platform**: iOS
   - **Name**: dressMio
   - **Primary Language**: English
   - **Bundle ID**: Select the one you created (space.manus.smart.closet.app.t...)
   - **SKU**: dressmio-2026 (can be any unique identifier)
4. Click **Create**

### Step 6: Fill in App Information

1. On the App Store Connect page, fill in the following sections:

#### App Information
- **App Name**: dressMio
- **Subtitle**: Your AI Fashion Assistant
- **Privacy Policy URL**: (required - create one or use a template)
- **Category**: Lifestyle
- **Content Rating**: Complete the questionnaire

#### Pricing and Availability
- **Pricing Tier**: Free (or select a paid tier)
- **Availability**: Select countries where you want to distribute

#### App Privacy
- Go to **App Privacy** and fill in the privacy details
- Declare what data you collect (photos, user preferences, etc.)

#### Screenshots and Preview
- **Screenshots**: Prepare 5-6 screenshots showing key features
  - Recommended size: 1242 x 2208 px (for iPhone)
  - Show: Home screen, Add Item flow, Suggestions, Saved Outfits, Settings
- **Preview Video**: Optional 15-30 second video showing the app in action

#### Description
- **Description**: 
  ```
  dressMio is your personal AI fashion assistant. Capture your wardrobe, 
  get smart outfit suggestions, and never repeat an outfit again.
  
  Features:
  • AI-powered clothing detection and categorization
  • Smart outfit suggestions based on your style
  • Save your favorite outfit combinations
  • Professional product photos with AI background removal
  • Build your perfect digital wardrobe
  ```

#### Keywords
- Add relevant keywords: fashion, wardrobe, outfit, AI, styling, closet, clothing

#### Support URL
- Provide a support email or website

#### Version Release Notes
- Example: "Initial release of dressMio with AI outfit suggestions"

### Step 7: Build and Submit

1. Once you have your certificate and provisioning profile, build the app:
   ```bash
   eas build --platform ios --auto-submit
   ```
   (or use the Publish button in the Manus UI)

2. The build will be uploaded to App Store Connect automatically

3. Go back to App Store Connect and click **Submit for Review**

4. Answer the review questions about your app's functionality

5. Submit for review (Apple typically reviews within 24-48 hours)

---

## Part 2: Google Play Store (Android)

### Step 1: Create a Google Play Developer Account

1. Go to [play.google.com/console](https://play.google.com/console)
2. Click **Create account** (or sign in with your Google account)
3. Pay the **$25 one-time registration fee**
4. Complete your developer profile:
   - Developer name
   - Contact email
   - Website (optional)
   - Phone number

### Step 2: Create a New App

1. In Google Play Console, click **Create app**
2. Fill in the form:
   - **App name**: dressMio
   - **Default language**: English
   - **App or game**: App
   - **Free or paid**: Free (or select paid)
3. Click **Create app**

### Step 3: Fill in App Details

#### App Access
- Select **Full app** (not limited access)

#### Ads
- Indicate whether your app contains ads

#### Content Rating Questionnaire
- Complete the questionnaire for content rating
- This determines age appropriateness

#### Target Audience
- Select your target age group

#### Content
- Describe what your app does
- List key features

#### Screenshots
- Upload 5-8 screenshots (1080 x 1920 px recommended)
- Show: Home, Add Item, Suggestions, Saved Outfits, Settings

#### Feature Graphic
- Upload a 1024 x 500 px image representing your app

#### Icon
- Upload a 512 x 512 px PNG icon (this is your app icon)

#### Short Description
- Max 80 characters: "Your personal AI fashion assistant"

#### Full Description
- ```
  dressMio is your personal AI fashion assistant. Capture your wardrobe, 
  get smart outfit suggestions, and never repeat an outfit again.
  
  Features:
  • AI-powered clothing detection and categorization
  • Smart outfit suggestions based on your style
  • Save your favorite outfit combinations
  • Professional product photos with AI background removal
  • Build your perfect digital wardrobe
  ```

#### Category
- Select **Lifestyle**

#### Contact Email
- Provide a support email

### Step 4: Set Up Pricing and Distribution

1. Go to **Pricing and distribution**
2. Select **Free** (or configure pricing if paid)
3. Select countries where you want to distribute
4. Accept the Google Play Developer Program Policies

### Step 5: Create a Signing Key

1. Go to **Setup** → **App signing**
2. Google Play will generate a signing key for you automatically
3. Keep this key safe - you'll need it for future updates

### Step 6: Build and Upload

1. Build the Android app:
   ```bash
   eas build --platform android
   ```
   (or use the Publish button in the Manus UI)

2. Once the build is complete, download the AAB (Android App Bundle) file

3. In Google Play Console, go to **Release** → **Production**

4. Click **Create new release**

5. Upload the AAB file

6. Add release notes: "Initial release of dressMio"

7. Review the app details and click **Review release**

8. Click **Start rollout to Production**

### Step 7: Submit for Review

1. Google Play will review your app (typically 1-3 hours)
2. Once approved, your app will be available on Google Play Store
3. You can monitor the rollout progress in Google Play Console

---

## Important Checklist Before Submission

- [ ] App name is "dressMio" (not "Smart Closet")
- [ ] Bundle ID matches `app.config.ts` configuration
- [ ] App icon is uploaded (512x512 for Android, 1024x1024 for iOS)
- [ ] Screenshots are professional and show key features
- [ ] Description clearly explains what the app does
- [ ] Privacy policy is available and linked
- [ ] Support email is provided
- [ ] All required permissions are declared
- [ ] App has been tested on multiple devices
- [ ] No console errors or crashes
- [ ] Version number is set (currently 1.0.0 in app.config.ts)

---

## After Approval

### Monitoring
- Check reviews and ratings regularly
- Respond to user feedback
- Monitor crash reports in both app stores

### Updates
- To release updates, increment the version number in `app.config.ts`
- Build and submit the new version
- Follow the same submission process

### Analytics
- Set up Firebase Analytics or similar
- Track user engagement and retention
- Use insights to improve the app

---

## Support Resources

- **Apple**: [developer.apple.com/help](https://developer.apple.com/help)
- **Google Play**: [support.google.com/googleplay/android-developer](https://support.google.com/googleplay/android-developer)
- **Expo Docs**: [docs.expo.dev/build/setup](https://docs.expo.dev/build/setup)

---

## Questions?

If you have questions about the submission process, refer to the official documentation or contact the respective app store support teams.
