# Get Your Build IDs - Step-by-Step Guide

You need 3 pieces of information to create a TestFlight build. Follow these steps to find each one.

---

## 1. Find Your Expo Project ID

### Option A: Check eas.json

1. Open `/home/ubuntu/smart-closet-app/eas.json`
2. Look for `"projectId"` field
3. If it exists, copy the value (looks like: `abc123def456ghi789`)

### Option B: Get from Expo Dashboard

1. Go to [expo.dev](https://expo.dev)
2. Sign in with your Expo account
3. Click **Projects** (left sidebar)
4. Find **smart-closet-app** in the list
5. Click on it
6. Look at the URL: `https://expo.dev/projects/YOUR_PROJECT_ID`
7. Copy the PROJECT_ID from the URL

**Your Expo Project ID:** `_____________________`

---

## 2. Find Your Apple Developer Team ID

### Steps:

1. Go to [developer.apple.com](https://developer.apple.com)
2. Click **Account** (top right)
3. Sign in with your Apple ID
4. Click **Membership** (left sidebar)
5. Look for **Team ID** section
6. You should see something like:
   ```
   Team Name: Your Name
   Team ID: ABC123DEFG
   ```
7. Copy the **Team ID** (9-10 characters, mix of letters and numbers)

**Your Apple Developer Team ID:** `_____________________`

---

## 3. Find Your App Store Connect App ID

### Steps:

1. Go to [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
2. Sign in with your Apple ID
3. Click **My Apps** (left sidebar)
4. Click on **dressMio** app
5. Click **App Information** (left sidebar)
6. Look for **Apple ID** field
7. You should see a number like: `1234567890`
8. Copy this number

**Your App Store Connect App ID:** `_____________________`

---

## Summary

Once you have all three, provide them to me in this format:

```
Expo Project ID: [your-project-id]
Apple Team ID: [YOUR_TEAM_ID]
App Store Connect App ID: [1234567890]
```

Then I'll update your configuration and create the TestFlight build!

---

## Need Help?

If you can't find any of these:

- **Expo Project ID**: Check if you ran `eas project:create` earlier. If not, run it now: `eas project:create`
- **Apple Team ID**: Make sure you're logged into the right Apple Developer account
- **App Store Connect App ID**: Make sure you created the app in App Store Connect (see iOS_SUBMISSION_DETAILED.md)

---

**Once you have these three IDs, let me know and I'll proceed with creating your TestFlight build!**
