import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import * as Haptics from "expo-haptics";
import { useRef, useCallback } from "react";

export function HapticTab(props: BottomTabBarButtonProps) {
  const lastPressTime = useRef<number>(0);

  const handlePress = useCallback((ev: any) => {
    const now = Date.now();
    const timeSinceLastPress = now - lastPressTime.current;

    if (timeSinceLastPress < 300) {
      // Double tap detected - provide haptic feedback
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      lastPressTime.current = 0; // Reset to prevent triple-tap issues
      return;
    }

    lastPressTime.current = now;
    // Call default press handler
    props.onPress?.(ev);
  }, [props]);

  return (
    <PlatformPressable
      {...props}
      onPress={handlePress}
      onPressIn={(ev) => {
        if (process.env.EXPO_OS === "ios") {
          // Add a soft haptic feedback when pressing down on the tabs.
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev);
      }}
    />
  );
}
