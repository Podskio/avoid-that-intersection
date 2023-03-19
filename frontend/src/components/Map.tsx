import "leaflet/dist/leaflet.css"
import { CircleMarker, MapContainer, TileLayer, Tooltip } from "react-leaflet"
import type { IncidentFilters } from "../App"
import { trpc } from "../utils/trpc"
import HeatLayer from "./HeatLayer"

const formatDate = (date: Date) =>
  date.toLocaleTimeString("en-US", {
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

    if (filters.type !== "all")
      filtered = filtered?.filter((incident) => incident.type === filters.type)
    if (filters.after)
      filtered = filtered?.filter((incident) => incident.time >= filters.after!)
    if (filters.before)
      filtered = filtered?.filter((incident) => incident.time <= filters.before!)

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
            <i>{formatDate(incident.time)}</i>
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  )
}

export default Map
