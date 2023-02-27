import cors from "@fastify/cors"
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify"
import "dotenv/config"
import fastify from "fastify"
import { schedule } from "node-cron"
import { createContext } from "./context"
import updateIncidents from "./incidents"
import { appRouter } from "./router"

const server = fastify()

server.register(cors, {
  origin: "*",
})

server.register(fastifyTRPCPlugin, {
  trpcOptions: { router: appRouter, createContext },
})

server.listen({ port: process.env.PORT || 3000 }).catch((err) => {
  server.log.error(err)
})

schedule("0 */12 * * *", updateIncidents)
