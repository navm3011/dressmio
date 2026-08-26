import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generateProductPhoto } from './ai-service';

// Mock the image generation module
vi.mock('./_core/imageGeneration', () => ({
  generateImage: vi.fn(),
}));

describe('generateProductPhoto', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should generate a product photo with correct prompt', async () => {
    const { generateImage } = await import('./_core/imageGeneration');
    const mockGenerateImage = vi.mocked(generateImage);
    
    const mockUrl = 'https://example.com/generated-photo.jpg';
    mockGenerateImage.mockResolvedValue({ url: mockUrl });

    const imageUrl = 'https://example.com/original.jpg';
    const clothingDescription = 'Blue cotton t-shirt, medium fit';

    const result = await generateProductPhoto(imageUrl, clothingDescription);

    expect(result).toBe(mockUrl);
    expect(mockGenerateImage).toHaveBeenCalledWith(
      expect.objectContaining({
        prompt: expect.stringContaining('professional product photo'),
      })
    );
    
    // Verify prompt contains all required elements
    const callArgs = mockGenerateImage.mock.calls[0][0] as any;
    expect(callArgs.prompt).toContain('white background');
    expect(callArgs.prompt).toContain('Blue cotton t-shirt, medium fit');
    expect(callArgs.prompt).toContain('professional e-commerce');
  });

  it('should pass correct options to generateImage', async () => {
    const { generateImage } = await import('./_core/imageGeneration');
    const mockGenerateImage = vi.mocked(generateImage);
    
    const mockUrl = 'https://example.com/generated-photo.jpg';
    mockGenerateImage.mockResolvedValue({ url: mockUrl });

    const imageUrl = 'https://example.com/test.jpg';
    const clothingDescription = 'Red wool sweater';

    await generateProductPhoto(imageUrl, clothingDescription);

    const callArgs = mockGenerateImage.mock.calls[0][0] as any;
    expect(callArgs).toHaveProperty('prompt');
    expect(callArgs.prompt).toContain('Red wool sweater');
  });

  it('should include clothing description in prompt', async () => {
    const { generateImage } = await import('./_core/imageGeneration');
    const mockGenerateImage = vi.mocked(generateImage);
    
    const mockUrl = 'https://example.com/generated-photo.jpg';
    mockGenerateImage.mockResolvedValue({ url: mockUrl });

    const imageUrl = 'https://example.com/original.jpg';
    const clothingDescription = 'Red wool blazer';

    await generateProductPhoto(imageUrl, clothingDescription);

    const callArgs = mockGenerateImage.mock.calls[0][0] as any;
    expect(callArgs.prompt).toContain('Red wool blazer');
  });

  it('should throw error if image generation fails', async () => {
    const { generateImage } = await import('./_core/imageGeneration');
    const mockGenerateImage = vi.mocked(generateImage);
    
    mockGenerateImage.mockRejectedValue(new Error('Generation failed'));

    const imageUrl = 'https://example.com/original.jpg';
    const clothingDescription = 'Blue cotton t-shirt';

    await expect(generateProductPhoto(imageUrl, clothingDescription))
      .rejects
      .toThrow('Failed to generate product photo');
  });

  it('should throw error if response has no URL', async () => {
    const { generateImage } = await import('./_core/imageGeneration');
    const mockGenerateImage = vi.mocked(generateImage);
    
    mockGenerateImage.mockResolvedValue({ url: undefined });

    const imageUrl = 'https://example.com/original.jpg';
    const clothingDescription = 'Blue cotton t-shirt';

    await expect(generateProductPhoto(imageUrl, clothingDescription))
      .rejects
      .toThrow('Failed to generate product photo');
  });
});
