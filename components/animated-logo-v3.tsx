import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

interface AnimatedLogoV3Props {
  size?: number;
}

/**
 * Animated dressMio Logo Component (V3)
 * 
 * Uses the original splash icon image with added animations:
 * - Animated sparkles overlay
 * - Subtle scale pulse animation
 */
export function AnimatedLogoV3({ size = 200 }: AnimatedLogoV3Props) {
  const sparkleOpacity = useSharedValue(0);
  const sparkleScale = useSharedValue(1);
  const logoScale = useSharedValue(1);

  useEffect(() => {
    // Animate sparkles
    sparkleOpacity.value = withRepeat(
      withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );

    sparkleScale.value = withRepeat(
      withTiming(1.2, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );

    // Subtle pulse animation on the logo
    logoScale.value = withRepeat(
      withTiming(1.05, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const sparkleStyle = useAnimatedStyle(() => ({
    opacity: sparkleOpacity.value,
    transform: [{ scale: sparkleScale.value }],
  }));

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
  }));

  const borderRadius = size * 0.25;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      {/* Animated logo with pulse effect */}
      <Animated.View style={[logoStyle, { width: '100%', height: '100%' }]}>
        <Image
          source={require('@/assets/images/splash-icon.png')}
          style={{
            width: '100%',
            height: '100%',
            borderRadius,
          }}
        />
      </Animated.View>

      {/* Animated sparkles overlay */}
      <Animated.View
        style={[
          sparkleStyle,
          {
            position: 'absolute',
            width: '100%',
            height: '100%',
          },
        ]}
      >
        <Svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`}>
          {/* Top left sparkle */}
          <Circle cx={size * 0.15} cy={size * 0.15} r={size * 0.04} fill="#FFFFFF" opacity={0.7} />
          {/* Top right sparkle */}
          <Circle cx={size * 0.85} cy={size * 0.15} r={size * 0.04} fill="#FFFFFF" opacity={0.7} />
          {/* Bottom left sparkle */}
          <Circle cx={size * 0.1} cy={size * 0.8} r={size * 0.03} fill="#FFFFFF" opacity={0.5} />
          {/* Bottom right sparkle */}
          <Circle cx={size * 0.9} cy={size * 0.75} r={size * 0.03} fill="#FFFFFF" opacity={0.5} />
          {/* Center top sparkle */}
          <Circle cx={size * 0.5} cy={size * 0.1} r={size * 0.025} fill="#FFFFFF" opacity={0.6} />
        </Svg>
      </Animated.View>
    </View>
  );
}
