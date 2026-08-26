# Testing dressMio Before App Store Submission

Once you have your signed IPA, there are multiple ways to test it before submitting to the App Store. This guide covers all testing options.

## Testing Options (Choose One or More)

### Option 1: TestFlight (Recommended - Most Realistic)

TestFlight is Apple's official beta testing platform. It's the closest to the real App Store experience.

#### Setup:
1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Select "My Apps" → "dressMio"
3. Click "TestFlight" in the left sidebar
4. Click "+" to add a new build
5. Select your IPA file and upload it
6. Fill in the required information:
   - **Build Number**: Must be higher than previous builds (e.g., 1.0.0)
   - **What to Test**: Describe what you want testers to focus on
   - **Test Information**: Any special instructions

#### Testing:
1. Add yourself as a tester (or other testers)
2. You'll receive an email with a TestFlight link
3. Install the app on your iPhone via TestFlight
4. Test all features:
   - Photo capture and upload
   - AI categorization
   - Outfit suggestions
   - Favorites functionality
   - Settings and preferences
5. Report any bugs or issues

#### Advantages:
- ✅ Most realistic testing environment
- ✅ Tests actual app signing and provisioning
- ✅ Tests push notifications and background features
- ✅ Can test on multiple devices
- ✅ Apple reviews TestFlight builds before they're available to testers

---

### Option 2: Direct Installation on Your iPhone (Fastest)

If you have a Mac and your iPhone, you can install the IPA directly without TestFlight.

#### Setup:
1. Connect your iPhone to your Mac
2. Open Xcode on your Mac
3. Go to **Window** → **Devices and Simulators**
4. Select your iPhone
5. Drag and drop the IPA file onto the device window
   - OR use: `xcrun xcode-select --install` then `xcrun devicectl device install app <path-to-ipa>`

#### Testing:
- Same as TestFlight, but faster
- Useful for quick testing before TestFlight submission

#### Advantages:
- ✅ Fastest way to test
- ✅ No waiting for App Store Connect processing
- ✅ Direct control over installation

#### Disadvantages:
- ❌ Only works with a Mac and connected iPhone
- ❌ Can't easily share with other testers

---

### Option 3: App Store Sandbox Testing (For In-App Purchases)

If your app has in-app purchases, use the Sandbox environment.

#### Setup:
1. Create a Sandbox Apple ID at [App Store Connect](https://appstoreconnect.apple.com)
   - Go to **Users and Access** → **Sandbox Testers**
   - Click "+" to add a new tester
2. Sign out of your regular Apple ID on your iPhone
3. Sign in with the Sandbox Apple ID

#### Testing:
- Test in-app purchases without being charged
- All transactions are simulated

---

## What to Test (Checklist)

### Core Functionality
- [ ] App launches without crashes
- [ ] All screens load properly
- [ ] Navigation between tabs works smoothly
- [ ] Buttons and interactive elements respond correctly

### Photo Capture & Upload
- [ ] Camera access permission works
- [ ] Photos can be captured
- [ ] Photos upload successfully
- [ ] Upload progress indicator shows
- [ ] Photos appear in the closet

### AI Features
- [ ] AI categorization works
- [ ] Categories are accurate
- [ ] Suggestions load properly
- [ ] Suggestions are relevant

### User Experience
- [ ] App is responsive (no freezing)
- [ ] Text is readable on all screen sizes
- [ ] Colors and branding look correct
- [ ] No console errors or warnings

### Performance
- [ ] App doesn't use excessive battery
- [ ] App doesn't use excessive data
- [ ] App handles slow network gracefully
- [ ] App recovers from network disconnections

### Edge Cases
- [ ] Works with no internet connection (if offline mode is implemented)
- [ ] Works with low storage space
- [ ] Works with low battery
- [ ] Handles large photo libraries

---

## Common Issues to Check For

### Crashes
- **What to look for**: App closes unexpectedly
- **How to debug**: Check Xcode console or TestFlight crash reports
- **Common causes**: Unhandled errors, missing permissions, memory leaks

### Performance Issues
- **What to look for**: App is slow, laggy, or freezes
- **How to debug**: Use Xcode Instruments to profile performance
- **Common causes**: Large images not optimized, inefficient rendering, blocking operations

### Permission Issues
- **What to look for**: Camera, photo library, or other features don't work
- **How to debug**: Check Info.plist permissions and test on a fresh install
- **Common causes**: Missing NSCameraUsageDescription, NSPhotoLibraryUsageDescription

### Network Issues
- **What to look for**: Data doesn't load, uploads fail
- **How to debug**: Test on WiFi and cellular, use network throttling
- **Common causes**: Timeout issues, CORS errors, SSL certificate problems

---

## TestFlight Testing Timeline

1. **Upload IPA** (5-10 minutes)
   - App Store Connect processes your build

2. **Apple Review** (1-2 hours)
   - Apple reviews the TestFlight build for compliance
   - Usually automatic, but may be delayed

3. **Available to Testers** (Immediate after approval)
   - Testers receive email and can install via TestFlight

4. **Testing Period** (Recommended: 3-7 days)
   - Gather feedback and identify issues
   - Fix bugs and prepare for production submission

5. **Production Submission** (When ready)
   - Submit the same build to production
   - Or upload a new build if you made changes

---

## After Testing - Preparing for Production

### If You Found Bugs:
1. Fix the bugs in your code
2. Rebuild the app locally
3. Create a new IPA with incremented build number
4. Upload the new IPA to TestFlight
5. Repeat testing

### If Everything Works:
1. Go to App Store Connect
2. Select "My Apps" → "dressMio"
3. Click "Releases" → "Create a Release"
4. Select your tested build
5. Add release notes, screenshots, and description
6. Submit for App Store review

---

## Recommended Testing Checklist

Before submitting to the App Store, ensure:

- [ ] App launches without crashes
- [ ] All core features work (photo capture, AI categorization, suggestions)
- [ ] App is responsive and performant
- [ ] Tested on at least one real iPhone (not just simulator)
- [ ] Tested on both WiFi and cellular networks
- [ ] Tested with low battery and low storage
- [ ] All permissions are requested and working
- [ ] No console errors or warnings
- [ ] App follows Apple's Human Interface Guidelines
- [ ] App follows Apple's App Store Review Guidelines

---

## Resources

- [TestFlight Documentation](https://developer.apple.com/testflight/)
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Xcode Debugging Guide](https://developer.apple.com/documentation/xcode/debugging)
