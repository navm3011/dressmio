import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { useColors } from "@/hooks/use-colors";
import { cn } from "@/lib/utils";

export interface SurveyModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (feedback: SurveyFeedback) => Promise<void>;
  isLoading?: boolean;
}

export interface SurveyFeedback {
  appRating: number;
  usageFrequency: "daily" | "weekly" | "monthly" | "rarely";
  likedFeatures: string;
  dislikedFeatures: string;
  improvementSuggestions: string;
  moreFeatures: string;
  generalFeedback: string;
  wouldRecommend: number;
}

/**
 * Survey Modal Component
 *
 * Displays a comprehensive survey form asking users about:
 * - App rating (1-5 stars)
 * - Usage frequency
 * - Liked features
 * - Disliked features
 * - Improvement suggestions
 * - General feedback
 * - Would recommend
 */
export function SurveyModal({
  visible,
  onClose,
  onSubmit,
  isLoading = false,
}: SurveyModalProps) {
  const colors = useColors();
  const [step, setStep] = useState(1);
  const [feedback, setFeedback] = useState<SurveyFeedback>({
    appRating: 0,
    usageFrequency: "weekly",
    likedFeatures: "",
    dislikedFeatures: "",
    improvementSuggestions: "",
    moreFeatures: "",
    generalFeedback: "",
    wouldRecommend: 0,
  });

  const handleRating = (rating: number) => {
    setFeedback({ ...feedback, appRating: rating });
  };

  const handleFrequency = (frequency: "daily" | "weekly" | "monthly" | "rarely") => {
    setFeedback({ ...feedback, usageFrequency: frequency });
  };

  const handleRecommend = (value: number) => {
    setFeedback({ ...feedback, wouldRecommend: value });
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    await onSubmit(feedback);
    setStep(1);
    setFeedback({
      appRating: 0,
      usageFrequency: "weekly",
      likedFeatures: "",
      dislikedFeatures: "",
      improvementSuggestions: "",
      moreFeatures: "",
      generalFeedback: "",
      wouldRecommend: 0,
    });
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return feedback.appRating > 0;
      case 2:
        return true; // frequency always has default
      case 3:
        return feedback.likedFeatures.trim().length > 0 || feedback.dislikedFeatures.trim().length > 0;
      case 4:
        return true; // optional fields
      default:
        return false;
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        className="flex-1 justify-center items-center bg-black/50"
        style={{ backgroundColor: `${colors.background}99` }}
      >
        <View
          className="w-11/12 max-w-md rounded-2xl p-6 shadow-lg"
          style={{ backgroundColor: colors.surface }}
        >
          {/* Header */}
          <View className="mb-6">
            <Text
              className="text-2xl font-bold mb-2"
              style={{ color: colors.foreground }}
            >
              Suggestions
            </Text>
            <Text
              className="text-sm"
              style={{ color: colors.muted }}
            >
              Your feedback helps us make dressMio better
            </Text>
          </View>

          {/* Progress Indicator */}
          <View className="flex-row gap-1 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <View
                key={i}
                className="flex-1 h-1 rounded-full"
                style={{
                  backgroundColor: i <= step ? colors.primary : colors.border,
                }}
              />
            ))}
          </View>

          {/* Content */}
          <ScrollView
            className="min-h-48 mb-6"
            showsVerticalScrollIndicator={false}
          >
            {/* Step 1: App Rating */}
            {step === 1 && (
              <View>
                <Text
                  className="text-lg font-semibold mb-4"
                  style={{ color: colors.foreground }}
                >
                  How did you like the app?
                </Text>
                <View className="flex-row justify-center gap-3">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Pressable
                      key={rating}
                      onPress={() => handleRating(rating)}
                      className="w-12 h-12 rounded-full items-center justify-center border-2"
                      style={{
                        backgroundColor:
                          feedback.appRating === rating
                            ? colors.primary
                            : colors.background,
                        borderColor:
                          feedback.appRating === rating
                            ? colors.primary
                            : colors.border,
                      }}
                    >
                      <Text
                        className="text-lg font-bold"
                        style={{
                          color:
                            feedback.appRating === rating
                              ? colors.background
                              : colors.foreground,
                        }}
                      >
                        {rating}
                      </Text>
                    </Pressable>
                  ))}
                </View>
                <Text
                  className="text-xs text-center mt-4"
                  style={{ color: colors.muted }}
                >
                  1 = Poor, 5 = Excellent
                </Text>
              </View>
            )}

            {/* Step 2: Usage Frequency */}
            {step === 2 && (
              <View>
                <Text
                  className="text-lg font-semibold mb-4"
                  style={{ color: colors.foreground }}
                >
                  How frequently will you use the app?
                </Text>
                <View className="gap-3">
                  {(["daily", "weekly", "monthly", "rarely"] as const).map(
                    (freq) => (
                      <Pressable
                        key={freq}
                        onPress={() => handleFrequency(freq)}
                        className="p-4 rounded-lg border-2"
                        style={{
                          backgroundColor:
                            feedback.usageFrequency === freq
                              ? colors.primary
                              : colors.background,
                          borderColor:
                            feedback.usageFrequency === freq
                              ? colors.primary
                              : colors.border,
                        }}
                      >
                        <Text
                          className="font-medium capitalize"
                          style={{
                            color:
                              feedback.usageFrequency === freq
                                ? colors.background
                                : colors.foreground,
                          }}
                        >
                          {freq}
                        </Text>
                      </Pressable>
                    )
                  )}
                </View>
              </View>
            )}

            {/* Step 3: Features Feedback */}
            {step === 3 && (
              <View>
                <Text
                  className="text-lg font-semibold mb-4"
                  style={{ color: colors.foreground }}
                >
                  What features did you like or dislike?
                </Text>

                <Text
                  className="text-sm font-medium mb-2"
                  style={{ color: colors.foreground }}
                >
                  Features you liked
                </Text>
                <TextInput
                  placeholder="e.g., AI categorization, outfit suggestions..."
                  placeholderTextColor={colors.muted}
                  value={feedback.likedFeatures}
                  onChangeText={(text) =>
                    setFeedback({ ...feedback, likedFeatures: text })
                  }
                  multiline
                  numberOfLines={3}
                  style={{
                    borderColor: colors.border,
                    borderWidth: 1,
                    borderRadius: 8,
                    padding: 12,
                    marginBottom: 16,
                    color: colors.foreground,
                    backgroundColor: colors.background,
                    fontFamily: "System",
                    fontSize: 14,
                  }}
                />

                <Text
                  className="text-sm font-medium mb-2"
                  style={{ color: colors.foreground }}
                >
                  Features you disliked
                </Text>
                <TextInput
                  placeholder="e.g., slow performance, confusing UI..."
                  placeholderTextColor={colors.muted}
                  value={feedback.dislikedFeatures}
                  onChangeText={(text) =>
                    setFeedback({ ...feedback, dislikedFeatures: text })
                  }
                  multiline
                  numberOfLines={3}
                  style={{
                    borderColor: colors.border,
                    borderWidth: 1,
                    borderRadius: 8,
                    padding: 12,
                    color: colors.foreground,
                    backgroundColor: colors.background,
                    fontFamily: "System",
                    fontSize: 14,
                  }}
                />
              </View>
            )}

            {/* Step 4: Suggestions & Recommendation */}
            {step === 4 && (
              <View>
                <Text
                  className="text-lg font-semibold mb-4"
                  style={{ color: colors.foreground }}
                >
                  What would you like to do more with dressMio?
                </Text>

                <TextInput
                  placeholder="e.g., virtual try-on, style recommendations, social sharing..."
                  placeholderTextColor={colors.muted}
                  value={feedback.moreFeatures}
                  onChangeText={(text) =>
                    setFeedback({ ...feedback, moreFeatures: text })
                  }
                  multiline
                  numberOfLines={4}
                  style={{
                    borderColor: colors.border,
                    borderWidth: 1,
                    borderRadius: 8,
                    padding: 12,
                    marginBottom: 16,
                    color: colors.foreground,
                    backgroundColor: colors.background,
                    fontFamily: "System",
                    fontSize: 14,
                  }}
                />

                <Text
                  className="text-lg font-semibold mb-4"
                  style={{ color: colors.foreground }}
                >
                  Would you recommend dressMio to a friend?
                </Text>
                <View className="flex-row gap-3">
                  {[
                    { label: "Yes", value: 1 },
                    { label: "No", value: 0 },
                  ].map((option) => (
                    <Pressable
                      key={option.value}
                      onPress={() => handleRecommend(option.value)}
                      className="flex-1 p-3 rounded-lg border-2"
                      style={{
                        backgroundColor:
                          feedback.wouldRecommend === option.value
                            ? colors.primary
                            : colors.background,
                        borderColor:
                          feedback.wouldRecommend === option.value
                            ? colors.primary
                            : colors.border,
                      }}
                    >
                      <Text
                        className="font-medium text-center"
                        style={{
                          color:
                            feedback.wouldRecommend === option.value
                              ? colors.background
                              : colors.foreground,
                        }}
                      >
                        {option.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            )}


          </ScrollView>

          {/* Buttons */}
          <View className="flex-row gap-3">
            {step > 1 && (
              <Pressable
                onPress={handlePrevious}
                disabled={isLoading}
                className="flex-1 py-3 rounded-lg border-2"
                style={{
                  borderColor: colors.border,
                  opacity: isLoading ? 0.5 : 1,
                }}
              >
                <Text
                  className="text-center font-semibold"
                  style={{ color: colors.foreground }}
                >
                  Back
                </Text>
              </Pressable>
            )}

            {step < 4 ? (
              <Pressable
                onPress={handleNext}
                disabled={!isStepValid() || isLoading}
                className="flex-1 py-3 rounded-lg"
                style={{
                  backgroundColor: isStepValid() ? colors.primary : colors.border,
                  opacity: isStepValid() && !isLoading ? 1 : 0.5,
                }}
              >
                <Text
                  className="text-center font-semibold"
                  style={{ color: colors.background }}
                >
                  Next
                </Text>
              </Pressable>
            ) : (
              <Pressable
                onPress={handleSubmit}
                disabled={isLoading}
                className="flex-1 py-3 rounded-lg flex-row items-center justify-center gap-2"
                style={{
                  backgroundColor: colors.primary,
                  opacity: isLoading ? 0.7 : 1,
                }}
              >
                {isLoading && (
                  <ActivityIndicator color={colors.background} size="small" />
                )}
                <Text
                  className="text-center font-semibold"
                  style={{ color: colors.background }}
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </Text>
              </Pressable>
            )}

            <Pressable
              onPress={onClose}
              disabled={isLoading}
              className="px-4 py-3 rounded-lg"
              style={{
                backgroundColor: colors.border,
                opacity: isLoading ? 0.5 : 1,
              }}
            >
              <Text
                className="font-semibold"
                style={{ color: colors.foreground }}
              >
                {step === 1 ? "Skip" : "Close"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
