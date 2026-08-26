import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type OnboardingStep = 'welcome' | 'add-item' | 'closet' | 'suggestions' | 'saved' | 'completed';

interface OnboardingContextType {
  isFirstTime: boolean;
  currentStep: OnboardingStep;
  showTooltip: boolean;
  setShowTooltip: (show: boolean) => void;
  completeStep: (step: OnboardingStep) => void;
  skipOnboarding: () => void;
  resetOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [showTooltip, setShowTooltip] = useState(true);

  // Load onboarding state from AsyncStorage
  useEffect(() => {
    const loadOnboardingState = async () => {
      try {
        const completed = await AsyncStorage.getItem('onboarding_completed');
        const savedStep = await AsyncStorage.getItem('onboarding_step');

        if (completed === 'true') {
          setIsFirstTime(false);
          setCurrentStep('completed');
        } else if (savedStep) {
          setCurrentStep(savedStep as OnboardingStep);
        }
      } catch (error) {
        console.error('Failed to load onboarding state:', error);
      }
    };

    loadOnboardingState();
  }, []);

  const completeStep = async (step: OnboardingStep) => {
    setCurrentStep(step);
    await AsyncStorage.setItem('onboarding_step', step);

    if (step === 'completed') {
      setIsFirstTime(false);
      await AsyncStorage.setItem('onboarding_completed', 'true');
    }
  };

  const skipOnboarding = async () => {
    await completeStep('completed');
  };

  const resetOnboarding = async () => {
    setIsFirstTime(true);
    setCurrentStep('welcome');
    setShowTooltip(true);
    await AsyncStorage.removeItem('onboarding_completed');
    await AsyncStorage.removeItem('onboarding_step');
  };

  return (
    <OnboardingContext.Provider
      value={{
        isFirstTime,
        currentStep,
        showTooltip,
        setShowTooltip,
        completeStep,
        skipOnboarding,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
}
