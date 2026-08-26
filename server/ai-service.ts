import { invokeLLM } from "./_core/llm";
import { storagePut } from "./storage";

export interface ClothingAnalysisResult {
  category: 'tops' | 'bottoms' | 'shoes' | 'accessories' | 'outerwear' | 'dresses';
  specificType: string;
  color: string;
  material: string;
  style: string;
  occasion: string[];
  season: 'spring' | 'summer' | 'fall' | 'winter' | 'all-season';
  confidence: number;
  description: string;
  fit?: string;
  pattern?: string;
}

/**
 * Analyze a clothing item image using AI to determine category, color, style, and other attributes
 * @param imageUrl - S3 URL of the clothing item image
 * @returns Clothing analysis result with detailed categorization
 */
export async function analyzeClothingItem(imageUrl: string): Promise<ClothingAnalysisResult> {
  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: `You are an expert fashion analyst. Analyze clothing items in images and provide detailed categorization.
          
          You must respond with valid JSON matching this exact structure:
          {
            "category": "tops|bottoms|shoes|accessories|outerwear|dresses",
            "specificType": "detailed type of clothing item",
            "color": "primary color description",
            "material": "material composition",
            "style": "style description",
            "occasion": ["array", "of", "occasions"],
            "season": "spring|summer|fall|winter|all-season",
            "confidence": 0.0-1.0,
            "description": "brief description of the item",
            "fit": "fit type if applicable",
            "pattern": "pattern type if applicable"
          }
          
          Categories:
          - tops: shirts, blouses, t-shirts, sweaters, hoodies, tank tops, vests
          - bottoms: pants, jeans, skirts, shorts, leggings, trousers, capris
          - shoes: sneakers, boots, heels, sandals, flats, loafers, pumps, oxfords
          - accessories: bags, belts, scarves, hats, jewelry, watches, sunglasses, gloves
          - outerwear: jackets, coats, blazers, cardigans, ponchos, capes
          - dresses: dresses, jumpsuits, rompers, overalls`,
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Analyze this clothing item and provide detailed categorization in JSON format." },
            { type: "image_url", image_url: { url: imageUrl } },
          ],
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "clothing_analysis",
          strict: true,
          schema: {
            type: "object",
            properties: {
              category: {
                type: "string",
                enum: ["tops", "bottoms", "shoes", "accessories", "outerwear", "dresses"],
              },
              specificType: { type: "string" },
              color: { type: "string" },
              material: { type: "string" },
              style: { type: "string" },
              occasion: {
                type: "array",
                items: { type: "string" },
              },
              season: {
                type: "string",
                enum: ["spring", "summer", "fall", "winter", "all-season"],
              },
              confidence: { type: "number" },
              description: { type: "string" },
              fit: { type: "string" },
              pattern: { type: "string" },
            },
            required: ["category", "specificType", "color", "material", "style", "occasion", "season", "confidence", "description", "pattern", "fit"],
            additionalProperties: false,
          },
        },
      },
    });

    const content = response.choices[0]?.message?.content;
    if (!content || typeof content !== "string") {
      throw new Error("Invalid response from LLM");
    }

    const result = JSON.parse(content) as ClothingAnalysisResult;
    return result;
  } catch (error) {
    console.error("Failed to analyze clothing item:", error);
    throw new Error("Failed to analyze clothing item");
  }
}

export interface OutfitSuggestionResult {
  occasion: string;
  reason: string;
  tips: string[];
  selectedItems?: {
    topDescription?: string | null;
    bottomDescription?: string | null;
    shoesDescription?: string | null;
    accessoriesDescription?: string[];
  };
}

/**
 * Generate weather-aware outfit suggestions
 * @param itemDescriptions - Array of clothing item descriptions
 * @param weatherCondition - Current weather condition
 * @param temperature - Current temperature in Celsius
 * @returns Outfit suggestion with occasion, reason, and styling tips
 */
export async function generateOutfitSuggestion(
  itemDescriptions: string[],
  occasionFilter?: string,
  weatherCondition?: string,
  temperature?: number
): Promise<OutfitSuggestionResult> {
  try {
    const weatherContext = weatherCondition 
      ? `Current weather: ${weatherCondition}${temperature ? ` (${temperature}°C)` : ""}\n\n`
      : "";
    const occasionContext = occasionFilter ? `Suggest outfits suitable for: ${occasionFilter}\n\n` : "";

    const itemsWithNumbers = itemDescriptions.map((desc, idx) => `${idx + 1}. ${desc}`).join("\n");

    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: `You are a professional fashion stylist and weather expert. Given a list of clothing items and current weather conditions, suggest outfit combinations and provide styling advice.
          
          CRITICAL INSTRUCTIONS:
          - You MUST select SPECIFIC items from the provided numbered list
          - For each outfit, identify which item numbers to use
          - Match the exact description from the list when specifying selected items
          - Create outfits that are well-coordinated and weather-appropriate
          - If only one top is available, use it and find complementary bottoms
          - If only bottoms are available, suggest what type of top would work best
          - Create DESCRIPTIVE outfit suggestions (e.g., "Casual Friday look with tailored fit" not just color names)
          
          Consider:
          - Weather appropriateness (temperature, conditions)
          - Color coordination and complementary palettes
          - Pattern and design harmony (avoid clashing patterns)
          - Style cohesion and occasion appropriateness
          - Comfort and practicality
          - Creating engaging, descriptive outfit names
          
          Respond with valid JSON matching this structure:
          {
            "occasion": "suggested occasion for this outfit (casual, business, formal, weekend, date-night, athletic, party, etc.)",
            "reason": "Descriptive outfit name/style (e.g., 'Effortless Weekend Casual' or 'Professional Business Meeting Look'). Include why these items work well together.",
            "tips": ["styling tip 1", "styling tip 2", "styling tip 3"],
            "selectedItems": {
              "topDescription": "exact description of selected top from the list (or null if no tops available)",
              "bottomDescription": "exact description of selected bottom from the list (or null if no bottoms available)",
              "shoesDescription": "exact description of selected shoes from the list (or null if no shoes available)",
              "accessoriesDescription": ["accessory 1 from list", "accessory 2 from list"] (optional, can be empty)
            }
          }`,
        },
        {
          role: "user",
          content: `${weatherContext}${occasionContext}I have these clothing items available:\n${itemsWithNumbers}\n\nSuggest an outfit combination. Match items exactly as they appear in the list above. Provide the response in JSON format.`,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "outfit_suggestion",
          strict: true,
          schema: {
            type: "object",
            properties: {
              occasion: { type: "string" },
              reason: { type: "string" },
              tips: {
                type: "array",
                items: { type: "string" },
              },
              selectedItems: {
                type: "object",
                properties: {
                  topDescription: { type: ["string", "null"] },
                  bottomDescription: { type: ["string", "null"] },
                  shoesDescription: { type: ["string", "null"] },
                  accessoriesDescription: {
                    type: "array",
                    items: { type: "string" },
                  },
                },
                required: ["topDescription", "bottomDescription", "shoesDescription"],
              },
            },
            required: ["occasion", "reason", "tips", "selectedItems"],
            additionalProperties: false,
          },
        },
      },
    });

    const content = response.choices[0]?.message?.content;
    if (!content || typeof content !== "string") {
      throw new Error("Invalid response from LLM");
    }

    const result = JSON.parse(content) as OutfitSuggestionResult;
    return result;
  } catch (error) {
    console.error("Failed to generate outfit suggestion:", error);
    throw new Error("Failed to generate outfit suggestion");
  }
}

/**
 * Validate if a clothing item is appropriate for given weather conditions
 * @param item - Clothing item description
 * @param weatherCondition - Weather condition
 * @param temperature - Temperature in Celsius
 * @returns Whether the item is appropriate for the weather
 */
export async function isWeatherAppropriate(
  item: string,
  weatherCondition: string,
  temperature: number
): Promise<boolean> {
  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: `You are a fashion expert. Determine if a clothing item is appropriate for given weather conditions.
          Respond with a single word: "yes" or "no".`,
        },
        {
          role: "user",
          content: `Is this item appropriate for ${weatherCondition} weather at ${temperature}°C?\nItem: ${item}`,
        },
      ],
    });

    const content = response.choices[0]?.message?.content;
    const contentStr = typeof content === "string" ? content : "";
    return contentStr.toLowerCase().trim() === "yes";
  } catch (error) {
    console.error("Failed to check weather appropriateness:", error);
    return false;
  }
}

/**
 * Generate a clean product photo from a clothing item photo
 * @param imageUrl - S3 URL of the original clothing photo
 * @param clothingDescription - Description of the clothing item
 * @returns URL of the generated product photo
 */
export async function generateProductPhoto(
  imageUrl: string,
  clothingDescription: string
): Promise<string> {
  try {
    // Use the imageGeneration module to generate product photos
    const { generateImage } = await import("./_core/imageGeneration");
    
    const prompt = `Create a professional e-commerce product photo of a ${clothingDescription}. The image should have: pure white background, clothing item centered and well-lit, professional product photography style, no shadows or distractions, clear sharp details of the garment, high quality studio lighting, flat lay or on-model presentation`;
    
    const result = await generateImage({
      prompt,
    });
    
    if (!result.url) {
      throw new Error("Failed to generate product photo");
    }

    return result.url;
  } catch (error) {
    console.error("Failed to generate product photo:", error);
    throw new Error("Failed to generate product photo");
  }
}
