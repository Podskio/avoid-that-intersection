import { db } from "./db"

db.schema
  .createTable("incident")
  .addColumn("id", "varchar", (col) => col.primaryKey())
  .addColumn("time", "timestamp", (col) => col.notNull())
  .addColumn("type", "varchar", (col) => col.notNull())
  .addColumn("lat", "float4", (col) => col.notNull())
  .addColumn("lng", "float4", (col) => col.notNull())
  .execute()
