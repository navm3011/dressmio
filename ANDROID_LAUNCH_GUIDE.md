# dressMio Android Launch Guide

Complete step-by-step guide to build, test, and submit dressMio to the Google Play Store.

---

## Phase 1: Generate Android APK

### Step 1.1: Trigger APK Build via Manus

1. **Go to https://manus.im** on your PC/laptop
2. **Log in** with your Manus account
3. **Open the "smart-closet-app" project**
4. **Click the Publish button** (top-right corner)
5. **Select Android** platform
6. **Click Submit**

The system will generate the APK. This typically takes 10-20 minutes.

### Step 1.2: Download the APK

Once the build completes:
1. The Manus UI will show a download link
2. **Download the APK file** to your computer
3. Save it in a safe location (you'll need it for Google Play submission)

---

## Phase 2: Set Up Google Play Developer Account

### Step 2.1: Create Developer Account

1. **Go to https://play.google.com/console**
2. **Sign in** with your Google account (or create one if needed)
3. **Pay the $25 one-time developer registration fee**
4. **Complete your developer profile**

### Step 2.2: Create New App

1. **Click "Create app"** button
2. **Fill in app details:**
   - **App name:** dressMio
   - **Default language:** English
   - **App or game:** App
   - **Free or paid:** Free
   - **Content rating:** Appropriate for all ages

---

## Phase 3: Prepare App Store Listing

### Step 3.1: App Details

**Go to "App details" section:**

1. **Short description** (80 characters max):
   ```
   AI-powered wardrobe organizer with smart outfit suggestions
   ```

2. **Full description** (4000 characters max):
   ```
   dressMio is your personal AI fashion assistant that helps you:
   
   ✨ Organize Your Wardrobe
   - Photograph clothing items and let AI automatically categorize them
   - Organize by type, color, style, and season
   - Keep track of what you own with smart tagging
   
   🎯 Get Smart Outfit Suggestions
   - AI-powered outfit combinations based on your style
   - Suggestions tailored to occasion and weather
   - Save your favorite outfits for quick access
   
   ⏰ Save Time Getting Ready
   - Browse your entire wardrobe in seconds
   - Mix and match items effortlessly
   - Never wonder "what should I wear?" again
   
   💡 Maximize Your Wardrobe
   - Discover new outfit combinations you never thought of
   - Get the most out of your existing clothes
   - Reduce decision fatigue with AI assistance
   
   Features:
   - AI-powered clothing detection and categorization
   - Smart outfit suggestions based on occasion and weather
   - Favorite outfit saving and tracking
   - Flexible storage options (local or cloud)
   - Beautiful, intuitive interface
   - Works offline
   
   Perfect for:
   - Fashion enthusiasts who want to organize their closet
   - Busy professionals who need quick outfit decisions
   - Anyone looking to maximize their wardrobe
   - Style-conscious individuals who want AI fashion advice
   ```

3. **Developer contact email:** Your email address

### Step 3.2: Screenshots

**Upload 5-8 phone screenshots (1080x1920 pixels):**

Screenshots should showcase:
1. **Landing page** - App intro and key features
2. **Camera capture** - Taking photos of clothing items
3. **AI categorization** - Items being organized by AI
4. **Closet view** - Full wardrobe display
5. **Outfit suggestions** - AI-powered outfit recommendations
6. **Saved outfits** - User's favorite combinations
7. **Item details** - Detailed view of a single item
8. **Settings** - App customization options

**Tablet screenshots (1600x2560 pixels):**

Upload 5-8 tablet screenshots showing the same features optimized for larger screens.

### Step 3.3: Content Rating

1. **Go to "Content rating"**
2. **Fill out the questionnaire:**
   - Violence: None
   - Sexual content: None
   - Profanity: None
   - Alcohol/tobacco: None
   - Gambling: None
3. **Submit for rating** - Usually approved within 24 hours

### Step 3.4: Target Audience

1. **Go to "Target audience"**
2. **Select:**
   - **Age group:** Everyone (3+)
   - **Intended users:** Fashion enthusiasts, professionals, style-conscious individuals

### Step 3.5: Privacy Policy

1. **Go to "App content"**
2. **Privacy policy URL:** `https://smartcloset-jvjzsnzp.manus.space/privacy`
3. **Data safety section:**
   - **Data collected:** Photos (clothing items), app usage data
   - **Data sharing:** Not shared with third parties
   - **Data retention:** Stored locally on device or in user's cloud account
   - **Security practices:** Encrypted storage, secure transmission

---

## Phase 4: Upload APK and Submit for Review

### Step 4.1: Upload APK

1. **Go to "Release" → "Production"**
2. **Click "Create new release"**
3. **Upload the APK file** you downloaded earlier
4. **Fill in release notes:**
   ```
   Initial release of dressMio - Your AI-powered wardrobe organizer
   
   Features:
   - AI-powered clothing detection and categorization
   - Smart outfit suggestions
   - Favorite outfit saving
   - Beautiful, intuitive interface
   ```

### Step 4.2: Review and Submit

1. **Review all app information:**
   - ✅ App name: dressMio
   - ✅ Description: Complete and accurate
   - ✅ Screenshots: 5-8 high-quality images
   - ✅ Content rating: Completed
   - ✅ Privacy policy: Provided
   - ✅ APK: Uploaded and verified

2. **Click "Submit for review"**

3. **Wait for approval** (typically 1-3 days for Android)

---

## Phase 5: Post-Launch

### Step 5.1: Monitor Review Status

1. **Go to "Release overview"**
2. **Check status:**
   - 🟡 **In review** (1-3 days)
   - 🟢 **Approved** - App goes live automatically
   - 🔴 **Rejected** - Fix issues and resubmit

### Step 5.2: Respond to User Reviews

1. **Go to "Ratings and reviews"**
2. **Respond to user feedback promptly**
3. **Address any issues or bugs reported**

### Step 5.3: Monitor Crashes and Errors

1. **Go to "Android Vitals"**
2. **Monitor:**
   - Crash rate
   - ANR (Application Not Responding) rate
   - Battery drain
   - Memory usage

---

## Troubleshooting

### APK Build Fails

**Problem:** Build fails during Manus publish process

**Solutions:**
1. Check that all required assets are in place:
   - `assets/images/icon.png`
   - `assets/images/android-icon-foreground.png`
   - `assets/images/android-icon-background.png`
2. Verify `app.config.ts` is correctly configured
3. Try building again - sometimes temporary build failures resolve on retry

### APK Upload Fails

**Problem:** "Invalid APK" or "Signature mismatch"

**Solutions:**
1. Ensure APK was generated by Manus (not manually built)
2. Check that the APK is for production, not development
3. Verify the bundle ID matches: `space.manus.smart.closet.app.t20260222214737`

### App Rejected

**Problem:** Google Play rejects the app for policy violations

**Common reasons and fixes:**
1. **Misleading description** - Ensure description accurately reflects app features
2. **Inappropriate content** - Verify no inappropriate content in screenshots or description
3. **Broken functionality** - Test all features before submission
4. **Privacy policy issues** - Ensure privacy policy URL is accessible and accurate

### Low Ratings

**Problem:** Users rate app 1-2 stars

**Common issues and fixes:**
1. **Crashes on startup** - Check Android Vitals and fix reported crashes
2. **Poor AI accuracy** - Improve AI detection with more training data
3. **Slow performance** - Optimize image processing and database queries
4. **Missing features** - Add requested features in updates

---

## Key Dates and Milestones

| Date | Milestone | Status |
|------|-----------|--------|
| 2026-06-17 | iOS submitted to App Store | ⏳ In Review |
| 2026-06-17 | Android APK generated | ⏳ Ready |
| 2026-06-17 | Google Play submission | ⏳ Pending |
| 2026-06-20 | Android approved (estimated) | ⏳ Pending |
| 2026-06-24 | iOS approved (estimated) | ⏳ Pending |

---

## Support and Resources

- **Manus Help:** https://help.manus.im
- **Google Play Console:** https://play.google.com/console
- **Google Play Policies:** https://play.google.com/about/developer-content-policy/
- **Android Developer Guide:** https://developer.android.com/distribute

---

## Next Steps

1. ✅ Generate Android APK via Manus
2. ⏳ Create Google Play Developer account
3. ⏳ Prepare app listing with screenshots
4. ⏳ Upload APK and submit for review
5. ⏳ Monitor review status and respond to feedback
6. ⏳ Launch and monitor app performance

**Estimated timeline:** 3-5 days from APK generation to live on Google Play Store
