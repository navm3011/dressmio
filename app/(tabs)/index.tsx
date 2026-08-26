import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { ScreenContainer } from '@/components/screen-container';
import { GradientBackground, GradientPresets } from '@/components/gradient-background';
import { HangerGraphic, OutfitGraphic, AIMagicGraphic, CameraGraphic, HeartGraphic, StatsGraphic } from '@/components/closet-graphics';
import { AnimatedLogoEnhanced } from '@/components/animated-logo-enhanced';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColors } from '@/hooks/use-colors';
import { hapticFeedback } from '@/lib/haptics';
import { LinearGradient } from 'expo-linear-gradient';

/**
 * Home Screen - Smart Closet Welcome & Features
 * 
 * Displays an attractive introduction to the app with:
 * - Hero section with graphics
 * - Key features showcase
 * - Call-to-action buttons
 * - Visual hierarchy and animations
 */
export default function HomeScreen() {
  const router = useRouter();
  const colors = useColors();

  const handleGetStarted = async () => {
    await hapticFeedback.selection();
    router.push('/(tabs)/closet');
  };

  const handleLearnMore = async () => {
    await hapticFeedback.selection();
    router.push('/(tabs)/suggestions');
  };

  const handleAICategorization = async () => {
    await hapticFeedback.selection();
    router.push('/(tabs)/closet');
  };

  const handleSaveFavorites = async () => {
    await hapticFeedback.selection();
    router.push('/(tabs)/saved-outfits');
  };

  return (
    <GradientBackground colors={GradientPresets.closet.colors}>
      <ScreenContainer className="flex-1">
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <View className="gap-8 py-6">
            {/* Hero Section */}
            <Animated.View entering={FadeInDown.duration(500)} className="items-center gap-4">
              <AnimatedLogoEnhanced size={180} />
            </Animated.View>

            {/* Features Grid */}
            <Animated.View entering={FadeInUp.duration(500).delay(100)} className="gap-4 px-4">
              {/* Feature 1 - Camera */}
              <Pressable
                onPress={handleGetStarted}
                style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1, transform: [{ scale: pressed ? 0.95 : 1 }] }]}
              >
                <View className="rounded-2xl overflow-hidden shadow-lg">
                  <LinearGradient
                    colors={['#3b82f6', '#06b6d4']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ padding: 20, flexDirection: 'row', alignItems: 'center', gap: 16 }}
                  >
                    <View className="bg-white/20 rounded-full p-3">
                      <CameraGraphic size={32} color="#FFFFFF" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-white font-bold text-lg">Capture Your Style</Text>
                      <Text className="text-white/80 text-xs mt-1">Photograph items from your closet</Text>
                    </View>
                    <IconSymbol name="chevron.right" size={20} color="#FFFFFF" />
                  </LinearGradient>
                </View>
              </Pressable>

              {/* Feature 2 - AI Magic */}
              <Pressable
                onPress={handleAICategorization}
                style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1, transform: [{ scale: pressed ? 0.95 : 1 }] }]}
              >
                <View className="rounded-2xl overflow-hidden shadow-lg">
                  <LinearGradient
                    colors={['#f59e0b', '#f97316']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ padding: 20, flexDirection: 'row', alignItems: 'center', gap: 16 }}
                  >
                    <View className="bg-white/20 rounded-full p-3">
                      <AIMagicGraphic size={32} color="#FFFFFF" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-white font-bold text-lg">AI Categorization</Text>
                      <Text className="text-white/80 text-xs mt-1">Automatic clothing detection</Text>
                    </View>
                    <IconSymbol name="chevron.right" size={20} color="#FFFFFF" />
                  </LinearGradient>
                </View>
              </Pressable>

              {/* Feature 3 - Outfit Suggestions */}
              <Pressable
                onPress={handleLearnMore}
                style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1, transform: [{ scale: pressed ? 0.95 : 1 }] }]}
              >
                <View className="rounded-2xl overflow-hidden shadow-lg">
                  <LinearGradient
                    colors={['#ec4899', '#f43f5e']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ padding: 20, flexDirection: 'row', alignItems: 'center', gap: 16 }}
                  >
                    <View className="bg-white/20 rounded-full p-3">
                      <OutfitGraphic size={32} color="#FFFFFF" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-white font-bold text-lg">Smart Suggestions</Text>
                      <Text className="text-white/80 text-xs mt-1">AI-powered outfit ideas</Text>
                    </View>
                    <IconSymbol name="chevron.right" size={20} color="#FFFFFF" />
                  </LinearGradient>
                </View>
              </Pressable>

              {/* Feature 4 - Heart */}
              <Pressable
                onPress={handleSaveFavorites}
                style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1, transform: [{ scale: pressed ? 0.95 : 1 }] }]}
              >
                <View className="rounded-2xl overflow-hidden shadow-lg">
                  <LinearGradient
                    colors={['#8b5cf6', '#a855f7']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ padding: 20, flexDirection: 'row', alignItems: 'center', gap: 16 }}
                  >
                    <View className="bg-white/20 rounded-full p-3">
                      <HeartGraphic size={32} color="#FFFFFF" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-white font-bold text-lg">Save Your Favorites</Text>
                      <Text className="text-white/80 text-xs mt-1">Build your perfect wardrobe</Text>
                    </View>
                    <IconSymbol name="chevron.right" size={20} color="#FFFFFF" />
                  </LinearGradient>
                </View>
              </Pressable>

              {/* Feature 5 - Stats (Disabled for this version) */}
            </Animated.View>

            {/* Why Dressmio Section */}
            <Animated.View entering={FadeInUp.duration(500).delay(200)} className="px-4 gap-4">
              <Text className="text-2xl font-bold text-foreground">Why Dressmio?</Text>
              
              <View className="bg-surface rounded-xl p-4 border border-border">
                <View className="flex-row items-start gap-3">
                  <IconSymbol name="magnifyingglass" size={24} color={colors.primary} />
                  <View className="flex-1">
                    <Text className="font-semibold text-foreground">Easy to Find Outfit</Text>
                  </View>
                </View>
              </View>

              <View className="bg-surface rounded-xl p-4 border border-border">
                <View className="flex-row items-start gap-3">
                  <IconSymbol name="clock.fill" size={24} color={colors.primary} />
                  <View className="flex-1">
                    <Text className="font-semibold text-foreground">Save Time Getting Ready</Text>
                  </View>
                </View>
              </View>

              <View className="bg-surface rounded-xl p-4 border border-border">
                <View className="flex-row items-start gap-3">
                  <IconSymbol name="sparkles" size={24} color={colors.primary} />
                  <View className="flex-1">
                    <Text className="font-semibold text-foreground">Get Fresh Outfit Ideas</Text>
                  </View>
                </View>
              </View>

              <View className="bg-surface rounded-xl p-4 border border-border">
                <View className="flex-row items-start gap-3">
                  <IconSymbol name="chart.bar.fill" size={24} color={colors.primary} />
                  <View className="flex-1">
                    <Text className="font-semibold text-foreground">Maximize Your Existing Wardrobe</Text>
                  </View>
                </View>
              </View>
            </Animated.View>

            {/* CTA Buttons */}
            <Animated.View entering={FadeInUp.duration(500).delay(300)} className="gap-3 px-4 pb-4">
              <Pressable
                onPress={handleGetStarted}
                style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1, transform: [{ scale: pressed ? 0.95 : 1 }] }]}
              >
                <View className="rounded-full overflow-hidden shadow-lg">
                  <LinearGradient
                    colors={[colors.primary, colors.primary]}
                    style={{ paddingVertical: 16, alignItems: 'center' }}
                  >
                    <Text className="text-white font-bold text-lg">Get Started</Text>
                  </LinearGradient>
                </View>
              </Pressable>

              <Pressable
                onPress={handleLearnMore}
                style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1, transform: [{ scale: pressed ? 0.95 : 1 }] }]}
              >
                <View className="border-2 border-primary rounded-full py-4 items-center">
                  <Text className="text-primary font-bold text-lg">Learn More</Text>
                </View>
              </Pressable>
            </Animated.View>
          </View>
        </ScrollView>
      </ScreenContainer>
    </GradientBackground>
  );
}
