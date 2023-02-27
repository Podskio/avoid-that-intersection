import { getIncidents } from "pulsepoint"
import { db } from "./db"

export let lastUpdated = new Date()

const updateIncidents = async () => {
  if (!process.env.AGENCIES) throw new Error("No agencies provided")

  const incidents = await getIncidents(process.env.AGENCIES)

  const trafficCollisions = incidents.recent
    .filter((incident) => incident.type.includes("Traffic Collision"))
    .map((incident) => ({
      id: incident.id,
      lat: incident.coordinates[0],
      lng: incident.coordinates[1],
    }))

  db.insertInto("incident")
    .onConflict((oc) => oc.column("id").doNothing())
    .values(trafficCollisions)
    .execute()

  lastUpdated = new Date()
}

export default updateIncidents
