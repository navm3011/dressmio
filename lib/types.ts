/**
 * Data models and types for Smart Closet AI
 */

export type ClothingCategory = 'tops' | 'bottoms' | 'shoes' | 'accessories' | 'outerwear' | 'dresses';

export type Season = 'spring' | 'summer' | 'fall' | 'winter' | 'all-season';

export type Occasion = 'casual' | 'work' | 'business' | 'formal' | 'date-night' | 'gym' | 'weekend' | 'party' | 'athletic' | 'brunch' | 'dinner' | 'travel';

/**
 * Represents a single clothing item in the closet
 */
export interface ClothingItem {
  id: string;
  imageUri: string; // Local file path or S3 URL
  category: ClothingCategory;
  specificType: string; // e.g., "cotton t-shirt", "leather boots"
  color: string; // e.g., "blue", "navy blue", "multi-color"
  material?: string; // e.g., "cotton", "polyester", "leather"
  style: string; // e.g., "casual", "formal", "sporty"
  fit?: string; // e.g., "slim", "regular", "oversized"
  pattern?: string; // e.g., "solid", "striped", "floral"
  size?: string; // e.g., "M", "L", "10"
  season: Season;
  occasion: Occasion[];
  tags: string[]; // User-defined tags
  condition: 'new' | 'good' | 'fair' | 'worn'; // Item condition
  aiDetected: boolean; // Whether category was AI-detected
  aiMetadata?: {
    confidence: number; // 0-1 confidence score
    detectedCategory: ClothingCategory;
    detectedColor: string;
    detectedStyle: string;
    detectedMaterial?: string;
    detectedPattern?: string;
    detectedFit?: string;
  };
  createdAt: number; // Timestamp
  updatedAt: number; // Timestamp
}

/**
 * Represents wear history for an outfit
 */
export interface OutfitWearHistory {
  wornAt: number; // Timestamp when outfit was worn
  weather?: string; // Weather condition when worn
  temperature?: number; // Temperature when worn
  occasion?: string; // What the outfit was worn for
  notes?: string; // User notes about wearing it
}

/**
 * Represents a saved outfit combination
 */
export interface SavedOutfit {
  id: string;
  name?: string; // Optional user-given name
  items: {
    top?: string; // ClothingItem ID
    bottom?: string; // ClothingItem ID
    shoes?: string; // ClothingItem ID
    accessories?: string[]; // Array of ClothingItem IDs
    outerwear?: string; // ClothingItem ID
  };
  occasion?: Occasion;
  season?: Season;
  notes?: string; // User notes about the outfit
  rating?: number; // 1-5 rating
  wearHistory: OutfitWearHistory[]; // History of times this outfit was worn
  wearCount: number; // Total times worn
  lastWornAt?: number; // Timestamp of last time worn
  createdAt: number;
  updatedAt: number;
}

/**
 * Represents a generated outfit suggestion
 */
export interface OutfitSuggestion {
  id: string;
  items: {
    top?: ClothingItem;
    bottom?: ClothingItem;
    shoes?: ClothingItem;
    accessories?: ClothingItem[];
    outerwear?: ClothingItem;
  };
  occasion?: Occasion;
  season?: Season;
  reason?: string; // Why this outfit was suggested (descriptive name/style)
  score?: number; // Compatibility score
  tips?: string; // Styling tips for the outfit
  style?: string; // Style of the outfit
}

/**
 * Weather data for outfit suggestions
 */
export interface WeatherData {
  condition: string; // e.g., "sunny", "rainy", "snowy", "cloudy"
  temperature: number; // Temperature in Celsius
  humidity?: number; // Humidity percentage
  windSpeed?: number; // Wind speed in km/h
  feelsLike?: number; // Feels like temperature in Celsius
  location?: string; // Location name
  timestamp: number; // Timestamp of weather data
}

/**
 * Storage configuration
 */
export type StorageType = 'local' | 'cloud';

export interface StorageConfig {
  type: StorageType;
  lastSync?: number; // Timestamp of last sync
  syncInProgress: boolean;
}

/**
 * App state for closet data
 */
export interface ClosetState {
  items: ClothingItem[];
  savedOutfits: SavedOutfit[];
  storage: StorageConfig;
  weather?: WeatherData; // Current weather for suggestions
  loading: boolean;
  error?: string;
}
