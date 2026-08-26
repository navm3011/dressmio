import { z } from "zod";
import { notifyOwner } from "./notification";
import { adminProcedure, publicProcedure, router } from "./trpc";
import { storagePut } from "../storage";

export const systemRouter = router({
  health: publicProcedure
    .input(
      z.object({
        timestamp: z.number().min(0, "timestamp cannot be negative"),
      }),
    )
    .query(() => ({
      ok: true,
    })),

  notifyOwner: adminProcedure
    .input(
      z.object({
        title: z.string().min(1, "title is required"),
        content: z.string().min(1, "content is required"),
      }),
    )
    .mutation(async ({ input }) => {
      const delivered = await notifyOwner(input);
      return {
        success: delivered,
      } as const;
    }),

  uploadImage: publicProcedure
    .input(
      z.object({
        base64Data: z.string().min(1, "base64 data is required"),
        mimeType: z.string().default("image/jpeg"),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const buffer = Buffer.from(input.base64Data, "base64");
        const { url } = await storagePut(
          `uploads/images/${Date.now()}.jpg`,
          buffer,
          input.mimeType
        );
        return {
          success: true,
          url,
        };
      } catch (error) {
        console.error("Image upload failed:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Upload failed",
        };
      }
    }),
});
