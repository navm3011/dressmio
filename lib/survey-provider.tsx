import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SurveyFeedback } from "@/components/survey-modal";

interface SurveyContextType {
  showSurvey: boolean;
  setShowSurvey: (show: boolean) => void;
  submitFeedback: (feedback: SurveyFeedback) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  initializeSurvey: (userId: number) => Promise<void>;
  dismissSurvey: (userId: number) => Promise<void>;
}

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

const SURVEY_USER_ID_KEY = "dressMio_survey_userId";
const SURVEY_INITIALIZED_KEY = "dressMio_survey_initialized";
const SURVEY_LAST_PROMPT_KEY = "dressMio_survey_last_prompt";
const SURVEY_COMPLETED_KEY = "dressMio_survey_completed";
const SURVEY_FEEDBACK_KEY = "dressMio_survey_feedback";

/**
 * Survey Provider Component
 * 
 * Manages survey state, tracking, and submission logic.
 * Wraps the app to provide survey functionality globally.
 * 
 * Features:
 * - Shows survey every 7 days
 * - Stores feedback locally
 * - Tracks survey completion status
 * - Prevents duplicate surveys
 */
export function SurveyProvider({ children }: { children: React.ReactNode }) {
  const [showSurvey, setShowSurvey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  // Initialize survey on app load
  useEffect(() => {
    initializeSurveyOnLoad();
  }, []);

  const initializeSurveyOnLoad = async () => {
    try {
      // Get or create user ID for survey tracking
      let storedUserId = await AsyncStorage.getItem(SURVEY_USER_ID_KEY);
      
      if (!storedUserId) {
        // Generate a simple user ID
        storedUserId = `${Date.now()}`;
        await AsyncStorage.setItem(SURVEY_USER_ID_KEY, storedUserId);
      }

      const userIdValue = parseInt(storedUserId) || 1;
      setUserId(userIdValue);

      // Check if survey has been initialized
      const initialized = await AsyncStorage.getItem(SURVEY_INITIALIZED_KEY);
      
      if (!initialized) {
        // Initialize survey tracking
        const installDate = new Date().toISOString();
        await AsyncStorage.setItem(SURVEY_INITIALIZED_KEY, installDate);
      }

      // Check if survey should be shown
      await checkAndShowSurvey();
    } catch (err) {
      console.error("[Survey] Failed to initialize:", err);
    }
  };

  const initializeSurvey = async (userIdValue: number) => {
    try {
      const installDate = new Date().toISOString();
      await AsyncStorage.setItem(SURVEY_INITIALIZED_KEY, installDate);
    } catch (err) {
      console.error("[Survey] Failed to initialize survey:", err);
    }
  };

  const checkAndShowSurvey = async () => {
    try {
      // Check if survey is already completed
      const isCompleted = await AsyncStorage.getItem(SURVEY_COMPLETED_KEY);
      if (isCompleted === "true") {
        return; // Don't show survey if already completed
      }

      // Get last prompt time
      const lastPromptStr = await AsyncStorage.getItem(SURVEY_LAST_PROMPT_KEY);
      const lastPrompt = lastPromptStr ? new Date(lastPromptStr) : null;

      // Get install date
      const installDateStr = await AsyncStorage.getItem(SURVEY_INITIALIZED_KEY);
      const installDate = installDateStr ? new Date(installDateStr) : new Date();

      const now = new Date();

      // Calculate days since install
      const daysSinceInstall = Math.floor(
        (now.getTime() - installDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      // Calculate days since last prompt
      const daysSinceLastPrompt = lastPrompt
        ? Math.floor((now.getTime() - lastPrompt.getTime()) / (1000 * 60 * 60 * 24))
        : daysSinceInstall;

      // Show survey if:
      // 1. Not completed AND
      // 2. At least 7 days since install OR at least 7 days since last prompt
      const shouldShowSurvey =
        isCompleted !== "true" &&
        (daysSinceInstall >= 7 || daysSinceLastPrompt >= 7);

      if (shouldShowSurvey) {
        // Show survey after a short delay to not interrupt user
        setTimeout(() => {
          setShowSurvey(true);
          // Update last prompt time
          AsyncStorage.setItem(SURVEY_LAST_PROMPT_KEY, new Date().toISOString());
        }, 2000);
      }
    } catch (err) {
      console.error("[Survey] Failed to check survey status:", err);
    }
  };

  const submitFeedback = async (feedback: SurveyFeedback) => {
    if (!userId) {
      setError("User ID not available");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Create feedback object
      const feedbackData = {
        userId,
        appRating: feedback.appRating,
        usageFrequency: feedback.usageFrequency,
        likedFeatures: feedback.likedFeatures || null,
        dislikedFeatures: feedback.dislikedFeatures || null,
        improvementSuggestions: feedback.improvementSuggestions || null,
        generalFeedback: feedback.generalFeedback || null,
        wouldRecommend: feedback.wouldRecommend,
        submittedAt: new Date().toISOString(),
      };

      // Store locally
      const existingFeedback = await AsyncStorage.getItem(SURVEY_FEEDBACK_KEY);
      const feedbackList = existingFeedback ? JSON.parse(existingFeedback) : [];
      feedbackList.push(feedbackData);
      await AsyncStorage.setItem(SURVEY_FEEDBACK_KEY, JSON.stringify(feedbackList));

      // Mark survey as completed
      await AsyncStorage.setItem(SURVEY_COMPLETED_KEY, "true");

      setShowSurvey(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to submit survey";
      setError(errorMessage);
      console.error("[Survey] Failed to submit feedback:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const dismissSurvey = async (userIdValue: number) => {
    try {
      // Update last prompt time without marking as completed
      await AsyncStorage.setItem(SURVEY_LAST_PROMPT_KEY, new Date().toISOString());
      setShowSurvey(false);
    } catch (err) {
      console.error("[Survey] Failed to dismiss survey:", err);
    }
  };

  return (
    <SurveyContext.Provider
      value={{
        showSurvey,
        setShowSurvey,
        submitFeedback,
        isLoading,
        error,
        initializeSurvey,
        dismissSurvey,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
}

/**
 * Hook to use survey context
 */
export function useSurvey() {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error("useSurvey must be used within SurveyProvider");
  }
  return context;
}
