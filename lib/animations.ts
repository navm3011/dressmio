import { useSharedValue, withTiming, withSpring, Easing } from 'react-native-reanimated';

/**
 * Animation presets for common UI patterns
 */
export const AnimationPresets = {
  // Fade in animation
  fadeIn: {
    from: 0,
    to: 1,
    duration: 400,
    easing: Easing.out(Easing.cubic),
  },

  // Slide up animation
  slideUp: {
    from: 50,
    to: 0,
    duration: 500,
    easing: Easing.out(Easing.cubic),
  },

  // Scale animation for buttons
  scalePress: {
    from: 1,
    to: 0.95,
    duration: 100,
    easing: Easing.inOut(Easing.ease),
  },

  // Spring bounce
  springBounce: {
    damping: 10,
    mass: 1,
    stiffness: 100,
    overshootClamping: false,
  },

  // Rotate animation for loading
  rotate: {
    from: 0,
    to: 360,
    duration: 1000,
    easing: Easing.linear,
  },
};

/**
 * Hook for fade-in animation
 */
export function useFadeInAnimation() {
  const opacity = useSharedValue(0);

  const startAnimation = () => {
    opacity.value = withTiming(1, {
      duration: AnimationPresets.fadeIn.duration,
      easing: AnimationPresets.fadeIn.easing,
    });
  };

  return { opacity, startAnimation };
}

/**
 * Hook for slide-up animation
 */
export function useSlideUpAnimation() {
  const translateY = useSharedValue(50);

  const startAnimation = () => {
    translateY.value = withTiming(0, {
      duration: AnimationPresets.slideUp.duration,
      easing: AnimationPresets.slideUp.easing,
    });
  };

  return { translateY, startAnimation };
}

/**
 * Hook for scale animation
 */
export function useScaleAnimation() {
  const scale = useSharedValue(1);

  const animatePress = () => {
    scale.value = withTiming(0.95, {
      duration: 100,
      easing: Easing.inOut(Easing.ease),
    });
  };

  const animateRelease = () => {
    scale.value = withTiming(1, {
      duration: 100,
      easing: Easing.inOut(Easing.ease),
    });
  };

  return { scale, animatePress, animateRelease };
}

/**
 * Hook for rotation animation (loading spinner)
 */
export function useRotationAnimation() {
  const rotation = useSharedValue(0);

  const startAnimation = () => {
    rotation.value = withTiming(360, {
      duration: 1000,
      easing: Easing.linear,
    });
  };

  const resetAnimation = () => {
    rotation.value = 0;
  };

  return { rotation, startAnimation, resetAnimation };
}

/**
 * Hook for combined fade and slide animation
 */
export function useFadeSlideAnimation() {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);

  const startAnimation = () => {
    opacity.value = withTiming(1, {
      duration: 500,
      easing: Easing.out(Easing.cubic),
    });
    translateY.value = withTiming(0, {
      duration: 500,
      easing: Easing.out(Easing.cubic),
    });
  };

  return { opacity, translateY, startAnimation };
}
