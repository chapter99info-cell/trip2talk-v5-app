import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Sparkles } from 'lucide-react'
import { useLang } from '../../hooks/useLang'
import { fetchTourByCode, formatAud, formatDate, seatsRemaining } from '../../lib/toursApi'
import { getTripDetails, listFor, textFor } from '../../data/tripDetails'
import { AURORA_DISCLAIMER } from '../../data/risks'
import type { Tour } from '../../types/tour'
import { Skeleton } from '../../components/ui/Skeleton'
import { PageError } from '../../components/ui/PageError'
import TripPhotoHero from '../../components/trips/TripPhotoHero'
import TripBookButton from '../../components/trips/TripBookButton'

export default function TripDetailPage() {
  const { tripCode } = useParams<{ tripCode: string }>()
  const { lang, t } = useLang()
  const [tour, setTour] = useState<Tour | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!tripCode) {
      setLoading(false)
      return
    }
    fetchTourByCode(tripCode)
      .then(setTour)
      .catch(() => setError(t('common.error')))
      .finally(() => setLoading(false))
  }, [tripCode, t])

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-48 w-full rounded-xl" />
      </div>
    )
  }

  if (error || !tour) {
    return <PageError message={error || t('common.error')} />
  }

  const details = getTripDetails(tour.trip_code)
  const name = lang === 'th' ? tour.name_th : tour.name_en
  const seats = seatsRemaining(tour)
  const highlights = details ? listFor(details.highlights, lang) : []
  const includes = details ? listFor(details.includes, lang) : []
  const excludes = details ? listFor(details.excludes, lang) : []
  const tagline = details ? textFor(details.tagline, lang) : ''

  return (
    <div className="space-y-6 pb-4">
      <Link to="/trips" className="inline-flex items-center gap-1 text-sm text-brand-green">
        <ArrowLeft className="h-4 w-4" />
        {t('nav.trips')}
      </Link>

      <TripPhotoHero
        tripCode={tour.trip_code}
        alt={name}
        className="aspect-[16/10] w-full rounded-2xl"
      />

      <header>
        <p className="text-xs font-mono text-gray-400">{tour.trip_code}</p>
        <h1 className="mt-1 text-2xl font-bold text-brand-dark">{name}</h1>
        <p className="mt-1 text-sm text-gray-500">
          {tour.destination} · {tour.duration_label}
        </p>
        {tagline && <p className="mt-3 text-sm text-gray-600">{tagline}</p>}
      </header>

      <div className="rounded-xl border border-gray-100 bg-brand-green-light p-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs text-gray-500">{t('common.standard')}</p>
            <p className="text-2xl font-bold text-brand-green">{formatAud(tour.price_standard)}</p>
          </div>
          {tour.price_private != null && (
            <div className="text-right">
              <p className="text-xs text-gray-500">{t('common.private')}</p>
              <p className="text-lg font-semibold text-brand-dark">{formatAud(tour.price_private)}</p>
            </div>
          )}
        </div>
        <p className="mt-2 text-sm text-gray-600">
          {t('booking.deposit')}: {formatAud(tour.deposit_amount)} ·{' '}
          {formatDate(tour.next_date, lang)} · {seats} {t('common.seatsRemaining')}
        </p>
      </div>

      {tour.aurora_trip && (
        <div className="flex gap-2 rounded-xl border border-brand-green/20 bg-brand-green/5 p-4">
          <Sparkles className="h-5 w-5 shrink-0 text-brand-green" />
          <div>
            <p className="text-sm font-semibold text-brand-green">{t('common.aurora')}</p>
            <p className="mt-1 text-xs text-gray-600">{AURORA_DISCLAIMER[lang]}</p>
          </div>
        </div>
      )}

      {highlights.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-dark">
            {lang === 'th' ? 'ไฮไลท์' : 'Highlights'}
          </h2>
          <ul className="mt-2 space-y-2">
            {highlights.map((h) => (
              <li key={h} className="flex gap-2 text-sm text-gray-700">
                <span className="text-brand-green">·</span>
                {h}
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {includes.length > 0 && (
          <section className="rounded-xl bg-gray-50 p-4">
            <h2 className="text-sm font-semibold text-brand-dark">
              {lang === 'th' ? 'รวมในราคา' : 'Included'}
            </h2>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              {includes.map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>
          </section>
        )}
        {excludes.length > 0 && (
          <section className="rounded-xl bg-gray-50 p-4">
            <h2 className="text-sm font-semibold text-brand-dark">
              {lang === 'th' ? 'ไม่รวม' : 'Not included'}
            </h2>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              {excludes.map((item) => (
                <li key={item}>✗ {item}</li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <TripBookButton tour={tour} className="py-3.5" />
    </div>
  )
}
