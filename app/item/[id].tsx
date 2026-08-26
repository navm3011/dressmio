import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useCloset } from "@/lib/closet-provider";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { Image } from "expo-image";

export default function ItemDetailScreen() {
  const colors = useColors();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { items } = useCloset();

  const item = items.find((i) => i.id === id);

  if (!item) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text className="text-lg font-semibold text-foreground">Item not found</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="flex-1 p-0">
      {/* Header with Back Button */}
      <View
        className="flex-row items-center px-4 py-3 border-b"
        style={{ borderBottomColor: colors.border }}
      >
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.6}>
          <View className="flex-row items-center">
            <IconSymbol name="chevron.left" size={28} color={colors.primary} />
            <Text className="text-lg font-semibold text-primary ml-1">Back</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
        {/* Item Image */}
        <Image
          source={{ uri: item.imageUri }}
          style={{ width: "100%", height: 300, borderRadius: 12, marginBottom: 16 }}
          contentFit="cover"
        />

        {/* Item Details */}
        <View className="bg-surface rounded-lg p-4 border" style={{ borderColor: colors.border }}>
          <Text className="text-2xl font-bold text-foreground mb-4 capitalize">{item.specificType}</Text>

          <View className="mb-4">
            <Text className="text-xs font-semibold text-muted mb-1">COLOR</Text>
            <Text className="text-base text-foreground capitalize">{item.color}</Text>
          </View>

          <View className="mb-4">
            <Text className="text-xs font-semibold text-muted mb-1">CATEGORY</Text>
            <Text className="text-base text-foreground capitalize">{item.category}</Text>
          </View>

          <View className="mb-4">
            <Text className="text-xs font-semibold text-muted mb-1">STYLE</Text>
            <Text className="text-base text-foreground capitalize">{item.style}</Text>
          </View>

          {item.material && (
            <View className="mb-4">
              <Text className="text-xs font-semibold text-muted mb-1">MATERIAL</Text>
              <Text className="text-base text-foreground capitalize">{item.material}</Text>
            </View>
          )}

          {item.fit && (
            <View className="mb-4">
              <Text className="text-xs font-semibold text-muted mb-1">FIT</Text>
              <Text className="text-base text-foreground capitalize">{item.fit}</Text>
            </View>
          )}

          {item.pattern && (
            <View>
              <Text className="text-xs font-semibold text-muted mb-1">PATTERN</Text>
              <Text className="text-base text-foreground capitalize">{item.pattern}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
