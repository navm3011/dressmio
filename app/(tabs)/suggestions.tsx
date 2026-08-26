import { ScrollView, View, Text, Image, Pressable, ActivityIndicator } from 'react-native';
import { useState, useCallback } from 'react';
import { ScreenContainer } from '@/components/screen-container';
import { useCloset } from '@/lib/closet-provider';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColors } from '@/hooks/use-colors';
import { OutfitSuggestion, SavedOutfit, OutfitWearHistory, Occasion } from '@/lib/types';
import { trpc } from '@/lib/trpc';
import { hapticFeedback } from '@/lib/haptics';
import { GradientBackground, GradientPresets } from '@/components/gradient-background';
import { ScreenHeader } from '@/components/screen-header';
import Animated, { FadeInUp, ZoomIn } from 'react-native-reanimated';
import { useOnboarding } from '@/lib/onboarding-provider';
import { OnboardingTooltip, OnboardingOverlay } from '@/components/onboarding-tooltip';

export default function SuggestionsScreen() {
  const colors = useColors();
  const { items, saveOutfit, savedOutfits } = useCloset();
  const { currentStep, showTooltip, completeStep } = useOnboarding();
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<OutfitSuggestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSuggestionsTooltip, setShowSuggestionsTooltip] = useState(currentStep === 'suggestions' && showTooltip);
  const [selectedOccasion, setSelectedOccasion] = useState<Occasion | 'all'>('all');

  const occasionOptions: Array<{ label: string; value: Occasion | 'all' }> = [
    { label: 'All', value: 'all' },
    { label: 'Casual', value: 'casual' },
    { label: 'Work', value: 'work' },
    { label: 'Business', value: 'business' },
    { label: 'Formal', value: 'formal' },
    { label: 'Date Night', value: 'date-night' },
    { label: 'Gym', value: 'gym' },
    { label: 'Athletic', value: 'athletic' },
    { label: 'Weekend', value: 'weekend' },
    { label: 'Party', value: 'party' },
    { label: 'Brunch', value: 'brunch' },
    { label: 'Dinner', value: 'dinner' },
    { label: 'Travel', value: 'travel' },
  ];

  const generateOutfitsMutation = trpc.ai.generateOutfits.useMutation();

  // Compute current outfit outside of callbacks
  const currentOutfitValue = suggestions.length > 0 ? suggestions[currentIndex] : undefined;
  const currentOutfit = currentOutfitValue;

  /**
   * Find an item by matching its description
   * Tries exact match first, then partial match
   */
  const findItemByDescription = useCallback((description: string | undefined | null, category: string) => {
    if (!description) return undefined;
    
    // Try exact match first
    let found = items.find(
      (item) => item.category === category && 
      `${item.specificType} (${item.color})`.toLowerCase() === description.toLowerCase()
    );
    
    if (found) return found;
    
    // Try partial match - match by color and type
    const descLower = description.toLowerCase();
    found = items.find(
      (item) => item.category === category && 
      descLower.includes(item.color.toLowerCase()) &&
      descLower.includes(item.specificType.toLowerCase())
    );
    
    if (found) return found;
    
    // Fallback: just match by category and color
    found = items.find(
      (item) => item.category === category && 
      descLower.includes(item.color.toLowerCase())
    );
    
    if (found) return found;
    
    // Last resort: return first item of category
    return items.find((item) => item.category === category);
  }, [items]);

  const generateOutfitSuggestion = useCallback(async () => {
    if (items.length === 0) {
      alert('Add some clothing items to your closet first!');
      return;
    }

    await hapticFeedback.medium();
    setLoading(true);
    try {
      const itemDescriptions = items.map((item) => `${item.specificType} (${item.color})`);

      const result = await generateOutfitsMutation.mutateAsync({
        items: itemDescriptions,
        count: 3, // Generate 3 outfit suggestions
        occasion: selectedOccasion !== 'all' ? selectedOccasion : undefined,
      });

      if (result.success && result.data && Array.isArray(result.data)) {
        // Convert API suggestions to OutfitSuggestion format
        const outfitSuggestions: OutfitSuggestion[] = result.data.map((suggestion, idx) => {
          // Use AI-selected items if available, otherwise fall back to category matching
          const selectedItems = suggestion.selectedItems;
          
          return {
            id: `suggestion-${Date.now()}-${idx}`,
            items: {
              top: selectedItems?.topDescription 
                ? findItemByDescription(selectedItems.topDescription, 'tops')
                : items.find((i) => i.category === 'tops'),
              bottom: selectedItems?.bottomDescription
                ? findItemByDescription(selectedItems.bottomDescription, 'bottoms')
                : items.find((i) => i.category === 'bottoms'),
              shoes: selectedItems?.shoesDescription
                ? findItemByDescription(selectedItems.shoesDescription, 'shoes')
                : items.find((i) => i.category === 'shoes'),
              accessories: selectedItems?.accessoriesDescription && selectedItems.accessoriesDescription.length > 0
                ? selectedItems.accessoriesDescription
                    .map((desc) => findItemByDescription(desc, 'accessories'))
                    .filter((item) => item !== undefined)
                : [],
            },
            occasion: (suggestion.occasion as Occasion) || 'casual',
            tips: suggestion.reason || suggestion.tips?.[0] || 'Enjoy this outfit!',
          };
        });
        setSuggestions(outfitSuggestions);
        setCurrentIndex(0);
        await hapticFeedback.success();
      } else {
        alert('Failed to generate outfit suggestions');
      }
    } catch (error) {
      console.error('Failed to generate outfit:', error);
      await hapticFeedback.error();
      alert('Failed to generate outfit suggestion');
    } finally {
      setLoading(false);
    }
  }, [items, generateOutfitsMutation, findItemByDescription, selectedOccasion]);

  const handleSaveOutfit = useCallback(async () => {
    if (!currentOutfit) return;
    const outfit: SavedOutfit = {
      id: `outfit-${Date.now()}`,
      items: {
        top: currentOutfit?.items.top?.id || undefined,
        bottom: currentOutfit?.items.bottom?.id || undefined,
        shoes: currentOutfit?.items.shoes?.id || undefined,
        accessories: currentOutfit?.items.accessories?.map((a) => a.id) || [],
      },
      occasion: currentOutfit?.occasion as any,
      wearHistory: [],
      wearCount: 0,
      lastWornAt: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    await saveOutfit(outfit);
    await hapticFeedback.success();
    alert('Outfit saved!');
  }, [currentOutfit, saveOutfit]);

  const handleNextOutfit = useCallback(async () => {
    if (suggestions.length <= 1) return; // Don't navigate if only 1 outfit
    await hapticFeedback.selection();
    setCurrentIndex((prev) => (prev + 1) % suggestions.length);
  }, [suggestions.length]);

  const handlePrevOutfit = useCallback(async () => {
    if (suggestions.length <= 1) return; // Don't navigate if only 1 outfit
    await hapticFeedback.selection();
    setCurrentIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
  }, [suggestions.length]);

  const handleWearOutfitFromSuggestion = useCallback(async () => {
    if (!currentOutfit) return;
    const outfit: SavedOutfit = {
      id: `outfit-${Date.now()}`,
      items: {
        top: currentOutfit?.items.top?.id || undefined,
        bottom: currentOutfit?.items.bottom?.id || undefined,
        shoes: currentOutfit?.items.shoes?.id || undefined,
        accessories: currentOutfit?.items.accessories?.map((a) => a.id) || [],
      },
      occasion: currentOutfit?.occasion as any,
      wearHistory: [
        {
          wornAt: Date.now(),
          occasion: currentOutfit?.occasion,
        },
      ],
      wearCount: 1,
      lastWornAt: Date.now(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    await saveOutfit(outfit);
    await hapticFeedback.success();
    alert('Outfit saved and marked as worn!');
  }, [currentOutfit, saveOutfit]);

  return (
    <GradientBackground colors={GradientPresets.suggestions.colors}>
      <ScreenContainer className="flex-1" containerClassName="bg-transparent">
        <ScreenHeader 
          infoTitle="Outfit Suggestions"
          infoMessage="Get AI-powered outfit recommendations based on your closet items. Select an occasion to filter suggestions."
        />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          <View className="px-4 py-4 border-b border-border bg-background/60">
            <Text className="text-3xl font-bold text-foreground">Outfit Suggestions</Text>
            <Text className="text-sm text-muted mt-1">Get AI-powered outfit recommendations</Text>
          </View>

          {/* Occasion Filter - Always Visible */}
          <View className="px-4 py-4 bg-background/40">
            <Text className="text-sm font-semibold text-foreground mb-3">Select Occasion</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-2" contentContainerStyle={{ gap: 8 }}>
              {occasionOptions.map((option) => (
                <Pressable
                  key={option.value}
                  onPress={() => setSelectedOccasion(option.value)}
                  style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                >
                  <View
                    className={`px-4 py-2 rounded-full ${
                      selectedOccasion === option.value
                        ? 'bg-primary'
                        : 'bg-surface border border-border'
                    }`}
                  >
                    <Text
                      className={`text-sm font-medium ${
                        selectedOccasion === option.value ? 'text-background' : 'text-foreground'
                      }`}
                    >
                      {option.label}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {suggestions.length === 0 ? (
            <View className="flex-1 items-center justify-center px-4 py-12">
              <View className="bg-surface rounded-full p-6 mb-6 border-2 border-primary/20 shadow-md">
                <IconSymbol name="sparkles" size={64} color={colors.primary} />
              </View>
              <Text className="text-xl font-bold text-foreground mt-6 text-center">No Suggestions Yet</Text>
              <Text className="text-sm text-muted text-center mt-2">
                Generate outfit suggestions based on your closet items
              </Text>

              <Pressable
                onPress={generateOutfitSuggestion}
                disabled={loading || items.length === 0}
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1, transform: [{ scale: pressed ? 0.95 : 1 }] }]}
                className="mt-8"
              >
                <View className="bg-primary rounded-2xl px-8 py-4 shadow-lg">
                  {loading ? (
                    <ActivityIndicator color="#ffffff" />
                  ) : (
                    <Text className="text-white font-bold text-lg">Generate Outfit</Text>
                  )}
                </View>
              </Pressable>
            </View>
          ) : (
            <View className="px-4 py-6 gap-6">
              {/* Outfit Card */}
              <Animated.View entering={ZoomIn.duration(500)} className="bg-surface rounded-2xl overflow-hidden border border-border shadow-lg">
                <View className="p-6 gap-4">
                  {/* Outfit Items */}
                  <View className="gap-3">
                    {currentOutfit?.items.top && (
                      <View className="flex-row gap-3 items-center">
                        <Image
                          source={{ uri: currentOutfit.items.top.imageUri }}
                          style={{ width: 60, height: 60 }}
                          className="rounded-lg"
                        />
                        <View className="flex-1">
                          <Text className="text-sm font-semibold text-foreground">{currentOutfit.items.top.specificType}</Text>
                          <Text className="text-xs text-muted mt-1">{currentOutfit.items.top.color}</Text>
                        </View>
                      </View>
                    )}

                    {currentOutfit?.items.bottom && (
                      <View className="flex-row gap-3 items-center">
                        <Image
                          source={{ uri: currentOutfit.items.bottom.imageUri }}
                          style={{ width: 60, height: 60 }}
                          className="rounded-lg"
                        />
                        <View className="flex-1">
                          <Text className="text-sm font-semibold text-foreground">{currentOutfit.items.bottom.specificType}</Text>
                          <Text className="text-xs text-muted mt-1">{currentOutfit.items.bottom.color}</Text>
                        </View>
                      </View>
                    )}

                    {currentOutfit?.items.shoes && (
                      <View className="flex-row gap-3 items-center">
                        <Image
                          source={{ uri: currentOutfit.items.shoes.imageUri }}
                          style={{ width: 60, height: 60 }}
                          className="rounded-lg"
                        />
                        <View className="flex-1">
                          <Text className="text-sm font-semibold text-foreground">{currentOutfit.items.shoes.specificType}</Text>
                          <Text className="text-xs text-muted mt-1">{currentOutfit.items.shoes.color}</Text>
                        </View>
                      </View>
                    )}
                  </View>

                  {/* Occasion and Tips */}
                  <View className="mt-4 pt-4 border-t border-border">
                    <View className="flex-row items-center gap-2 mb-2">
                      <View className="bg-primary/20 rounded-full px-3 py-1">
                        <Text className="text-xs font-semibold text-primary capitalize">{currentOutfit?.occasion}</Text>
                      </View>
                    </View>
                    <Text className="text-sm text-foreground font-medium">{currentOutfit?.tips}</Text>
                  </View>

                  {/* Action Buttons */}
                  <View className="flex-row gap-3 mt-6">
                    <Pressable
                      onPress={handleSaveOutfit}
                      style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1, flex: 1 }]}
                    >
                      <View className="bg-primary rounded-lg px-4 py-3">
                        <Text className="text-white font-semibold text-center">Save Outfit</Text>
                      </View>
                    </Pressable>
                    <Pressable
                      onPress={handleWearOutfitFromSuggestion}
                      style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1, flex: 1 }]}
                    >
                      <View className="bg-primary/20 rounded-lg px-4 py-3 border border-primary">
                        <Text className="text-primary font-semibold text-center">Wear Now</Text>
                      </View>
                    </Pressable>
                  </View>
                </View>
              </Animated.View>

              {/* Navigation */}
              {suggestions.length > 1 && (
                <View className="flex-row items-center justify-between gap-4">
                  <Pressable
                    onPress={handlePrevOutfit}
                    style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                  >
                    <View className="bg-surface rounded-full p-3 border border-border">
                      <IconSymbol name="chevron.left" size={24} color={colors.foreground} />
                    </View>
                  </Pressable>

                  <Text className="text-sm text-muted">
                    {currentIndex + 1} of {suggestions.length}
                  </Text>

                  <Pressable
                    onPress={handleNextOutfit}
                    style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                  >
                    <View className="bg-surface rounded-full p-3 border border-border">
                      <IconSymbol name="chevron.right" size={24} color={colors.foreground} />
                    </View>
                  </Pressable>
                </View>
              )}

              {/* Generate New Button */}
              <Pressable
                onPress={generateOutfitSuggestion}
                disabled={loading}
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
              >
                <View className="bg-primary rounded-lg px-6 py-3">
                  {loading ? (
                    <ActivityIndicator color="#ffffff" />
                  ) : (
                    <Text className="text-white font-bold text-center">Generate New Outfits</Text>
                  )}
                </View>
              </Pressable>
            </View>
          )}
        </ScrollView>
      </ScreenContainer>
    </GradientBackground>
  );
}
