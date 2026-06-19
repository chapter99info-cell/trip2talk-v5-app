export type TripType = 'oneday' | 'overnight' | 'multiday'
export type BookingStatus = 'PENDING' | 'DEPOSIT_PAID' | 'FULLY_PAID' | 'CANCELLED'
export type StaffRole = 'OWNER' | 'MANAGER' | 'GUIDE' | 'CASHIER'

export interface Tour {
  id: string
  trip_code: string
  name_en: string
  name_th: string
  destination: string
  duration_label: string
  trip_type: TripType
  price_standard: number
  price_private: number | null
  max_pax: number
  min_pax: number
  current_pax: number
  deposit_amount: number
  next_date: string | null
  status: string
  season: string[]
  aurora_trip: boolean
}

export interface TourBooking {
  id: string
  tour_id: string
  trip_code: string
  first_name_th: string | null
  last_name_th: string | null
  first_name_en: string
  last_name_en: string
  passport_number: string | null
  email: string
  phone: string
  dietary_requirements: string | null
  medical_conditions: string | null
  oshc_provider: string | null
  oshc_expiry: string | null
  waiver_signed: boolean
  waiver_signed_at: string | null
  booking_status: BookingStatus
  amount_paid_aud: number
  payment_method: string
  slip_url: string | null
  booked_at: string
}

export interface StaffProfile {
  id: string
  pin_code: string
  full_name: string
  role: StaffRole
  phone: string | null
  email: string | null
}

export interface Expense {
  id: string
  amount_aud: number
  ato_category: string
  vendor_name: string
  has_gst: boolean
  gst_amount_aud: number
  created_at: string
}

export interface InsuranceAlert {
  id: string
  item_name: string
  item_type: string
  expiry_date: string
  is_active: boolean
}
