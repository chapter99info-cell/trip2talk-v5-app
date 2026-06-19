import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { fetchConfirmedTours, fetchBookingsForTour, seatsRemaining } from '../../lib/toursApi'
import type { Tour, TourBooking } from '../../types/tour'
import { ListRowSkeleton } from '../../components/ui/Skeleton'
import { PageError } from '../../components/ui/PageError'

export default function StaffDashboard() {
  const [tours, setTours] = useState<Tour[]>([])
  const [selected, setSelected] = useState<Tour | null>(null)
  const [manifest, setManifest] = useState<TourBooking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const staffName = sessionStorage.getItem('staff_name') ?? 'Staff'

  const load = useCallback(() => {
    setLoading(true)
    setError('')
    fetchConfirmedTours()
      .then(setTours)
      .catch(() => setError('Could not load tours'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    load()
  }, [load])

  useEffect(() => {
    if (!selected) return
    fetchBookingsForTour(selected.id)
      .then(setManifest)
      .catch(() => setManifest([]))
  }, [selected])

  const today = new Date().toISOString().slice(0, 10)
  const upcoming = tours.filter((t) => t.next_date && t.next_date >= today)

  return (
    <div className="min-h-svh bg-neutral-950 text-white">
      <header className="border-b border-neutral-800 px-4 py-4">
        <Link to="/app" className="text-sm text-amber-400">
          ← PIN
        </Link>
        <h1 className="mt-2 text-lg font-semibold">Staff Dashboard</h1>
        <p className="text-sm text-neutral-400">{staffName}</p>
      </header>

      <main className="mx-auto max-w-2xl space-y-6 px-4 py-6">
        {loading && <ListRowSkeleton count={4} />}
        {error && !loading && <PageError message={error} onRetry={load} dark />}

        {!loading && !error && (
          <section>
            <h2 className="text-sm font-medium text-neutral-400">Upcoming tours</h2>
            <ul className="mt-3 space-y-2">
              {upcoming.map((tour) => (
                <li key={tour.id}>
                  <button
                    type="button"
                    onClick={() => setSelected(tour)}
                    className={`w-full rounded-xl border px-4 py-3 text-left transition-colors ${
                      selected?.id === tour.id
                        ? 'border-amber-400 bg-neutral-900'
                        : 'border-neutral-800 bg-neutral-900/50 hover:border-neutral-700'
                    }`}
                  >
                    <p className="font-medium">{tour.name_en}</p>
                    <p className="text-xs text-neutral-400">
                      {tour.next_date} · {tour.current_pax}/{tour.max_pax} pax ·{' '}
                      {seatsRemaining(tour)} seats left
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {selected && (
          <section>
            <h2 className="text-sm font-medium text-neutral-400">Manifest — {selected.trip_code}</h2>
            {manifest.length === 0 ? (
              <p className="mt-3 text-sm text-neutral-500">No bookings yet</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {manifest.map((b) => (
                  <li key={b.id} className="rounded-lg bg-neutral-900 px-3 py-2 text-sm">
                    {b.first_name_en} {b.last_name_en} · {b.booking_status}
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </main>
    </div>
  )
}
