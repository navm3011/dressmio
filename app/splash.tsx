import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import { AnimatedLogo } from '@/components/animated-logo';
import { ScreenContainer } from '@/components/screen-container';
import { useColors } from '@/hooks/use-colors';

/**
 * Splash screen with animated dressMio logo
 * Shows for 3 seconds then navigates to onboarding or home
 */
export default function SplashScreen() {
  const router = useRouter();
  const colors = useColors();
  const opacity = useSharedValue(1);

  const [tutorialCompleted, setTutorialCompleted] = useState(false);

  useEffect(() => {
    // Check if tutorial was completed
    const checkTutorial = async () => {
      const completed = await AsyncStorage.getItem('tutorialCompleted');
      setTutorialCompleted(completed === 'true');
    };
    checkTutorial();
  }, []);

  useEffect(() => {
    // Show splash for 3 seconds then fade out
    const timer = setTimeout(() => {
      opacity.value = withTiming(0, {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
      });

      // Navigate after fade completes
      setTimeout(() => {
        if (tutorialCompleted) {
          router.replace('/(tabs)');
        } else {
          router.replace('/(onboarding)' as any);
        }
      }, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [router, opacity, tutorialCompleted]);

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <ScreenContainer className="flex-1 items-center justify-center" containerClassName="bg-white">
      <Animated.View
        style={[fadeStyle, { flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }]}
        entering={FadeIn.duration(800)}
      >
        <View className="items-center gap-8">
          {/* Animated Logo */}
          <AnimatedLogo size={240} showText={true} />

          {/* Loading indicator */}
          <View className="gap-2 items-center">
            <Text className="text-sm text-muted tracking-widest">Loading your wardrobe...</Text>
            <View className="flex-row gap-1 mt-2">
              <Animated.View
                entering={FadeIn.delay(0).duration(600)}
                className="w-1 h-1 rounded-full bg-primary"
              />
              <Animated.View
                entering={FadeIn.delay(200).duration(600)}
                className="w-1 h-1 rounded-full bg-primary"
              />
              <Animated.View
                entering={FadeIn.delay(400).duration(600)}
                className="w-1 h-1 rounded-full bg-primary"
              />
            </View>
          </View>
        </View>
      </Animated.View>
    </ScreenContainer>
  );
}
