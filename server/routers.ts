import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { newsRouter } from "./routers/news";
import { servicesRouter } from "./routers/services";
import { stationsRouter } from "./routers/stations";
import { coursesRouter } from "./routers/courses";
import { galleryRouter } from "./routers/gallery";
import { requestsRouter } from "./routers/requests";
import { volunteersRouter } from "./routers/volunteers";
import { dataRouter } from "./routers/data";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  news: newsRouter,
  services: servicesRouter,
  stations: stationsRouter,
  courses: coursesRouter,
  gallery: galleryRouter,
  requests: requestsRouter,
  volunteers: volunteersRouter,
  data: dataRouter,
});

export type AppRouter = typeof appRouter;
