import { z } from "zod";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "../init";
import prisma from "@/lib/db";
export const appRouter = createTRPCRouter({
  getUser: protectedProcedure.query(({ ctx }) => {
    const data = prisma.user.findMany({
      where: {
        id: ctx.auth.user.id,
      },
    });
    console.log("TRPC getUser data:", data);
    return data;
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
