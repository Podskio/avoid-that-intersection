import type { inferProcedureOutput } from "@trpc/server"
import type { HeatLatLngTuple, LatLngExpression } from "leaflet"
import L from "leaflet"
import "leaflet.heat"
import { useMap } from "react-leaflet"
import type { AppRouter } from "../../../backend/src/router"

type Incidents = inferProcedureOutput<AppRouter["getIncidents"]>

const HeatLayer = ({ data }: { data: Incidents }) => {
  const map = useMap()

  const heatLayerData = data.map((incident) => [
    incident.lat,
    incident.lng,
    1,
  ]) as HeatLatLngTuple[]

  L.heatLayer(heatLayerData, {
    gradient: {
      0.4: "#910101",
      0.6: "#c90000",
      0.8: "#ff0000",
      1: "#fc5050",
    },
    blur: 10,
    max: 1,
    minOpacity: 0.75,
    radius: 10,
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
