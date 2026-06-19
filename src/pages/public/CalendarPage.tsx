import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../../hooks/useLang'
import { fetchConfirmedTours, formatAud, formatDate, seatsRemaining } from '../../lib/toursApi'
import type { Tour } from '../../types/tour'
import { ListRowSkeleton } from '../../components/ui/Skeleton'
import { PageError } from '../../components/ui/PageError'

function borderColor(tour: Tour): string {
  const seats = seatsRemaining(tour)
  if (seats === 0) return 'border-l-red-500'
  if (seats <= 3) return 'border-l-orange-500'
  return 'border-l-brand-green'
}

export default function CalendarPage() {
  const { lang, t } = useLang()
  const [tours, setTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(() => {
    setLoading(true)
    setError('')
    fetchConfirmedTours()
      .then(setTours)
      .catch(() => setError(t('common.error')))
      .finally(() => setLoading(false))
  }, [t])

  useEffect(() => {
    load()
  }, [load])

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-dark">{t('nav.calendar')}</h1>

      {loading && <div className="mt-6"><ListRowSkeleton count={5} /></div>}
      {error && !loading && (
        <div className="mt-6">
          <PageError message={error} onRetry={load} />
        </div>
      )}

      {!loading && !error && (
        <ul className="mt-6 space-y-3">
          {tours.map((tour) => {
            const seats = seatsRemaining(tour)
            const name = lang === 'th' ? tour.name_th : tour.name_en
            return (
              <li key={tour.id}>
                <Link
                  to={`/trips/${tour.trip_code}`}
                  className={`block rounded-xl border border-gray-100 border-l-4 bg-white p-4 ${borderColor(tour)}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-brand-dark">{name}</p>
                      <p className="text-sm text-gray-500">{formatDate(tour.next_date, lang)}</p>
                    </div>
                    <p className="text-sm font-medium text-brand-green">{formatAud(tour.price_standard)}</p>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    {seats === 0 ? t('common.full') : `${seats} ${t('common.seatsRemaining')}`}
                  </p>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
