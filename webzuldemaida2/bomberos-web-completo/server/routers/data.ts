import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import {
  getEmergencyStats,
  createEmergencyStat,
  updateEmergencyStat,
  getInstitutionalInfo,
  createInstitutionalInfo,
  updateInstitutionalInfo,
} from "../db";

export const dataRouter = router({
  // Emergency Statistics
  emergencyStats: router({
    list: publicProcedure
      .input(z.object({ stationId: z.number().optional() }).optional())
      .query(async ({ input }) => {
        return getEmergencyStats(input?.stationId);
      }),

    create: protectedProcedure
      .input(
        z.object({
          type: z.string().min(1),
          stationId: z.number().optional(),
          date: z.string().optional(),
          count: z.number().default(0),
          description: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        return createEmergencyStat(input);
      }),

    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          type: z.string().optional(),
          stationId: z.number().optional(),
          date: z.string().optional(),
          count: z.number().optional(),
          description: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        const { id, ...data } = input;
        return updateEmergencyStat(id, data);
      }),
  }),

  // Institutional Information
  institutional: router({
    list: publicProcedure
      .input(z.object({ section: z.string().optional() }).optional())
      .query(async ({ input }) => {
        return getInstitutionalInfo(input?.section);
      }),

    create: protectedProcedure
      .input(
        z.object({
          section: z.string().min(1),
          title: z.string().min(1),
          content: z.string().min(1),
          imageUrl: z.string().optional(),
          imageKey: z.string().optional(),
          order: z.number().default(0),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        return createInstitutionalInfo(input);
      }),

    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          section: z.string().optional(),
          title: z.string().optional(),
          content: z.string().optional(),
          imageUrl: z.string().optional(),
          imageKey: z.string().optional(),
          order: z.number().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        const { id, ...data } = input;
        return updateInstitutionalInfo(id, data);
      }),
  }),
});
