# Building dressMio iOS App on Your Mac

Due to Apple's security requirements, the distribution certificate setup must be done interactively. Here's how to complete the build on your Mac:

## Prerequisites

- Mac with Node.js and npm installed
- Expo CLI: `npm install -g eas-cli`
- Your Expo personal access token
- Your Apple ID and app-specific password

## Step-by-Step Instructions

### 1. Download and Extract the Project

Download the project checkpoint and extract it to your Mac:

```bash
# Extract the project
unzip smart-closet-app.zip
cd smart-closet-app
```

### 2. Set Your Expo Token

```bash
export EXPO_TOKEN="your-expo-personal-access-token"
```

Replace `your-expo-personal-access-token` with the token you created at https://expo.dev/accounts/[username]/settings/tokens

### 3. Start the EAS Build

```bash
eas build --platform ios --profile production
```

### 4. Follow the Interactive Prompts

The CLI will ask you several questions:

**Q: "Do you want to log in to your Apple account?"**
- Answer: `Y` (yes)

**Q: "Apple ID:"**
- Enter your Apple ID email address

**Q: "Password:"**
- Enter your app-specific password (NOT your regular Apple password)
- Generate one at: https://appleid.apple.com/account/security

**Q: "Team ID:"** (if asked)
- This is your Apple Developer Team ID
- Find it at: https://developer.apple.com/account

### 5. Wait for the Build

The build will take 10-20 minutes. You'll see:

```
✔ Build queued...
✔ Build started...
✔ Build in progress...
✔ Build complete!
```

### 6. Download Your IPA

Once complete, EAS will provide a download link for your signed IPA file.

You can also check the build status at:
https://expo.dev/accounts/navneetmalik/projects/dressMio/builds

## Important Notes

- **App-Specific Password**: You MUST use an app-specific password, not your regular Apple password
- **Distribution Certificate**: EAS will automatically create and manage this for you
- **Provisioning Profile**: EAS will automatically create this for you
- **App Store Connect**: The app is already configured with App Store Connect ID: `6771671395`

## Next Steps After Build

Once you have the signed IPA:

1. Go to App Store Connect: https://appstoreconnect.apple.com
2. Click "My Apps" → "dressMio"
3. Click "TestFlight" or "Releases" (for production)
4. Click "+" to add a new build
5. Upload the IPA file
6. Fill in the required information (screenshots, description, etc.)
7. Submit for review

## Troubleshooting

**"Invalid username and password"**
- Double-check your Apple ID email
- Make sure you're using an app-specific password, not your regular password

**"Distribution Certificate is not validated"**
- This is normal on first build - EAS will validate it
- Make sure you're in interactive mode (not running in CI/automation)

**"Team ID not found"**
- Get your Team ID from: https://developer.apple.com/account
- It's usually a 10-character alphanumeric code

## Questions?

For more help, see:
- Expo EAS Build docs: https://docs.expo.dev/build/
- Apple Developer docs: https://developer.apple.com/help/app-store-connect/
