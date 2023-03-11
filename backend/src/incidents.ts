import type { CallType } from "pulsepoint"
import { getIncidents } from "pulsepoint"
import { db } from "./db"

export let lastUpdated = new Date()

const whitelistedCalls: CallType[] = [
  "Traffic Collision",
  "Expanded Traffic Collision",
  "Traffic Collision Involving Structure",
  "Traffic Collision Involving Train",
  "Multi Casualty",
]

const updateIncidents = async () => {
  if (!process.env.AGENCIES) throw new Error("No agencies provided")

  const incidents = await getIncidents(process.env.AGENCIES)

  const trafficCollisions = incidents.recent
    .filter((incident) => whitelistedCalls.includes(incident.type))
    .map((incident) => ({
      id: incident.id,
      time: incident.receivedTime,
      type: incident.type,
      lat: incident.coordinates[0],
      lng: incident.coordinates[1],
    }))

  db.insertInto("incident")
    .onConflict((oc) => oc.column("id").doNothing())
    .values(trafficCollisions)
    .execute()

  lastUpdated = new Date()

  console.log(`Updated incidents at ${lastUpdated}`)
}

export default updateIncidents
