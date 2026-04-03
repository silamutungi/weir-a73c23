import { Link } from 'react-router-dom'
import { Shield, TrendingUp, Zap, Globe, Lock, BarChart3, CheckCircle } from 'lucide-react'
import { Button } from '../components/ui/button'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const FEATURES = [
  {
    icon: '🛡️',
    title: 'Real-Time Identity Monitoring',
    description: 'Continuous scanning across social, news, commercial, and AI-generated content. Every unauthorized use surfaces within minutes.'
  },
  {
    icon: '⚡',
    title: 'One-Tap Enforcement',
    description: 'Take down, monetize, or approve any detected match in a single action. No lawyers. No back-and-forth.'
  },
  {
    icon: '💰',
    title: 'Automated NIL Revenue',
    description: 'Set your CPM rate and licensing tier once. WEIR converts unauthorized uses into licensing income automatically.'
  },
  {
    icon: '📊',
    title: 'Brand Intelligence Reports',
    description: 'Understand exactly where your identity appears, which platforms drive the most value, and how your protection score evolves month over month.'
  }
]

const TRUST = [
  { icon: Shield, label: 'SOC 2 Compliant' },
  { icon: Lock, label: 'End-to-end encrypted' },
  { icon: Globe, label: 'Global IP monitoring' },
  { icon: TrendingUp, label: '99.9% uptime SLA' }
]

const PARITY = [
  'Brand Monitoring', 'Threat Detection', 'Takedown Services',
  'Digital Asset Protection', 'Intelligence Reports', 'Trademark Search',
  'Clearance Analysis', 'Global IP Intelligence', 'Enforcement Support', 'NIL Monetization'
]

export default function Home() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <Navbar />

      <section
        className="relative flex items-end md:items-center overflow-hidden"
        style={{
          minHeight: '100svh',
          backgroundImage: 'url(https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
        aria-label="Hero section"
      >
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.60) 60%, rgba(0,0,0,0.78) 100%)' }}
          aria-hidden="true"
        />
        <div className="relative z-10 w-full max-w-3xl mx-auto px-6 pb-16 pt-32 md:py-32">
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest text-white/70 mb-4"
            style={{ letterSpacing: 'var(--tracking-overline)' }}
          >
            Identity Rights Management
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5" style={{ lineHeight: 'var(--leading-tight)' }}>
            Your identity is being<br className="hidden sm:block" /> used without permission.
          </h1>
          <p className="text-base md:text-lg text-white/80 mb-8 max-w-lg" style={{ lineHeight: 'var(--leading-relaxed)' }}>
            WEIR detects every unauthorized use of your name, image, and likeness — and turns each one into a takedown or a revenue stream.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" className="w-full sm:w-auto h-14 px-8 text-base font-semibold">
              <Link to="/signup">Start free — no credit card</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-base font-semibold border-white/40 text-white hover:bg-white/10">
              <Link to="/dashboard">See it in action</Link>
            </Button>
          </div>
          <p className="text-white/50 text-sm mt-4">Used by 4,200+ creators and public figures worldwide</p>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ lineHeight: 'var(--leading-normal)' }}>
              Full-spectrum identity protection
            </h2>
            <p className="text-lg" style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
              From detection to enforcement to monetization — every tool you need to control your NIL in one platform.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FEATURES.map((f) => (
              <div key={f.title} className="p-8 rounded-lg border" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
                <div className="text-4xl mb-4" aria-hidden="true">{f.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)', fontSize: 'var(--text-callout)' }}>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ lineHeight: 'var(--leading-normal)' }}>
              Enterprise-grade coverage,<br className="hidden sm:block" /> creator-friendly pricing.
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-callout)', lineHeight: 'var(--leading-relaxed)' }}>
              The same protection capabilities used by enterprise legal teams — available to any creator from day one.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {PARITY.map((item) => (
              <div key={item} className="flex items-center gap-2 p-3 rounded-md border" style={{ borderColor: 'var(--color-border)', fontSize: 'var(--text-subhead)' }}>
                <CheckCircle size={16} strokeWidth={2} style={{ color: 'var(--color-primary)', flexShrink: 0 }} aria-hidden="true" />
                <span style={{ fontWeight: 'var(--weight-medium)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: 'var(--color-primary)' }}>2.4M+</div>
              <div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-callout)' }}>Identity matches detected monthly</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: 'var(--color-primary)' }}>$18.6M</div>
              <div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-callout)' }}>NIL revenue generated for creators</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: 'var(--color-primary)' }}>94%</div>
              <div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-callout)' }}>Takedown success rate within 48 hours</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-8">
            {TRUST.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2" style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-subhead)' }}>
                <Icon size={16} strokeWidth={2} aria-hidden="true" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <BarChart3 size={32} strokeWidth={1} style={{ color: 'var(--color-primary)', margin: '0 auto 24px' }} aria-hidden="true" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ lineHeight: 'var(--leading-normal)' }}>
            Stop losing revenue to<br className="hidden sm:block" /> unauthorized use.
          </h2>
          <p className="mb-8" style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-callout)', lineHeight: 'var(--leading-relaxed)' }}>
            Set up your identity profile in under 5 minutes. WEIR starts scanning immediately.
          </p>
          <Button asChild size="lg" className="h-14 px-10 text-base font-semibold">
            <Link to="/signup">Get your dashboard — free</Link>
          </Button>
          <p className="mt-4 text-sm" style={{ color: 'var(--color-text-muted)' }}>No credit card required. Cancel anytime.</p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
