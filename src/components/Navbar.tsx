import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Shield, Menu, X, UserCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { Button } from './ui/button'

export default function Navbar() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [session, setSession] = useState<unknown>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/')
  }

  const navLinks = [
    { href: '/#features', label: 'Features' },
    { href: '/#pricing', label: 'Pricing' }
  ]

  return (
    <nav
      className="sticky top-0 z-[600] w-full border-b"
      style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}
      aria-label="Main navigation"
    >
      <div className="max-w-5xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg" style={{ color: 'var(--color-text)' }}>
          <Shield size={20} strokeWidth={2} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
          WEIR
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(l => (
            <Link key={l.href} to={l.href} className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
              {l.label}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          {session ? (
            <>
              <Button asChild variant="ghost" size="sm" className="h-9">
                <Link to="/dashboard">
                  <UserCircle size={16} strokeWidth={2} className="mr-1" aria-hidden="true" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="h-9" onClick={handleLogout}>Sign out</Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="h-9">
                <Link to="/login">Sign in</Link>
              </Button>
              <Button asChild size="sm" className="h-9">
                <Link to="/signup">Start free</Link>
              </Button>
            </>
          )}
        </div>
        <button
          className="md:hidden flex items-center justify-center w-11 h-11 rounded-md"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          style={{ color: 'var(--color-text)' }}
        >
          {open ? <X size={20} strokeWidth={2} aria-hidden="true" /> : <Menu size={20} strokeWidth={2} aria-hidden="true" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t px-4 pb-4 pt-2 space-y-2" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
          {navLinks.map(l => (
            <Link key={l.href} to={l.href} className="block py-2 text-sm font-medium" style={{ color: 'var(--color-text)' }} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <Button asChild variant="outline" className="w-full h-11">
              <Link to="/login" onClick={() => setOpen(false)}>Sign in</Link>
            </Button>
            <Button asChild className="w-full h-11">
              <Link to="/signup" onClick={() => setOpen(false)}>Start free</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
