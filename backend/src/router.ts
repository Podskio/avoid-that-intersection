import { initTRPC } from "@trpc/server"
import superjson from "superjson"
import type { Context } from "./context"
import { lastUpdated } from "./incidents"

export const t = initTRPC.context<Context>().create({
  transformer: superjson,
})

export const appRouter = t.router({
  getIncidents: t.procedure.query(async ({ ctx }) => {
    return await ctx.db.selectFrom("incident").selectAll().execute()
  }),

  getLastUpdated: t.procedure.query(() => lastUpdated.getTime()),
})

export type AppRouter = typeof appRouter
