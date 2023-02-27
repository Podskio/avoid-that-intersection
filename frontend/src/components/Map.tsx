import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer } from "react-leaflet"
import { trpc } from "../utils/trpc"
import HeatLayer from "./HeatLayer"

const Map = () => {
  const { data: incidents } = trpc.getIncidents.useQuery()

  return (
    <MapContainer minZoom={4} zoomControl={false}>
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
      />
      {incidents && <HeatLayer data={incidents} />}
    </MapContainer>
  )
}

export default Map
