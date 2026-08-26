import React from 'react';
import { View, Text, Pressable, Animated } from 'react-native';
import { IconSymbol } from './ui/icon-symbol';
import { useColors } from '@/hooks/use-colors';
import { cn } from '@/lib/utils';

interface OnboardingTooltipProps {
  title: string;
  description: string;
  position?: 'top' | 'bottom' | 'center';
  onNext?: () => void;
  onSkip?: () => void;
  stepNumber?: number;
  totalSteps?: number;
  showSkip?: boolean;
}

export function OnboardingTooltip({
  title,
  description,
  position = 'bottom',
  onNext,
  onSkip,
  stepNumber,
  totalSteps,
  showSkip = true,
}: OnboardingTooltipProps) {
  const colors = useColors();
  const scaleAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 12,
      bounciness: 8,
    }).start();
  }, [scaleAnim]);

  const positionClasses = {
    top: 'top-0',
    bottom: 'bottom-0',
    center: 'absolute inset-0 items-center justify-center',
  };

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }],
        borderColor: colors.primary,
      }}
      className={cn(
        'bg-white rounded-2xl shadow-2xl p-6 border-2',
        position === 'center' && 'mx-4 max-w-xs'
      )}
    >
      {/* Header with close button */}
      <View className="flex-row items-start justify-between mb-3">
        <View className="flex-1">
          <Text className="text-lg font-bold text-foreground">{title}</Text>
        </View>
        {showSkip && onSkip && (
          <Pressable onPress={onSkip} className="p-1">
            <IconSymbol name="xmark" size={20} color={colors.muted} />
          </Pressable>
        )}
      </View>

      {/* Description */}
      <Text className="text-sm text-muted leading-relaxed mb-4">{description}</Text>

      {/* Step indicator */}
      {stepNumber !== undefined && totalSteps !== undefined && (
        <View className="flex-row items-center gap-2 mb-4">
          <View className="flex-row gap-1">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <View
                key={i}
                className={cn(
                  'h-1.5 rounded-full',
                  i < stepNumber ? 'bg-primary w-4' : 'bg-border w-2'
                )}
              />
            ))}
          </View>
          <Text className="text-xs text-muted ml-auto">
            {stepNumber} of {totalSteps}
          </Text>
        </View>
      )}

      {/* Action buttons */}
      <View className="flex-row gap-3">
        {showSkip && onSkip && (
          <Pressable
            onPress={onSkip}
            className="flex-1 py-2 px-4 rounded-lg border border-border"
          >
            <Text className="text-center text-sm font-semibold text-muted">Skip</Text>
          </Pressable>
        )}
        {onNext && (
          <Pressable
            onPress={onNext}
            className="flex-1 py-2 px-4 rounded-lg"
            style={{ backgroundColor: colors.primary }}
          >
            <Text className="text-center text-sm font-semibold text-white">
              {stepNumber === totalSteps ? 'Done' : 'Next'}
            </Text>
          </Pressable>
        )}
      </View>

      {/* Tip indicator */}
      <View className="flex-row items-center gap-2 mt-4 pt-4 border-t border-border">
        <IconSymbol name="lightbulb.fill" size={16} color={colors.primary} />
        <Text className="text-xs text-muted flex-1">Tap to learn more</Text>
      </View>
    </Animated.View>
  );
}

/**
 * Overlay component to highlight a specific area during onboarding
 */
export function OnboardingOverlay({
  visible,
  children,
}: {
  visible: boolean;
  children: React.ReactNode;
}) {
  if (!visible) return null;

  return (
    <View className="absolute inset-0 bg-black/50 z-50 items-center justify-center">
      {children}
    </View>
  );
}
