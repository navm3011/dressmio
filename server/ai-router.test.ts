import { describe, it, expect, vi, beforeEach } from 'vitest';
import { aiRouter } from './ai-router';
import * as aiService from './ai-service';
import type { TrpcContext } from './_core/context';

// Mock the AI service
vi.mock('./ai-service', () => ({
  analyzeClothingItem: vi.fn(),
  generateOutfitSuggestion: vi.fn(),
  generateProductPhoto: vi.fn(),
}));

describe('aiRouter.generateProductPhoto', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockContext: TrpcContext = {
    req: {} as any,
    res: {} as any,
    user: null,
  };

  it('should successfully generate product photo', async () => {
    const mockPhotoUrl = 'https://example.com/generated-photo.jpg';
    vi.mocked(aiService.generateProductPhoto).mockResolvedValue(mockPhotoUrl);

    const caller = aiRouter.createCaller(mockContext);
    
    const result = await caller.generateProductPhoto({
      imageUrl: 'https://example.com/original.jpg',
      clothingDescription: 'Blue cotton t-shirt',
    });

    expect(result.success).toBe(true);
    expect(result.data?.url).toBe(mockPhotoUrl);
    expect(aiService.generateProductPhoto).toHaveBeenCalledWith(
      'https://example.com/original.jpg',
      'Blue cotton t-shirt'
    );
  });

  it('should handle generation errors gracefully', async () => {
    vi.mocked(aiService.generateProductPhoto).mockRejectedValue(
      new Error('API error')
    );

    const caller = aiRouter.createCaller(mockContext);
    
    const result = await caller.generateProductPhoto({
      imageUrl: 'https://example.com/original.jpg',
      clothingDescription: 'Blue cotton t-shirt',
    });

    expect(result.success).toBe(false);
    expect(result.error).toBe('API error');
  });

  it('should validate image URL format', async () => {
    const caller = aiRouter.createCaller(mockContext);
    
    // This should fail validation due to invalid URL
    await expect(
      caller.generateProductPhoto({
        imageUrl: 'not-a-valid-url',
        clothingDescription: 'Blue cotton t-shirt',
      })
    ).rejects.toThrow();
  });

  it('should handle empty clothing description gracefully', async () => {
    const mockPhotoUrl = 'https://example.com/generated-photo.jpg';
    vi.mocked(aiService.generateProductPhoto).mockResolvedValue(mockPhotoUrl);

    const caller = aiRouter.createCaller(mockContext);
    
    // Empty string is technically valid, so it should still call the service
    const result = await caller.generateProductPhoto({
      imageUrl: 'https://example.com/original.jpg',
      clothingDescription: '',
    });

    expect(result.success).toBe(true);
    expect(aiService.generateProductPhoto).toHaveBeenCalledWith(
      'https://example.com/original.jpg',
      ''
    );
  });
});
