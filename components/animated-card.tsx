import { View, ViewProps } from 'react-native';
import Animated, { FadeInUp, ZoomIn } from 'react-native-reanimated';
import { cn } from '@/lib/utils';

interface AnimatedCardProps extends ViewProps {
  children?: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fadeUp' | 'zoom' | 'both';
}

/**
 * Animated card component with fade and slide animations
 */
export function AnimatedCard({
  children,
  className = '',
  delay = 0,
  animation = 'fadeUp',
  ...props
}: AnimatedCardProps) {
  const animationConfig = {
    duration: 500,
    delay: delay,
  };

  let enteringAnimation;

  switch (animation) {
    case 'zoom':
      enteringAnimation = ZoomIn.duration(500).delay(delay);
      break;
    case 'both':
      enteringAnimation = FadeInUp.duration(500).delay(delay);
      break;
    case 'fadeUp':
    default:
      enteringAnimation = FadeInUp.duration(500).delay(delay);
      break;
  }

  return (
    <Animated.View entering={enteringAnimation} {...props}>
      <View className={cn('rounded-xl overflow-hidden', className)}>
        {children}
      </View>
    </Animated.View>
  );
}
