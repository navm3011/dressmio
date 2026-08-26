import { FlatList, View, Text, Pressable, TextInput, ActivityIndicator, Modal, ScrollView, Alert, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useMemo, useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useCloset } from "@/lib/closet-provider";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { cn } from "@/lib/utils";
import { hapticFeedback } from "@/lib/haptics";
import { Image } from "expo-image";
import { ClothingItem } from "@/lib/types";
import { useRouter } from "expo-router";

export default function ClosetScreen() {
  const colors = useColors();
  const { items, loading, deleteItem } = useCloset();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const categories = ["tops", "bottoms", "shoes", "accessories", "outerwear", "dresses"];

  // Filter items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        searchQuery === "" ||
        item.color?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.specificType?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === null || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [items, searchQuery, selectedCategory]);

  const router = useRouter();

  const toggleItemSelection = useCallback(
    (itemId: string) => {
      const newSelectedIds = new Set(selectedIds);
      if (newSelectedIds.has(itemId)) {
        newSelectedIds.delete(itemId);
      } else {
        newSelectedIds.add(itemId);
      }
      setSelectedIds(newSelectedIds);
      if (newSelectedIds.size === 0) {
        setIsMultiSelectMode(false);
      }
    },
    [selectedIds]
  );

  const handleDeleteSelected = useCallback(async () => {
    const count = selectedIds.size;
    Alert.alert(
      'Delete Items',
      `Delete ${count} item${count > 1 ? 's' : ''}?`,
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              for (const id of selectedIds) {
                await deleteItem(id);
              }
              await hapticFeedback.success();
              setSelectedIds(new Set());
              setIsMultiSelectMode(false);
            } catch (error) {
              console.error('Failed to delete items:', error);
              Alert.alert('Error', 'Failed to delete items');
            }
          },
          style: 'destructive',
        },
      ]
    );
  }, [selectedIds, deleteItem]);

  const renderItem = useCallback(
    ({ item }: { item: ClothingItem }) => {
      const isSelected = selectedIds.has(item.id);
      return (
        <View className="flex-1 max-w-1/2">
          {isMultiSelectMode && (
            <View className="absolute top-2 left-2 z-10 bg-primary rounded-full p-1.5">
              {isSelected && (
                <IconSymbol name="checkmark" size={16} color={colors.background} />
              )}
            </View>
          )}
          <Pressable
            onPress={() => {
              if (isMultiSelectMode) {
                hapticFeedback.selection();
                toggleItemSelection(item.id);
              } else {
                hapticFeedback.selection();
                router.push(`/item/${item.id}`);
              }
            }}
            onLongPress={() => {
              hapticFeedback.selection();
              setIsMultiSelectMode(true);
              toggleItemSelection(item.id);
            }}
            style={({ pressed }) => [
              {
                opacity: isSelected ? 0.5 : pressed ? 0.7 : 1,
              },
            ]}
          >
            <View className={cn(
              "bg-surface rounded-lg overflow-hidden shadow-sm border-2",
              isSelected ? "border-primary" : "border-border"
            )}>
              <Image
                source={{ uri: item.imageUri }}
                style={{ width: "100%", height: 150 }}
                contentFit="cover"
              />
              <View className="p-2">
                <Text className="text-xs font-semibold text-foreground capitalize">{item.specificType}</Text>
                <Text className="text-xs text-muted capitalize">{item.color}</Text>
              </View>
            </View>
          </Pressable>
        </View>
      );
    },
    [isMultiSelectMode, selectedIds, toggleItemSelection]
  );

  if (loading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <ActivityIndicator size="large" color={colors.primary} />
      </ScreenContainer>
    );
  }

  return (
    <>
      <ScreenContainer className="flex-1 p-0">
        <View className="flex-1">
          {/* Header with Info and Home Buttons */}
          {items.length === 0 && (
            <View className="flex-row justify-end gap-2 px-4 py-3">
              <Pressable
                onPress={() => {
                  Alert.alert(
                    'My Closet',
                    'Add your clothing items here to build your digital wardrobe. Once you have items, you can get AI-powered outfit suggestions!'
                  );
                }}
                style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1, transform: [{ scale: pressed ? 0.95 : 1 }] }]}
              >
                <View
                  className="rounded-full p-2"
                  style={{ backgroundColor: colors.primary + '20' }}
                >
                  <IconSymbol
                    name="info.circle"
                    size={24}
                    color={colors.primary}
                  />
                </View>
              </Pressable>
              <Pressable
                onPress={() => {
                  hapticFeedback.selection();
                  router.push('/(tabs)');
                }}
                style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1, transform: [{ scale: pressed ? 0.95 : 1 }] }]}
              >
                <View
                  className="rounded-full p-2"
                  style={{ backgroundColor: colors.primary + '20' }}
                >
                  <IconSymbol
                    name="house.fill"
                    size={24}
                    color={colors.primary}
                  />
                </View>
              </Pressable>
            </View>
          )}
          {items.length > 0 && (
            <View className="px-4 pt-4 pb-2">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-3xl font-bold text-foreground">My Wardrobe</Text>
                <View className="flex-row items-center gap-2">
                  <View className="bg-primary rounded-full px-3 py-1">
                    <Text className="text-xs font-semibold text-background">{items.length}</Text>
                  </View>
                  <Pressable
                    onPress={() => {
                      Alert.alert(
                        'My Closet',
                        'Add your clothing items here to build your digital wardrobe. Once you have items, you can get AI-powered outfit suggestions!'
                      );
                    }}
                    style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1, transform: [{ scale: pressed ? 0.95 : 1 }] }]}
                  >
                    <View
                      className="rounded-full p-2"
                      style={{ backgroundColor: colors.primary + '20' }}
                    >
                      <IconSymbol
                        name="info.circle"
                        size={20}
                        color={colors.primary}
                      />
                    </View>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      hapticFeedback.selection();
                      router.push('/(tabs)');
                    }}
                    style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1, transform: [{ scale: pressed ? 0.95 : 1 }] }]}
                  >
                    <View
                      className="rounded-full p-2"
                      style={{ backgroundColor: colors.primary + '20' }}
                    >
                      <IconSymbol
                        name="house.fill"
                        size={20}
                        color={colors.primary}
                      />
                    </View>
                  </Pressable>
                </View>
              </View>

              {/* Search Bar */}
              <View className="flex-row items-center bg-surface border border-border rounded-lg px-3 py-2 mb-3">
                <IconSymbol name="magnifyingglass" size={16} color={colors.muted} />
                <TextInput
                  placeholder="Search by color..."
                  placeholderTextColor={colors.muted}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  className="flex-1 ml-2 text-sm text-foreground"
                />
              </View>

              {/* Category Filter */}
              <View className="flex-row flex-wrap gap-2">
                {categories.map((category) => (
                  <Pressable
                    key={category}
                    onPress={() => {
                      hapticFeedback.selection();
                      setSelectedCategory(selectedCategory === category ? null : category);
                    }}
                  >
                    <View
                      className={cn(
                        "px-3 py-2 rounded-full border",
                        selectedCategory === category
                          ? "bg-primary border-primary"
                          : "bg-surface border-border"
                      )}
                    >
                      <Text
                        className={cn(
                          "text-xs font-semibold capitalize",
                          selectedCategory === category ? "text-background" : "text-foreground"
                        )}
                      >
                        {category}
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </View>
            </View>
          )}

          {/* Items Grid */}
          {items.length > 0 ? (
            filteredItems.length > 0 ? (
              <FlatList
                data={filteredItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={{
                  paddingHorizontal: 8,
                  paddingVertical: 12,
                  gap: 8,
                }}
                columnWrapperStyle={{
                  gap: 8,
                }}
              />
            ) : (
              <View className="flex-1 items-center justify-center px-4">
                <Text className="text-lg font-semibold text-foreground">No Items Found</Text>
                <Text className="text-sm text-muted text-center mt-2">
                  Try adjusting your search or filters
                </Text>
              </View>
            )
          ) : (
            <View className="flex-1 items-center justify-center px-4 gap-4">
              <Text className="text-2xl font-bold text-foreground">Your Closet is Empty</Text>
              <Text className="text-sm text-muted text-center">Add your first item to get started</Text>
              <Pressable
                onPress={() => {
                  hapticFeedback.selection();
                  router.push('/(tabs)/add-item');
                }}
                style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1, transform: [{ scale: pressed ? 0.95 : 1 }] }]}
              >
                <View className="bg-primary rounded-full px-6 py-3 mt-4">
                  <Text className="text-background font-semibold text-center">Add Your First Item</Text>
                </View>
              </Pressable>
            </View>
          )}
        </View>
      </ScreenContainer>

      {/* Multi-Select Bottom Bar */}
      {isMultiSelectMode && selectedIds.size > 0 && (
        <View className="px-4 py-3 bg-surface border-t border-border flex-row gap-3 items-center">
          <Pressable
            onPress={() => {
              setIsMultiSelectMode(false);
              setSelectedIds(new Set());
            }}
            className="flex-1 py-3 rounded-lg border border-border items-center"
          >
            <Text className="text-sm font-semibold text-foreground">Cancel</Text>
          </Pressable>
          <Pressable
            onPress={handleDeleteSelected}
            className="flex-1 py-3 rounded-lg bg-error items-center"
          >
            <Text className="text-sm font-semibold text-background">
              Delete ({selectedIds.size})
            </Text>
          </Pressable>
        </View>
      )}
    </>
  );
}
