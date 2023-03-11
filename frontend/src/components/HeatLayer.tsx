import type { inferProcedureOutput } from "@trpc/server"
import type { HeatLatLngTuple, LatLngExpression } from "leaflet"
import L from "leaflet"
import "leaflet.heat"
import { useMap } from "react-leaflet"
import type { AppRouter } from "../../../backend/src/router"

type Incidents = inferProcedureOutput<AppRouter["getIncidents"]>

const getIntensity = (incident: Incidents[number]["type"]) => {
  switch (incident) {
    case "Traffic Collision":
      return 1
    case "Expanded Traffic Collision":
    case "Traffic Collision Involving Structure":
    case "Traffic Collision Involving Train":
      return 2
    case "Multi Casualty":
      return 3
  }
}

const HeatLayer = ({ data }: { data: Incidents }) => {
  const map = useMap()

  const heatLayerData = data.map((incident) => [
    incident.lat,
    incident.lng,
    getIntensity(incident.type),
  ]) as HeatLatLngTuple[]

  L.heatLayer(heatLayerData, {
    gradient: {
      0.4: "#cc1821",
      0.6: "#f13c37",
      0.7: "#fc6b4b",
      0.8: "#fc9272",
      1.0: "#fcbba1",
    },
    radius: 20,
    minOpacity: 0.2,
  }).addTo(map)

  const dataCoordinates = data.map((incident) => [
    incident.lat,
    incident.lng,
  ]) as LatLngExpression[]

  const bounds = L.latLngBounds(dataCoordinates)
  map.fitBounds(bounds)

  return null
}

export default HeatLayer
