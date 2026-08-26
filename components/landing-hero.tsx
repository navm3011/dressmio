import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColors } from '@/hooks/use-colors';
import { hapticFeedback } from '@/lib/haptics';
import { OnboardingTips } from '@/components/onboarding-tips';
import { LinearGradient } from 'expo-linear-gradient';

interface LandingHeroProps {
  itemCount: number;
  outfitCount: number;
}

/**
 * Hero section for the landing page with welcome message and quick actions
 */
export function LandingHero({ itemCount, outfitCount }: LandingHeroProps) {
  const router = useRouter();
  const colors = useColors();

  const handleAddItem = async () => {
    await hapticFeedback.selection();
    router.push('/(tabs)/add-item');
  };

  const handleGenerateOutfit = async () => {
    await hapticFeedback.selection();
    router.push('/(tabs)/suggestions');
  };

  return (
    <ScrollView 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1"
    >
      <View className="px-4 py-6 gap-6">
        {/* Welcome Section */}
        <Animated.View entering={FadeInDown.duration(500)} className="gap-2">
          <Text className="text-4xl font-bold text-foreground">
            Welcome Back!
          </Text>
          <Text className="text-base text-muted">
            Your AI-powered fashion assistant is ready to help
          </Text>
        </Animated.View>

        {/* Statistics Cards */}
        <Animated.View entering={FadeInUp.duration(500).delay(100)} className="flex-row gap-3">
          <Pressable
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1, transform: [{ scale: pressed ? 0.95 : 1 }] }]}
            className="flex-1"
          >
            <View className="rounded-2xl overflow-hidden shadow-lg">
              <LinearGradient
                colors={['#6366f1', '#9333ea']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ padding: 16 }}
              >
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text className="text-white/70 text-xs font-semibold">Closet Items</Text>
                    <Text className="text-white text-3xl font-bold mt-1">{itemCount}</Text>
                  </View>
                  <View className="bg-white/20 rounded-full p-3">
                    <IconSymbol name="hanger" size={24} color="#FFFFFF" />
                  </View>
                </View>
              </LinearGradient>
            </View>
          </Pressable>

          <Pressable
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1, transform: [{ scale: pressed ? 0.95 : 1 }] }]}
            className="flex-1"
          >
            <View className="rounded-2xl overflow-hidden shadow-lg">
              <LinearGradient
                colors={['#ec4899', '#be185d']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ padding: 16 }}
              >
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text className="text-white/70 text-xs font-semibold">Saved Outfits</Text>
                    <Text className="text-white text-3xl font-bold mt-1">{outfitCount}</Text>
                  </View>
                  <View className="bg-white/20 rounded-full p-3">
                    <IconSymbol name="heart.fill" size={24} color="#FFFFFF" />
                  </View>
                </View>
              </LinearGradient>
            </View>
          </Pressable>
        </Animated.View>

        {/* Quick Action Buttons */}
        <Animated.View entering={FadeInUp.duration(500).delay(200)} className="gap-3">
          <Pressable
            onPress={handleAddItem}
            style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1, transform: [{ scale: pressed ? 0.95 : 1 }] }]}
          >
            <View className="rounded-xl overflow-hidden shadow-md">
              <LinearGradient
                colors={['#3b82f6', '#06b6d4']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 }}
              >
                <IconSymbol name="camera.fill" size={24} color="#FFFFFF" />
                <View className="flex-1">
                  <Text className="text-white font-bold">Add New Item</Text>
                  <Text className="text-white/80 text-xs">Photograph from your closet</Text>
                </View>
                <IconSymbol name="chevron.right" size={20} color="#FFFFFF" />
              </LinearGradient>
            </View>
          </Pressable>

          <Pressable
            onPress={handleGenerateOutfit}
            style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1, transform: [{ scale: pressed ? 0.95 : 1 }] }]}
          >
            <View className="rounded-xl overflow-hidden shadow-md">
              <LinearGradient
                colors={['#f59e0b', '#f97316']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 }}
              >
                <IconSymbol name="sparkles" size={24} color="#FFFFFF" />
                <View className="flex-1">
                  <Text className="text-white font-bold">Generate Outfit</Text>
                  <Text className="text-white/80 text-xs">Get AI-powered suggestions</Text>
                </View>
                <IconSymbol name="chevron.right" size={20} color="#FFFFFF" />
              </LinearGradient>
            </View>
          </Pressable>
        </Animated.View>

        {/* Debug Info - Shows if data is being stored */}
        <Animated.View entering={FadeInUp.duration(500).delay(300)} className="bg-surface/50 rounded-lg p-3 border border-border">
          <Text className="text-xs text-muted font-semibold mb-2">Debug: Data Status</Text>
          <Text className="text-xs text-muted">Items: {itemCount} | Outfits: {outfitCount}</Text>
          {itemCount === 0 && outfitCount === 0 && (
            <Text className="text-xs text-error mt-2">No data in storage</Text>
          )}
          {(itemCount > 0 || outfitCount > 0) && (
            <Text className="text-xs text-success mt-2">Data saved successfully!</Text>
          )}
        </Animated.View>

        {/* Onboarding Tips */}
        <Animated.View entering={FadeInUp.duration(500).delay(300)}>
          <OnboardingTips />
        </Animated.View>
      </View>
    </ScrollView>
  );
}
