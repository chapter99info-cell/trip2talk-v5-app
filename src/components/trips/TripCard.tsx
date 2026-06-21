import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Flame } from 'lucide-react'
import type { Tour } from '../../types/tour'
import { useLang } from '../../hooks/useLang'
import { useTripCardPreview } from '../../hooks/useTripCardPreview'
import { formatAud, seatsRemaining } from '../../lib/toursApi'
import { getPreviewPhotoForTrip, photoSrc } from '../../data/galleryPhotos'
import TripPhotoHero from './TripPhotoHero'
import TripBookButton from './TripBookButton'
import TripCardPreviewBubble from './TripCardPreviewBubble'

/** Optional per-trip preview video URLs — play icon shows when set */
export const TRIP_PREVIEW_VIDEOS: Partial<Record<string, string>> = {}

type Props = {
  tour: Tour
}

function tripBadge(tour: Tour, lang: 'en' | 'th'): string | null {
  if (tour.aurora_trip) return lang === 'th' ? 'ล่าแสงใต้' : 'Aurora hunt'
  if (tour.trip_code === 'SYD-INFLU-3H') return lang === 'th' ? 'อินฟลูเอนเซอร์' : 'Influencer'
  if (tour.trip_code === 'NZ-6D5N') return lang === 'th' ? 'ทริปไฮไลท์' : 'Flagship'
  if (tour.trip_type === 'multiday' && tour.price_standard >= 1500) {
    return lang === 'th' ? 'ทริปพรีเมียม' : 'Premium'
  }
  return null
}

export default function TripCard({ tour }: Props) {
  const { lang } = useLang()
  const name = lang === 'th' ? tour.name_th : tour.name_en
  const seats = seatsRemaining(tour)
  const lowSeats = seats > 0 && seats <= 3
  const badge = tripBadge(tour, lang)
  const { position, previewHandlers } = useTripCardPreview()

  const previewPhoto = useMemo(() => getPreviewPhotoForTrip(tour.trip_code), [tour.trip_code])
  const previewSrc = useMemo(
    () => (previewPhoto ? photoSrc(previewPhoto) : ''),
    [previewPhoto],
  )
  const hasVideo = Boolean(TRIP_PREVIEW_VIDEOS[tour.trip_code])

  return (
    <article className="group relative min-h-[22rem] overflow-hidden rounded-editorial">
      <Link
        to={`/trips/${tour.trip_code}`}
        className="absolute inset-0 bottom-[4.5rem] block touch-manipulation"
        {...previewHandlers}
      >
        <TripPhotoHero
          tripCode={tour.trip_code}
          alt={name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
      </Link>

      <TripCardPreviewBubble
        visible={position.visible}
        x={position.x}
        y={position.y}
        imageSrc={previewSrc}
        alt={name}
        hasVideo={hasVideo}
      />

      {badge && (
        <span className="absolute left-3 top-3 z-10 rounded-editorial bg-gold px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-gold-dark">
          {badge}
        </span>
      )}

      <span className="absolute right-3 top-3 z-10 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-medium text-brand-dark shadow-sm">
        {seats === 0 ? (lang === 'th' ? 'เต็ม' : 'Full') : `${seats} ${lang === 'th' ? 'ที่นั่ง' : 'seats'}`}
        {lowSeats && seats > 0 && <Flame className="ml-1 inline h-3 w-3 text-coral" />}
      </span>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-4 pb-[4.5rem]">
        <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-cream-muted">
          {tour.destination}
        </p>
        <h3 className="mt-1 font-serif text-xl leading-tight text-cream">{name}</h3>
        <p className="mt-1 font-serif text-lg text-gold">{formatAud(tour.price_standard)}</p>
        <p className="text-xs text-cream-muted">{tour.duration_label}</p>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 grid grid-cols-2 gap-2 p-3">
        <TripBookButton tour={tour} detailOnly variant="ghost" className="py-2.5" />
        <TripBookButton tour={tour} variant="primary" className="py-2.5" />
      </div>
    </article>
  )
}
