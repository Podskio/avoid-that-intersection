import { trpc } from "../utils/trpc"

// Pluralize time units
const p = (count: number) => (count === 1 ? "" : "s")

export const relativeTime = (dateTime: number) => {
  const elapsed = new Date().getTime() - dateTime

  const seconds = Math.round(elapsed / 1000)
  const minutes = Math.round(elapsed / (1000 * 60))
  const hours = Math.round(elapsed / (1000 * 60 * 60))
  const days = Math.round(elapsed / (1000 * 60 * 60 * 24))
  const weeks = Math.round(elapsed / (1000 * 60 * 60 * 24 * 7))
  const months = Math.round(elapsed / (1000 * 60 * 60 * 24 * 30))

  if (seconds < 60) return seconds + " second" + p(seconds) + " ago"
  if (minutes < 60) return minutes + " minute" + p(minutes) + " ago"
  if (hours < 24) return hours + " hour" + p(hours) + " ago"
  if (days < 7) return days + " day" + p(days) + " ago"
  if (weeks < 4) return weeks + " week" + p(weeks) + " ago"
  return months + " month" + p(months) + " ago"
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
