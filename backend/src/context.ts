import type { inferAsyncReturnType } from "@trpc/server"
import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify"
import { db } from "./db"

export function createContext({ req, res }: CreateFastifyContextOptions) {
  return { req, res, db }
}

export type Context = inferAsyncReturnType<typeof createContext>
