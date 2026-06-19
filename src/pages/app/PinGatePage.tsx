import { useEffect, useState, useCallback, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { fetchStaffByPin } from '../../lib/toursApi'
import type { StaffRole } from '../../types/tour'
import { useLang } from '../../hooks/useLang'

const MAX_ATTEMPTS = 3
const LOCKOUT_MS = 30_000

function redirectForRole(role: StaffRole): string {
  switch (role) {
    case 'CASHIER':
      return '/app/cashier'
    case 'OWNER':
      return '/app/owner'
    case 'MANAGER':
    case 'GUIDE':
    default:
      return '/app/staff'
  }
}

export default function PinGatePage() {
  const { t } = useLang()
  const navigate = useNavigate()
  const [pin, setPin] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [lockedUntil, setLockedUntil] = useState<number | null>(null)
  const [lockSeconds, setLockSeconds] = useState(0)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeKey, setActiveKey] = useState<string | null>(null)

  const isLocked = lockedUntil !== null && Date.now() < lockedUntil

  useEffect(() => {
    if (!lockedUntil) {
      setLockSeconds(0)
      return
    }
    const tick = () => {
      const remaining = Math.max(0, Math.ceil((lockedUntil - Date.now()) / 1000))
      setLockSeconds(remaining)
      if (remaining <= 0) setLockedUntil(null)
    }
    tick()
    const id = setInterval(tick, 250)
    return () => clearInterval(id)
  }, [lockedUntil])

  const verifyPin = useCallback(
    async (fullPin: string) => {
      if (isLocked || fullPin.length !== 4) return

      setLoading(true)
      setError('')

      try {
        const staff = await fetchStaffByPin(fullPin)
        if (staff) {
          sessionStorage.setItem('staff_role', staff.role)
          sessionStorage.setItem('staff_name', staff.full_name)
          navigate(redirectForRole(staff.role))
          return
        }

        const next = attempts + 1
        setAttempts(next)
        setPin('')
        if (next >= MAX_ATTEMPTS) {
          setLockedUntil(Date.now() + LOCKOUT_MS)
          setAttempts(0)
          setError(t('pin.locked'))
        } else {
          setError(`${t('pin.invalid')} (${next}/${MAX_ATTEMPTS})`)
        }
      } catch {
        setError(t('pin.connection'))
      } finally {
        setLoading(false)
      }
    },
    [attempts, isLocked, navigate, t],
  )

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    verifyPin(pin)
  }

  function handleKey(k: string) {
    if (isLocked || loading) return
    if (k === 'back') {
      setPin((p) => p.slice(0, -1))
      return
    }
    if (pin.length >= 4) return
    const next = pin + k
    setPin(next)
    if (next.length === 4) verifyPin(next)
  }

  function pressKey(k: string) {
    setActiveKey(k)
    setTimeout(() => setActiveKey(null), 150)
    handleKey(k)
  }

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'back'] as const

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-neutral-950 px-4">
      <div className="rounded-full bg-neutral-900 p-4 ring-1 ring-neutral-800">
        <Lock className="h-8 w-8 text-amber-400" />
      </div>
      <h1 className="mt-5 text-xl font-semibold text-white">Staff Portal</h1>
      <p className="mt-1 text-sm text-neutral-400">Enter 4-digit PIN</p>

      <form onSubmit={handleSubmit} className="mt-8 w-full max-w-xs">
        <div className="flex justify-center gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-3.5 w-3.5 rounded-full transition-all duration-200 ${
                pin.length > i ? 'scale-110 bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]' : 'bg-neutral-700'
              }`}
            />
          ))}
        </div>

        {error && !isLocked && (
          <p className="mt-4 text-center text-sm text-red-400">{error}</p>
        )}

        {isLocked && (
          <div className="mt-4 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-center">
            <p className="text-sm text-amber-400">{t('pin.locked')}</p>
            <p className="mt-1 font-mono text-2xl font-bold text-amber-400">{lockSeconds}s</p>
          </div>
        )}

        <div className="mt-8 grid grid-cols-3 gap-3">
          {keys.map((key) => (
            <button
              key={key || 'empty'}
              type="button"
              disabled={!key || isLocked || loading}
              onClick={() => key && pressKey(key)}
              className={`rounded-2xl py-4 text-lg font-medium transition-all duration-150 disabled:invisible ${
                activeKey === key
                  ? 'scale-95 bg-amber-400 text-neutral-950 shadow-lg shadow-amber-400/30'
                  : 'bg-neutral-900 text-white hover:bg-neutral-800 active:scale-95'
              }`}
            >
              {key === 'back' ? '⌫' : key}
            </button>
          ))}
        </div>
      </form>
    </div>
  )
}
