import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Defs, RadialGradient, Stop } from 'react-native-svg';

interface AnimatedLogoProps {
  size?: number;
  showText?: boolean;
}

/**
 * Animated dressMio logo component
 * Features:
 * - Gradient background (coral to cyan)
 * - Animated hanger icon
 * - Rotating sparkles
 * - Optional text display
 */
export function AnimatedLogo({ size = 200, showText = true }: AnimatedLogoProps) {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    // Continuous rotation animation
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 8000,
        easing: Easing.linear,
      }),
      -1,
      false
    );

    // Subtle scale pulse
    scale.value = withRepeat(
      withTiming(1.05, {
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, []);

  const sparkleStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${rotation.value}deg`,
      },
    ],
  }));

  const logoStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: scale.value,
      },
    ],
  }));

  const borderRadius = size * 0.25;

  return (
    <View className="items-center justify-center">
      <Animated.View style={[logoStyle, { width: size, height: size }]}>
        {/* Gradient background */}
        <LinearGradient
          colors={['#FF6B6B', '#FF8E72', '#FFA07A', '#00CED1']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            width: '100%',
            height: '100%',
            borderRadius,
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {/* Sparkles background */}
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
              <Circle cx={size * 0.2} cy={size * 0.2} r={size * 0.04} fill="#FFE66D" opacity={0.8} />
              {/* Top right sparkle */}
              <Circle cx={size * 0.8} cy={size * 0.2} r={size * 0.04} fill="#FFE66D" opacity={0.8} />
              {/* Bottom left sparkle */}
              <Circle cx={size * 0.15} cy={size * 0.75} r={size * 0.03} fill="#FFE66D" opacity={0.6} />
              {/* Bottom right sparkle */}
              <Circle cx={size * 0.85} cy={size * 0.75} r={size * 0.03} fill="#FFE66D" opacity={0.6} />
            </Svg>
          </Animated.View>

          {/* Hanger icon */}
          <Svg width={size * 0.5} height={size * 0.5} viewBox="0 0 100 100">
            {/* Hanger hook - curved top */}
            <Path
              d="M 30 20 Q 30 10 50 10 Q 70 10 70 20"
              stroke="white"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Hanger bar */}
            <Path
              d="M 30 20 L 70 20"
              stroke="white"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />

            {/* Hanger body - trapezoid shape */}
            <Path
              d="M 28 22 L 50 80 L 72 22 Z"
              fill="white"
              opacity={0.95}
            />

            {/* Highlight stripe */}
            <Path
              d="M 38 30 L 50 75"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </Svg>

          {/* Logo text and tagline */}
          {showText && (
            <View
              style={{
                position: 'absolute',
                bottom: size * 0.1,
                alignItems: 'center',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
                <Text
              style={{
                fontSize: size * 0.16,
                fontWeight: '700',
                color: 'white',
                letterSpacing: 0.5,
              }}
            >
              dress
            </Text>
            <Text
              style={{
                fontSize: size * 0.14,
                fontStyle: 'italic',
                color: '#FFE66D',
                fontWeight: '600',
              }}
            >
              Mio
            </Text>
              </View>
              <Text
                style={{
                  fontSize: size * 0.08,
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginTop: 2,
                  letterSpacing: 0.5,
                }}
              >
                YOUR AI FASHION ASSISTANT
              </Text>
            </View>
          )}
        </LinearGradient>
      </Animated.View>
    </View>
  );
}
