import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import * as aiService from "./ai-service";

export const aiRouter = router({
  /**
   * Analyze a clothing item image to determine category, color, style, and other attributes
   * Public procedure - no authentication required
   */
  analyzeClothing: publicProcedure
    .input(
      z.object({
        imageUrl: z.string().url("Must be a valid URL"),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const analysis = await aiService.analyzeClothingItem(input.imageUrl);
        return {
          success: true,
          data: analysis,
        };
      } catch (error) {
        console.error("AI analysis error:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Failed to analyze clothing item",
        };
      }
    }),

  /**
   * Generate outfit suggestions based on available clothing items
   * Accepts array of item descriptions (strings)
   * Public procedure - no authentication required
   */
  generateOutfit: publicProcedure
    .input(
      z.object({
        items: z.array(z.string()),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const suggestion = await aiService.generateOutfitSuggestion(input.items);
        return {
          success: true,
          data: suggestion,
        };
      } catch (error) {
        console.error("Outfit generation error:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Failed to generate outfit suggestion",
        };
      }
    }),

  /**
   * Generate multiple outfit suggestions
   * Public procedure - no authentication required
   */
  generateOutfits: publicProcedure
    .input(
      z.object({
        items: z.array(z.string()),
        count: z.number().optional().default(3),
        occasion: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const suggestions = [];
        for (let i = 0; i < input.count; i++) {
          const suggestion = await aiService.generateOutfitSuggestion(input.items, input.occasion);
          suggestions.push(suggestion);
        }
        return {
          success: true,
          data: suggestions,
        };
      } catch (error) {
        console.error("Outfit generation error:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Failed to generate outfit suggestions",
        };
      }
    }),

  /**
   * Generate a clean product photo from a clothing item photo
   * Creates a professional product-style image with white background
   * Public procedure - no authentication required
   */
  generateProductPhoto: publicProcedure
    .input(
      z.object({
        imageUrl: z.string().url("Must be a valid URL"),
        clothingDescription: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const productPhotoUrl = await aiService.generateProductPhoto(
          input.imageUrl,
          input.clothingDescription
        );
        return {
          success: true,
          data: { url: productPhotoUrl },
        };
      } catch (error) {
        console.error("Product photo generation error:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Failed to generate product photo",
        };
      }
    }),
});

export type AIRouter = typeof aiRouter;
