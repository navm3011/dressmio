import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, surveyFeedback, surveyTracking, InsertSurveyFeedback, InsertSurveyTracking } from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Survey Functions
 */

export async function submitSurveyFeedback(feedback: InsertSurveyFeedback) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot submit survey: database not available");
    return null;
  }

  try {
    const result = await db.insert(surveyFeedback).values(feedback);
    return result;
  } catch (error) {
    console.error("[Database] Failed to submit survey feedback:", error);
    throw error;
  }
}

export async function getSurveyTracking(userId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get survey tracking: database not available");
    return undefined;
  }

  try {
    const result = await db
      .select()
      .from(surveyTracking)
      .where(eq(surveyTracking.userId, userId))
      .limit(1);

    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to get survey tracking:", error);
    throw error;
  }
}

export async function createOrUpdateSurveyTracking(tracking: InsertSurveyTracking) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create survey tracking: database not available");
    return null;
  }

  try {
    const existing = await getSurveyTracking(tracking.userId);
    
    if (existing) {
      // Update existing tracking
      await db
        .update(surveyTracking)
        .set(tracking)
        .where(eq(surveyTracking.userId, tracking.userId));
      return existing;
    } else {
      // Create new tracking
      const result = await db.insert(surveyTracking).values(tracking);
      return result;
    }
  } catch (error) {
    console.error("[Database] Failed to create/update survey tracking:", error);
    throw error;
  }
}

export async function markSurveyCompleted(userId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot mark survey completed: database not available");
    return null;
  }

  try {
    const result = await db
      .update(surveyTracking)
      .set({
        isCompleted: 1,
        completedAt: new Date(),
        lastSurveyPromptAt: new Date(),
      })
      .where(eq(surveyTracking.userId, userId));
    return result;
  } catch (error) {
    console.error("[Database] Failed to mark survey completed:", error);
    throw error;
  }
}

export async function updateSurveyPromptCount(userId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update survey prompt count: database not available");
    return null;
  }

  try {
    const tracking = await getSurveyTracking(userId);
    const newCount = (tracking?.promptCount ?? 0) + 1;
    
    const result = await db
      .update(surveyTracking)
      .set({
        lastSurveyPromptAt: new Date(),
        promptCount: newCount,
      })
      .where(eq(surveyTracking.userId, userId));
    return result;
  } catch (error) {
    console.error("[Database] Failed to update survey prompt count:", error);
    throw error;
  }
}

// TODO: add more feature queries here as your schema grows.
