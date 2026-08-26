import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Survey feedback table to store user feedback responses.
 * Tracks app rating, usage frequency, liked/disliked features, and improvement suggestions.
 */
export const surveyFeedback = mysqlTable("surveyFeedback", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  /** Overall app rating (1-5 stars) */
  appRating: int("appRating").notNull(),
  /** How frequently user will use the app */
  usageFrequency: varchar("usageFrequency", { length: 50 }).notNull(), // daily, weekly, monthly, rarely
  /** Features user liked (comma-separated or JSON) */
  likedFeatures: text("likedFeatures"),
  /** Features user did not like (comma-separated or JSON) */
  dislikedFeatures: text("dislikedFeatures"),
  /** Suggestions for improvement */
  improvementSuggestions: text("improvementSuggestions"),
  /** Overall feedback/comments */
  generalFeedback: text("generalFeedback"),
  /** Whether user would recommend the app */
  wouldRecommend: int("wouldRecommend"), // 0 = no, 1 = yes, null = not answered
  /** Timestamp when survey was submitted */
  submittedAt: timestamp("submittedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SurveyFeedback = typeof surveyFeedback.$inferSelect;
export type InsertSurveyFeedback = typeof surveyFeedback.$inferInsert;

/**
 * Survey tracking table to manage survey reminders and completion status.
 * Tracks when user last saw survey prompt and when they completed it.
 */
export const surveyTracking = mysqlTable("surveyTracking", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  /** Timestamp of app installation/first use */
  appInstallDate: timestamp("appInstallDate").defaultNow().notNull(),
  /** Timestamp when survey was last shown to user */
  lastSurveyPromptAt: timestamp("lastSurveyPromptAt"),
  /** Timestamp when user completed the survey */
  completedAt: timestamp("completedAt"),
  /** Whether user has completed the survey */
  isCompleted: int("isCompleted").default(0).notNull(), // 0 = no, 1 = yes
  /** Number of times survey was shown to user */
  promptCount: int("promptCount").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SurveyTracking = typeof surveyTracking.$inferSelect;
export type InsertSurveyTracking = typeof surveyTracking.$inferInsert;
