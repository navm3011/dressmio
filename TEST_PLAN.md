# dressMio App - Comprehensive Test Plan

**Date:** May 22, 2026  
**Version:** 1.0.0  
**Platform:** iOS (Expo Go)  
**Tester:** Automated Test Suite

---

## Test Scope

This document outlines comprehensive testing for the dressMio app covering:
- Core navigation and UI stability
- Item upload and AI categorization
- Outfit generation with various scenarios
- Filtering and search functionality
- Edge cases and error handling
- Performance and memory management

---

## Test Environment

- **Device:** iOS (via Expo Go)
- **Expo SDK:** 54
- **React Native:** 0.81.5
- **Test Images:** 5 sample clothing items (tops, bottoms, shoes)
- **Network:** Connected to dev server

---

## Test Cases

### Phase 1: Navigation & UI Stability

#### Test 1.1: App Launch
- [ ] App launches without crashes
- [ ] Landing page displays correctly with logo and feature cards
- [ ] All 4 feature cards visible and readable
- [ ] Tab bar appears at bottom with all tabs

#### Test 1.2: Tab Navigation
- [ ] Home tab loads landing page
- [ ] Closet tab shows empty state initially
- [ ] Suggestions tab shows empty state initially
- [ ] Settings tab loads without errors
- [ ] Can switch between tabs without crashes

#### Test 1.3: Landing Page Features
- [ ] "Why dressMio?" benefits section displays all 4 items
- [ ] Feature cards have proper styling and spacing
- [ ] "Add Item" button navigates to add-item screen
- [ ] "Generate Outfit" button shows appropriate message (no items)

#### Test 1.4: Navigation Back Buttons
- [ ] Back button works from Add Item screen
- [ ] Back button works from Item Detail screen
- [ ] Back button works from Settings screen
- [ ] No navigation context errors in console

---

### Phase 2: Item Upload & AI Categorization

#### Test 2.1: Add Item Flow
- [ ] Tap "Add Item" button opens add-item screen
- [ ] Camera/Photo picker options appear
- [ ] Can select photo from library
- [ ] Photo preview displays correctly
- [ ] Can confirm photo selection

#### Test 2.2: AI Categorization - Single Item
- [ ] Upload blue t-shirt image
- [ ] AI correctly identifies as "Top"
- [ ] AI detects color as "Blue"
- [ ] AI detects material (cotton or similar)
- [ ] AI detects style (casual)
- [ ] Confidence score displays

#### Test 2.3: AI Categorization - Various Items
- [ ] White blouse → Top, White, Linen, Professional
- [ ] Black jeans → Bottom, Black, Denim, Casual
- [ ] Gray trousers → Bottom, Gray, Wool, Formal
- [ ] White sneakers → Shoe, White, Canvas, Casual

#### Test 2.4: Item Details Display
- [ ] Item appears in closet grid after save
- [ ] Item thumbnail displays correctly
- [ ] Tap item opens detail view
- [ ] Detail view shows all AI-detected metadata
- [ ] Detail view shows image in full size
- [ ] Back button closes detail view

#### Test 2.5: Multiple Items
- [ ] Upload 5 different items
- [ ] All items appear in closet grid
- [ ] Grid displays items in organized layout
- [ ] Scroll through grid without lag
- [ ] All items have correct metadata

---

### Phase 3: Outfit Generation

#### Test 3.1: Single Item Outfit
- [ ] Upload only blue t-shirt
- [ ] Go to Suggestions tab
- [ ] Tap "Generate Outfit"
- [ ] App handles single item gracefully
- [ ] Shows message or outfit with single item
- [ ] No crashes or errors

#### Test 3.2: Two Items Outfit
- [ ] Upload blue t-shirt + black jeans
- [ ] Generate outfit
- [ ] Outfit shows top (blue t-shirt) + bottom (black jeans)
- [ ] Outfit description is stylish (not generic "blue top + black bottom")
- [ ] Outfit is wearable combination

#### Test 3.3: Complete Wardrobe Outfit
- [ ] Upload all 5 items
- [ ] Generate outfit
- [ ] Outfit includes top, bottom, and shoes
- [ ] Outfit description is creative and specific
- [ ] Outfit is color-coordinated and stylish

#### Test 3.4: Occasion-Based Filtering
- [ ] Generate outfit for "Casual"
- [ ] Generate outfit for "Business"
- [ ] Generate outfit for "Formal"
- [ ] Generate outfit for "Athletic"
- [ ] Each occasion produces different outfit suggestions
- [ ] Outfits match the occasion appropriately

#### Test 3.5: Multiple Outfit Generations
- [ ] Generate outfit 1
- [ ] Generate outfit 2 (should be different)
- [ ] Generate outfit 3 (should be different)
- [ ] App doesn't repeat same outfit consecutively
- [ ] All generated outfits are valid

---

### Phase 4: Filtering & Search

#### Test 4.1: Category Filters
- [ ] Filter by "Tops" shows only tops
- [ ] Filter by "Bottoms" shows only bottoms
- [ ] Filter by "Shoes" shows only shoes
- [ ] Filter by "All" shows all items
- [ ] Filter buttons are clickable and responsive

#### Test 4.2: Color Filters
- [ ] Filter by "Blue" shows blue items
- [ ] Filter by "Black" shows black items
- [ ] Filter by "White" shows white items
- [ ] Filter by "Gray" shows gray items
- [ ] Color filter works with category filter

#### Test 4.3: Multi-Filter Combinations
- [ ] Filter: Tops + Blue → shows blue tops only
- [ ] Filter: Bottoms + Black → shows black bottoms only
- [ ] Filter: Shoes + White → shows white shoes only
- [ ] Filters can be combined and cleared

#### Test 4.4: Search Functionality
- [ ] Search for "shirt" finds t-shirt
- [ ] Search for "jeans" finds black jeans
- [ ] Search for "pants" finds gray trousers
- [ ] Search for "shoes" finds sneakers
- [ ] Search is case-insensitive

#### Test 4.5: Empty Filter Results
- [ ] Filter for non-existent color shows empty state
- [ ] Empty state displays helpful message
- [ ] Can clear filters to see all items again

---

### Phase 5: Edge Cases & Error Handling

#### Test 5.1: Empty States
- [ ] Closet empty state displays correctly
- [ ] Suggestions empty state displays correctly
- [ ] Empty state messages are helpful
- [ ] Can navigate to add items from empty state

#### Test 5.2: Network Issues
- [ ] App handles slow network gracefully
- [ ] Loading spinner displays during AI analysis
- [ ] Timeout handling if AI takes too long
- [ ] Error message if AI request fails

#### Test 5.3: Image Issues
- [ ] Very small image upload (< 100KB)
- [ ] Very large image upload (> 5MB)
- [ ] Corrupted image handling
- [ ] Unsupported image format handling

#### Test 5.4: Memory & Performance
- [ ] Closet grid scrolls smoothly with 5+ items
- [ ] No lag when switching between tabs
- [ ] No memory leaks after multiple operations
- [ ] App doesn't crash with rapid interactions

#### Test 5.5: Data Persistence
- [ ] Items persist after app restart
- [ ] Saved outfits persist after app restart
- [ ] Settings persist after app restart
- [ ] Clear data button works correctly

#### Test 5.6: UI Edge Cases
- [ ] Very long item names display correctly
- [ ] Very long outfit descriptions display correctly
- [ ] Landscape orientation (if supported)
- [ ] Notch/safe area handling on iPhone X+

---

### Phase 6: Settings & User Preferences

#### Test 6.1: Settings Screen
- [ ] Settings tab loads without errors
- [ ] All settings options visible
- [ ] Dark mode toggle works (if implemented)
- [ ] Clear data button works

#### Test 6.2: Clear Data
- [ ] Tap "Clear Data"
- [ ] Confirmation dialog appears
- [ ] Confirm clears all items and outfits
- [ ] Closet shows empty state after clear
- [ ] App doesn't crash after clear

---

### Phase 7: Saved Outfits

#### Test 7.1: Save Outfit
- [ ] Generate outfit
- [ ] Tap "Save Outfit" button
- [ ] Outfit appears in Saved Outfits list
- [ ] Saved outfit shows creation date

#### Test 7.2: Manage Saved Outfits
- [ ] View saved outfits list
- [ ] Delete saved outfit
- [ ] "Wear This Outfit" updates wear count
- [ ] Wear statistics display correctly

---

## Test Results Summary

| Phase | Test Cases | Passed | Failed | Notes |
|-------|-----------|--------|--------|-------|
| 1. Navigation | 4 | - | - | |
| 2. Item Upload | 5 | - | - | |
| 3. Outfit Generation | 5 | - | - | |
| 4. Filtering & Search | 5 | - | - | |
| 5. Edge Cases | 6 | - | - | |
| 6. Settings | 2 | - | - | |
| 7. Saved Outfits | 2 | - | - | |
| **TOTAL** | **29** | - | - | |

---

## Known Issues & Bugs

(To be filled during testing)

---

## Recommendations

(To be filled after testing)

---

## Sign-Off

- **Tested By:** Automated Test Suite
- **Date:** May 22, 2026
- **Status:** PENDING

