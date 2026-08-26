import { ScrollView, View, Text, Switch, Pressable, Alert, ActivityIndicator } from 'react-native';
import { useState, useCallback, useEffect } from 'react';
import { ScreenContainer } from '@/components/screen-container';
import { useCloset } from '@/lib/closet-provider';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColors } from '@/hooks/use-colors';
import { hapticFeedback } from '@/lib/haptics';
import { GradientBackground, GradientPresets } from '@/components/gradient-background';
import { ScreenHeader } from '@/components/screen-header';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { useSurvey } from '@/lib/survey-provider';

export default function SettingsScreen() {
  const router = useRouter();
  const colors = useColors();
  const { storage, setStorageType, items, clearAllData } = useCloset();
  const { setShowSurvey } = useSurvey();
  const [isCloudEnabled, setIsCloudEnabled] = useState(storage.type === 'cloud');
  const [syncInProgress, setSyncInProgress] = useState(false);

  useEffect(() => {
    setIsCloudEnabled(storage.type === 'cloud');
  }, [storage.type]);

  const handleStorageToggle = useCallback(
    async (value: boolean) => {
      if (value === isCloudEnabled) return;
      await hapticFeedback.selection();

      Alert.alert(
        'Change Storage',
        value
          ? 'Switch to cloud storage? Your data will be synced to the cloud.'
          : 'Switch to local storage? Your data will only be stored on this device.',
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Confirm',
            onPress: async () => {
              setSyncInProgress(true);
              try {
                await setStorageType(value ? 'cloud' : 'local');
                setIsCloudEnabled(value);
              } catch (error) {
                console.error('Failed to change storage:', error);
                Alert.alert('Error', 'Failed to change storage type');
              } finally {
                setSyncInProgress(false);
              }
            },
            style: 'default',
          },
        ]
      );
    },
    [isCloudEnabled, setStorageType]
  );

  const handleClearData = useCallback(async () => {
    await hapticFeedback.selection();
    Alert.alert(
      'Clear All Data',
      'Are you sure you want to delete all closet items and outfits? This cannot be undone.',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            // Second confirmation dialog
            Alert.alert(
              'Confirm Deletion',
              'This action will permanently delete all your data. Tap DELETE again to confirm.',
              [
                {
                  text: 'Cancel',
                  onPress: () => {},
                  style: 'cancel',
                },
                {
                  text: 'DELETE',
                  onPress: async () => {
                    try {
                      await clearAllData();
                      await hapticFeedback.success();
                      Alert.alert('Success', 'All data has been cleared');
                    } catch (error) {
                      console.error('Failed to clear data:', error);
                      Alert.alert('Error', 'Failed to clear data');
                    }
                  },
                  style: 'destructive',
                },
              ]
            );
          },
          style: 'destructive',
        },
      ]
    );
  }, [clearAllData]);

  return (
    <GradientBackground colors={GradientPresets.settings.colors}>
      <ScreenContainer className="flex-1" containerClassName="bg-transparent">
        <ScreenHeader 
          infoTitle="Settings"
          infoMessage="Manage your app preferences, storage options, and account settings. Toggle between local and cloud storage to sync your data across devices."
        />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          <Animated.View entering={FadeInDown.duration(500)} className="gap-6 py-6">
            {/* Header */}
            <View className="px-4 border-b border-border bg-background/60 pb-4">
              <Text className="text-3xl font-bold text-foreground">Settings</Text>
              <Text className="text-sm text-muted mt-1">Manage your app preferences</Text>
            </View>

            {/* Storage Section */}
            <View className="px-4 gap-4">
              <View className="bg-surface rounded-2xl p-5 border border-border shadow-sm">
                <View className="flex-row items-center justify-between mb-3">
                  <View className="flex-row items-center gap-3 flex-1">
                    <View className="bg-primary/20 rounded-full p-3">
                      <IconSymbol name="icloud" size={24} color={colors.primary} />
                    </View>
                    <View className="flex-1">
                      <Text className="text-base font-semibold text-foreground">Cloud Storage</Text>
                      <Text className="text-xs text-muted mt-1">Sync across devices</Text>
                    </View>
                  </View>
                  <Switch
                    value={isCloudEnabled}
                    onValueChange={handleStorageToggle}
                    disabled={syncInProgress}
                    trackColor={{ false: colors.border, true: colors.primary }}
                  />
                </View>
                {syncInProgress && (
                  <View className="flex-row items-center gap-2 mt-3">
                    <ActivityIndicator color={colors.primary} size="small" />
                    <Text className="text-xs text-muted">Syncing...</Text>
                  </View>
                )}
              </View>

              {/* Data Statistics */}
              <View className="bg-surface rounded-2xl p-5 border border-border shadow-sm">
                <Text className="text-base font-semibold text-foreground mb-4">Wardrobe Statistics</Text>
                <View className="flex-row gap-4">
                  <View className="flex-1 bg-background rounded-lg p-3 items-center">
                    <Text className="text-2xl font-bold text-primary">{items.length}</Text>
                    <Text className="text-xs text-muted mt-1">Items</Text>
                  </View>
                  <View className="flex-1 bg-background rounded-lg p-3 items-center">
                    <Text className="text-2xl font-bold text-primary">{storage.lastSync ? 'Synced' : 'Local'}</Text>
                    <Text className="text-xs text-muted mt-1">Storage</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* About Section */}
            <View className="px-4 gap-4">
              <View className="bg-surface rounded-2xl p-5 border border-border shadow-sm">
                <Text className="text-base font-semibold text-foreground mb-3">About</Text>
                <View className="gap-3">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-sm text-muted">App Version</Text>
                    <Text className="text-sm font-semibold text-foreground">1.0.0</Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-sm text-muted">Storage Type</Text>
                    <Text className="text-sm font-semibold text-foreground capitalize">{storage.type}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Feedback Section */}
            <View className="px-4 gap-4">
              <Pressable
                onPress={() => {
                  hapticFeedback.selection();
                  setShowSurvey(true);
                }}
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1, transform: [{ scale: pressed ? 0.95 : 1 }] }]}
              >
                <View className="bg-primary/10 rounded-2xl p-5 border border-primary/30 shadow-sm">
                  <View className="flex-row items-center gap-3">
                    <View className="bg-primary/20 rounded-full p-3">
                      <IconSymbol name="bubble.left" size={24} color={colors.primary} />
                    </View>
                    <View className="flex-1">
                      <Text className="text-base font-semibold text-foreground">Send Feedback</Text>
                      <Text className="text-xs text-muted mt-1">Help us improve dressMio</Text>
                    </View>
                    <IconSymbol name="chevron.right" size={20} color={colors.muted} />
                  </View>
                </View>
              </Pressable>
            </View>

            {/* Clear Data Section - Commented out for future use
            <View className="px-4 gap-4">
              <Pressable
                onPress={handleClearData}
                style={({ pressed }) => [{ opacity: pressed ? 0.5 : 0.6 }]}
              >
                <View className="bg-background rounded-2xl p-5 border border-border shadow-sm">
                  <View className="flex-row items-center gap-3">
                    <View className="bg-border rounded-full p-3">
                      <IconSymbol name="trash" size={24} color={colors.muted} />
                    </View>
                    <View className="flex-1">
                      <Text className="text-sm font-medium text-muted">Clear All Data</Text>
                      <Text className="text-xs text-muted/60 mt-1">Delete all items and outfits</Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            </View>
            */}

            {/* Footer */}
            <View className="px-4 items-center pb-4">
              <Text className="text-xs text-muted text-center">
                dressMio • Powered by AI
              </Text>
            </View>
          </Animated.View>
        </ScrollView>
      </ScreenContainer>
    </GradientBackground>
  );
}
