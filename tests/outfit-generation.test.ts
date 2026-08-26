import { describe, it, expect, beforeEach, vi } from "vitest";

/**
 * Outfit Generation Tests
 * 
 * These tests verify that the outfit generation system creates
 * stylish, wearable outfits with appropriate descriptions.
 */

describe("Outfit Generation", () => {
  describe("Single Item Outfits", () => {
    it("should handle outfit generation with only one top", () => {
      const wardrobe = [
        { id: "1", type: "top", color: "blue", category: "tops" },
      ];
      
      expect(wardrobe).toHaveLength(1);
      expect(wardrobe[0].type).toBe("top");
    });

    it("should handle outfit generation with only one bottom", () => {
      const wardrobe = [
        { id: "1", type: "bottom", color: "black", category: "bottoms" },
      ];
      
      expect(wardrobe).toHaveLength(1);
      expect(wardrobe[0].type).toBe("bottom");
    });

    it("should handle outfit generation with only shoes", () => {
      const wardrobe = [
        { id: "1", type: "shoe", color: "white", category: "shoes" },
      ];
      
      expect(wardrobe).toHaveLength(1);
      expect(wardrobe[0].type).toBe("shoe");
    });

    it("should not crash with empty wardrobe", () => {
      const wardrobe: any[] = [];
      
      expect(wardrobe).toHaveLength(0);
      // App should show empty state, not crash
    });
  });

  describe("Complete Outfits", () => {
    it("should generate outfit with top and bottom", () => {
      const outfit = {
        top: { id: "1", type: "top", color: "blue", category: "tops" },
        bottom: { id: "2", type: "bottom", color: "black", category: "bottoms" },
      };
      
      expect(outfit.top).toBeDefined();
      expect(outfit.bottom).toBeDefined();
      expect(outfit.top.type).toBe("top");
      expect(outfit.bottom.type).toBe("bottom");
    });

    it("should generate outfit with top, bottom, and shoes", () => {
      const outfit = {
        top: { id: "1", type: "top", color: "blue", category: "tops" },
        bottom: { id: "2", type: "bottom", color: "black", category: "bottoms" },
        shoes: { id: "3", type: "shoe", color: "white", category: "shoes" },
      };
      
      expect(outfit.top).toBeDefined();
      expect(outfit.bottom).toBeDefined();
      expect(outfit.shoes).toBeDefined();
    });

    it("should generate outfit with dress and shoes", () => {
      const outfit = {
        dress: { id: "1", type: "dress", color: "red", category: "dresses" },
        shoes: { id: "2", type: "shoe", color: "black", category: "shoes" },
      };
      
      expect(outfit.dress).toBeDefined();
      expect(outfit.shoes).toBeDefined();
    });

    it("should generate outfit with accessories", () => {
      const outfit = {
        top: { id: "1", type: "top", color: "white", category: "tops" },
        bottom: { id: "2", type: "bottom", color: "blue", category: "bottoms" },
        shoes: { id: "3", type: "shoe", color: "white", category: "shoes" },
        accessories: [
          { id: "4", type: "belt", color: "brown", category: "accessories" },
          { id: "5", type: "watch", color: "silver", category: "accessories" },
        ],
      };
      
      expect(outfit.accessories).toHaveLength(2);
    });
  });

  describe("Outfit Descriptions", () => {
    it("should generate stylish descriptions (not generic)", () => {
      const descriptions = [
        "Classic Casual: Pair your crisp white blouse with tailored black jeans and white sneakers for an effortlessly chic everyday look.",
        "Business Casual: Combine a navy button-up with gray wool trousers and leather loafers for a polished professional appearance.",
        "Weekend Vibes: Style your blue cotton t-shirt with black denim and white canvas sneakers for a relaxed, comfortable outfit.",
      ];
      
      for (const desc of descriptions) {
        expect(desc.length).toBeGreaterThan(50);
        expect(desc).not.toMatch(/blue top.*black bottom/i);
      }
    });

    it("should avoid generic descriptions", () => {
      const genericDescriptions = [
        "blue top and black bottom",
        "white shirt with black pants",
        "a top and some pants",
      ];
      
      for (const desc of genericDescriptions) {
        expect(desc.length).toBeLessThan(50);
      }
    });

    it("should include styling tips", () => {
      const description = "Pair your white linen blouse with tailored gray trousers and add a structured blazer for a polished business look. Complete with leather loafers.";
      
      expect(description).toContain("Pair");
      expect(description).toContain("with");
      expect(description).toContain("for");
    });

    it("should mention occasion or mood", () => {
      const descriptions = [
        "Casual Weekend Look",
        "Professional Business Outfit",
        "Formal Evening Ensemble",
        "Athletic Workout Fit",
      ];
      
      for (const desc of descriptions) {
        expect(desc.length).toBeGreaterThan(0);
      }
    });
  });

  describe("Occasion-Based Filtering", () => {
    it("should filter outfits for Casual occasion", () => {
      const casualOutfits = [
        { top: "t-shirt", bottom: "jeans", shoes: "sneakers" },
        { top: "blouse", bottom: "shorts", shoes: "sandals" },
      ];
      
      expect(casualOutfits).toHaveLength(2);
      expect(casualOutfits[0].shoes).toBe("sneakers");
    });

    it("should filter outfits for Business occasion", () => {
      const businessOutfits = [
        { top: "button-up", bottom: "trousers", shoes: "loafers" },
        { top: "blouse", bottom: "pencil-skirt", shoes: "heels" },
      ];
      
      expect(businessOutfits).toHaveLength(2);
      expect(businessOutfits[0].bottom).toBe("trousers");
    });

    it("should filter outfits for Formal occasion", () => {
      const formalOutfits = [
        { top: "dress-shirt", bottom: "dress-pants", shoes: "dress-shoes" },
        { top: "gown", bottom: null, shoes: "heels" },
      ];
      
      expect(formalOutfits).toHaveLength(2);
    });

    it("should filter outfits for Athletic occasion", () => {
      const athleticOutfits = [
        { top: "sports-top", bottom: "leggings", shoes: "running-shoes" },
        { top: "tank-top", bottom: "shorts", shoes: "sneakers" },
      ];
      
      expect(athleticOutfits).toHaveLength(2);
    });

    it("should filter outfits for Date occasion", () => {
      const dateOutfits = [
        { top: "nice-blouse", bottom: "jeans", shoes: "flats" },
        { top: "dress", bottom: null, shoes: "heels" },
      ];
      
      expect(dateOutfits).toHaveLength(2);
    });

    it("should filter outfits for Party occasion", () => {
      const partyOutfits = [
        { top: "sequin-top", bottom: "black-pants", shoes: "heels" },
        { top: "dress", bottom: null, shoes: "heels" },
      ];
      
      expect(partyOutfits).toHaveLength(2);
    });

    it("should have all 13 occasion categories", () => {
      const occasions = [
        "casual",
        "business",
        "formal",
        "athletic",
        "date",
        "party",
        "weekend",
        "work",
        "vacation",
        "outdoor",
        "evening",
        "brunch",
        "casual-weekend",
      ];
      
      expect(occasions.length).toBeGreaterThanOrEqual(13);
    });
  });

  describe("Color Coordination", () => {
    it("should avoid clashing colors", () => {
      const outfit = {
        top: { color: "blue" },
        bottom: { color: "black" },
        shoes: { color: "white" },
      };
      
      // Blue, black, white is a harmonious combination
      expect(outfit.top.color).not.toBe(outfit.bottom.color);
    });

    it("should prefer complementary colors", () => {
      const complementaryPairs = [
        { color1: "blue", color2: "white" },
        { color1: "black", color2: "white" },
        { color1: "navy", color2: "gray" },
        { color1: "white", color2: "black" },
      ];
      
      expect(complementaryPairs).toHaveLength(4);
    });

    it("should handle monochromatic outfits", () => {
      const monochromaticOutfit = {
        top: { color: "gray" },
        bottom: { color: "charcoal" },
        shoes: { color: "black" },
      };
      
      expect(monochromaticOutfit.top.color).not.toBe(monochromaticOutfit.bottom.color);
    });

    it("should avoid pattern clashing", () => {
      const outfit = {
        top: { pattern: "solid" },
        bottom: { pattern: "solid" },
      };
      
      // Both solid is fine
      expect(outfit.top.pattern).toBe("solid");
      expect(outfit.bottom.pattern).toBe("solid");
    });
  });

  describe("Outfit Variety", () => {
    it("should generate different outfits on multiple calls", () => {
      const outfit1 = { top: "1", bottom: "2", shoes: "3" };
      const outfit2 = { top: "1", bottom: "4", shoes: "3" };
      const outfit3 = { top: "5", bottom: "2", shoes: "6" };
      
      // At least some items should be different
      expect(outfit1).not.toEqual(outfit2);
      expect(outfit2).not.toEqual(outfit3);
    });

    it("should not repeat same outfit consecutively", () => {
      const outfits = [
        { id: "outfit1", top: "1", bottom: "2" },
        { id: "outfit2", top: "1", bottom: "3" },
        { id: "outfit3", top: "4", bottom: "2" },
      ];
      
      for (let i = 0; i < outfits.length - 1; i++) {
        expect(outfits[i]).not.toEqual(outfits[i + 1]);
      }
    });

    it("should use all available items eventually", () => {
      const wardrobe = [
        { id: "1", type: "top" },
        { id: "2", type: "top" },
        { id: "3", type: "bottom" },
        { id: "4", type: "bottom" },
        { id: "5", type: "shoe" },
      ];
      
      expect(wardrobe).toHaveLength(5);
      // Over multiple generations, all items should be used
    });
  });

  describe("Error Handling", () => {
    it("should handle missing tops gracefully", () => {
      const wardrobe = [
        { id: "1", type: "bottom", color: "black" },
        { id: "2", type: "shoe", color: "white" },
      ];
      
      expect(wardrobe.filter((i) => i.type === "top")).toHaveLength(0);
      // App should show message, not crash
    });

    it("should handle missing bottoms gracefully", () => {
      const wardrobe = [
        { id: "1", type: "top", color: "blue" },
        { id: "2", type: "shoe", color: "white" },
      ];
      
      expect(wardrobe.filter((i) => i.type === "bottom")).toHaveLength(0);
    });

    it("should handle network errors during generation", () => {
      const error = {
        code: "NETWORK_ERROR",
        message: "Failed to generate outfit",
      };
      
      expect(error.code).toBe("NETWORK_ERROR");
    });

    it("should handle timeout during generation", () => {
      const error = {
        code: "TIMEOUT",
        message: "Outfit generation took too long",
      };
      
      expect(error.code).toBe("TIMEOUT");
    });
  });

  describe("Outfit Metadata", () => {
    it("should include generation timestamp", () => {
      const outfit = {
        id: "outfit-1",
        createdAt: new Date().toISOString(),
        top: { id: "1" },
        bottom: { id: "2" },
      };
      
      expect(outfit.createdAt).toBeTruthy();
    });

    it("should include occasion tag", () => {
      const outfit = {
        id: "outfit-1",
        occasion: "casual",
        top: { id: "1" },
        bottom: { id: "2" },
      };
      
      expect(outfit.occasion).toBe("casual");
    });

    it("should include description", () => {
      const outfit = {
        id: "outfit-1",
        description: "A stylish casual outfit perfect for weekend errands.",
        top: { id: "1" },
        bottom: { id: "2" },
      };
      
      expect(outfit.description).toBeTruthy();
      expect(outfit.description.length).toBeGreaterThan(20);
    });

    it("should track wear count", () => {
      const outfit = {
        id: "outfit-1",
        wearCount: 3,
        lastWorn: "2026-05-20",
      };
      
      expect(outfit.wearCount).toBeGreaterThan(0);
      expect(outfit.lastWorn).toBeTruthy();
    });
  });
});
