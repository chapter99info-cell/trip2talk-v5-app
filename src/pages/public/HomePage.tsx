import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../../hooks/useLang'
import { fetchFeaturedTours } from '../../lib/toursApi'
import type { Tour } from '../../types/tour'
import { HomeFeaturedSkeleton } from '../../components/ui/Skeleton'
import { PageError } from '../../components/ui/PageError'
import TripCard from '../../components/trips/TripCard'

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

  const stats = [
    { value: '13', label: t('home.stats.trips') },
    { value: '6', label: t('home.stats.group') },
    { value: '10+', label: t('home.stats.photographers') },
  ]

  return (
    <div className="-mx-4 space-y-0">
      {/* Hero */}
      <section className="bg-gradient-to-b from-deep-green to-near-black-green px-5 pb-8 pt-6 text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-cream-muted">Trip2Talk</p>
        {lang === 'th' ? (
          <h1 className="mt-4 font-serif text-3xl leading-snug text-cream sm:text-4xl">
            ทริปถ่ายภาพ{' '}
            <em className="text-gold not-italic">ระดับพรีเมียม</em>
            <br />
            สำหรับคนไทย
          </h1>
        ) : (
          <h1 className="mt-4 font-serif text-3xl leading-snug text-cream sm:text-4xl">
            Private photo journeys{' '}
            <em className="text-gold not-italic">at premium level</em>
            <br />
            for Thai travellers
          </h1>
        )}
        <p className="mx-auto mt-4 max-w-md text-sm text-cream-muted">
          {lang === 'th'
            ? 'กลุ่มเล็ก พร้อมช่างภาพ Mentor — บริการสองภาษา ไทย/อังกฤษ'
            : 'Small groups with a pro photographer mentor — bilingual TH/EN support'}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/trips" className="btn-primary">
            {t('btn.bookNow')}
          </Link>
          <Link to="/gallery" className="btn-ghost">
            {t('nav.gallery')}
          </Link>
        </div>
      </section>

      {/* Stats strip */}
      <section className="grid grid-cols-3 divide-x divide-white/8 bg-near-black-green px-2 py-5">
        {stats.map(({ value, label }) => (
          <div key={label} className="px-2 text-center">
            <p className="font-serif text-2xl text-gold">{value}</p>
            <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-cream-muted">{label}</p>
          </div>
        ))}
      </section>

      <div className="space-y-10 bg-cream px-4 py-10 text-brand-dark">
        <div className="section-divider" />

        <section>
          <h2 className="font-serif text-xl text-brand-dark">{t('home.featured')}</h2>
          {loading && (
            <div className="mt-4">
              <HomeFeaturedSkeleton />
            </div>
          )}
          {error && !loading && (
            <div className="mt-4">
              <PageError message={error} onRetry={load} />
            </div>
          )}
          {!loading && !error && (
            <div className="mt-4 space-y-4">
              {featured.map((trip) => (
                <TripCard key={trip.id} tour={trip} />
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="font-serif text-xl text-brand-dark">{t('home.audience.title')}</h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              { key: 'home.audience.students' as const, emoji: '🎓' },
              { key: 'home.audience.residents' as const, emoji: '🏡' },
              { key: 'home.audience.couples' as const, emoji: '💑' },
              { key: 'home.audience.groups' as const, emoji: '👥' },
            ].map(({ key, emoji }) => (
              <div
                key={key}
                className="rounded-editorial border border-deep-green/10 bg-white p-4 text-center"
              >
                <span className="text-2xl">{emoji}</span>
                <p className="mt-2 text-sm font-medium text-brand-dark">{t(key)}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
