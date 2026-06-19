import { supabase } from './supabase'
import type { Expense, InsuranceAlert, StaffProfile, Tour, TourBooking } from '../types/tour'

export async function fetchFeaturedTours(limit = 3): Promise<Tour[]> {
  const { data, error } = await supabase
    .from('tours')
    .select('*')
    .eq('status', 'CONFIRMED')
    .order('next_date', { ascending: true, nullsFirst: false })
    .limit(limit)

  if (error) throw error
  return (data ?? []) as Tour[]
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
  const { data, error } = await supabase
    .from('tour_bookings')
    .select('*')
    .eq('tour_id', tourId)
    .order('booked_at', { ascending: false })

  if (error) throw error
  return (data ?? []) as TourBooking[]
}

export async function fetchPendingBookings(): Promise<TourBooking[]> {
  const { data, error } = await supabase
    .from('tour_bookings')
    .select('*')
    .eq('booking_status', 'PENDING')
    .order('booked_at', { ascending: false })

  if (error) throw error
  return (data ?? []) as TourBooking[]
}

export async function updateBookingStatus(
  id: string,
  status: TourBooking['booking_status'],
  amountPaid?: number,
): Promise<void> {
  const payload: Partial<TourBooking> = { booking_status: status }
  if (amountPaid !== undefined) payload.amount_paid_aud = amountPaid

  const { error } = await supabase.from('tour_bookings').update(payload).eq('id', id)
  if (error) throw error
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

export async function fetchStaffByPin(pin: string): Promise<StaffProfile | null> {
  const { data, error } = await supabase
    .from('staff_profiles')
    .select('*')
    .eq('pin_code', pin)
    .maybeSingle()

  if (error) throw error
  return data as StaffProfile | null
}

export async function fetchExpensesThisMonth(): Promise<Expense[]> {
  const start = new Date()
  start.setDate(1)
  start.setHours(0, 0, 0, 0)

  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .gte('created_at', start.toISOString())

  if (error) throw error
  return (data ?? []) as Expense[]
}

export async function fetchBookingsThisMonth(): Promise<TourBooking[]> {
  const start = new Date()
  start.setDate(1)
  start.setHours(0, 0, 0, 0)

  const { data, error } = await supabase
    .from('tour_bookings')
    .select('*')
    .gte('booked_at', start.toISOString())

  if (error) throw error
  return (data ?? []) as TourBooking[]
}

export async function fetchInsuranceAlerts(): Promise<InsuranceAlert[]> {
  const { data, error } = await supabase
    .from('insurance_alerts')
    .select('*')
    .eq('is_active', true)
    .order('expiry_date', { ascending: true })

  if (error) throw error
  return (data ?? []) as InsuranceAlert[]
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
