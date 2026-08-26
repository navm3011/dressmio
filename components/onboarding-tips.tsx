import { View, Text, Pressable, ScrollView } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColors } from '@/hooks/use-colors';

interface OnboardingTip {
  icon: string;
  title: string;
  description: string;
  color: string;
}

const tips: OnboardingTip[] = [
  {
    icon: 'camera.fill',
    title: 'Capture Your Style',
    description: 'Use your phone camera to photograph clothing items from your closet',
    color: '#3B82F6',
  },
  {
    icon: 'sparkles',
    title: 'AI Categorization',
    description: 'Our AI automatically detects clothing type, color, and style',
    color: '#F59E0B',
  },
  {
    icon: 'heart.fill',
    title: 'Smart Suggestions',
    description: 'Get AI-powered outfit recommendations based on your wardrobe',
    color: '#EC4899',
  },
  {
    icon: 'calendar',
    title: 'Track Your Outfits',
    description: 'Save and track the outfits you wear to find your favorites',
    color: '#10B981',
  },
];

/**
 * Onboarding tips carousel for first-time users
 */
export function OnboardingTips() {
  const colors = useColors();

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
      className="mt-4"
    >
      {tips.map((tip, index) => (
        <Animated.View 
          key={index}
          entering={FadeInUp.duration(400).delay(index * 100)}
          className="w-64"
        >
          <View className="bg-surface rounded-2xl p-4 border border-border shadow-md h-full">
            <View 
              className="w-12 h-12 rounded-full items-center justify-center mb-3"
              style={{ backgroundColor: `${tip.color}20` }}
            >
              <IconSymbol name={tip.icon as any} size={20} color={tip.color} />
            </View>
            <Text className="text-sm font-bold text-foreground mb-2">{tip.title}</Text>
            <Text className="text-xs text-muted leading-relaxed">{tip.description}</Text>
          </View>
        </Animated.View>
      ))}
    </ScrollView>
  );
}
