import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchPendingBookings, fetchTourByCode, updateBookingStatus } from '../../lib/toursApi'
import type { TourBooking } from '../../types/tour'
import { ListRowSkeleton } from '../../components/ui/Skeleton'
import { PageError } from '../../components/ui/PageError'
import { useToast } from '../../components/ui/Toast'
import { useLang } from '../../hooks/useLang'

export default function CashierPOS() {
  const { t } = useLang()
  const { toast } = useToast()
  const [bookings, setBookings] = useState<TourBooking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(() => {
    setLoading(true)
    setError('')
    fetchPendingBookings()
      .then(setBookings)
      .catch(() => setError(t('common.error')))
      .finally(() => setLoading(false))
  }, [t])

  useEffect(() => {
    load()
  }, [load])

  async function markPaid(booking: TourBooking, status: 'DEPOSIT_PAID' | 'FULLY_PAID') {
    try {
      const tour = await fetchTourByCode(booking.trip_code)
      const amount =
        status === 'DEPOSIT_PAID'
          ? tour?.deposit_amount ?? 100
          : tour?.price_standard ?? booking.amount_paid_aud

      await updateBookingStatus(booking.id, status, amount)
      toast(t('toast.paymentUpdated'), 'success')
      load()
    } catch {
      toast(t('toast.paymentFailed'), 'error')
    }
  }

  return (
    <div className="min-h-svh bg-neutral-950 text-white">
      <header className="border-b border-neutral-800 px-4 py-4">
        <Link to="/app" className="text-sm text-amber-400">
          ← PIN
        </Link>
        <h1 className="mt-2 text-lg font-semibold">Cashier POS</h1>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-6">
        {loading && <ListRowSkeleton count={3} />}
        {error && !loading && <PageError message={error} onRetry={load} dark />}

        {!loading && !error && bookings.length === 0 && (
          <p className="text-sm text-neutral-500">No pending bookings</p>
        )}

        {!loading && !error && (
          <ul className="space-y-3">
            {bookings.map((b) => (
              <li key={b.id} className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
                <p className="font-medium">
                  {b.first_name_en} {b.last_name_en}
                </p>
                <p className="text-xs text-neutral-400">
                  {b.trip_code} · {b.email}
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => markPaid(b, 'DEPOSIT_PAID')}
                    className="rounded-lg bg-amber-400 px-3 py-1.5 text-xs font-semibold text-neutral-950 transition-transform active:scale-95"
                  >
                    Deposit Paid
                  </button>
                  <button
                    type="button"
                    onClick={() => markPaid(b, 'FULLY_PAID')}
                    className="rounded-lg border border-amber-400 px-3 py-1.5 text-xs font-semibold text-amber-400 transition-transform active:scale-95"
                  >
                    Fully Paid
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}
