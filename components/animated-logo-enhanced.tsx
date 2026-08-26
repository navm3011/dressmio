import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  Easing,
  FadeIn,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Path, Defs, LinearGradient as SvgLinearGradient, Stop, G, Rect } from 'react-native-svg';

interface AnimatedLogoEnhancedProps {
  size?: number;
}

/**
 * Enhanced Animated dressMio Logo for Landing Page
 * 
 * Recreates the HTML animation effects using React Native Reanimated:
 * - Animated gradient background (shifts through colors)
 * - Hanger with gentle sway animation
 * - Colorful swatches with pop-in animation
 * - Sparkle elements with twinkle effects
 * - Smooth, GPU-accelerated 60 FPS animations
 */
export function AnimatedLogoEnhanced({ size = 200 }: AnimatedLogoEnhancedProps) {
  // Gradient animation (cycles through color positions)
  const gradientProgress = useSharedValue(0);

  // Hanger sway animation
  const hangerRotation = useSharedValue(0);

  // Sparkle animations
  const sparkle1Opacity = useSharedValue(0);
  const sparkle2Opacity = useSharedValue(0);
  const sparkle3Opacity = useSharedValue(0);
  const sparkle4Opacity = useSharedValue(0);

  // Individual swatch animations (sequential pop-in)
  const swatch1Scale = useSharedValue(0);
  const swatch2Scale = useSharedValue(0);
  const swatch3Scale = useSharedValue(0);
  const swatch4Scale = useSharedValue(0);
  const swatch5Scale = useSharedValue(0);
  const swatch6Scale = useSharedValue(0);
  const swatch7Scale = useSharedValue(0);

  // Logo scale pulse
  const logoScale = useSharedValue(1);

  useEffect(() => {
    // Gradient shift animation (6s cycle)
    gradientProgress.value = withRepeat(
      withTiming(1, { duration: 6000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );

    // Hanger gentle sway (4s cycle, starts at 1.5s)
    hangerRotation.value = withRepeat(
      withDelay(1500, withTiming(1, { duration: 4000, easing: Easing.inOut(Easing.ease) })),
      -1,
      true
    );

    // Sparkle 1 (top left, yellow) - starts at 0.5s
    sparkle1Opacity.value = withRepeat(
      withDelay(500, withTiming(1, { duration: 2500, easing: Easing.inOut(Easing.ease) })),
      -1,
      true
    );

    // Sparkle 2 (top right, white) - starts at 1.2s
    sparkle2Opacity.value = withRepeat(
      withDelay(1200, withTiming(1, { duration: 2500, easing: Easing.inOut(Easing.ease) })),
      -1,
      true
    );

    // Sparkle 3 (bottom left, green) - starts at 1.8s
    sparkle3Opacity.value = withRepeat(
      withDelay(1800, withTiming(1, { duration: 2500, easing: Easing.inOut(Easing.ease) })),
      -1,
      true
    );

    // Sparkle 4 (bottom right, red) - starts at 0.9s
    sparkle4Opacity.value = withRepeat(
      withDelay(900, withTiming(1, { duration: 2500, easing: Easing.inOut(Easing.ease) })),
      -1,
      true
    );

    // Swatch pop-in animations (sequential, starting at 1.4s)
    const swatchDurations = [1400, 1550, 1700, 1850, 2000, 2150, 2300];
    const swatches = [swatch1Scale, swatch2Scale, swatch3Scale, swatch4Scale, swatch5Scale, swatch6Scale, swatch7Scale];
    
    swatches.forEach((swatch, index) => {
      swatch.value = withRepeat(
        withDelay(swatchDurations[index], withTiming(1, { duration: 400, easing: Easing.out(Easing.cubic) })),
        -1,
        true
      );
    });

    // Logo pulse (2s cycle)
    logoScale.value = withRepeat(
      withTiming(1.08, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  // Animated styles
  const hangerStyle = useAnimatedStyle(() => {
    const rotation = interpolate(hangerRotation.value, [0, 0.25, 0.5, 0.75, 1], [0, 1.5, 0, -1.5, 0], Extrapolate.CLAMP);
    return {
      transform: [{ rotate: `${rotation}deg` }],
    };
  });

  const sparkle1Style = useAnimatedStyle(() => ({
    opacity: sparkle1Opacity.value,
    transform: [{ scale: interpolate(sparkle1Opacity.value, [0, 1], [0.4, 1], Extrapolate.CLAMP) }],
  }));

  const sparkle2Style = useAnimatedStyle(() => ({
    opacity: sparkle2Opacity.value,
    transform: [{ scale: interpolate(sparkle2Opacity.value, [0, 1], [0.4, 1], Extrapolate.CLAMP) }],
  }));

  const sparkle3Style = useAnimatedStyle(() => ({
    opacity: sparkle3Opacity.value,
    transform: [{ scale: interpolate(sparkle3Opacity.value, [0, 1], [0.4, 1], Extrapolate.CLAMP) }],
  }));

  const sparkle4Style = useAnimatedStyle(() => ({
    opacity: sparkle4Opacity.value,
    transform: [{ scale: interpolate(sparkle4Opacity.value, [0, 1], [0.4, 1], Extrapolate.CLAMP) }],
  }));

  const swatch1Style = useAnimatedStyle(() => ({
    transform: [{ scaleX: interpolate(swatch1Scale.value, [0, 1], [0, 1], Extrapolate.CLAMP) }],
  }));

  const swatch2Style = useAnimatedStyle(() => ({
    transform: [{ scaleX: interpolate(swatch2Scale.value, [0, 1], [0, 1], Extrapolate.CLAMP) }],
  }));

  const swatch3Style = useAnimatedStyle(() => ({
    transform: [{ scaleX: interpolate(swatch3Scale.value, [0, 1], [0, 1], Extrapolate.CLAMP) }],
  }));

  const swatch4Style = useAnimatedStyle(() => ({
    transform: [{ scaleX: interpolate(swatch4Scale.value, [0, 1], [0, 1], Extrapolate.CLAMP) }],
  }));

  const swatch5Style = useAnimatedStyle(() => ({
    transform: [{ scaleX: interpolate(swatch5Scale.value, [0, 1], [0, 1], Extrapolate.CLAMP) }],
  }));

  const swatch6Style = useAnimatedStyle(() => ({
    transform: [{ scaleX: interpolate(swatch6Scale.value, [0, 1], [0, 1], Extrapolate.CLAMP) }],
  }));

  const swatch7Style = useAnimatedStyle(() => ({
    transform: [{ scaleX: interpolate(swatch7Scale.value, [0, 1], [0, 1], Extrapolate.CLAMP) }],
  }));

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
  }));

  const borderRadius = size * 0.225; // ~86px for 380px icon

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
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.3,
          shadowRadius: 25,
          elevation: 10,
        },
      ]}
    >
      {/* Gradient Background - Yellow Gradient */}
      <LinearGradient
        colors={['#FFD700', '#FFA500', '#FF8C00']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
      />

      {/* Animated Hanger SVG */}
      <Animated.View
        style={[
          hangerStyle,
          {
            position: 'absolute',
            width: size * 0.82,
            height: size * 0.55,
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}
      >
        <Svg width={size * 0.82} height={size * 0.55} viewBox="0 0 310 210" fill="none">
          <Defs>
            <SvgLinearGradient id="hg" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#FFFFFF" />
              <Stop offset="100%" stopColor="#E8D5FF" />
            </SvgLinearGradient>
            <SvgLinearGradient id="mg" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor="#43E97B" />
              <Stop offset="100%" stopColor="#38F9D7" />
            </SvgLinearGradient>
            <SvgLinearGradient id="yg" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor="#FFE066" />
              <Stop offset="100%" stopColor="#FFB830" />
            </SvgLinearGradient>
          </Defs>

          <G>
            {/* Hook - Right Curve */}
            <Path
              d="M155 25 C155 25 155 8 140 3 C125 -2 113 6 113 18 C113 30 124 37 135 37"
              stroke="url(#hg)"
              strokeWidth="13"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Stem */}
            <Path
              d="M155 37 L155 100"
              stroke="url(#hg)"
              strokeWidth="13"
              strokeLinecap="round"
            />
            {/* Shoulders */}
            <Path
              d="M155 100 C155 100 90 122 38 155 C26 162 23 173 32 180 C40 186 53 183 60 177 C100 153 155 138 155 138 C155 138 210 153 250 177 C257 183 270 186 278 180 C287 173 284 162 272 155 C220 122 155 100 155 100Z"
              fill="url(#hg)"
            />
            {/* Hook tip dot */}
            <Circle cx="140" cy="3" r="6" fill="url(#yg)" />
            {/* Mint accent */}
            <Path
              d="M36 178 Q155 200 274 178"
              stroke="url(#mg)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              opacity="0.9"
            />
            {/* Crossbar */}
            <Rect x="32" y="178" width="246" height="14" rx="7" fill="url(#hg)" />
            {/* Yellow crossbar stripe */}
            <Rect x="50" y="183" width="210" height="4" rx="2" fill="url(#yg)" opacity="0.85" />
          </G>
        </Svg>
      </Animated.View>

      {/* Swatches - Animated outside SVG for proper animation */}
      <View
        style={{
          position: 'absolute',
          bottom: size * 0.15,
          flexDirection: 'row',
          gap: size * 0.02,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Animated.View style={[swatch1Style, { width: size * 0.06, height: size * 0.03, backgroundColor: '#FF6B6B', borderRadius: size * 0.015 }]} />
        <Animated.View style={[swatch2Style, { width: size * 0.06, height: size * 0.03, backgroundColor: '#FFE066', borderRadius: size * 0.015 }]} />
        <Animated.View style={[swatch3Style, { width: size * 0.06, height: size * 0.03, backgroundColor: '#43E97B', borderRadius: size * 0.015 }]} />
        <Animated.View style={[swatch4Style, { width: size * 0.06, height: size * 0.03, backgroundColor: '#C850C0', borderRadius: size * 0.015 }]} />
        <Animated.View style={[swatch5Style, { width: size * 0.06, height: size * 0.03, backgroundColor: '#4158D0', borderRadius: size * 0.015 }]} />
        <Animated.View style={[swatch6Style, { width: size * 0.06, height: size * 0.03, backgroundColor: '#38F9D7', borderRadius: size * 0.015 }]} />
        <Animated.View style={[swatch7Style, { width: size * 0.055, height: size * 0.03, backgroundColor: '#FFB830', borderRadius: size * 0.015 }]} />
      </View>

      {/* Sparkle 1 - Top Left (Yellow) */}
      <Animated.View
        style={[
          sparkle1Style,
          {
            position: 'absolute',
            top: size * 0.1,
            left: size * 0.1,
          },
        ]}
      >
        <Svg width={size * 0.12} height={size * 0.12} viewBox="0 0 22 22">
          <Path
            d="M11 0 L12.8 8.2 L22 11 L12.8 13.8 L11 22 L9.2 13.8 L0 11 L9.2 8.2 Z"
            fill="#FFE066"
            opacity="0.9"
          />
        </Svg>
      </Animated.View>

      {/* Sparkle 2 - Top Right (White) */}
      <Animated.View
        style={[
          sparkle2Style,
          {
            position: 'absolute',
            top: size * 0.12,
            right: size * 0.12,
          },
        ]}
      >
        <Svg width={size * 0.09} height={size * 0.09} viewBox="0 0 22 22">
          <Path
            d="M11 0 L12.8 8.2 L22 11 L12.8 13.8 L11 22 L9.2 13.8 L0 11 L9.2 8.2 Z"
            fill="#FFFFFF"
            opacity="0.8"
          />
        </Svg>
      </Animated.View>

      {/* Sparkle 3 - Bottom Left (Green) */}
      <Animated.View
        style={[
          sparkle3Style,
          {
            position: 'absolute',
            bottom: size * 0.2,
            left: size * 0.08,
          },
        ]}
      >
        <Svg width={size * 0.1} height={size * 0.1} viewBox="0 0 22 22">
          <Path
            d="M11 0 L12.8 8.2 L22 11 L12.8 13.8 L11 22 L9.2 13.8 L0 11 L9.2 8.2 Z"
            fill="#43E97B"
            opacity="0.85"
          />
        </Svg>
      </Animated.View>

      {/* Sparkle 4 - Bottom Right (Red) */}
      <Animated.View
        style={[
          sparkle4Style,
          {
            position: 'absolute',
            bottom: size * 0.25,
            right: size * 0.1,
          },
        ]}
      >
        <Svg width={size * 0.08} height={size * 0.08} viewBox="0 0 22 22">
          <Path
            d="M11 0 L12.8 8.2 L22 11 L12.8 13.8 L11 22 L9.2 13.8 L0 11 L9.2 8.2 Z"
            fill="#FF6B6B"
            opacity="0.85"
          />
        </Svg>
      </Animated.View>
    </Animated.View>
  );
}
