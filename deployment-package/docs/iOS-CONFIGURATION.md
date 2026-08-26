# iOS Configuration Guide

Complete configuration reference for Smart Closet iOS deployment.

## Current Configuration

### App Details
- **App Name**: Smart Closet
- **Bundle ID**: space.manus.smart.closet.app.t20260222214737
- **Version**: 1.0.0
- **Scheme**: manus20260222214737
- **Orientation**: Portrait only

### iOS Settings
- **Tablet Support**: Enabled (supportsTablet: true)
- **Encryption**: Not used (ITSAppUsesNonExemptEncryption: false)
- **Architecture**: arm64 (64-bit only)
- **Minimum iOS Version**: 13.4 (Expo default)

## Configuration Files

### app.config.ts
Main Expo configuration file. Key iOS settings:

```typescript
ios: {
  supportsTablet: true,
  bundleIdentifier: "space.manus.smart.closet.app.t20260222214737",
  infoPlist: {
    ITSAppUsesNonExemptEncryption: false
  }
}
```

### eas.json
EAS Build configuration for iOS deployment:

```json
{
  "build": {
    "preview": {
      "ios": {
        "buildType": "simulator"
      }
    },
    "production": {
      "ios": {
        "buildType": "archive"
      }
    }
  }
}
```

## Permissions Configuration

### Camera Permission
**File**: app.config.ts (expo-build-properties plugin)

The app requests camera access for:
- Capturing clothing item photos
- Photo library access

**User Prompt**: "Allow Smart Closet to access your camera?"

### Photo Library Permission
**File**: app.config.ts (expo-build-properties plugin)

The app requests photo library access for:
- Selecting photos from device gallery
- Storing captured photos

**User Prompt**: "Allow Smart Closet to access your photos?"

### Info.plist Entries
These are automatically added by Expo:

```xml
<key>NSCameraUsageDescription</key>
<string>We need access to your camera to capture clothing photos for your closet.</string>

<key>NSPhotoLibraryUsageDescription</key>
<string>We need access to your photos to select and store clothing items.</string>

<key>NSPhotoLibraryAddOnlyUsageDescription</key>
<string>We need permission to save photos to your library.</string>
```

## Build Configuration

### Debug Build (Simulator)
```bash
npx eas build --platform ios --profile preview
```

Builds for iOS Simulator testing. Faster, smaller file size.

### Release Build (Device/TestFlight)
```bash
npx eas build --platform ios --profile production
```

Builds for physical devices and TestFlight. Signed with certificates.

## Certificate Management

### Automatic (Recommended)
Expo automatically manages certificates:
- Creates Apple Developer certificates
- Manages provisioning profiles
- Handles signing

No manual certificate management needed.

### Manual (Advanced)
If you need to manage certificates manually:

1. Create certificates in Apple Developer Account
2. Download .p8 files
3. Configure in eas.json:

```json
{
  "build": {
    "production": {
      "ios": {
        "certificateSource": "local",
        "provisioningProfileSource": "local"
      }
    }
  }
}
```

## Signing Configuration

### Automatic Signing (Default)
- Expo handles all signing
- Certificates created automatically
- Provisioning profiles managed automatically

### Manual Signing (Advanced)
Only needed if you have existing certificates:

```json
{
  "build": {
    "production": {
      "ios": {
        "certificateSource": "local",
        "provisioningProfileSource": "local",
        "signingCertificateSource": "local"
      }
    }
  }
}
```

## Minimum iOS Version

Current minimum: **iOS 13.4**

To change minimum iOS version in app.config.ts:

```typescript
ios: {
  deploymentTarget: "14.0" // Change to desired version
}
```

Supported versions:
- iOS 13.4+ (Expo default)
- iOS 14.0+
- iOS 15.0+
- iOS 16.0+

## Device Support

### Supported Devices
- iPhone 6s and later
- iPad (5th generation and later)
- iPad Air (2nd generation and later)
- iPad Pro (all models)

### Screen Sizes
- iPhone: 3.5" to 6.7"
- iPad: 7.9" to 12.9"

## Capabilities & Features

### Enabled
- ✅ Camera access
- ✅ Photo library access
- ✅ Local storage (AsyncStorage)
- ✅ Haptic feedback
- ✅ Dark mode support

### Not Enabled (Can be added)
- ❌ Push notifications
- ❌ Background processing
- ❌ HealthKit integration
- ❌ Siri shortcuts
- ❌ App Clips

## Privacy & Security

### Data Storage
- All data stored locally on device
- No cloud sync by default
- AsyncStorage for persistence
- Encrypted with device keychain

### Permissions
- Camera: Required for photo capture
- Photos: Required for library access
- Location: Not required
- Contacts: Not required
- Calendar: Not required

### Privacy Policy
Required before App Store submission:
- Explain data collection
- Describe data usage
- Specify retention period
- List third-party services

## Performance Optimization

### App Size
Current estimated size: 50-100 MB

Optimization strategies:
- Code splitting with Expo Router
- Image optimization
- Tree-shaking unused code
- Lazy loading modules

### Startup Time
Typical startup: 2-3 seconds

Optimization:
- Preload critical assets
- Minimize initial bundle
- Lazy load screens

### Memory Usage
Typical memory: 100-200 MB

Optimization:
- Image caching
- Memory cleanup
- Lazy loading lists

## Testing Configuration

### Simulator Testing
```bash
pnpm ios
```

Builds and launches iOS Simulator.

### Device Testing (TestFlight)
```bash
npx eas build --platform ios --profile preview
npx eas submit --platform ios --latest
```

Builds for device and submits to TestFlight.

### Local Device Testing
Requires Apple Developer Account:
1. Connect iPhone to Mac
2. Run: `pnpm ios`
3. Select device when prompted

## Troubleshooting

### Build Fails
```bash
# Clear cache
npx eas build --platform ios --profile preview --clear-cache

# Check logs
npx eas build:view {build-id} --logs
```

### Certificate Errors
- Ensure Apple Developer Account is active
- Check certificate expiration
- Regenerate certificates if needed

### Signing Issues
- Verify bundle ID matches App Store Connect
- Check provisioning profile
- Ensure certificate is valid

### App Crashes
- Check device logs: Xcode → Devices & Simulators
- Review crash reports in App Store Connect
- Test on simulator first

## Updating Configuration

### Change App Name
Edit `app.config.ts`:
```typescript
const env = {
  appName: "New Name",
  // ...
};
```

### Change Bundle ID
Edit `app.config.ts`:
```typescript
const bundleId = "com.yourcompany.newapp";
```

### Add New Permission
Edit `app.config.ts` and add to `infoPlist`:
```typescript
infoPlist: {
  NSLocationWhenInUseUsageDescription: "We need your location...",
}
```

### Update Minimum iOS Version
Edit `app.config.ts`:
```typescript
ios: {
  deploymentTarget: "14.0"
}
```

## Resources

- **Expo iOS Configuration**: https://docs.expo.dev/versions/latest/config/app/
- **Apple Developer**: https://developer.apple.com
- **App Store Connect**: https://appstoreconnect.apple.com
- **EAS Build Docs**: https://docs.expo.dev/build/introduction/

## Support

For issues:
1. Check Expo documentation
2. Review build logs: `npx eas build:view {build-id} --logs`
3. Check App Store Connect for rejection reasons
4. Contact Expo support: https://expo.dev/support
