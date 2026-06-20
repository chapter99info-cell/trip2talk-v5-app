import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { Calendar, Home, Image, Lock, Menu, X } from 'lucide-react'
import { useLang } from '../../hooks/useLang'
import InstallPrompt from '../InstallPrompt'

const menuLinks = [
  { to: '/trips', key: 'nav.trips' as const },
  { to: '/gallery', key: 'nav.gallery' as const },
  { to: '/calendar', key: 'nav.calendar' as const },
  { to: '/pricing', key: 'nav.pricing' as const },
  { to: '/about', key: 'nav.about' as const },
]

const bottomNav = [
  { to: '/', icon: Home, key: 'nav.home' as const, end: true },
  { to: '/calendar', icon: Calendar, key: 'nav.calendar' as const },
  { to: '/gallery', icon: Image, key: 'nav.gallery' as const },
  { to: '/app', icon: Lock, key: 'nav.portal' as const },
]

export default function PublicLayout() {
  const { t, toggleLang } = useLang()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="flex min-h-svh flex-col bg-white">
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="text-lg font-bold text-brand-green">
            Trip2Talk
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
            {menuLinks.map(({ to, key }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `rounded-lg px-2.5 py-1.5 text-xs font-medium ${
                    isActive ? 'bg-brand-green-light text-brand-green' : 'text-gray-600 hover:text-brand-dark'
                  }`
                }
              >
                {t(key)}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={toggleLang}
            className="rounded-full border border-brand-green/30 bg-brand-green-light px-3 py-1 text-xs font-medium text-brand-green"
          >
            {t('lang.toggle')}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="rounded-lg p-2 text-brand-dark hover:bg-gray-100"
            aria-label="Menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <nav className="border-t border-gray-100 px-4 py-3 md:hidden">
            <ul className="space-y-1">
              {menuLinks.map(({ to, key }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-lg px-3 py-2 text-sm ${
                        isActive ? 'bg-brand-green-light font-medium text-brand-green' : 'text-brand-dark'
                      }`
                    }
                  >
                    {t(key)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-24 pt-4">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-around px-2 py-2">
          {bottomNav.map(({ to, icon: Icon, key, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 rounded-lg px-3 py-1 text-[10px] ${
                  isActive ? 'text-brand-green' : 'text-gray-500'
                }`
              }
            >
              <Icon className="h-5 w-5" />
              <span>{t(key)}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      <InstallPrompt />
    </div>
  )
}
