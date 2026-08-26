import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import superjson from 'superjson';
import type { AppRouter } from '@/server/routers';
import { getApiBaseUrl } from '@/constants/oauth';
import * as Auth from '@/lib/_core/auth';

/**
 * Create a standalone TRPC client for server-side mutations
 * This is used in utility functions that aren't React components
 */
async function getTRPCClient() {
  const token = await Auth.getSessionToken();
  
  return createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: `${getApiBaseUrl()}/api/trpc`,
        transformer: superjson,
        async headers() {
          return token ? { Authorization: `Bearer ${token}` } : {};
        },
        fetch(url, options) {
          return fetch(url, {
            ...options,
            credentials: 'include',
          });
        },
      }),
    ],
  });
}

/**
 * Upload image to S3 storage and get a public URL
 * @param imageUri - Local file URI (file://)
 * @returns S3 URL for the uploaded image
 */
export async function uploadImageToS3(imageUri: string): Promise<string> {
  try {
    // Read the image file as base64
    const base64Data = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Determine MIME type from URI
    const mimeType = imageUri.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg';

    // Get TRPC client and upload
    const client = await getTRPCClient();
    const result = await client.system.uploadImage.mutate({
      base64Data,
      mimeType,
    });

    if (result.success && result.url) {
      return result.url;
    } else {
      throw new Error(result.error || 'Upload failed');
    }
  } catch (error) {
    console.error('Failed to upload image:', error);
    throw new Error('Failed to upload image');
  }
}

/**
 * Convert local file URI to base64 string
 * Useful for sending images to AI APIs that accept base64
 * @param imageUri - Local file URI
 * @returns Base64 encoded string
 */
export async function imageUriToBase64(imageUri: string): Promise<string> {
  try {
    const base64Data = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return `data:image/jpeg;base64,${base64Data}`;
  } catch (error) {
    console.error('Failed to convert image to base64:', error);
    throw new Error('Failed to convert image');
  }
}
