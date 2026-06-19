import { Link } from 'react-router-dom'
import { Flame, Sparkles } from 'lucide-react'
import type { Tour } from '../../types/tour'
import { useLang } from '../../hooks/useLang'
import { formatAud, seatsRemaining } from '../../lib/toursApi'
import TripPhotoHero from './TripPhotoHero'

type Props = {
  tour: Tour
}

export default function TripCard({ tour }: Props) {
  const { lang, t } = useLang()
  const name = lang === 'th' ? tour.name_th : tour.name_en
  const seats = seatsRemaining(tour)
  const lowSeats = seats > 0 && seats <= 3

  return (
    <article className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <Link to={`/trips/${tour.trip_code}`} className="block">
        <TripPhotoHero
          tripCode={tour.trip_code}
          alt={name}
          className="aspect-[16/9] w-full"
        />
        <div className="flex items-start justify-between gap-2 bg-brand-green-light px-4 py-3">
          <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-brand-green">
            {tour.destination}
          </span>
          {tour.aurora_trip && (
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-green px-2 py-0.5 text-xs text-white">
              <Sparkles className="h-3 w-3" />
              {t('common.aurora')}
            </span>
          )}
        </div>

        <div className="space-y-3 p-4">
          <div>
            <p className="text-xs font-mono text-gray-400">{tour.trip_code}</p>
            <h3 className="mt-1 text-base font-semibold leading-snug text-brand-dark">{name}</h3>
            <p className="text-sm text-gray-500">{tour.duration_label}</p>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-gray-500">{t('common.fromPrice')}</p>
              <p className="text-lg font-bold text-brand-green">{formatAud(tour.price_standard)}</p>
              {tour.price_private != null && (
                <p className="text-xs text-gray-500">
                  {t('common.private')}: {formatAud(tour.price_private)}
                </p>
              )}
            </div>
            <div className="text-right text-sm">
              {seats === 0 ? (
                <span className="font-medium text-red-600">{t('common.full')}</span>
              ) : (
                <span
                  className={`inline-flex items-center gap-1 ${lowSeats ? 'font-medium text-orange-600' : 'text-gray-600'}`}
                >
                  {lowSeats && <Flame className="h-4 w-4" />}
                  {seats} {t('common.seatsRemaining')}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <Link
          to={`/trips/${tour.trip_code}`}
          className="block w-full rounded-xl bg-brand-green py-2.5 text-center text-sm font-semibold text-white hover:bg-brand-green/90"
        >
          {t('btn.viewTrip')}
        </Link>
      </div>
    </article>
  )
}
