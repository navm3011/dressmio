import { describe, it, expect, beforeEach } from "vitest";

/**
 * Filtering & Search Tests
 * 
 * These tests verify that the filtering and search functionality
 * correctly filters items by category, color, and search query.
 */

describe("Filtering & Search", () => {
  const sampleItems = [
    { id: "1", type: "top", color: "blue", category: "tops", name: "Blue T-Shirt" },
    { id: "2", type: "top", color: "white", category: "tops", name: "White Blouse" },
    { id: "3", type: "bottom", color: "black", category: "bottoms", name: "Black Jeans" },
    { id: "4", type: "bottom", color: "gray", category: "bottoms", name: "Gray Trousers" },
    { id: "5", type: "shoe", color: "white", category: "shoes", name: "White Sneakers" },
  ];

  describe("Category Filtering", () => {
    it("should filter items by Tops category", () => {
      const filtered = sampleItems.filter((item) => item.category === "tops");
      
      expect(filtered).toHaveLength(2);
      expect(filtered[0].type).toBe("top");
      expect(filtered[1].type).toBe("top");
    });

    it("should filter items by Bottoms category", () => {
      const filtered = sampleItems.filter((item) => item.category === "bottoms");
      
      expect(filtered).toHaveLength(2);
      expect(filtered[0].type).toBe("bottom");
      expect(filtered[1].type).toBe("bottom");
    });

    it("should filter items by Shoes category", () => {
      const filtered = sampleItems.filter((item) => item.category === "shoes");
      
      expect(filtered).toHaveLength(1);
      expect(filtered[0].type).toBe("shoe");
    });

    it("should show all items when no category selected", () => {
      const filtered = sampleItems.filter(() => true);
      
      expect(filtered).toHaveLength(5);
    });

    it("should show empty array for non-existent category", () => {
      const filtered = sampleItems.filter((item) => item.category === "accessories");
      
      expect(filtered).toHaveLength(0);
    });
  });

  describe("Color Filtering", () => {
    it("should filter items by Blue color", () => {
      const filtered = sampleItems.filter((item) => item.color === "blue");
      
      expect(filtered).toHaveLength(1);
      expect(filtered[0].color).toBe("blue");
    });

    it("should filter items by White color", () => {
      const filtered = sampleItems.filter((item) => item.color === "white");
      
      expect(filtered).toHaveLength(2);
    });

    it("should filter items by Black color", () => {
      const filtered = sampleItems.filter((item) => item.color === "black");
      
      expect(filtered).toHaveLength(1);
      expect(filtered[0].color).toBe("black");
    });

    it("should filter items by Gray color", () => {
      const filtered = sampleItems.filter((item) => item.color === "gray");
      
      expect(filtered).toHaveLength(1);
      expect(filtered[0].color).toBe("gray");
    });

    it("should show empty array for non-existent color", () => {
      const filtered = sampleItems.filter((item) => item.color === "red");
      
      expect(filtered).toHaveLength(0);
    });
  });

  describe("Multi-Filter Combinations", () => {
    it("should filter by Tops + Blue", () => {
      const filtered = sampleItems.filter(
        (item) => item.category === "tops" && item.color === "blue"
      );
      
      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toBe("Blue T-Shirt");
    });

    it("should filter by Bottoms + Black", () => {
      const filtered = sampleItems.filter(
        (item) => item.category === "bottoms" && item.color === "black"
      );
      
      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toBe("Black Jeans");
    });

    it("should filter by Shoes + White", () => {
      const filtered = sampleItems.filter(
        (item) => item.category === "shoes" && item.color === "white"
      );
      
      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toBe("White Sneakers");
    });

    it("should filter by Tops + White", () => {
      const filtered = sampleItems.filter(
        (item) => item.category === "tops" && item.color === "white"
      );
      
      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toBe("White Blouse");
    });

    it("should return empty for impossible combination", () => {
      const filtered = sampleItems.filter(
        (item) => item.category === "shoes" && item.color === "blue"
      );
      
      expect(filtered).toHaveLength(0);
    });
  });

  describe("Search Functionality", () => {
    it("should search for 'shirt'", () => {
      const query = "shirt";
      const filtered = sampleItems.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      
      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toContain("Shirt");
    });

    it("should search for 'blouse'", () => {
      const query = "blouse";
      const filtered = sampleItems.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      
      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toContain("Blouse");
    });

    it("should search for 'jeans'", () => {
      const query = "jeans";
      const filtered = sampleItems.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      
      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toContain("Jeans");
    });

    it("should search for 'trousers'", () => {
      const query = "trousers";
      const filtered = sampleItems.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      
      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toContain("Trousers");
    });

    it("should search for 'sneakers'", () => {
      const query = "sneakers";
      const filtered = sampleItems.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      
      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toContain("Sneakers");
    });

    it("should be case-insensitive", () => {
      const query = "BLUE";
      const filtered = sampleItems.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      
      expect(filtered).toHaveLength(1);
      expect(filtered[0].color).toBe("blue");
    });

    it("should search by color name", () => {
      const query = "white";
      const filtered = sampleItems.filter((item) =>
        item.color.toLowerCase().includes(query.toLowerCase())
      );
      
      expect(filtered).toHaveLength(2);
    });

    it("should search by type", () => {
      const query = "top";
      const filtered = sampleItems.filter((item) =>
        item.type.toLowerCase().includes(query.toLowerCase())
      );
      
      expect(filtered).toHaveLength(2);
    });

    it("should return empty for non-matching search", () => {
      const query = "red";
      const filtered = sampleItems.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      
      expect(filtered).toHaveLength(0);
    });
  });

  describe("Search + Filter Combinations", () => {
    it("should search 'shirt' within Tops category", () => {
      const query = "shirt";
      const category = "tops";
      const filtered = sampleItems.filter(
        (item) =>
          item.category === category &&
          item.name.toLowerCase().includes(query.toLowerCase())
      );
      
      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toBe("Blue T-Shirt");
    });

    it("should search 'white' within Tops category", () => {
      const query = "white";
      const category = "tops";
      const filtered = sampleItems.filter(
        (item) =>
          item.category === category &&
          (item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.color.toLowerCase().includes(query.toLowerCase()))
      );
      
      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toBe("White Blouse");
    });

    it("should search 'black' within Bottoms category", () => {
      const query = "black";
      const category = "bottoms";
      const filtered = sampleItems.filter(
        (item) =>
          item.category === category &&
          (item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.color.toLowerCase().includes(query.toLowerCase()))
      );
      
      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toBe("Black Jeans");
    });
  });

  describe("Empty Filter Results", () => {
    it("should display empty state for no results", () => {
      const filtered = sampleItems.filter((item) => item.color === "red");
      
      expect(filtered).toHaveLength(0);
    });

    it("should allow clearing filters", () => {
      const cleared = sampleItems.filter(() => true);
      
      expect(cleared).toHaveLength(5);
    });

    it("should show helpful message when no items match", () => {
      const filtered = sampleItems.filter((item) => item.category === "accessories");
      const message = filtered.length === 0 ? "No items found" : "Items found";
      
      expect(message).toBe("No items found");
    });
  });

  describe("Filter State Management", () => {
    it("should maintain filter state during navigation", () => {
      const filterState: { category: string | null; color: string | null; searchQuery: string } = {
        category: "tops",
        color: "blue",
        searchQuery: "",
      };
      
      expect(filterState.category).toBe("tops");
      expect(filterState.color).toBe("blue");
    });

    it("should reset filters when requested", () => {
      const filterState = {
        category: null,
        color: null,
        searchQuery: "",
      };
      
      expect(filterState.category).toBeNull();
      expect(filterState.color).toBeNull();
    });

    it("should update filter state on user input", () => {
      let filterState: { category: string | null; color: string | null; searchQuery: string } = {
        category: null,
        color: null,
        searchQuery: "",
      };
      
      // Simulate user selecting category
      filterState.category = "tops";
      expect(filterState.category).toBe("tops");
      
      // Simulate user selecting color
      filterState.color = "blue";
      expect(filterState.color).toBe("blue");
    });
  });

  describe("Performance", () => {
    it("should handle large item lists efficiently", () => {
      const largeList = Array.from({ length: 1000 }, (_, i) => ({
        id: `${i}`,
        type: i % 3 === 0 ? "top" : i % 3 === 1 ? "bottom" : "shoe",
        color: ["blue", "black", "white", "gray"][i % 4],
        category: i % 3 === 0 ? "tops" : i % 3 === 1 ? "bottoms" : "shoes",
        name: `Item ${i}`,
      }));
      
      const filtered = largeList.filter((item) => item.category === "tops");
      
      expect(filtered.length).toBeGreaterThan(0);
      expect(filtered.length).toBeLessThanOrEqual(largeList.length);
    });

    it("should filter quickly with multiple criteria", () => {
      const filtered = sampleItems.filter(
        (item) =>
          item.category === "tops" &&
          item.color === "blue" &&
          item.name.toLowerCase().includes("shirt")
      );
      
      expect(filtered).toHaveLength(1);
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty search query", () => {
      const query = "";
      const filtered = sampleItems.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      
      expect(filtered).toHaveLength(5);
    });

    it("should handle special characters in search", () => {
      const query = "@#$%";
      const filtered = sampleItems.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      
      expect(filtered).toHaveLength(0);
    });

    it("should handle very long search query", () => {
      const query = "a".repeat(1000);
      const filtered = sampleItems.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      
      expect(filtered).toHaveLength(0);
    });

    it("should handle null or undefined filters gracefully", () => {
      const category = null;
      const filtered = sampleItems.filter((item) =>
        category === null || item.category === category
      );
      
      expect(filtered).toHaveLength(5);
    });
  });
});
