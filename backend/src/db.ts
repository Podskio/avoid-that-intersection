import "dotenv/config"
import { Kysely, PostgresDialect } from "kysely"
import { Pool } from "pg"

interface IncidentTable {
  id: string
  time: Date
  type: string
  lat: number
  lng: number
}

interface Database {
  incident: IncidentTable
}

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
    }),
  }),
})
