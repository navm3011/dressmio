import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle } from 'react-native-svg';

interface AnimatedLogoV2Props {
  size?: number;
  showText?: boolean;
}

/**
 * Animated dressMio Logo Component (V2)
 * 
 * Recreates the original Claude artifact design with:
 * - Proper hanger icon (white trapezoid shape)
 * - Coral to cyan gradient background
 * - Animated sparkles
 * - "dress" + "Mio" text positioned below hanger
 * - Tagline
 */
export function AnimatedLogoV2({ size = 200, showText = true }: AnimatedLogoV2Props) {
  const sparkleOpacity = useSharedValue(0);
  const sparkleScale = useSharedValue(1);

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
  }, []);

  const sparkleStyle = useAnimatedStyle(() => ({
    opacity: sparkleOpacity.value,
    transform: [{ scale: sparkleScale.value }],
  }));

  const borderRadius = size * 0.25;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      {/* Main container with gradient */}
      <LinearGradient
        colors={['#FF6B6B', '#FF8E72', '#FFB366', '#FFC266', '#FF9999', '#FF6BB3', '#FF66CC', '#CC99FF', '#99CCFF', '#66CCFF', '#66FFCC']}
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
        {/* Animated sparkles background */}
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

        {/* Content container - flexbox layout with hanger on top, text below */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            position: 'relative',
            zIndex: 10,
          }}
        >
          {/* Hanger icon - positioned at top center */}
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Svg width={size * 0.5} height={size * 0.5} viewBox="0 0 100 130">
              {/* Hanger hook - U-shaped curve at top */}
              <Path
                d="M 30 18 Q 30 8 50 8 Q 70 8 70 18"
                stroke="white"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Horizontal bar connecting hook to body */}
              <Path
                d="M 30 18 L 70 18"
                stroke="white"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />

              {/* Hanger body - trapezoid shape (wider at bottom) */}
              <Path
                d="M 28 22 L 72 22 L 85 110 L 15 110 Z"
                fill="white"
                opacity={0.95}
              />

              {/* Left edge line for subtle definition */}
              <Path
                d="M 28 22 L 15 110"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="1.5"
                fill="none"
              />

              {/* Right edge line for subtle definition */}
              <Path
                d="M 72 22 L 85 110"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="1.5"
                fill="none"
              />
            </Svg>
          </View>

          {/* Logo text and tagline - positioned below hanger */}
          {showText && (
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: 2,
                paddingTop: 8,
                zIndex: 20,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 2 }}>
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
                    color: '#FFD700',
                    fontWeight: '600',
                  }}
                >
                  Mio
                </Text>
              </View>
              <Text
                style={{
                  fontSize: size * 0.065,
                  color: 'rgba(255, 255, 255, 0.85)',
                  letterSpacing: 0.8,
                  fontWeight: '500',
                  lineHeight: size * 0.08,
                }}
              >
                YOUR AI FASHION
              </Text>
              <Text
                style={{
                  fontSize: size * 0.065,
                  color: 'rgba(255, 255, 255, 0.85)',
                  letterSpacing: 0.8,
                  fontWeight: '500',
                }}
              >
                ASSISTANT
              </Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </View>
  );
}
