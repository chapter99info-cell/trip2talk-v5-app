import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Camera, Users, MapPin } from 'lucide-react'
import { useLang } from '../../hooks/useLang'
import { fetchFeaturedTours, formatAud } from '../../lib/toursApi'
import type { Tour } from '../../types/tour'
import { HomeFeaturedSkeleton } from '../../components/ui/Skeleton'
import { PageError } from '../../components/ui/PageError'
import TripPhotoHero from '../../components/trips/TripPhotoHero'
import TripBookButton from '../../components/trips/TripBookButton'

export default function HomePage() {
  const { lang, t } = useLang()
  const [featured, setFeatured] = useState<Tour[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(() => {
    setLoading(true)
    setError('')
    fetchFeaturedTours(3)
      .then(setFeatured)
      .catch(() => setError(t('common.error')))
      .finally(() => setLoading(false))
  }, [t])

  useEffect(() => {
    load()
  }, [load])

  const heroTitle =
    lang === 'th'
      ? 'ทริปถ่ายภาพส่วนตัวทั่วออสเตรเลีย'
      : 'Private Photo Journeys Across Australia'

  const heroSub =
    lang === 'th'
      ? 'กลุ่มเล็ก พร้อมช่างภาพ Mentor — บริการสองภาษา ไทย/อังกฤษ'
      : 'Small groups with a pro photographer mentor — bilingual TH/EN support'

  const audience = [
    { key: 'home.audience.students' as const, emoji: '🎓' },
    { key: 'home.audience.residents' as const, emoji: '🏡' },
    { key: 'home.audience.couples' as const, emoji: '💑' },
    { key: 'home.audience.groups' as const, emoji: '👥' },
  ]

  return (
    <div className="space-y-10">
      <section className="rounded-2xl bg-brand-green-light px-5 py-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">Trip2Talk V5</p>
        <h1 className="mt-2 text-2xl font-bold leading-tight text-brand-dark sm:text-3xl">{heroTitle}</h1>
        <p className="mt-3 text-sm text-gray-600">{heroSub}</p>
        <Link
          to="/trips"
          className="mt-6 inline-block rounded-xl bg-brand-green px-6 py-3 text-sm font-semibold text-white"
        >
          {t('btn.viewTrip')}
        </Link>
      </section>

      <section className="grid grid-cols-3 gap-3 text-center">
        {[
          { icon: MapPin, label: t('home.stats.trips') },
          { icon: Users, label: t('home.stats.group') },
          { icon: Camera, label: t('home.stats.photographers') },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="rounded-xl border border-gray-100 p-3">
            <Icon className="mx-auto h-5 w-5 text-brand-green" />
            <p className="mt-2 text-[11px] font-medium leading-tight text-brand-dark">{label}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-lg font-semibold text-brand-dark">{t('home.featured')}</h2>
        {loading && <div className="mt-4"><HomeFeaturedSkeleton /></div>}
        {error && !loading && (
          <div className="mt-4">
            <PageError message={error} onRetry={load} />
          </div>
        )}
        {!loading && !error && (
          <div className="mt-4 space-y-3">
            {featured.map((trip) => {
              const tripName = lang === 'th' ? trip.name_th : trip.name_en
              return (
                <div
                  key={trip.id}
                  className="overflow-hidden rounded-xl border border-gray-100"
                >
                  <Link
                    to={`/trips/${trip.trip_code}`}
                    className="flex hover:border-brand-green/40"
                  >
                    <TripPhotoHero
                      tripCode={trip.trip_code}
                      alt={tripName}
                      className="h-24 w-24 shrink-0 rounded-l-xl"
                    />
                    <div className="flex flex-1 flex-col justify-center p-3">
                      <p className="text-xs text-brand-green">{trip.destination}</p>
                      <p className="font-semibold text-brand-dark">{tripName}</p>
                      <p className="text-sm text-gray-500">
                        {trip.duration_label} · {formatAud(trip.price_standard)}
                      </p>
                    </div>
                  </Link>
                  <div className="border-t border-gray-100 px-3 pb-3 pt-2">
                    <TripBookButton tour={trip} />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold text-brand-dark">{t('home.audience.title')}</h2>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {audience.map(({ key, emoji }) => (
            <div key={key} className="rounded-xl bg-gray-50 p-4 text-center">
              <span className="text-2xl">{emoji}</span>
              <p className="mt-2 text-sm font-medium text-brand-dark">{t(key)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
