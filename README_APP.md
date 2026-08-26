# Smart Closet AI

A mobile app to organize and manage your wardrobe with AI-powered clothing categorization and outfit suggestions.

## Overview

Smart Closet AI helps you:
- **Capture & Organize**: Take photos of your clothes and automatically categorize them
- **Smart Suggestions**: Get AI-powered outfit recommendations based on your available items
- **Easy Management**: Search, filter, and organize your closet by category, color, and style
- **Flexible Storage**: Choose between local device storage or cloud sync

## Features

### 📸 Camera & Photo Integration
- Capture photos directly from your phone's camera
- Select photos from your photo library
- Automatic image compression for optimal storage

### 🤖 AI-Powered Categorization
- Automatic clothing type detection (tops, bottoms, shoes, accessories, outerwear, dresses)
- Color and style identification
- Occasion and season classification
- Confidence scoring for AI predictions
- Manual override for user corrections

### ✨ Outfit Suggestions
- AI-generated outfit combinations
- Occasion-based recommendations (casual, work, formal, date night, etc.)
- Styling tips and pairing suggestions
- Save favorite outfits for later

### 📋 Closet Management
- Grid view of all clothing items
- Search by color, style, or category
- Filter by clothing type
- Item details with AI metadata
- Add, edit, and delete items

### 💾 Storage Options
- **Local Storage**: All data stored on your device (default)
- **Cloud Storage**: Optional cloud sync for cross-device access (future)
- Automatic data persistence
- No account required for local storage

### ⚙️ Settings & Preferences
- Storage mode selection
- Data statistics
- Export functionality
- About & version info

## Getting Started

### Installation

1. **Via Expo Go** (Easiest for testing):
   - Install Expo Go from App Store
   - Scan QR code from development server
   - App opens instantly

2. **Via TestFlight** (For beta testing):
   - Receive TestFlight invite link
   - Install from App Store
   - Test on your device

3. **Via App Store** (Production):
   - Download from App Store
   - Install like any other app

### First Time Setup

1. **Grant Permissions**:
   - Camera access (to capture clothing photos)
   - Photo library access (to select existing photos)

2. **Add Your First Item**:
   - Tap the floating action button (+)
   - Choose "Take Photo" or "Choose from Library"
   - AI automatically analyzes and categorizes
   - Review and confirm category, color, size
   - Save to your closet

3. **Generate Outfit Suggestions**:
   - Go to Suggestions tab
   - Tap "Generate Outfit"
   - Browse suggestions and save favorites

## How It Works

### Adding a Clothing Item

1. Tap the **+** button on the Closet screen
2. Choose to **Take Photo** or **Choose from Library**
3. Preview the image
4. AI automatically detects:
   - Clothing category
   - Primary color
   - Style (casual, formal, sporty, etc.)
   - Suitable occasions
   - Seasonal appropriateness
5. Review AI suggestions and make adjustments if needed
6. Enter additional details (size, tags)
7. Save to your closet

### Generating Outfit Suggestions

1. Go to the **Suggestions** tab
2. Tap **Generate Outfit**
3. AI selects complementary items from your closet
4. Review the outfit combination
5. Read styling tips and occasion recommendations
6. Swipe to see more suggestions
7. Tap **Save Outfit** to bookmark favorites

### Managing Your Closet

- **Search**: Use the search bar to find items by color or style
- **Filter**: Tap category pills to filter by clothing type
- **View Details**: Tap any item to see full details and AI metadata
- **Delete**: Long-press an item to remove it

## Technical Details

### Architecture

- **Frontend**: React Native with Expo
- **Styling**: NativeWind (Tailwind CSS)
- **State Management**: React Context + AsyncStorage
- **AI**: Server-side LLM integration (Claude/GPT)
- **Storage**: AsyncStorage (local) + optional cloud DB

### Permissions

- **Camera**: Required to capture clothing photos
- **Photo Library**: Required to select existing photos
- **Storage**: Required to save app data locally

### Data Privacy

- All clothing photos stored locally on your device
- No data shared with third parties (unless cloud sync enabled)
- AI analysis happens on secure servers
- You control your data at all times

## Tips & Tricks

### For Best Results

1. **Good Lighting**: Take photos in natural light for accurate color detection
2. **Clear Background**: Photograph items on a plain background
3. **Full Item**: Show the entire garment in the photo
4. **Multiple Angles**: Add multiple photos of the same item if needed

### Organizing Your Closet

1. **Use Tags**: Add custom tags for quick filtering (e.g., "work", "weekend", "gym")
2. **Size Consistency**: Use consistent sizing (S/M/L or numeric)
3. **Seasonal**: Mark items as seasonal for better suggestions
4. **Regular Updates**: Add new items as you acquire them

### Outfit Suggestions

1. **Build Variety**: Add items from different categories for better suggestions
2. **Save Favorites**: Save outfit combinations you like
3. **Mix & Match**: Try different combinations manually
4. **Occasion Tags**: Use occasion tags for context-aware suggestions

## Troubleshooting

### Camera Not Working
- Check Settings → Smart Closet → Camera permissions
- Ensure camera is not in use by another app
- Restart the app

### Photos Not Saving
- Check available storage on your device
- Ensure photo library permissions are granted
- Try taking a new photo instead of selecting from library

### AI Not Detecting Correctly
- Ensure good lighting and clear background
- Show the entire garment
- Manually correct the category if needed
- AI improves with more examples

### Outfit Suggestions Not Generating
- Add at least 2 items to your closet (one top, one bottom)
- Ensure items are in different categories
- Check internet connection for AI processing
- Try generating again

### Data Not Syncing
- Ensure app has storage permissions
- Check available device storage
- Force close and reopen the app
- Check Settings for storage mode

## Future Features

- Cloud storage and cross-device sync
- User accounts and authentication
- Social sharing of outfits
- Weather-based outfit suggestions
- Virtual try-on with AR
- Integration with shopping apps
- Outfit history and analytics

## Support

For issues, feedback, or feature requests:
- Email: support@smartcloset.app
- Website: www.smartcloset.app
- GitHub: github.com/smartcloset/app

## Privacy Policy

See [PRIVACY.md](./PRIVACY.md) for details on how we handle your data.

## Terms of Service

See [TERMS.md](./TERMS.md) for our terms of service.

## Credits

Built with:
- React Native & Expo
- NativeWind (Tailwind CSS)
- Claude/GPT for AI
- TypeScript

## License

© 2024 Smart Closet AI. All rights reserved.

---

**Version**: 1.0.0  
**Last Updated**: February 2026  
**Platform**: iOS 13+
