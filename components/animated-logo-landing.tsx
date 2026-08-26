import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  Easing,
  FadeIn,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

interface AnimatedLogoLandingProps {
  size?: number;
}

/**
 * Animated dressMio Logo for Landing Page
 * 
 * Uses static image with animated overlay effects:
 * - Animated sparkles (yellow, green, pink, cyan stars)
 * - Subtle scale pulse animation
 */
export function AnimatedLogoLanding({ size = 200 }: AnimatedLogoLandingProps) {
  // Sparkle animations
  const sparkle1Opacity = useSharedValue(0);
  const sparkle1Scale = useSharedValue(0.5);
  
  const sparkle2Opacity = useSharedValue(0);
  const sparkle2Scale = useSharedValue(0.5);
  
  const sparkle3Opacity = useSharedValue(0);
  const sparkle3Scale = useSharedValue(0.5);
  
  const sparkle4Opacity = useSharedValue(0);
  const sparkle4Scale = useSharedValue(0.5);

  // Logo pulse
  const logoScale = useSharedValue(1);

  useEffect(() => {
    // Sparkle 1 (top left, yellow)
    sparkle1Opacity.value = withRepeat(
      withDelay(0, withTiming(1, { duration: 600, easing: Easing.inOut(Easing.ease) })),
      -1,
      true
    );
    sparkle1Scale.value = withRepeat(
      withDelay(0, withTiming(1.3, { duration: 600, easing: Easing.inOut(Easing.ease) })),
      -1,
      true
    );

    // Sparkle 2 (top right, green)
    sparkle2Opacity.value = withRepeat(
      withDelay(200, withTiming(1, { duration: 600, easing: Easing.inOut(Easing.ease) })),
      -1,
      true
    );
    sparkle2Scale.value = withRepeat(
      withDelay(200, withTiming(1.3, { duration: 600, easing: Easing.inOut(Easing.ease) })),
      -1,
      true
    );

    // Sparkle 3 (bottom left, pink)
    sparkle3Opacity.value = withRepeat(
      withDelay(400, withTiming(1, { duration: 600, easing: Easing.inOut(Easing.ease) })),
      -1,
      true
    );
    sparkle3Scale.value = withRepeat(
      withDelay(400, withTiming(1.3, { duration: 600, easing: Easing.inOut(Easing.ease) })),
      -1,
      true
    );

    // Sparkle 4 (bottom right, cyan)
    sparkle4Opacity.value = withRepeat(
      withDelay(600, withTiming(1, { duration: 600, easing: Easing.inOut(Easing.ease) })),
      -1,
      true
    );
    sparkle4Scale.value = withRepeat(
      withDelay(600, withTiming(1.3, { duration: 600, easing: Easing.inOut(Easing.ease) })),
      -1,
      true
    );

    // Logo pulse
    logoScale.value = withRepeat(
      withTiming(1.08, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const sparkle1Style = useAnimatedStyle(() => ({
    opacity: sparkle1Opacity.value,
    transform: [{ scale: sparkle1Scale.value }],
  }));

  const sparkle2Style = useAnimatedStyle(() => ({
    opacity: sparkle2Opacity.value,
    transform: [{ scale: sparkle2Scale.value }],
  }));

  const sparkle3Style = useAnimatedStyle(() => ({
    opacity: sparkle3Opacity.value,
    transform: [{ scale: sparkle3Scale.value }],
  }));

  const sparkle4Style = useAnimatedStyle(() => ({
    opacity: sparkle4Opacity.value,
    transform: [{ scale: sparkle4Scale.value }],
  }));

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
  }));

  const borderRadius = size * 0.25;

  return (
    <Animated.View
      entering={FadeIn.duration(800)}
      style={[
        logoStyle,
        {
          width: size,
          height: size,
          borderRadius,
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}
    >
      {/* Static logo image */}
      <Image
        source={require('@/assets/images/splash-icon.png')}
        style={{
          width: '100%',
          height: '100%',
          borderRadius,
        }}
      />

      {/* Animated Sparkles Overlay */}
      <Animated.View
        style={[
          sparkle1Style,
          {
            position: 'absolute',
            top: size * 0.08,
            left: size * 0.08,
          },
        ]}
      >
        <Svg width={size * 0.1} height={size * 0.1} viewBox="0 0 24 24">
          <Circle cx="12" cy="12" r="6" fill="#FFD700" />
        </Svg>
      </Animated.View>

      <Animated.View
        style={[
          sparkle2Style,
          {
            position: 'absolute',
            top: size * 0.08,
            right: size * 0.08,
          },
        ]}
      >
        <Svg width={size * 0.1} height={size * 0.1} viewBox="0 0 24 24">
          <Circle cx="12" cy="12" r="6" fill="#00FF00" />
        </Svg>
      </Animated.View>

      <Animated.View
        style={[
          sparkle3Style,
          {
            position: 'absolute',
            bottom: size * 0.08,
            left: size * 0.08,
          },
        ]}
      >
        <Svg width={size * 0.1} height={size * 0.1} viewBox="0 0 24 24">
          <Circle cx="12" cy="12" r="6" fill="#FF1493" />
        </Svg>
      </Animated.View>

      <Animated.View
        style={[
          sparkle4Style,
          {
            position: 'absolute',
            bottom: size * 0.08,
            right: size * 0.08,
          },
        ]}
      >
        <Svg width={size * 0.1} height={size * 0.1} viewBox="0 0 24 24">
          <Circle cx="12" cy="12" r="6" fill="#06B6D4" />
        </Svg>
      </Animated.View>
    </Animated.View>
  );
}
