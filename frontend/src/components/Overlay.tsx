import { trpc } from "../utils/trpc"

const relativeTime = (dateTime: number) => {
  const elapsed = new Date().getTime() - dateTime

  const seconds = Math.round(elapsed / 1000)
  const minutes = Math.round(elapsed / (1000 * 60))
  const hours = Math.round(elapsed / (1000 * 60 * 60))

  if (seconds < 60) return seconds + " seconds ago"
  if (minutes < 60) return minutes + " minutes ago"
  if (hours < 24) return hours + " hours ago"
}

const Overlay = () => {
  const { data: lastUpdated } = trpc.getLastUpdated.useQuery()

  return (
    <div className="map-overlay">
      <div>
        <h1>{import.meta.env.VITE_AGENCY_LABEL}</h1>
        <h2>Traffic Collisions</h2>
        {lastUpdated && <i>Last updated {relativeTime(lastUpdated)}</i>}
      </div>
    </div>
  )
}

export default Overlay
