import "leaflet/dist/leaflet.css"
import { CircleMarker, MapContainer, TileLayer, Tooltip } from "react-leaflet"
import type { IncidentFilters } from "../App"
import { trpc } from "../utils/trpc"
import HeatLayer from "./HeatLayer"

const formatDate = (timestamp: string) =>
  new Date(timestamp).toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  })

interface MapProps {
  filters: IncidentFilters
}

const Map = ({ filters }: MapProps) => {
  const { data: incidents } = trpc.getIncidents.useQuery()

  const filterIncidents = () => {
    let filtered = incidents

    if (filters.type !== "all") {
      filtered = filtered?.filter((incident) => incident.type === filters.type)
    }
    if (filters.after) {
      const afterDate = filters.after

      filtered = filtered?.filter(
        (incident) => new Date(incident.timestamp) >= afterDate,
      )
    }
    if (filters.before) {
      const beforeDate = new Date(filters.before)

      // Include entire day
      beforeDate.setDate(beforeDate.getDate() + 1)
      beforeDate.setHours(24)

      filtered = filtered?.filter(
        (incident) => new Date(incident.timestamp) < beforeDate,
      )
    }

    return filtered
  }

  const filteredIncidents = filterIncidents()

  return (
    <MapContainer minZoom={4} zoomControl={false}>
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
      />
      {filteredIncidents && <HeatLayer data={filteredIncidents} />}
      {filteredIncidents?.map((incident) => (
        <CircleMarker
          key={incident.id}
          center={[incident.lat, incident.lng]}
          radius={20}
          opacity={0}
          fillOpacity={0}
        >
          <Tooltip sticky>
            <h3>{incident.type}</h3>
            <i>{formatDate(incident.timestamp)}</i>
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  )
}

export default Map
