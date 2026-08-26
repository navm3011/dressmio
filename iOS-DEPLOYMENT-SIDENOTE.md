# iOS Deployment Side Notes - Quick Reference

**Project**: Smart Closet AI  
**Bundle ID**: `space.manus.smart.closet.app.t20260222214737`  
**Version**: 1.0.0  
**Platform**: iOS 13.4+  
**Status**: Ready for Deployment

---

## 📋 Complete Deployment Checklist

### Phase 1: Apple Developer Setup ⏳ (WAITING)
- [ ] Apple Developer Account created
- [ ] Membership purchased ($99/year)
- [ ] **⏳ WAITING: Membership status shows "Pending"**
  - Check: https://developer.apple.com/account → Membership
  - Wait for status to change to "Active" (24-48 hours)
  - You'll receive email confirmation when ready
- [ ] Once Active: Proceed to Phase 2

### Phase 2: App Store Connect Setup (After membership is active)
- [ ] Log in to https://appstoreconnect.apple.com
- [ ] Click "Apps" → "+" → "New App"
- [ ] Fill in form:
  - Platform: **iOS**
  - Name: **Smart Closet**
  - Primary Language: **English**
  - Bundle ID: **Create new** → `space.manus.smart.closet.app.t20260222214737`
  - SKU: `smartcloset-2026`
- [ ] Click "Create"

### Phase 3: App Information (App Store Connect)
- [ ] **General Tab**:
  - Name: Smart Closet
  - Subtitle: AI-Powered Closet Manager
  - Category: Lifestyle or Shopping
  - Content Rating: Complete questionnaire
- [ ] **App Preview & Screenshots**:
  - App Icon: 1024×1024 PNG (from `assets/images/icon.png`)
  - Screenshots: 2-5 images (1170×2532 pixels)
    - Show closet, AI categorization, suggestions, wear history
- [ ] **Description**:
  - Up to 4,000 characters
  - Explain features and benefits
- [ ] **Keywords**:
  - `closet, fashion, outfit, AI, wardrobe`
- [ ] **Support URL**:
  - Your support website or email
- [ ] **Privacy Policy URL** ⚠️ REQUIRED:
  - Must be valid HTTPS URL
  - Use: https://www.privacypolicygenerator.info/ (free)

### Phase 4: Verify Bundle ID Match
- [ ] Check `app.config.ts`:
  ```typescript
  const bundleId = "space.manus.smart.closet.app.t20260222214737";
  ```
- [ ] Check App Store Connect:
  - App Information → Bundle ID
  - Must match exactly (with Team ID prefix)
- [ ] ✅ If they match, proceed to Phase 5

### Phase 5: Build for TestFlight
```bash
cd /home/ubuntu/smart-closet-app
npx eas login                              # Use Expo account
npx eas build --platform ios --profile preview
```
- ⏱️ Wait 15-20 minutes for build to complete
- ✅ You'll get a build URL when done

### Phase 6: Submit to TestFlight
```bash
npx eas submit --platform ios --latest
```
- ⏱️ Wait 5-30 minutes for submission
- ✅ App will appear in TestFlight

### Phase 7: Test on Real Device
- [ ] Accept TestFlight invite email
- [ ] Install app on iPhone
- [ ] Test all features:
  - [ ] Add clothing items
  - [ ] AI categorization works
  - [ ] Generate outfit suggestions
  - [ ] Check wear history
  - [ ] Test settings and data clear
  - [ ] No crashes or errors
- [ ] Report any bugs

### Phase 8: Submit for App Store Review
- [ ] Go to App Store Connect
- [ ] Click "Submit for Review"
- [ ] Answer compliance questions:
  - Export compliance: No
  - Advertising ID: No
  - Encryption: No
- [ ] Click "Submit"
- [ ] ⏱️ Wait 24-48 hours for Apple review

### Phase 9: Launch on App Store
- [ ] Once approved, click "Release"
- [ ] Choose release date (automatic or manual)
- [ ] App becomes available to all users
- [ ] 🎉 Success!

---

## 🔑 Key Information

| Item | Value |
|------|-------|
| **App Name** | Smart Closet |
| **Bundle ID** | space.manus.smart.closet.app.t20260222214737 |
| **Version** | 1.0.0 |
| **Min iOS** | 13.4 |
| **Tablet Support** | Yes |
| **Dark Mode** | Yes |
| **Team ID** | {Your Team ID - shown in App Store Connect} |

---

## 📱 Screenshots Needed (1170×1024 pixels each)

1. **Closet Screen**: Show clothing items grid
2. **AI Categorization**: Show item details with AI-detected categories
3. **Outfit Suggestions**: Show generated outfit recommendations
4. **Wear History**: Show outfit wear tracking
5. **Settings**: Show app features and options

**How to capture:**
```bash
npx expo run:ios
# In Simulator: Device → Screenshot (or Cmd+S)
```

---

## 🔐 Privacy Policy Template

```
Privacy Policy for Smart Closet

Last Updated: [Today's Date]

1. Data Collection
Smart Closet collects photos of clothing items 
you capture through the camera or select from 
your photo library.

2. Data Usage
All data is stored locally on your device. 
We do not collect, transmit, or store your 
data on external servers.

3. Permissions
- Camera: To capture clothing photos
- Photos: To access your photo library
- No location tracking
- No personal data collection

4. Third-Party Services
Smart Closet does not use third-party 
analytics or data sharing services.

5. Contact
For privacy questions: [your email]
```

**Generate online**: https://www.privacypolicygenerator.info/

---

## 🚨 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| **Membership shows "Pending"** | Wait 24-48 hours for Apple to activate |
| **Bundle ID mismatch error** | Verify `app.config.ts` matches App Store Connect |
| **Build fails** | Run `npx eas build --platform ios --profile preview --clear-cache` |
| **Submission fails** | Check all required fields in App Store Connect are filled |
| **App crashes on device** | Test in simulator first, check device logs |
| **Screenshots rejected** | Use correct size (1170×2532) and show app features clearly |

---

## ⏱️ Timeline Estimate

| Phase | Duration | Notes |
|-------|----------|-------|
| Membership activation | 24-48 hours | Currently waiting |
| App Store Connect setup | 30 minutes | One-time setup |
| Build for TestFlight | 15-20 minutes | First build slower |
| TestFlight submission | 5-30 minutes | Automatic |
| Testing on device | 1-3 days | Recommended |
| App Store review | 24-48 hours | Apple's process |
| **Total** | **2-4 days** | From now to App Store |

---

## 🔗 Important Links

| Resource | URL |
|----------|-----|
| **App Store Connect** | https://appstoreconnect.apple.com |
| **Apple Developer Account** | https://developer.apple.com/account |
| **Membership Status** | https://developer.apple.com/account → Membership |
| **EAS Build Docs** | https://docs.expo.dev/build/introduction/ |
| **Expo Submit Docs** | https://docs.expo.dev/build/submit/ |
| **Privacy Policy Generator** | https://www.privacypolicygenerator.info/ |

---

## 📞 Support Resources

- **Expo Support**: https://expo.dev/support
- **Apple Developer Support**: https://developer.apple.com/support
- **App Store Connect Help**: https://help.apple.com/app-store-connect
- **Deployment Package**: `/home/ubuntu/smart-closet-app/deployment-package/`

---

## ✅ Pre-Deployment Verification

Before each phase, verify:

```bash
# Check app builds locally
cd /home/ubuntu/smart-closet-app
pnpm run check                    # TypeScript check
pnpm run build                    # Build check

# Verify configuration
grep "bundleId" app.config.ts     # Check Bundle ID
grep "appName" app.config.ts      # Check app name
```

---

## 🎯 Success Criteria

Your deployment is successful when:

✅ Membership status shows "Active"  
✅ App created in App Store Connect  
✅ Bundle ID matches app.config.ts  
✅ All app information filled in  
✅ App builds without errors  
✅ App submits to TestFlight successfully  
✅ App installs on physical iPhone  
✅ All features work as expected  
✅ No crashes or errors occur  
✅ App approved by Apple  
✅ App available on App Store  

---

## 📝 Next Steps

**Right Now:**
1. ⏳ Wait for Apple Developer membership to activate (check status in 24 hours)
2. 📖 Review deployment documentation in `deployment-package/docs/`
3. 📸 Prepare app screenshots and description

**When Membership is Active:**
1. Create app in App Store Connect
2. Fill in all app information
3. Build for TestFlight
4. Test on real device
5. Submit for App Store review

---

**Last Updated**: April 27, 2026  
**Status**: Waiting for Apple Developer Membership Activation  
**Next Action**: Check membership status in 24 hours
