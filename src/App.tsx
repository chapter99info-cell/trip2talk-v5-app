import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import PublicLayout from './components/layout/PublicLayout'
import HomePage from './pages/public/HomePage'
import TripsPage from './pages/public/TripsPage'
import TripDetailPage from './pages/public/TripDetailPage'
import CalendarPage from './pages/public/CalendarPage'
import GalleryPage from './pages/public/GalleryPage'
import PricingPage from './pages/public/PricingPage'
import AboutPage from './pages/public/AboutPage'
import WaiverPage from './pages/public/WaiverPage'
import BookingPage from './pages/public/BookingPage'
import PinGatePage from './pages/app/PinGatePage'
import StaffDashboard from './pages/app/StaffDashboard'
import CashierPOS from './pages/app/CashierPOS'
import OwnerDashboard from './pages/app/OwnerDashboard'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="trips" element={<TripsPage />} />
          <Route path="trips/:tripCode" element={<TripDetailPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="waiver" element={<WaiverPage />} />
          <Route path="booking" element={<BookingPage />} />
        </Route>

        <Route path="app" element={<PinGatePage />} />
        <Route path="app/staff" element={<StaffDashboard />} />
        <Route path="app/cashier" element={<CashierPOS />} />
        <Route path="app/owner" element={<OwnerDashboard />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
