import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import {
  submitSurveyFeedback,
  getSurveyTracking,
  createOrUpdateSurveyTracking,
  markSurveyCompleted,
  updateSurveyPromptCount,
} from "./db";

/**
 * Survey Router
 * 
 * Handles survey submission, tracking, and reminder logic.
 * All procedures are public (no auth required) to allow anonymous feedback.
 */

const SurveyFeedbackInput = z.object({
  userId: z.number(),
  appRating: z.number().min(1).max(5),
  usageFrequency: z.enum(["daily", "weekly", "monthly", "rarely"]),
  likedFeatures: z.string().optional().nullable(),
  dislikedFeatures: z.string().optional().nullable(),
  improvementSuggestions: z.string().optional().nullable(),
  generalFeedback: z.string().optional().nullable(),
  wouldRecommend: z.number().min(0).max(1).optional().nullable(),
});

export const surveyRouter = router({
  /**
   * Submit survey feedback
   * 
   * POST /api/survey.submit
   * Saves user feedback to database
   */
  submit: publicProcedure
    .input(SurveyFeedbackInput)
    .mutation(async ({ input }) => {
      try {
        const result = await submitSurveyFeedback({
          userId: input.userId,
          appRating: input.appRating,
          usageFrequency: input.usageFrequency,
          likedFeatures: input.likedFeatures || null,
          dislikedFeatures: input.dislikedFeatures || null,
          improvementSuggestions: input.improvementSuggestions || null,
          generalFeedback: input.generalFeedback || null,
          wouldRecommend: input.wouldRecommend || null,
        });

        // Mark survey as completed
        await markSurveyCompleted(input.userId);

        return {
          success: true,
          message: "Survey feedback submitted successfully",
        };
      } catch (error) {
        console.error("[Survey] Failed to submit feedback:", error);
        return {
          success: false,
          message: "Failed to submit survey feedback",
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),

  /**
   * Get survey tracking status for a user
   * 
   * GET /api/survey.getTracking
   * Returns survey completion status and next prompt time
   */
  getTracking: publicProcedure
    .input(z.object({ userId: z.number() }))
    .query(async ({ input }) => {
      try {
        const tracking = await getSurveyTracking(input.userId);

        if (!tracking) {
          // Create new tracking if doesn't exist
          const newTracking = await createOrUpdateSurveyTracking({
            userId: input.userId,
            appInstallDate: new Date(),
            isCompleted: 0,
            promptCount: 0,
          });

          return {
            success: true,
            tracking: newTracking,
            shouldShowSurvey: false,
          };
        }

        // Check if survey should be shown
        const now = new Date();
        const lastPrompt = tracking.lastSurveyPromptAt
          ? new Date(tracking.lastSurveyPromptAt)
          : null;
        const installDate = new Date(tracking.appInstallDate);

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
          tracking.isCompleted === 0 &&
          (daysSinceInstall >= 7 || daysSinceLastPrompt >= 7);

        if (shouldShowSurvey) {
          // Update prompt count
          await updateSurveyPromptCount(input.userId);
        }

        return {
          success: true,
          tracking,
          shouldShowSurvey,
          daysSinceInstall,
          daysSinceLastPrompt,
        };
      } catch (error) {
        console.error("[Survey] Failed to get tracking:", error);
        return {
          success: false,
          message: "Failed to get survey tracking",
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),

  /**
   * Initialize survey tracking for new user
   * 
   * POST /api/survey.initialize
   * Creates initial survey tracking record
   */
  initialize: publicProcedure
    .input(z.object({ userId: z.number() }))
    .mutation(async ({ input }) => {
      try {
        const existing = await getSurveyTracking(input.userId);

        if (existing) {
          return {
            success: true,
            message: "Survey tracking already exists",
            tracking: existing,
          };
        }

        const tracking = await createOrUpdateSurveyTracking({
          userId: input.userId,
          appInstallDate: new Date(),
          isCompleted: 0,
          promptCount: 0,
        });

        return {
          success: true,
          message: "Survey tracking initialized",
          tracking,
        };
      } catch (error) {
        console.error("[Survey] Failed to initialize:", error);
        return {
          success: false,
          message: "Failed to initialize survey tracking",
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),

  /**
   * Dismiss survey prompt (increment prompt count without submitting)
   * 
   * POST /api/survey.dismiss
   * Marks that user saw the survey but didn't complete it
   */
  dismiss: publicProcedure
    .input(z.object({ userId: z.number() }))
    .mutation(async ({ input }) => {
      try {
        await updateSurveyPromptCount(input.userId);

        return {
          success: true,
          message: "Survey prompt dismissed",
        };
      } catch (error) {
        console.error("[Survey] Failed to dismiss:", error);
        return {
          success: false,
          message: "Failed to dismiss survey",
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),
});
