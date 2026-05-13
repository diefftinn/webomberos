import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import {
  getVolunteers,
  getVolunteerById,
  createVolunteer,
  updateVolunteer,
} from "../db";

export const volunteersRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user?.role !== "admin") {
      throw new Error("Unauthorized");
    }
    return getVolunteers();
  }),

  byId: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      return getVolunteerById(input.id);
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        address: z.string().optional(),
        birthDate: z.string().optional(),
        idNumber: z.string().optional(),
        experience: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return createVolunteer({
        ...input,
        status: "pending",
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["pending", "approved", "rejected", "active", "inactive"]).optional(),
        name: z.string().optional(),
        email: z.string().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
        birthDate: z.string().optional(),
        idNumber: z.string().optional(),
        experience: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      const { id, ...data } = input;
      return updateVolunteer(id, data);
    }),
});
