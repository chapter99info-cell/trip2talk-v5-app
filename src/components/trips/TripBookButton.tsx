import { Link } from 'react-router-dom'
import type { Tour } from '../../types/tour'
import { useLang } from '../../hooks/useLang'
import { isTourBookable } from '../../lib/toursApi'

type Props = {
  tour: Tour
  className?: string
  /** When true, links to trip detail instead of waiver (for card secondary action) */
  detailOnly?: boolean
}

export default function TripBookButton({ tour, className = '', detailOnly = false }: Props) {
  const { t } = useLang()
  const bookable = isTourBookable(tour)

  const base =
    'block w-full rounded-xl py-2.5 text-center text-sm font-semibold transition-colors '

  if (!bookable) {
    return (
      <span
        className={`${base} cursor-not-allowed bg-gray-200 text-gray-500 ${className}`}
        aria-disabled
      >
        {t('btn.comingSoon')}
      </span>
    )
  }

  const to = detailOnly ? `/trips/${tour.trip_code}` : `/waiver?trip=${tour.trip_code}`

  return (
    <Link
      to={to}
      className={`${base} bg-brand-green text-white hover:bg-brand-green/90 ${className}`}
    >
      {detailOnly ? t('btn.viewTrip') : t('btn.bookNow')}
    </Link>
  )
}
