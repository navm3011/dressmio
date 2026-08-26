# iOS App Store Submission - Detailed Step-by-Step Checklist

This guide provides very specific, detailed steps for submitting dressMio to the Apple App Store after you have your Apple Developer account.

**App Details:**

- **App Name**: dressMio

- **Bundle ID**: `com.dressmio.app` (Updated)

- **Deep Link Scheme**: `dressmio`

- **Version**: 1.0.0

---

## Prerequisites

- [x] Apple Developer Account (enrolled and paid $99)

- [x] Mac computer with Xcode installed

- [ ] App icon (1024x1024 PNG) - ✅ Already generated

- [ ] App screenshots (5-6 images, 1242x2208 px each)

- [ ] App description and marketing copy

- [ ] Privacy policy URL

---

## Phase 1: Create Certificates and Provisioning Profiles

### Step 1.1: Access Developer Account

- [x] Open web browser and go to [developer.apple.com](https://developer.apple.com)

- [x] Click **Account** (top right corner)

- [x] Sign in with your Apple ID

- [x] Verify you see your developer account dashboard

### Step 1.2: Create App ID

- [x] In top navigation, click **Certificates, Identifiers & Profiles**

- [x] In left sidebar, click **Identifiers**

- [x] Click **+** button (top right) to create new identifier

- [x] Select **App IDs** and click **Continue**

- [x] Select **App** (radio button) and click **Continue**

- [x] Fill in the form:

   - [x] **Description**: dressMio

   - [x] **Bundle ID**: Select **Explicit**

   - [x] **Bundle ID field**: Enter `com.dressmio.app` (UPDATED - no longer uses manus prefix)

- [x] Under **Capabilities**, check these boxes:

   - [x] Push Notifications

   - [x] HealthKit (optional)

   - [x] HomeKit (optional)

- [x] Click **Continue**

- [x] Review information and click **Register**

- [x] Verify success message appears

### Step 1.3: Create Distribution Certificate

- [x] In left sidebar, click **Certificates**

- [x] Click **+** button (top right)

- [x] Select **Apple Distribution** (for App Store distribution)

- [x] Click **Continue**

- [x] Follow instructions to create Certificate Signing Request (CSR):

   - [x] On your Mac, open **Keychain Access** (Applications → Utilities)

   - [x] Go to **Keychain Access** → **Certificate Assistant** → **Request a Certificate from a Certificate Authority**
    - [x] In dialog, enter:
    
       - [x] **User Email Address**: Your Apple ID email
    
       - [x] **Common Name**: Your name
    
       - [x] **Request is**: Select **Saved to disk**

   - [x] Click **Continue**

   - [x] Choose Desktop to save file

   - [x] Click **Save**

   - [x] Click **Done**

- [x] Back in browser, click **Choose File** and select CSR file

- [x] Click **Continue**

- [x] Click **Download** to download certificate

- [x] Double-click downloaded `.cer` file to install in Keychain

- [x] Verify success message in Keychain Access

### Step 1.4: Create Provisioning Profile

- [x] In left sidebar, click **Profiles**

- [x] Click **+** button (top right)

- [x] Select **App Store Connect** (for App Store distribution)

- [x] Click **Continue**

- [x] Select your App ID (dressMio) from dropdown

- [x] Click **Continue**

- [x] Select the certificate you just created (Apple Distribution)

- [x] Click **Continue**

- [x] Name the profile: `dressMio Distribution`

- [x] Click **Continue**

- [x] Click **Download** to download provisioning profile

- [x] Double-click downloaded `.mobileprovision` file to install

- [x] Verify success message appears

---

## Phase 2: Create App Store Connect Record

### Step 2.1: Access App Store Connect

- [x] Open web browser and go to [appstoreconnect.apple.com](https://appstoreconnect.apple.com)

- [x] Sign in with your Apple ID

- [x] Click **My Apps** (left sidebar)

### Step 2.2: Create New App

- [x] Click **+** button (top left)

- [x] Select **New App**

- [x] Fill in the form:

   - [x] **Platform**: iOS (pre-selected)

   - [x] **Name**: dressMio

   - [x] **Primary Language**: English

   - [x] **Bundle ID**: Select from dropdown: `com.dressmio.app` (UPDATED)

   - [x] **SKU**: dressmio-2026 (unique identifier)

   - [x] **User Access**: Select **Full Access**

- [x] Click **Create**

- [x] Verify you're taken to the app page

---

## Phase 3: Fill in App Information

### Step 3.1: App Information

- [x] On app page, click **App Information** (left sidebar)

- [ ] Fill in:

   - [x] **App Name**: dressMio

   - [ ] **Subtitle**: Your AI Fashion Assistant
    - [ ] **Privacy Policy URL**: (required)
    
       - [ ] Generate privacy policy from [termly.io](https://termly.io) or [privacypolicygenerator.info](https://privacypolicygenerator.info)
    
       - [ ] Create policy for mobile app that collects photos and user preferences
    
       - [ ] Host on website or free hosting service

   - [x] **Category**: Lifestyle

   - [x] **Content Rating**: Click **Edit** and complete questionnaire

- [x] Click **Save**

### Step 3.2: App Privacy

- [x] Click **App Privacy** (left sidebar)

- [x] Click **Edit** next to "Data & Privacy"

- [x] Answer questions about data collection:

   - [ ] **Photos/Videos**: Yes (users upload clothing photos)

   - [x] **User ID**: No (unless you implement user accounts)

   - [x] **Coarse Location**: No

   - [x] **Fine Location**: No

   - [x] **Search History**: No

   - [x] **Browsing History**: No

   - [x] **User Preferences**: Yes (outfit preferences, style preferences)

   - [x] **Other Data**: No

- [ ] For each "Yes" answer, indicate:

   - [ ] **Purpose**: Fashion analysis, outfit suggestions

   - [ ] **Linked to User**: No (unless you have user accounts)

   - [ ] **Tracking**: No

- [ ] Click **Save**

### Step 3.3: Pricing and Availability

- [x] Click **Pricing and Availability** (left sidebar)

- [x] **Pricing Tier**: Select **Free**

- [x] **Availability**:

   - [x] Click **Select All Countries and Regions** (or choose specific ones)

   - [x] Click **Save**

---

## Phase 4: Prepare App Store Listing

### Step 4.1: Screenshots

- [x] Click **App Preview and Screenshots** (left sidebar)

- [x] Select **iPhone 6.7-inch** (latest iPhone size)

- [x] Click **+** to add screenshots

- [x] Upload 5-6 screenshots in this order:

   - [ ] Screenshot 1: Home screen with animated logo

   - [ ] Screenshot 2: Add Item flow (camera/photo selection)

   - [ ] Screenshot 3: AI Analysis and item details

   - [ ] Screenshot 4: Outfit Suggestions screen

   - [ ] Screenshot 5: Saved Outfits/Favorites

   - [ ] Screenshot 6: Settings and profile

**Screenshot Requirements:**

- [ ] Size: 1242 x 2208 pixels

- [ ] Format: PNG or JPG

- [ ] No rounded corners (Apple adds them automatically)

### Step 4.2: Description

- [x] Click **App Description** (left sidebar)

- [x] Fill in:
    - [ ] **Description**:
    
       ```
       dressMio is your personal AI fashion assistant. Capture your wardrobe, 
       get smart outfit suggestions, and never repeat an outfit again.
       
       Key Features:
       • AI-powered clothing detection and categorization
       • Smart outfit suggestions based on your style and preferences
       • Save your favorite outfit combinations for quick access
       • Professional product photos with AI background removal
       • Build your perfect digital wardrobe
       • Get fresh outfit ideas every day
       
       How it works:
       1. Photograph your clothing items
       2. Our AI analyzes and categorizes each piece
       3. Get personalized outfit suggestions
       4. Save combinations you love
       5. Never repeat an outfit again!
       ```

   - [x] **Keywords**: fashion, wardrobe, outfit, AI, styling, closet, clothing, fashion assistant

   - [ ] **Support URL**: Your support email or website

   - [ ] **Marketing URL**: (optional) Your website or social media

### Step 4.3: Version Release Notes

- [ ] Still on App Description page, scroll down to **Version Release Notes**

- [ ] Enter:

   ```
   Welcome to dressMio! 
   
   In this first release:
   • Capture and organize your entire wardrobe
   • Get AI-powered outfit suggestions
   • Save your favorite combinations
   • Discover new ways to style your clothes
   ```

- [ ] Click **Save**

---

## Phase 5: Build and Upload to App Store

### Step 5.1: Build the App

**Option A: Using Manus UI (Recommended)**

- [ ] Go to Manus project Management UI

- [ ] Click **Publish** button (top right)

- [ ] Select **iOS** as platform

- [ ] Build will start automatically

- [ ] Wait for build to complete (usually 10-15 minutes)

- [ ] Download the IPA file

**Option B: Using EAS CLI (Command Line)**

- [ ] Run: `cd /home/ubuntu/smart-closet-app && eas build --platform ios --auto-submit`

- [ ] Wait for build to complete

- [ ] Download the IPA file

### Step 5.2: Upload to App Store Connect

**Using Transporter (Recommended):**

- [ ] On your Mac, open **Xcode**

- [ ] Go to **Xcode** → **Preferences** → **Accounts**

- [ ] Click **+** and add your Apple ID

- [ ] Download the provisioning profile

- [ ] Open **Transporter** (Applications → Transporter)

- [ ] Click **+** to add the IPA file

- [ ] Select the IPA file you downloaded from build

- [ ] Click **Deliver**

- [ ] Wait for upload to complete (usually 5-10 minutes)

- [ ] Verify success message

**Alternative: Upload via App Store Connect**

- [ ] Go to [appstoreconnect.apple.com](https://appstoreconnect.apple.com)

- [ ] Click on your app (dressMio)

- [ ] Click **TestFlight** (left sidebar)

- [ ] Click **iOS Builds**

- [ ] Click **+** to add new build

- [ ] Upload IPA file using Transporter (as described above)

---

## Phase 6: Submit for Review

### Step 6.1: Prepare for Submission

- [ ] Go to [appstoreconnect.apple.com](https://appstoreconnect.apple.com)

- [ ] Click on your app (dressMio)

- [ ] Click **App Store** (left sidebar)

- [ ] Verify all information is complete:

   - [ ] App icon uploaded

   - [ ] Screenshots uploaded (at least 2)

   - [ ] Description filled in

   - [ ] Keywords added

   - [ ] Support URL provided

   - [ ] Privacy policy URL provided

   - [ ] Build uploaded and selected

   - [ ] Content rating completed

   - [ ] Age rating set

### Step 6.2: Submit for Review

- [ ] Click **Version 1.0** (or current version) in left sidebar

- [ ] Scroll to top and click **Submit for Review**

- [ ] Form will appear asking:

   - [ ] **Export Compliance**: Select "No" (unless you use encryption)

   - [ ] **Content Rights**: Confirm you have rights to all content

   - [ ] **Advertising Identifier**: Select "No" (unless you use ads)

   - [ ] **Alcohol, Tobacco, Gambling**: Select "No"

   - [ ] **Kids Category**: Select "No"

- [ ] Click **Submit**

- [ ] Verify confirmation message appears

### Step 6.3: Monitor Review Status

- [ ] Go to **App Store** → **Version 1.0**

- [ ] Look for **Status** field:

   - [ ] **Waiting for Review**: Apple is reviewing your app

   - [ ] **In Review**: Apple is actively reviewing

   - [ ] **Ready for Sale**: Approved! Your app will appear on App Store

   - [ ] **Rejected**: Review rejection reason and resubmit

**Typical Review Timeline:**

- Submission: Immediate

- In Review: 24-48 hours

- Decision: 24-48 hours after review starts

- Total: 1-3 days usually

---

## Phase 7: After Approval

### Step 7.1: App Goes Live

- [ ] Once status shows **Ready for Sale**, your app is live on App Store

- [ ] It may take a few hours to appear in search results

- [ ] Users can now download dressMio from App Store

### Step 7.2: Monitor Performance

- [ ] Go to **Analytics** (left sidebar) to see:

   - [ ] Downloads

   - [ ] Crashes

   - [ ] User engagement

   - [ ] Ratings and reviews

### Step 7.3: Respond to Reviews

- [ ] Click **Ratings and Reviews** (left sidebar)

- [ ] Read user reviews and ratings

- [ ] Click **Reply** to respond to reviews

- [ ] Thank users for positive reviews

- [ ] Address concerns from negative reviews

---

## Troubleshooting

### Build Failed

- [ ] Check that your Bundle ID matches exactly: `com.dressmio.app`

- [ ] Verify certificate and provisioning profile are installed

- [ ] Try rebuilding from scratch

### Upload Failed

- [ ] Verify IPA file is not corrupted

- [ ] Check that you're using correct Apple ID

- [ ] Try uploading again with Transporter

### Rejected for Review

- [ ] Read the rejection reason carefully

- [ ] Common reasons:

   - [ ] Missing privacy policy

   - [ ] Unclear app purpose

   - [ ] Crashes or bugs

   - [ ] Inappropriate content

- [ ] Fix the issue and resubmit

### App Not Appearing in Search

- [ ] Wait 24-48 hours after approval

- [ ] Try searching for exact app name

- [ ] Check that your app is available in your region

---

## Important Reminders

- ⚠️ Keep your Apple ID and password secure

- ⚠️ Don't share your certificates or provisioning profiles

- ⚠️ Update your app regularly with bug fixes and new features

- ⚠️ Respond to user reviews and feedback

- ⚠️ Monitor crash reports and fix issues quickly

- ⚠️ Follow Apple's App Store Review Guidelines strictly

- ⚠️ Use correct Bundle ID: `com.dressmio.app` (UPDATED - no manus prefix)

---

## Next Steps After iOS Approval

- [ ] Submit to Google Play Store (Android) using similar process

- [ ] Promote your app on social media

- [ ] Gather user feedback and plan updates

- [ ] Monitor analytics and user engagement

- [ ] Plan future features based on user requests

---

## Support

- **Apple App Store Review Guidelines**: [developer.apple.com/app-store/review/guidelines](https://developer.apple.com/app-store/review/guidelines)

- **App Store Connect Help**: [help.apple.com/app-store-connect](https://help.apple.com/app-store-connect)

- **Expo iOS Build Docs**: [docs.expo.dev/build/setup](https://docs.expo.dev/build/setup)