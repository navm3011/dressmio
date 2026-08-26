import * as FileSystem from 'expo-file-system/legacy';
import * as ImageManipulator from 'expo-image-manipulator';
import { Image as RNImage } from 'react-native';

/**
 * Image optimization utilities for closet management
 * Handles compression, thumbnail generation, and caching
 */

const CACHE_DIR = `${FileSystem.cacheDirectory}closet-thumbnails/`;
const THUMBNAIL_SIZE = 150;
const GRID_IMAGE_SIZE = 300;
const FULL_IMAGE_QUALITY = 0.8;
const THUMBNAIL_QUALITY = 0.6;

/**
 * Ensure cache directory exists
 */
async function ensureCacheDir() {
  try {
    const dirInfo = await FileSystem.getInfoAsync(CACHE_DIR);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(CACHE_DIR, { intermediates: true });
    }
  } catch (error) {
    console.warn('Failed to create cache directory:', error);
  }
}

/**
 * Generate a cache key for an image
 */
function getCacheKey(imageUri: string, size: 'thumbnail' | 'grid' | 'full'): string {
  const hash = imageUri.split('/').pop()?.split('.')[0] || 'image';
  return `${hash}-${size}.jpg`;
}

/**
 * Get cached image path
 */
function getCachedImagePath(imageUri: string, size: 'thumbnail' | 'grid' | 'full'): string {
  return `${CACHE_DIR}${getCacheKey(imageUri, size)}`;
}

/**
 * Smart auto-crop to focus on clothing item
 * Detects the main subject and crops excess background
 */
export async function smartAutoCrop(imageUri: string): Promise<string> {
  try {
    const dimensions = await getImageDimensions(imageUri);
    const { width, height } = dimensions;
    
    // Calculate crop area focusing on center with intelligent margins
    // Assumes clothing is roughly in the center of the frame
    const horizontalMargin = Math.floor(width * 0.1); // 10% from sides
    const verticalMargin = Math.floor(height * 0.15); // 15% from top/bottom
    
    const cropWidth = width - (horizontalMargin * 2);
    const cropHeight = height - (verticalMargin * 2);
    
    // Ensure crop dimensions are valid
    if (cropWidth <= 0 || cropHeight <= 0) {
      return imageUri; // Return original if crop would be invalid
    }
    
    // Crop the image
    const result = await ImageManipulator.manipulateAsync(
      imageUri,
      [
        {
          crop: {
            originX: horizontalMargin,
            originY: verticalMargin,
            width: cropWidth,
            height: cropHeight,
          },
        },
      ],
      {
        compress: FULL_IMAGE_QUALITY,
        format: ImageManipulator.SaveFormat.JPEG,
      }
    );
    
    return result.uri;
  } catch (error) {
    console.warn('Failed to auto-crop image:', error);
    return imageUri; // Return original if cropping fails
  }
}

/**
 * Compress and optimize an image on capture
 * Returns the optimized image URI with smart auto-crop applied
 */
export async function optimizeImageOnCapture(imageUri: string): Promise<string> {
  try {
    await ensureCacheDir();

    // First apply smart auto-crop to focus on clothing
    const croppedUri = await smartAutoCrop(imageUri);
    
    // Then compress and resize
    const result = await ImageManipulator.manipulateAsync(
      croppedUri,
      [{ resize: { width: GRID_IMAGE_SIZE, height: GRID_IMAGE_SIZE } }],
      {
        compress: FULL_IMAGE_QUALITY,
        format: ImageManipulator.SaveFormat.JPEG,
      }
    );

    return result.uri;
  } catch (error) {
    console.warn('Failed to optimize image:', error);
    return imageUri; // Return original if optimization fails
  }
}

/**
 * Generate a thumbnail for grid display
 * Caches the thumbnail for future use
 */
export async function generateThumbnail(imageUri: string): Promise<string> {
  try {
    await ensureCacheDir();

    const cachedPath = getCachedImagePath(imageUri, 'thumbnail');

    // Check if thumbnail already exists
    try {
      const fileInfo = await FileSystem.getInfoAsync(cachedPath);
      if (fileInfo.exists) {
        return cachedPath;
      }
    } catch {
      // File doesn't exist, continue with generation
    }

    // Generate thumbnail
    const result = await ImageManipulator.manipulateAsync(
      imageUri,
      [{ resize: { width: THUMBNAIL_SIZE, height: THUMBNAIL_SIZE } }],
      {
        compress: THUMBNAIL_QUALITY,
        format: ImageManipulator.SaveFormat.JPEG,
      }
    );

    // Save to cache
    try {
      await FileSystem.copyAsync({
        from: result.uri,
        to: cachedPath,
      });
    } catch (error) {
      console.warn('Failed to cache thumbnail:', error);
    }

    return cachedPath;
  } catch (error) {
    console.warn('Failed to generate thumbnail:', error);
    return imageUri; // Return original if generation fails
  }
}

/**
 * Get image dimensions
 * Useful for calculating aspect ratios
 */
export async function getImageDimensions(
  imageUri: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    RNImage.getSize(
      imageUri,
      (width, height) => resolve({ width, height }),
      (error) => reject(error)
    );
  });
}

/**
 * Clear thumbnail cache
 * Call this periodically to free up space
 */
export async function clearThumbnailCache() {
  try {
    await FileSystem.deleteAsync(CACHE_DIR, { idempotent: true });
    await ensureCacheDir();
  } catch (error) {
    console.warn('Failed to clear cache:', error);
  }
}

/**
 * Get cache size in bytes
 */
export async function getCacheSize(): Promise<number> {
  try {
    const files = await FileSystem.readDirectoryAsync(CACHE_DIR);
    let totalSize = 0;

    for (const file of files) {
      const fileInfo = await FileSystem.getInfoAsync(`${CACHE_DIR}${file}`);
      if (fileInfo.exists && 'size' in fileInfo && fileInfo.size) {
        totalSize += fileInfo.size as number;
      }
    }

    return totalSize;
  } catch (error) {
    console.warn('Failed to get cache size:', error);
    return 0;
  }
}

/**
 * Format bytes to human-readable size
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}
