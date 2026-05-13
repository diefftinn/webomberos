import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import {
  getStations,
  getStationById,
  createStation,
  updateStation,
  deleteStation,
} from "../db";

export const stationsRouter = router({
  list: publicProcedure.query(async () => {
    return getStations();
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return getStationById(input.id);
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        address: z.string().min(1),
        phone: z.string().optional(),
        email: z.string().optional(),
        latitude: z.string().optional(),
        longitude: z.string().optional(),
        commander: z.string().optional(),
        personnel: z.number().default(0),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      return createStation(input);
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        address: z.string().optional(),
        phone: z.string().optional(),
        email: z.string().optional(),
        latitude: z.string().optional(),
        longitude: z.string().optional(),
        commander: z.string().optional(),
        personnel: z.number().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      const { id, ...data } = input;
      return updateStation(id, data);
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      return deleteStation(input.id);
    }),
});
