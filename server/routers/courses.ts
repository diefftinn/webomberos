import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../db";

export const coursesRouter = router({
  list: publicProcedure
    .input(z.object({ limit: z.number().default(10), offset: z.number().default(0) }).optional())
    .query(async ({ input }) => {
      return getCourses(input?.limit || 10, input?.offset || 0);
    }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return getCourseById(input.id);
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        instructor: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        capacity: z.number().default(0),
        enrolled: z.number().default(0),
        location: z.string().optional(),
        imageUrl: z.string().optional(),
        imageKey: z.string().optional(),
        status: z.enum(["scheduled", "ongoing", "completed", "cancelled"]).default("scheduled"),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      return createCourse(input);
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        instructor: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        capacity: z.number().optional(),
        enrolled: z.number().optional(),
        location: z.string().optional(),
        imageUrl: z.string().optional(),
        imageKey: z.string().optional(),
        status: z.enum(["scheduled", "ongoing", "completed", "cancelled"]).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      const { id, ...data } = input;
      return updateCourse(id, data);
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      return deleteCourse(input.id);
    }),
});
