import { View, Pressable, Alert } from "react-native";
import { useRouter } from "expo-router";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import * as Haptics from "expo-haptics";
import { useCallback } from "react";

export interface ScreenHeaderProps {
  showButtons?: boolean;
  infoTitle?: string;
  infoMessage?: string;
}

/**
 * Screen header component with info and home buttons in top-right corner.
 * Use this component at the top of each screen to provide consistent navigation.
 */
export function ScreenHeader({ 
  showButtons = true,
  infoTitle = "Info",
  infoMessage = "No information available"
}: ScreenHeaderProps) {
  const router = useRouter();
  const colors = useColors();

  const handleHomePress = useCallback(async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push("/(tabs)");
  }, [router]);

  const handleInfoPress = useCallback(async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert(infoTitle, infoMessage);
  }, [infoTitle, infoMessage]);

  if (!showButtons) {
    return null;
  }

  return (
    <View className="flex-row justify-end gap-2 px-4 py-3">
      {/* Info Button */}
      <Pressable
        onPress={handleInfoPress}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.6 : 1,
            transform: [{ scale: pressed ? 0.95 : 1 }],
          },
        ]}
      >
        <View
          className="rounded-full p-2"
          style={{ backgroundColor: colors.primary + "20" }}
        >
          <IconSymbol
            name="info.circle"
            size={24}
            color={colors.primary}
          />
        </View>
      </Pressable>

      {/* Home Button */}
      <Pressable
        onPress={handleHomePress}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.6 : 1,
            transform: [{ scale: pressed ? 0.95 : 1 }],
          },
        ]}
      >
        <View
          className="rounded-full p-2"
          style={{ backgroundColor: colors.primary + "20" }}
        >
          <IconSymbol
            name="house.fill"
            size={24}
            color={colors.primary}
          />
        </View>
      </Pressable>
    </View>
  );
}
