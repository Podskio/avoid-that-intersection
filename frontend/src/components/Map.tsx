import "leaflet/dist/leaflet.css"
import { CircleMarker, MapContainer, TileLayer, Tooltip } from "react-leaflet"
import { trpc } from "../utils/trpc"
import HeatLayer from "./HeatLayer"
import { relativeTime } from "./Overlay"

const Map = () => {
  const { data: incidents } = trpc.getIncidents.useQuery()

  return (
    <MapContainer minZoom={4} zoomControl={false}>
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
      />
      {incidents && <HeatLayer data={incidents} />}
      {incidents?.map((incident) => (
        <CircleMarker
          key={incident.id}
          center={[incident.lat, incident.lng]}
          radius={20}
          opacity={0}
          fillOpacity={0}
        >
          <Tooltip sticky>
            <h3>{incident.type}</h3>
            <i>{relativeTime(incident.time.getTime())}</i>
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  )
}

export default Map
