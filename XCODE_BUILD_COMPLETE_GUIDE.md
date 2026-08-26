# Complete Xcode Build Guide for dressMio App

## System Requirements
- **Xcode**: 15.4 ✅ (You have this - perfect!)
- **macOS**: 12.0 or later
- **Apple Developer Account**: Required for signing
- **Signing Certificate**: Distribution certificate from Apple Developer

---

## Step 1: Prepare Your Project

Before opening Xcode, make sure your project is clean and ready.

```bash
cd /path/to/smart-closet-app

# Clean any previous builds
rm -rf ios/Pods ios/Podfile.lock

# Install pods (CocoaPods dependencies)
cd ios
pod install --repo-update
cd ..

# Go back to project root
cd /path/to/smart-closet-app
```

**Expected Output**: Pod installation should complete without errors.

---

## Step 2: Open Xcode Workspace

**IMPORTANT**: Open the `.xcworkspace` file, NOT the `.xcodeproj` file.

```bash
open ios/dressMio.xcworkspace
```

This will launch Xcode with your project loaded.

---

## Step 3: Configure Signing & Capabilities

### 3.1: Select the Project

In Xcode's left panel (Project Navigator):
1. Click on **dressMio** (the project, not the folder)
2. You should see the project settings panel on the right

### 3.2: Select the Target

In the **Targets** section:
1. Click on **dressMio** (the target)
2. Go to the **Signing & Capabilities** tab

### 3.3: Configure Signing

1. **Team**: Select your Apple Developer Team from the dropdown
   - If you don't see your team, you may need to add your Apple ID to Xcode:
     - **Xcode** → **Settings** → **Accounts**
     - Click **+** and add your Apple ID

2. **Bundle Identifier**: Should be `com.dressmio.app`
   - If it shows something different, change it to `com.dressmio.app`

3. **Signing Certificate**: 
   - Xcode should automatically select "Automatically manage signing"
   - This will use your distribution certificate

4. **Provisioning Profile**: 
   - Should show something like "iOS Team Provisioning Profile: com.dressmio.app"
   - If it shows an error, click "Fix Issue" and Xcode will create it automatically

### 3.4: Verify Signing

Check that:
- ✅ Team is selected
- ✅ Bundle Identifier is `com.dressmio.app`
- ✅ Provisioning Profile shows no errors
- ✅ Signing Certificate is available

---

## Step 4: Select Build Configuration

1. At the top of Xcode, click the scheme dropdown (next to the play button)
2. Select **dressMio** (if not already selected)
3. Next to it, select **Any iOS Device (arm64)** from the device dropdown

**This ensures you're building for physical iOS devices, not the simulator.**

---

## Step 5: Build the Archive

### 5.1: Start the Archive Process

1. Click **Product** in the top menu
2. Select **Archive**

Xcode will now:
- Compile your app
- Link dependencies
- Create an archive file
- This takes 5-15 minutes depending on your Mac

**You'll see a progress indicator at the top of Xcode.**

### 5.2: Wait for Completion

The build will show:
- ✅ Compiling Swift files
- ✅ Linking
- ✅ Creating archive

When complete, the **Organizer** window will automatically open showing your archive.

---

## Step 6: Export the IPA

### 6.1: Distribute the App

In the Organizer window that opened:

1. You should see your archive listed (e.g., "dressMio 2026-05-28 15:30")
2. Click on it to select it
3. Click the **Distribute App** button

### 6.2: Select Distribution Method

A dialog will appear asking how you want to distribute:

1. Select **App Store Connect** (for App Store submission)
2. Click **Next**

### 6.3: Select Signing Options

1. Choose **Automatically manage signing**
2. Click **Next**

### 6.4: Review & Export

1. Review the app details (should show dressMio, bundle ID, etc.)
2. Click **Export**
3. Choose a location to save the IPA file
   - Recommendation: Save to your Desktop for easy access
   - Filename will be something like: `dressMio.ipa`

**The IPA file is now ready for App Store submission!**

---

## Step 7: Verify the IPA

After exporting, verify the file was created:

```bash
ls -lh ~/Desktop/dressMio.ipa
```

You should see something like:
```
-rw-r--r--  1 user  staff  45M May 28 15:35 ~/Desktop/dressMio.ipa
```

The file size should be 30-100 MB depending on your app.

---

## Step 8: Submit to App Store Connect

### 8.1: Upload to App Store Connect

You have two options:

**Option A: Using Xcode (Easiest)**
1. In the Organizer window, select your archive
2. Click **Distribute App**
3. Follow the steps to upload directly to App Store Connect

**Option B: Using Transporter (Manual)**
1. Download Apple's Transporter app from the App Store
2. Open Transporter
3. Drag and drop your `dressMio.ipa` file
4. Sign in with your Apple ID
5. Click **Deliver**

### 8.2: Wait for Processing

Apple will process your app:
- Initial processing: 5-10 minutes
- App Review: 24-48 hours typically

---

## Troubleshooting

### Issue: "No signing certificate found"

**Solution**:
1. Go to **Xcode** → **Settings** → **Accounts**
2. Click your Apple ID
3. Click **Manage Certificates**
4. Click **+** to create a new certificate
5. Select **iOS Distribution**
6. Click **Create**

### Issue: "Code signing identity not found"

**Solution**:
1. In Xcode, go to **Product** → **Clean Build Folder** (Cmd+Shift+K)
2. Try building again

### Issue: "Pod install failed"

**Solution**:
```bash
cd ios
rm -rf Pods Podfile.lock
pod install --repo-update
cd ..
```

### Issue: "Archive failed - Build errors"

**Solution**:
1. Go to **Product** → **Clean Build Folder** (Cmd+Shift+K)
2. Try archiving again
3. If still failing, check the build log for specific errors

### Issue: "Provisioning profile doesn't include the com.apple.developer.associated-domains capability"

**Solution**:
1. In Xcode, go to **Signing & Capabilities**
2. Click **+ Capability**
3. Search for "Associated Domains"
4. Add it if needed

---

## Build Time Estimates

- **First build**: 10-15 minutes (downloading dependencies)
- **Subsequent builds**: 5-10 minutes
- **Archive creation**: 2-5 minutes
- **IPA export**: 1-2 minutes

**Total time**: 15-25 minutes for first build

---

## What Happens Next

After exporting the IPA:

1. **App Review**: Apple reviews your app (24-48 hours)
2. **Approval**: If approved, your app appears on the App Store
3. **Release**: You can set the release date (immediate or scheduled)

---

## Important Notes

- ✅ Your bundle ID is: `com.dressmio.app`
- ✅ Your app name is: `dressMio`
- ✅ Your App Store Connect App ID is: `6771671395`
- ✅ Xcode 15.4 is fully compatible
- ✅ This creates a production-ready, signed IPA

---

## Need Help?

If you encounter issues:

1. Check the **Issue Navigator** (left panel, warning icon)
2. Read the error messages carefully
3. Try **Product** → **Clean Build Folder** and rebuild
4. Check Apple's documentation: https://developer.apple.com/documentation/xcode

Good luck with your build! 🚀
