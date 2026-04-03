import { Link } from 'react-router-dom'
import { Shield } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer
      className="border-t py-10 mt-auto"
      style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}
    >
      <div className="max-w-5xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Shield size={16} strokeWidth={2} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
          <span className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>WEIR</span>
          <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>— Identity Rights Management</span>
        </div>
        <nav aria-label="Footer navigation" className="flex items-center gap-6">
          {[
            { href: '/privacy', label: 'Privacy Policy' },
            { href: '/terms', label: 'Terms of Service' },
            { href: 'mailto:support@weir.app', label: 'Contact' }
          ].map(l => (
            <Link key={l.href} to={l.href} className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          &copy; {year} WEIR. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
