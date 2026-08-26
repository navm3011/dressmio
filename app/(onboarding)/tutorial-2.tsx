import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { ScreenContainer } from '@/components/screen-container';
import { useColors } from '@/hooks/use-colors';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function Tutorial2Screen() {
  const router = useRouter();
  const colors = useColors();

  return (
    <ScreenContainer className="bg-background">
      <LinearGradient
        colors={[colors.primary + '15', colors.background]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        <View className="flex-1 justify-between px-6 py-8">
          {/* Header */}
          <Animated.View entering={FadeInDown.duration(500)} className="gap-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-2xl font-bold text-foreground">Step 2 of 3</Text>
              <View className="flex-row gap-1">
                <View className="w-2 h-2 rounded-full bg-primary" />
                <View className="w-2 h-2 rounded-full bg-primary" />
                <View className="w-2 h-2 rounded-full bg-border" />
              </View>
            </View>
          </Animated.View>

          {/* Content */}
          <Animated.View entering={FadeInUp.duration(500).delay(100)} className="gap-8 items-center">
            {/* Illustration */}
            <View className="w-40 h-40 bg-surface rounded-3xl items-center justify-center">
              <IconSymbol name="chevron.right" size={80} color={colors.primary} />
            </View>

            {/* Title and Description */}
            <View className="gap-3">
              <Text className="text-3xl font-bold text-foreground text-center">
                Get AI Outfit Suggestions
              </Text>
              <Text className="text-base text-muted text-center leading-relaxed">
                Visit the Suggestions tab to see AI-powered outfit combinations. Browse through multiple suggestions and find the perfect look for any occasion.
              </Text>
            </View>

            {/* Key Points */}
            <View className="gap-3 w-full">
              <View className="flex-row gap-3 items-start">
                <View className="w-6 h-6 rounded-full bg-primary items-center justify-center mt-1">
                  <Text className="text-white font-bold text-xs">✓</Text>
                </View>
                <Text className="flex-1 text-sm text-foreground">
                  AI analyzes your wardrobe for perfect combinations
                </Text>
              </View>
              <View className="flex-row gap-3 items-start">
                <View className="w-6 h-6 rounded-full bg-primary items-center justify-center mt-1">
                  <Text className="text-white font-bold text-xs">✓</Text>
                </View>
                <Text className="flex-1 text-sm text-foreground">
                  Navigate with Previous/Next buttons
                </Text>
              </View>
              <View className="flex-row gap-3 items-start">
                <View className="w-6 h-6 rounded-full bg-primary items-center justify-center mt-1">
                  <Text className="text-white font-bold text-xs">✓</Text>
                </View>
                <Text className="flex-1 text-sm text-foreground">
                  Tap "Generate New" for fresh combinations
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* Buttons */}
          <Animated.View entering={FadeInUp.duration(500).delay(200)} className="gap-3">
            <TouchableOpacity
              onPress={() => router.push('./tutorial-3')}
              className="bg-primary rounded-full py-4 items-center"
            >
              <Text className="text-white font-semibold text-base">Next</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/(tabs)')}
              className="py-4 items-center"
            >
              <Text className="text-primary font-semibold text-base">Skip Tutorial</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </LinearGradient>
    </ScreenContainer>
  );
}
