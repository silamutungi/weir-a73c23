import { Link } from 'react-router-dom'
import { Shield } from 'lucide-react'
import { Button } from '../components/ui/button'
import Navbar from '../components/Navbar'

export default function NotFound() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
        <Shield size={40} strokeWidth={1} style={{ color: 'var(--color-text-muted)', marginBottom: 24 }} aria-hidden="true" />
        <h1 className="text-4xl font-bold mb-3" style={{ color: 'var(--color-text)' }}>Page not found</h1>
        <p className="mb-8" style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-callout)', maxWidth: '360px' }}>This page does not exist. Head back to your dashboard or the home page.</p>
        <div className="flex gap-3">
          <Button asChild className="h-11">
            <Link to="/">Go home</Link>
          </Button>
          <Button asChild variant="outline" className="h-11">
            <Link to="/dashboard">Dashboard</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
