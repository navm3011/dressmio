import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Platform } from "react-native";
import { useColors } from "@/hooks/use-colors";
import { SurveyModal } from "@/components/survey-modal";
import { useSurvey } from "@/lib/survey-provider";

export default function TabLayout() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === "web" ? 12 : Math.max(insets.bottom, 8);
  const tabBarHeight = 56 + bottomPadding;
  const { showSurvey, setShowSurvey, submitFeedback, isLoading, dismissSurvey } = useSurvey();

  return (
    <>
      <Tabs
        initialRouteName="closet"
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          headerShown: false,
          // tabBarButton: HapticTab,  // Temporarily disabled to test
          tabBarStyle: {
            paddingTop: 8,
            paddingBottom: bottomPadding,
            height: tabBarHeight,
            backgroundColor: colors.background,
            borderTopColor: colors.border,
            borderTopWidth: 0.5,
          },
        }}
      >
        <Tabs.Screen
          name="closet"
          options={{
            title: "Closet",
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="hanger" color={color} />,
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            href: null,
          }}
        />
        <Tabs.Screen
          name="suggestions"
          options={{
            title: "Suggestions",
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="sparkles" color={color} />,
          }}
        />
        <Tabs.Screen
          name="saved-outfits"
          options={{
            title: "Saved",
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="heart.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="gear" color={color} />,
          }}
        />
      </Tabs>

      {/* Survey Modal */}
      <SurveyModal
        visible={showSurvey}
        onClose={() => {
          setShowSurvey(false);
          dismissSurvey(1); // Use default user ID
        }}
        onSubmit={submitFeedback}
        isLoading={isLoading}
      />
    </>
  );
}
