import { supabase } from './supabase'
import { callStaffApi } from './supabaseStaff'
import type { Expense, InsuranceAlert, StaffRole, Tour, TourBooking, WaiverSignature } from '../types/tour'

/** Featured trip codes pinned to the top of home + /trips (in this order). */
export const TRIPS_LISTING_PRIORITY = ['TAS-3D2N', 'ULU-4D3N', 'NZ-6D5N'] as const

export async function fetchFeaturedTours(limit = 3): Promise<Tour[]> {
  const { data, error } = await supabase
    .from('tours')
    .select('*')
    .eq('status', 'CONFIRMED')
    .order('next_date', { ascending: true, nullsFirst: false })

  if (error) throw error
  return sortToursForListing((data ?? []) as Tour[]).slice(0, limit)
}

export async function fetchAllTours(): Promise<Tour[]> {
  const { data, error } = await supabase
    .from('tours')
    .select('*')
    .neq('status', 'CANCELLED')
    .order('next_date', { ascending: true, nullsFirst: false })

  if (error) throw error
  return (data ?? []) as Tour[]
}

/** Pin priority trips first; preserve Supabase order for the rest. */
export function sortToursForListing(tours: Tour[]): Tour[] {
  const priorityRank = new Map(
    TRIPS_LISTING_PRIORITY.map((code, index) => [code.toUpperCase(), index]),
  )
  return tours
    .map((tour, index) => ({ tour, index }))
    .sort((a, b) => {
      const aCode = a.tour.trip_code.toUpperCase()
      const bCode = b.tour.trip_code.toUpperCase()
      const aRank = priorityRank.get(aCode) ?? TRIPS_LISTING_PRIORITY.length + a.index
      const bRank = priorityRank.get(bCode) ?? TRIPS_LISTING_PRIORITY.length + b.index
      return aRank - bRank
    })
    .map(({ tour }) => tour)
}

export async function fetchConfirmedTours(): Promise<Tour[]> {
  const { data, error } = await supabase
    .from('tours')
    .select('*')
    .eq('status', 'CONFIRMED')
    .order('next_date', { ascending: true, nullsFirst: false })

  if (error) throw error
  return (data ?? []) as Tour[]
}

export async function fetchTourByCode(tripCode: string): Promise<Tour | null> {
  const { data, error } = await supabase
    .from('tours')
    .select('*')
    .eq('trip_code', tripCode)
    .maybeSingle()

  if (error) throw error
  return data as Tour | null
}

export async function fetchBookingsForTour(tourId: string): Promise<TourBooking[]> {
  return callStaffApi<TourBooking[]>('list_bookings_for_tour', { tourId })
}

export async function fetchPendingBookings(): Promise<TourBooking[]> {
  return callStaffApi<TourBooking[]>('list_pending_bookings')
}

export async function updateBookingStatus(
  id: string,
  status: TourBooking['booking_status'],
  amountPaid?: number,
): Promise<void> {
  await callStaffApi('update_booking_status', { id, status, amountPaid })
}

export async function insertWaiverSignature(
  signature: Omit<WaiverSignature, 'id' | 'created_at'>,
): Promise<WaiverSignature> {
  const { data, error } = await supabase
    .from('waiver_signatures')
    .insert(signature)
    .select()
    .single()

  if (error) throw error
  return data as WaiverSignature
}

export async function insertBooking(
  booking: Omit<TourBooking, 'id' | 'booked_at'>,
): Promise<TourBooking> {
  const { data, error } = await supabase
    .from('tour_bookings')
    .insert(booking)
    .select()
    .single()

  if (error) throw error
  return data as TourBooking
}

export interface StaffAuthResult {
  token: string
  role: StaffRole
  full_name: string
}

/**
 * Verifies a PIN via the verify-pin Edge Function (bcrypt compare happens
 * server-side with the service-role key — the browser never sees pin_hash).
 * Returns null on invalid PIN, throws on network/server failure.
 */
export async function verifyStaffPin(pin: string): Promise<StaffAuthResult | null> {
  const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-pin`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
    },
    body: JSON.stringify({ pin }),
  })

  if (res.status === 401) return null
  if (!res.ok) throw new Error(`verify-pin failed: ${res.status}`)

  return (await res.json()) as StaffAuthResult
}

export async function fetchExpensesThisMonth(): Promise<Expense[]> {
  return callStaffApi<Expense[]>('expenses_this_month')
}

export async function fetchBookingsThisMonth(): Promise<TourBooking[]> {
  return callStaffApi<TourBooking[]>('bookings_this_month')
}

export async function fetchInsuranceAlerts(): Promise<InsuranceAlert[]> {
  return callStaffApi<InsuranceAlert[]>('insurance_alerts')
}

export async function insertExpense(expense: Omit<Expense, 'id' | 'created_at'>): Promise<Expense> {
  return callStaffApi<Expense>('insert_expense', expense)
}

export async function uploadPaymentSlip(file: File, bookingRef: string): Promise<string> {
  const ext = file.name.split('.').pop() ?? 'jpg'
  const path = `${bookingRef}-${Date.now()}.${ext}`

  const { error: uploadError } = await supabase.storage
    .from('payment-slips')
    .upload(path, file, { upsert: false })

  if (uploadError) throw uploadError

  const { data } = supabase.storage.from('payment-slips').getPublicUrl(path)
  return data.publicUrl
}

export function seatsRemaining(tour: Tour): number {
  return Math.max(0, tour.max_pax - tour.current_pax)
}

/** Bookable when CONFIRMED and seats remain (not PLANNING / full). */
export function isTourBookable(tour: Tour): boolean {
  const status = (tour.status ?? '').toUpperCase()
  if (status === 'PLANNING' || status === 'CANCELLED') return false
  if (status !== 'CONFIRMED') return false
  if (tour.max_pax <= 0) return false
  return tour.current_pax < tour.max_pax
}

export function formatAud(amount: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(dateStr: string | null, lang: 'en' | 'th'): string {
  if (!dateStr) return lang === 'th' ? 'รอประกาศ' : 'TBA'
  return new Date(dateStr).toLocaleDateString(lang === 'th' ? 'th-TH' : 'en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
