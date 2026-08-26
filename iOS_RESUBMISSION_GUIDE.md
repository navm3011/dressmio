# iOS Resubmission Guide — Corrected 1.0 Release

Complete guide to generate and resubmit dressMio to the Apple App Store with the Apple-requested permission-string fix.

> **Current authoritative status:** See [`IOS_RELEASE_STATUS.md`](./IOS_RELEASE_STATUS.md) first. The correction uses App Store version `1.0.8` and requires a new, higher iOS build number. A completed build is not the same as a TestFlight upload.

---

## What Changed in the corrected 1.0 release

**Fixed Issues:**
- ✅ Added descriptive NSCameraUsageDescription explaining why the app needs camera access
- ✅ Added descriptive NSPhotoLibraryUsageDescription explaining why the app needs photo library access
- ✅ Added NSPhotoLibraryAddUsageDescription for saving outfit photos
- ✅ All permission strings now comply with Apple's Guideline 5.1.1(ii)

**Permission Strings Added:**

```
NSCameraUsageDescription: "dressMio uses your camera to photograph clothing items in your wardrobe. For example, you can take a photo of a shirt, and our AI will automatically detect the item type, color, and style to organize it in your digital closet."

NSPhotoLibraryUsageDescription: "dressMio accesses your photo library to let you select existing photos of clothing items. For example, you can choose a photo of jeans from your library, and we'll add it to your wardrobe collection for outfit planning."

NSPhotoLibraryAddUsageDescription: "dressMio saves outfit photos to your library so you can share your favorite combinations with friends or keep them as reference."
```

---

## Step 1: Generate the corrected iOS 1.0 build

### Option A: Local EAS build on macOS (recommended)

Run the preflight commands in [`IOS_RELEASE_STATUS.md`](./IOS_RELEASE_STATUS.md), then create the signed IPA locally. Do not use `--auto-submit` until the IPA has been verified:

```bash
npx --yes eas-cli@latest build \
  --platform ios \
  --profile production \
  --local
```

### Option B: Manual archive with Xcode

If you have access to a Mac:

1. **Install Xcode** (if not already installed)
2. **Open Terminal** and navigate to the project:
   ```bash
   cd /path/to/smart-closet-app
   ```

3. **Install EAS CLI** (if not already installed):
   ```bash
   npm install -g eas-cli
   ```

4. **Log in to your Expo account:**
   ```bash
   eas login
   ```

5. **Build for iOS locally:**
   ```bash
   npx --yes eas-cli@latest build --platform ios --profile production --local
   ```

6. **Follow the prompts:**
   - Select the production profile
   - Use existing signing credentials when offered
   - Verify the generated IPA
   - Upload it separately through Xcode Organizer, Transporter, or `eas submit`

---

## Step 2: Monitor Build Status

### Via Manus Dashboard

1. **Go to https://manus.im**
2. **Open the smart-closet-app project**
3. **Check the build status** in the Management UI
4. **Wait for "Build Complete" status**

### Via App Store Connect

1. **Go to https://appstoreconnect.apple.com**
2. **Go to "My Apps" → "dressMio"**
3. **Check "App Store" tab**
4. **Look for the new corrected build under version 1.0.8**
5. **Wait for processing to finish** before adding the build to TestFlight or selecting it for App Review

---

## Step 3: Submit for Review

Once the build is available in App Store Connect:

1. **Log into App Store Connect:** https://appstoreconnect.apple.com
2. **Go to "My Apps" → "dressMio"**
3. **Click "App Store" tab**
4. **Scroll to "Build" section**
5. **Select the corrected build under version 1.0.8**
6. **Click "Select a build before you submit your app"**
7. **Choose the new processed build from the list**
8. **Scroll to top and click "Submit for Review"**
9. **Review the submission details:**
   - ✅ App name: dressMio
   - ✅ Version: 1.0.8
   - ✅ Build: higher than the previously uploaded build
   - ✅ Permission strings: Updated
10. **Click "Submit"**
11. **Confirm submission** in the dialog

---

## Step 4: Add Submission Information

Before submitting, you may need to provide:

### Export Compliance

1. **Question:** "Does your app use encryption?"
   - **Answer:** No (unless you're using HTTPS, which is standard)

### Content Rating

1. **Verify content rating is correct:**
   - Age group: Everyone (3+)
   - No violence, sexual content, profanity, etc.

### Advertising Identifier (IDFA)

1. **Question:** "Does your app use the Advertising Identifier?"
   - **Answer:** No

---

## Step 5: Wait for Review

**Timeline:**
- ⏳ **Submitted** - Your app is queued for review
- ⏳ **In Review** - Apple is reviewing your app (typically 1-2 days)
- ✅ **Approved** - Your app is approved and will go live
- ❌ **Rejected** - Apple found issues; you'll receive detailed feedback

**Check Status:**
1. Go to App Store Connect
2. Go to "My Apps" → "dressMio"
3. Check the status under "App Store" tab
4. You'll receive an email when the review is complete

---

## Step 6: Post-Approval

### If Approved ✅

1. **Your app goes live** on the App Store automatically
2. **Share the App Store link:**
   ```
   https://apps.apple.com/app/dressmio/id[YOUR_APP_ID]
   ```
3. **Announce the launch** on social media
4. **Monitor user reviews** and ratings

### If Rejected ❌

1. **Read the rejection reason** carefully
2. **Fix the issues** mentioned by Apple
3. **Increment version** to 1.0.2
4. **Generate new build** and resubmit
5. **Repeat until approved**

---

## Troubleshooting

### Build Fails During Generation

**Problem:** Build fails in Manus or EAS

**Solutions:**
1. Check that all required files are in place
2. Verify `app.config.ts` is correctly formatted
3. Ensure no TypeScript errors in the project
4. Try building again - sometimes temporary failures resolve on retry
5. Contact Manus support if issue persists

### Build Doesn't Appear in App Store Connect

**Problem:** Build completes but doesn't show in App Store Connect

**Solutions:**
1. Wait 30-60 minutes (processing delay is normal)
2. Refresh App Store Connect page
3. Check that the build version matches (1.0.8)
4. Verify your Apple ID has access to the app
5. Check email for any build processing errors

### App Rejected Again

**Problem:** App rejected for the same or different reason

**Solutions:**
1. Read the rejection reason carefully
2. Fix the specific issue mentioned
3. Test thoroughly before resubmitting
4. Consider requesting a review from Apple if you disagree with the rejection
5. Contact Manus support if you need help understanding the rejection

### Permission Strings Still Insufficient

**Problem:** Apple rejects again saying permission strings are insufficient

**Solutions:**
1. Make the permission strings even more specific and detailed
2. Include concrete examples of how the permission is used
3. Explain the user benefit clearly
4. Avoid generic or vague language
5. Reference Apple's guidelines on permission strings

---

## Key Dates

| Event | Date | Status |
|-------|------|--------|
| Original 1.0.0 submission | 2026-06-17 | ❌ Rejected |
| Apple permission strings fixed | 2026-07-05 | ✅ Complete |
| Corrected 1.0.8 build reported successful | 2026-08-26 | ✅ Confirmed by user |
| 1.0.8 upload to App Store Connect/TestFlight | Not recorded | ⏳ Verify in App Store Connect |
| 1.0.8 resubmission for review | Not recorded | ⏳ Pending |

---

## Important Notes

### Apple Review Guidelines

- **Guideline 5.1.1(ii)** - Permission strings must clearly explain why the app needs access
- **Guideline 1.1** - Apps must be functional and not crash
- **Guideline 2.1** - Apps must not be misleading
- **Guideline 3.1** - Apps must comply with all applicable laws

### Best Practices

1. **Be specific** - Explain exactly how the permission is used
2. **Be clear** - Use simple, understandable language
3. **Be honest** - Don't overstate or misrepresent functionality
4. **Test thoroughly** - Ensure all features work before submitting
5. **Respond promptly** - If Apple has questions, respond quickly

---

## Support Resources

- **Manus Help:** https://help.manus.im
- **Apple App Store Review Guidelines:** https://developer.apple.com/app-store/review/guidelines/
- **App Store Connect Help:** https://help.apple.com/app-store-connect/
- **Expo Documentation:** https://docs.expo.dev/

---

## Next Steps

1. ✅ Apple-requested permission descriptions verified
2. ✅ Generate a corrected 1.0.8 iOS build with a higher build number
3. ⏳ Verify whether the 1.0.8 build was uploaded to App Store Connect/TestFlight
4. ⏳ Select the uploaded 1.0.8 build and submit it for review
5. ⏳ Monitor review status

**Estimated timeline:** 1-2 days from build generation to app approval
