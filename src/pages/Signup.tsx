import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Shield, AlertCircle, CheckCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

export default function Signup() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.')
      return
    }
    setLoading(true)
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: name } }
    })
    setLoading(false)
    if (authError) {
      setError(authError.message)
    } else {
      setConfirmed(true)
      setTimeout(() => navigate('/dashboard'), 2000)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 justify-center mb-8">
          <Shield size={24} strokeWidth={2} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
          <span className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>WEIR</span>
        </div>
        <div className="p-8 rounded-xl border" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
          {confirmed ? (
            <div className="text-center py-4">
              <CheckCircle size={40} strokeWidth={1.5} style={{ color: 'var(--color-success)', margin: '0 auto 16px' }} aria-hidden="true" />
              <h2 className="text-xl font-bold mb-2">Account created</h2>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Taking you to your dashboard...</p>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>Protect your identity</h1>
              <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>Free to start. No credit card required.</p>
              {error && (
                <div
                  role="alert"
                  aria-live="polite"
                  className="flex items-start gap-2 p-3 rounded-md mb-4 text-sm"
                  style={{ backgroundColor: 'rgba(220,38,38,0.08)', color: 'var(--color-error)', border: '1px solid rgba(220,38,38,0.2)' }}
                >
                  <AlertCircle size={16} strokeWidth={2} style={{ flexShrink: 0, marginTop: 1 }} aria-hidden="true" />
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-4">
                  <Label htmlFor="name" className="block mb-1 text-sm font-medium">Your name or creator handle</Label>
                  <Input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex Rivera" className="w-full" />
                </div>
                <div className="mb-4">
                  <Label htmlFor="email" className="block mb-1 text-sm font-medium">Email address</Label>
                  <Input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full" />
                </div>
                <div className="mb-6">
                  <Label htmlFor="password" className="block mb-1 text-sm font-medium">Password</Label>
                  <Input id="password" type="password" autoComplete="new-password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" className="w-full" />
                </div>
                <Button type="submit" className="w-full h-11" disabled={loading}>
                  {loading ? 'Creating account...' : 'Start free'}
                </Button>
              </form>
              <p className="text-sm text-center mt-4" style={{ color: 'var(--color-text-secondary)' }}>
                Already have an account?{' '}
                <Link to="/login" className="font-semibold" style={{ color: 'var(--color-primary)' }}>Sign in</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
