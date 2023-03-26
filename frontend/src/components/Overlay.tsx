import type { ChangeEvent, Dispatch, SetStateAction } from "react"
import { useState } from "react"
import type { IncidentFilters } from "../App"
import { trpc } from "../utils/trpc"
import { ChevronDown, ChevronUp, Spinner } from "./Icons"

// Pluralize time units
const p = (count: number) => (count === 1 ? "" : "s")

const relativeTime = (dateTime: number) => {
  const elapsed = new Date().getTime() - dateTime

  const seconds = Math.round(elapsed / 1000)
  const minutes = Math.round(elapsed / (1000 * 60))
  const hours = Math.round(elapsed / (1000 * 60 * 60))
  const days = Math.round(elapsed / (1000 * 60 * 60 * 24))

  if (seconds < 60) return seconds + " second" + p(seconds) + " ago"
  if (minutes < 60) return minutes + " minute" + p(minutes) + " ago"
  if (hours < 24) return hours + " hour" + p(hours) + " ago"
  return days + " day" + p(days) + " ago"
}

const callTypes: string[] = [
  "Traffic Collision",
  "Expanded Traffic Collision",
  "Traffic Collision Involving Structure",
  "Traffic Collision Involving Train",
  "Multi Casualty",
]

interface OverlayProps {
  filters: IncidentFilters
  setFilters: Dispatch<SetStateAction<IncidentFilters>>
}

const Overlay = ({ filters, setFilters }: OverlayProps) => {
  const { data: lastUpdated } = trpc.getLastUpdated.useQuery()

  const [showFilters, setShowFilters] = useState<boolean>(true)

  const setType = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilters((current: IncidentFilters) => ({
      ...current,
      type: e.target.value,
    }))
  }

  const setAfterDate = (e: ChangeEvent<HTMLInputElement>) => {
    const after = e.target.valueAsDate ?? undefined
    after?.setDate(after.getDate() + 1)
    after?.setHours(0)

    setFilters((current: IncidentFilters) => ({
      ...current,
      after,
    }))
  }

  const setBeforeDate = (e: ChangeEvent<HTMLInputElement>) => {
    const before = e.target.valueAsDate ?? undefined

    setFilters((current: IncidentFilters) => ({
      ...current,
      before,
    }))
  }

  return (
    <div className="map-overlay">
      <div>
        <h1>{import.meta.env.VITE_AGENCY_LABEL}</h1>
        <h2>Traffic Collisions</h2>
        {lastUpdated && <i>Last updated {relativeTime(lastUpdated)}</i>}
      </div>
      {showFilters && lastUpdated && (
        <>
          <p>Incident Type</p>
          <select value={filters.type} onChange={setType}>
            <option value="all">All</option>
            {callTypes.map((callType) => (
              <option key={callType} value={callType}>
                {callType}
              </option>
            ))}
          </select>

          <p>Date Range</p>
          <input
            type="date"
            value={filters.after?.toISOString().slice(0, 10)}
            onChange={setAfterDate}
          />
          <i className="date-to">to</i>
          <input
            type="date"
            value={filters.before?.toISOString().slice(0, 10)}
            onChange={setBeforeDate}
          />
        </>
      )}
      {lastUpdated ? (
        <button onClick={() => setShowFilters(!showFilters)}>
          {showFilters ? <ChevronUp /> : <ChevronDown />}
        </button>
      ) : (
        <div className="spinner">
          <Spinner />
        </div>
      )}
    </div>
  )
}

export default Overlay
