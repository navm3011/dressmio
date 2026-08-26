import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GradientBackgroundProps {
  children?: React.ReactNode;
  colors?: [string, string, ...string[]];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  className?: string;
}

/**
 * Gradient background component for creating vibrant, lively backgrounds
 * Uses expo-linear-gradient for smooth color transitions
 */
export function GradientBackground({
  children,
  colors = ['#6366F1', '#A78BFA'] as [string, string],
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
  className = '',
}: GradientBackgroundProps) {
  return (
    <LinearGradient
      colors={colors}
      start={start}
      end={end}
      style={{ flex: 1 }}
      className={className}
    >
      {children}
    </LinearGradient>
  );
}

/**
 * Predefined gradient presets for different screens
 * Each preset features vibrant, complementary colors
 */
export const GradientPresets = {
  closet: {
    colors: ['#6366F1', '#A78BFA', '#C084FC'] as [string, string, string],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  suggestions: {
    colors: ['#EC4899', '#F97316', '#FBBF24'] as [string, string, string],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  settings: {
    colors: ['#10B981', '#14B8A6', '#06B6D4'] as [string, string, string],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  savedOutfits: {
    colors: ['#8B5CF6', '#EC4899', '#F97316'] as [string, string, string],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  addItem: {
    colors: ['#3B82F6', '#06B6D4', '#10B981'] as [string, string, string],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
};
