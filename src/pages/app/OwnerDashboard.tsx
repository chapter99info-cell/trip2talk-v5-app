import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  fetchBookingsThisMonth,
  fetchExpensesThisMonth,
  fetchInsuranceAlerts,
  formatAud,
} from '../../lib/toursApi'
import type { InsuranceAlert, TourBooking } from '../../types/tour'
import { DashboardCardSkeleton } from '../../components/ui/Skeleton'
import { PageError } from '../../components/ui/PageError'

function daysUntil(dateStr: string): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const expiry = new Date(dateStr)
  expiry.setHours(0, 0, 0, 0)
  return Math.ceil((expiry.getTime() - today.getTime()) / 86400000)
}

export default function OwnerDashboard() {
  const [bookings, setBookings] = useState<TourBooking[]>([])
  const [expenses, setExpenses] = useState<{ amount_aud: number }[]>([])
  const [alerts, setAlerts] = useState<InsuranceAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(() => {
    setLoading(true)
    setError('')
    Promise.all([fetchBookingsThisMonth(), fetchExpensesThisMonth(), fetchInsuranceAlerts()])
      .then(([b, e, a]) => {
        setBookings(b)
        setExpenses(e)
        setAlerts(a)
      })
      .catch((err) => {
        console.error('[OwnerDashboard] load failed:', err)
        setError('Could not load dashboard data')
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const revenue = useMemo(
    () => bookings.reduce((sum, b) => sum + (b.amount_paid_aud ?? 0), 0),
    [bookings],
  )
  const expenseTotal = useMemo(
    () => expenses.reduce((sum, e) => sum + (e.amount_aud ?? 0), 0),
    [expenses],
  )

  const urgentAlerts = alerts.filter((a) => daysUntil(a.expiry_date) <= 30)

  return (
    <div className="min-h-svh bg-neutral-950 text-white">
      <header className="border-b border-neutral-800 px-4 py-4">
        <Link to="/app" className="text-sm text-amber-400">
          ← PIN
        </Link>
        <h1 className="mt-2 text-lg font-semibold">Owner Dashboard</h1>
      </header>

      <main className="mx-auto max-w-2xl space-y-6 px-4 py-6">
        {loading && <DashboardCardSkeleton />}
        {error && !loading && <PageError message={error} onRetry={load} dark />}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Bookings (month)', value: String(bookings.length) },
                { label: 'Revenue', value: formatAud(revenue) },
                { label: 'Expenses', value: formatAud(expenseTotal) },
                { label: 'Net profit', value: formatAud(revenue - expenseTotal) },
              ].map((card) => (
                <div key={card.label} className="rounded-xl bg-neutral-900 p-4">
                  <p className="text-xs text-neutral-400">{card.label}</p>
                  <p className="mt-1 text-lg font-bold text-amber-400">{card.value}</p>
                </div>
              ))}
            </div>

            <section>
              <h2 className="text-sm font-medium text-neutral-400">Insurance alerts (30 days)</h2>
              {urgentAlerts.length === 0 ? (
                <p className="mt-2 text-sm text-neutral-500">No urgent alerts</p>
              ) : (
                <ul className="mt-3 space-y-2">
                  {urgentAlerts.map((a) => (
                    <li
                      key={a.id}
                      className="flex items-center justify-between rounded-lg border border-red-900 bg-red-950/40 px-3 py-2"
                    >
                      <span className="text-sm">{a.item_name}</span>
                      <span className="rounded-full bg-red-600 px-2 py-0.5 text-xs font-medium">
                        {daysUntil(a.expiry_date)}d
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  )
}
