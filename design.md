# Smart Closet AI - Mobile App Design

## Overview
Smart Closet AI is a mobile-first iOS app that helps users organize and manage their wardrobe using AI-powered categorization and outfit suggestions. Users can capture photos of clothing items, and the app automatically categorizes them and provides intelligent outfit recommendations.

## Design Principles
- **Mobile Portrait (9:16)**: All screens designed for single-handed usage on iPhone
- **Apple Human Interface Guidelines (HIG)**: Native iOS feel with familiar patterns
- **Minimal Cognitive Load**: Simple, intuitive navigation with clear visual hierarchy
- **AI-Powered, Not AI-Focused**: AI features work seamlessly in the background

## Screen List

### 1. **Onboarding Screen**
- Welcome message with app purpose
- Storage preference selection (Local vs. Cloud)
- "Get Started" button to proceed to main app

### 2. **Home Screen (Closet Overview)**
- Tab bar with three main sections: Closet, Suggestions, Settings
- Grid view of all clothing items (3 columns)
- Floating action button (FAB) to add new item
- Search/filter bar at top
- Statistics badge (e.g., "42 items")

### 3. **Add Item Screen**
- Camera capture button (primary action)
- Photo library picker button
- Bottom sheet with options: "Take Photo" or "Choose from Library"
- After photo selection: preview with edit/confirm buttons

### 4. **Item Details Screen**
- Large image display
- AI-detected category (e.g., "Blue Denim Jeans")
- Editable fields: category, color, size, season, condition
- Tags (e.g., "casual", "work", "formal")
- Delete button
- "Add to Outfit" button

### 5. **Suggestions Screen**
- "Generate Outfit" button (primary action)
- Outfit cards showing:
  - Top item
  - Bottom item
  - Accessories
  - Occasion label (e.g., "Casual Friday", "Date Night")
- Swipe to see more suggestions
- "Save Outfit" button on each card

### 6. **Saved Outfits Screen**
- List of saved outfit combinations
- Each card shows outfit preview (3-item grid)
- Tap to view full details or delete

### 7. **Settings Screen**
- Storage preference toggle (Local/Cloud)
- Cloud sync status
- About app
- Feedback/Help

## Primary Content and Functionality

### Home Screen (Closet)
- **Content**: Grid of clothing item thumbnails
- **Functionality**:
  - Tap item to view details
  - Long-press to delete
  - Search by category, color, or tags
  - Filter by category (tops, bottoms, shoes, accessories)

### Add Item Flow
- **Content**: Camera preview or photo library
- **Functionality**:
  - Capture photo with camera
  - Select from photo library
  - AI automatically categorizes the item
  - User can edit/confirm category before saving

### Suggestions Screen
- **Content**: AI-generated outfit combinations
- **Functionality**:
  - Generate new outfit based on available items
  - Filter by occasion (casual, work, formal, date night)
  - Filter by season (spring, summer, fall, winter)
  - Save favorite outfits
  - View saved outfits history

### Settings Screen
- **Content**: Storage and app preferences
- **Functionality**:
  - Toggle between local and cloud storage
  - View storage usage
  - Export/backup data
  - Clear app data

## Key User Flows

### Flow 1: Add a New Clothing Item
1. User taps FAB on Home screen
2. Presented with "Take Photo" or "Choose from Library" options
3. Captures/selects photo
4. App shows AI-detected category (e.g., "Blue Denim Jeans")
5. User can edit category, color, size, tags
6. User taps "Save"
7. Item appears in closet grid

### Flow 2: Generate Outfit Suggestion
1. User navigates to Suggestions tab
2. Taps "Generate Outfit"
3. App selects complementary items from closet
4. Shows outfit card with top, bottom, accessories
5. User can swipe for more suggestions
6. User taps "Save Outfit" to bookmark
7. Outfit saved to Saved Outfits section

### Flow 3: Manage Storage
1. User goes to Settings
2. Sees current storage mode (Local/Cloud)
3. Toggles to switch between Local and Cloud
4. If switching to Cloud, prompted to sign in or create account
5. Data syncs based on selection

## Color Choices

### Brand Colors
- **Primary**: `#0a7ea4` (Teal Blue) - Trust, sophistication
- **Accent**: `#FF6B6B` (Coral Red) - Action buttons, highlights
- **Success**: `#22C55E` (Green) - Confirmations, saved items
- **Warning**: `#F59E0B` (Amber) - Warnings, cautions

### Neutral Colors
- **Background**: `#ffffff` (Light) / `#151718` (Dark)
- **Surface**: `#f5f5f5` (Light) / `#1e2022` (Dark)
- **Text Primary**: `#11181C` (Light) / `#ECEDEE` (Dark)
- **Text Secondary**: `#687076` (Light) / `#9BA1A6` (Dark)
- **Border**: `#E5E7EB` (Light) / `#334155` (Dark)

### Category Colors (for visual organization)
- **Tops**: `#3B82F6` (Blue)
- **Bottoms**: `#8B5CF6` (Purple)
- **Shoes**: `#EC4899` (Pink)
- **Accessories**: `#F59E0B` (Amber)
- **Outerwear**: `#6366F1` (Indigo)

## Interaction Patterns

### Buttons
- **Primary Action**: Teal background, white text, rounded corners
- **Secondary Action**: Border only, teal text
- **Destructive**: Red background (delete, clear)

### Cards
- Subtle shadow on light mode
- Rounded corners (12px)
- Tap feedback: slight opacity change

### Lists
- Use FlatList for performance
- Pull-to-refresh on Home screen
- Infinite scroll on Suggestions

### Modals/Sheets
- Bottom sheet for camera/photo picker
- Modal for item details
- Confirmation dialogs for destructive actions

## Accessibility
- Minimum touch target: 44x44pt
- Color contrast ratio: 4.5:1 for text
- VoiceOver support for all interactive elements
- Large text support (up to 200%)
