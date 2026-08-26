// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight, SymbolViewProps } from "expo-symbols";
import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

type IconMapping = Record<SymbolViewProps["name"], ComponentProps<typeof MaterialIcons>["name"]>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  "house.fill": "home",
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
  "chevron.left": "chevron-left",
  "hanger": "checkroom",
  "sparkles": "auto-awesome",
  "gear": "settings",
  "plus.circle.fill": "add-circle",
  "photo": "image",
  "camera.fill": "camera-alt",
  "trash": "delete",
  "heart.fill": "favorite",
  "heart": "favorite-border",
  "magnifyingglass": "search",
  "checkmark.circle": "check-circle",
  "checkmark.circle.fill": "check-circle",
  "chart.bar.fill": "bar-chart",
  "chevron.up": "expand-less",
  "chevron.down": "expand-more",
  "lightbulb.fill": "lightbulb",
  "icloud": "cloud",
  "icloud.fill": "cloud",
  "star.fill": "star",
  "star": "star-border",
  "xmark": "close",
  "xmark.circle": "cancel",
  "arrow.right": "arrow-forward",
  "arrow.left": "arrow-back",
  "info.circle": "info",
  "exclamationmark.circle": "warning",
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  const mappedName = MAPPING[name];
  
  // Fallback to a default icon if mapping is not found
  if (!mappedName) {
    console.warn(`Icon "${name}" not found in mapping, using fallback`);
    return <MaterialIcons color={color} size={size} name="help" style={style} />;
  }
  
  return <MaterialIcons color={color} size={size} name={mappedName} style={style} />;
}
