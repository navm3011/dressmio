import { ScrollView, View, Text, Pressable, Alert, Image } from 'react-native';
import { useState, useCallback, useMemo } from 'react';
import { ScreenContainer } from '@/components/screen-container';
import { useCloset } from '@/lib/closet-provider';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColors } from '@/hooks/use-colors';
import { hapticFeedback } from '@/lib/haptics';
import { GradientBackground, GradientPresets } from '@/components/gradient-background';
import { ScreenHeader } from '@/components/screen-header';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function SavedOutfitsScreen() {
  const colors = useColors();
  const { savedOutfits, items, deleteOutfit } = useCloset();
  const [selectedOutfitId, setSelectedOutfitId] = useState<string | null>(null);

  const outfitsWithDetails = useMemo(() => {
    return savedOutfits.map((outfit) => {
      const topItem = items.find((item) => item.id === outfit.items.top);
      const bottomItem = items.find((item) => item.id === outfit.items.bottom);
      const shoesItem = items.find((item) => item.id === outfit.items.shoes);
      const accessoryItems = outfit.items.accessories
        ?.map((id) => items.find((item) => item.id === id))
        .filter(Boolean);

      return {
        ...outfit,
        topItem,
        bottomItem,
        shoesItem,
        accessoryItems,
      };
    });
  }, [savedOutfits, items]);

  const handleDeleteOutfit = useCallback(
    (outfitId: string) => {
      Alert.alert('Delete Outfit', 'Are you sure you want to delete this outfit?', [
        { text: 'Cancel', onPress: () => {} },
        {
          text: 'Delete',
          onPress: async () => {
            await hapticFeedback.warning();
            try {
              await deleteOutfit(outfitId);
              await hapticFeedback.success();
            } catch (error) {
              console.error('Failed to delete outfit:', error);
              await hapticFeedback.error();
            }
          },
          style: 'destructive',
        },
      ]);
    },
    [deleteOutfit]
  );

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <GradientBackground colors={GradientPresets.savedOutfits.colors}>
      <ScreenContainer className="flex-1" containerClassName="bg-transparent">
        <ScreenHeader 
          infoTitle="Saved Outfits"
          infoMessage="View and manage your favorite outfit combinations. Saved outfits help you quickly recreate looks you love and track which outfits you wear most often."
        />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          <Animated.View entering={FadeInDown.duration(500)} className="gap-4">
            {/* Header */}
            <View className="px-4 py-4 border-b border-border bg-background/60">
              <Text className="text-3xl font-bold text-foreground">Saved Outfits</Text>
              <Text className="text-sm text-muted mt-1">Your favorite outfit combinations</Text>
            </View>

            {/* Empty State */}
            {outfitsWithDetails.length === 0 ? (
              <Animated.View entering={FadeInUp.duration(500)} className="flex-1 items-center justify-center px-4 py-12">
                <View className="bg-surface rounded-full p-6 mb-6 border-2 border-primary/20 shadow-md">
                  <IconSymbol name="heart" size={64} color={colors.primary} />
                </View>
                <Text className="text-xl font-bold text-foreground mt-6 text-center">No Saved Outfits Yet</Text>
                <Text className="text-sm text-muted text-center mt-2">
                  Generate outfit suggestions and save your favorites here
                </Text>
              </Animated.View>
            ) : (
              <View className="px-4 gap-4 py-4">
                {outfitsWithDetails.map((outfit, index) => (
                  <Animated.View
                    key={outfit.id}
                    entering={FadeInUp.duration(500).delay(index * 50)}
                    className="bg-surface rounded-2xl overflow-hidden border border-border shadow-md"
                  >
                    <Pressable
                      onPress={() => setSelectedOutfitId(selectedOutfitId === outfit.id ? null : outfit.id)}
                      style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
                    >
                      <View className="p-4">
                        {/* Outfit Header */}
                        <View className="flex-row justify-between items-center mb-4">
                          <View className="flex-1">
                            <Text className="text-lg font-bold text-foreground capitalize">
                              {outfit.occasion || 'Casual'}
                            </Text>
                            <Text className="text-xs text-muted mt-1">
                              Created {formatDate(outfit.createdAt)}
                            </Text>
                          </View>
                          <View className="flex-row items-center gap-2 bg-primary/10 rounded-full px-3 py-2">
                            <IconSymbol name="heart.fill" size={14} color={colors.primary} />
                            <Text className="text-xs font-semibold text-primary">{outfit.wearCount}</Text>
                          </View>
                        </View>

                        {/* Outfit Items Preview */}
                        <View className="flex-row gap-2 mb-4">
                          {outfit.topItem && (
                            <View className="flex-1 bg-background rounded-lg p-2 items-center">
                              <Image
                                source={{ uri: outfit.topItem.imageUri }}
                                style={{ width: '100%', height: 60 }}
                                resizeMode="cover"
                              />
                              <Text className="text-xs text-muted mt-1 text-center">{outfit.topItem.specificType}</Text>
                            </View>
                          )}
                          {outfit.bottomItem && (
                            <View className="flex-1 bg-background rounded-lg p-2 items-center">
                              <Image
                                source={{ uri: outfit.bottomItem.imageUri }}
                                style={{ width: '100%', height: 60 }}
                                resizeMode="cover"
                              />
                              <Text className="text-xs text-muted mt-1 text-center">{outfit.bottomItem.specificType}</Text>
                            </View>
                          )}
                          {outfit.shoesItem && (
                            <View className="flex-1 bg-background rounded-lg p-2 items-center">
                              <Image
                                source={{ uri: outfit.shoesItem.imageUri }}
                                style={{ width: '100%', height: 60 }}
                                resizeMode="cover"
                              />
                              <Text className="text-xs text-muted mt-1 text-center">{outfit.shoesItem.specificType}</Text>
                            </View>
                          )}
                        </View>

                        {/* Expand/Collapse Indicator */}
                        <View className="flex-row items-center justify-between">
                          <Text className="text-xs text-muted">
                            {outfit.accessoryItems?.length || 0} accessories
                          </Text>
                          <IconSymbol
                            name={selectedOutfitId === outfit.id ? 'chevron.up' : 'chevron.down'}
                            size={16}
                            color={colors.muted}
                          />
                        </View>
                      </View>

                      {/* Expanded Details */}
                      {selectedOutfitId === outfit.id && (
                        <View className="border-t border-border px-4 py-4 bg-background/50">
                          {outfit.accessoryItems && outfit.accessoryItems.length > 0 && (
                            <View className="mb-4">
                              <Text className="text-sm font-semibold text-foreground mb-2">Accessories</Text>
                              <View className="flex-row flex-wrap gap-2">
                                {outfit.accessoryItems.map((item) => (
                                  <View key={item?.id} className="bg-surface rounded-lg px-3 py-1 border border-border">
                                    <Text className="text-xs text-foreground">{item?.specificType}</Text>
                                  </View>
                                ))}
                              </View>
                            </View>
                          )}

                          {/* Wear History */}
                          {outfit.wearHistory && outfit.wearHistory.length > 0 && (
                            <View className="mb-4">
                              <Text className="text-sm font-semibold text-foreground mb-2">Last Worn</Text>
                              <Text className="text-xs text-muted">
                                {formatDate(outfit.wearHistory[outfit.wearHistory.length - 1].wornAt)}
                              </Text>
                            </View>
                          )}

                          {/* Delete Button */}
                          <Pressable
                            onPress={() => handleDeleteOutfit(outfit.id)}
                            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                          >
                            <View className="bg-error/10 rounded-lg py-2 items-center flex-row justify-center gap-2 border border-error/30">
                              <IconSymbol name="trash" size={16} color={colors.error} />
                              <Text className="text-sm font-semibold text-error">Delete</Text>
                            </View>
                          </Pressable>
                        </View>
                      )}
                    </Pressable>
                  </Animated.View>
                ))}
              </View>
            )}
          </Animated.View>
        </ScrollView>
      </ScreenContainer>
    </GradientBackground>
  );
}
