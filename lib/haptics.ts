import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

/**
 * Haptic feedback utilities for user interactions
 * Only triggers on native platforms (iOS/Android), not on web
 */

export const hapticFeedback = {
  /**
   * Light tap feedback for button presses
   */
  tap: async () => {
    if (Platform.OS !== 'web') {
      try {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch (error) {
        console.warn('Haptic feedback not available');
      }
    }
  },

  /**
   * Medium tap feedback for important actions
   */
  medium: async () => {
    if (Platform.OS !== 'web') {
      try {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } catch (error) {
        console.warn('Haptic feedback not available');
      }
    }
  },

  /**
   * Heavy tap feedback for critical actions
   */
  heavy: async () => {
    if (Platform.OS !== 'web') {
      try {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      } catch (error) {
        console.warn('Haptic feedback not available');
      }
    }
  },

  /**
   * Success notification feedback
   */
  success: async () => {
    if (Platform.OS !== 'web') {
      try {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } catch (error) {
        console.warn('Haptic feedback not available');
      }
    }
  },

  /**
   * Warning notification feedback
   */
  warning: async () => {
    if (Platform.OS !== 'web') {
      try {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      } catch (error) {
        console.warn('Haptic feedback not available');
      }
    }
  },

  /**
   * Error notification feedback
   */
  error: async () => {
    if (Platform.OS !== 'web') {
      try {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      } catch (error) {
        console.warn('Haptic feedback not available');
      }
    }
  },

  /**
   * Selection change feedback
   */
  selection: async () => {
    if (Platform.OS !== 'web') {
      try {
        await Haptics.selectionAsync();
      } catch (error) {
        console.warn('Haptic feedback not available');
      }
    }
  },
};
