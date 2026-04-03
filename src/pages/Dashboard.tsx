import { useState, useEffect } from 'react'
import { Shield, TrendingUp, AlertTriangle, DollarSign, RefreshCw, CheckCircle, XCircle, AlertCircle, BarChart3 } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import type { Alert, DashboardMetrics } from '../types/index'

const isSupabaseConfigured = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY)

const SEED_ALERTS: Alert[] = [
  { id: '1', user_id: 'demo', title: 'Nike ad campaign using your likeness on Instagram', source_url: 'https://instagram.com', platform: 'instagram', risk_level: 'high', action_taken: 'pending', detected_at: new Date(Date.now() - 3600000).toISOString(), estimated_value: 4200, match_confidence: 97, created_at: new Date().toISOString(), deleted_at: null },
  { id: '2', user_id: 'demo', title: 'TikTok brand deal post featuring your image without license', source_url: 'https://tiktok.com', platform: 'tiktok', risk_level: 'high', action_taken: 'pending', detected_at: new Date(Date.now() - 7200000).toISOString(), estimated_value: 1800, match_confidence: 91, created_at: new Date().toISOString(), deleted_at: null },
  { id: '3', user_id: 'demo', title: 'AI-generated image of you used in commercial email campaign', source_url: 'https://mailchimp.com', platform: 'ad_network', risk_level: 'high', action_taken: 'pending', detected_at: new Date(Date.now() - 10800000).toISOString(), estimated_value: 3100, match_confidence: 88, created_at: new Date().toISOString(), deleted_at: null },
  { id: '4', user_id: 'demo', title: 'Forbes article mentions and quotes you', source_url: 'https://forbes.com', platform: 'news', risk_level: 'low', action_taken: 'approve', detected_at: new Date(Date.now() - 86400000).toISOString(), estimated_value: 0, match_confidence: 99, created_at: new Date().toISOString(), deleted_at: null },
  { id: '5', user_id: 'demo', title: 'YouTube compilation video includes 4min clip of your content', source_url: 'https://youtube.com', platform: 'youtube', risk_level: 'medium', action_taken: 'monetize', detected_at: new Date(Date.now() - 172800000).toISOString(), estimated_value: 620, match_confidence: 84, created_at: new Date().toISOString(), deleted_at: null },
  { id: '6', user_id: 'demo', title: 'Supplement brand using your photo without permission', source_url: 'https://shopify.com', platform: 'ad_network', risk_level: 'medium', action_taken: 'pending', detected_at: new Date(Date.now() - 259200000).toISOString(), estimated_value: 950, match_confidence: 79, created_at: new Date().toISOString(), deleted_at: null }
]

const SEED_METRICS: DashboardMetrics = {
  protection_score: 87,
  monthly_earnings: 9640,
  content_matches: 142,
  pending_actions: 3
}

const RISK_CONFIG = {
  high: { label: 'High Risk', color: 'var(--color-error)', bg: 'rgba(220,38,38,0.08)' },
  medium: { label: 'Medium', color: 'var(--color-warning)', bg: 'rgba(217,119,6,0.08)' },
  low: { label: 'Low', color: 'var(--color-success)', bg: 'rgba(22,163,74,0.08)' }
}

const PLATFORM_LABELS: Record<string, string> = {
  instagram: 'Instagram', tiktok: 'TikTok', youtube: 'YouTube', news: 'News', ad_network: 'Ad Network'
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const h = Math.floor(diff / 3600000)
  if (h < 1) return 'Just now'
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

export default function Dashboard() {
  const [alerts, setAlerts] = useState<Alert[]>(isSupabaseConfigured ? [] : SEED_ALERTS)
  const [metrics] = useState<DashboardMetrics>(SEED_METRICS)
  const [loading, setLoading] = useState(isSupabaseConfigured)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    if (!isSupabaseConfigured) return
    async function fetchAlerts() {
      setLoading(true)
      setError('')
      const { data, error: fetchError } = await supabase
        .from('alerts')
        .select('*')
        .is('deleted_at', null)
        .order('detected_at', { ascending: false })
        .limit(20)
      setLoading(false)
      if (fetchError) {
        setError('Could not load your alerts. Check your connection and try again.')
      } else {
        setAlerts((data as Alert[]) || [])
      }
    }
    fetchAlerts()
  }, [])

  async function handleAction(alertId: string, action: 'takedown' | 'monetize' | 'approve') {
    setActionLoading(alertId)
    if (isSupabaseConfigured) {
      await supabase.from('alerts').update({ action_taken: action }).eq('id', alertId)
    }
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, action_taken: action } : a))
    setActionLoading(null)
  }

  const METRIC_CARDS = [
    { label: 'Protection Score', value: `${metrics.protection_score}%`, icon: Shield, color: 'var(--color-primary)' },
    { label: 'Monthly Earnings', value: formatCurrency(metrics.monthly_earnings), icon: DollarSign, color: 'var(--color-success)' },
    { label: 'Content Matches', value: metrics.content_matches.toString(), icon: BarChart3, color: 'var(--color-accent)' },
    { label: 'Pending Actions', value: metrics.pending_actions.toString(), icon: AlertTriangle, color: 'var(--color-warning)' }
  ]

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 md:px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>Identity Dashboard</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-callout)' }}>Real-time monitoring of your name, image, and likeness across the internet.</p>
        </div>

        {!isSupabaseConfigured && (
          <div className="flex items-center justify-between bg-blue-50 border border-blue-200 text-blue-800 text-sm px-4 py-3 rounded-md mb-6">
            <span>Viewing sample data — <a href="#setup" className="underline font-medium">connect your database</a> to go live.</span>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {METRIC_CARDS.map(({ label, value, icon: Icon, color }) => (
            <Card key={label}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-secondary)', fontWeight: 'var(--weight-medium)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-overline)' }}>{label}</span>
                  <Icon size={16} strokeWidth={2} style={{ color }} aria-hidden="true" />
                </div>
                <div className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>{value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-semibold" style={{ color: 'var(--color-text)' }}>Identity Alerts</h2>
          <span style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-muted)' }}>Updated in real-time</span>
        </div>

        {loading && (
          <div className="space-y-3">
            {[1,2,3].map(i => (
              <div key={i} className="h-20 rounded-lg animate-pulse" style={{ backgroundColor: 'var(--color-bg-muted)' }} />
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <AlertCircle size={32} strokeWidth={1.5} style={{ color: 'var(--color-error)', marginBottom: 12 }} aria-hidden="true" />
            <p className="font-semibold mb-1">Could not load alerts</p>
            <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>{error}</p>
            <Button variant="outline" onClick={() => window.location.reload()} className="h-11">
              <RefreshCw size={16} strokeWidth={2} className="mr-2" aria-hidden="true" />
              Try again
            </Button>
          </div>
        )}

        {!loading && !error && alerts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center border rounded-xl" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-surface)' }}>
            <Shield size={32} strokeWidth={1} style={{ color: 'var(--color-text-muted)', marginBottom: 12 }} aria-hidden="true" />
            <p className="font-semibold mb-1">No alerts yet</p>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>WEIR is actively scanning. New matches will appear here.</p>
          </div>
        )}

        {!loading && !error && alerts.length > 0 && (
          <div className="space-y-3">
            {alerts.map(alert => {
              const risk = RISK_CONFIG[alert.risk_level]
              const isPending = alert.action_taken === 'pending'
              return (
                <div key={alert.id} className="p-4 rounded-lg border" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <Badge style={{ backgroundColor: risk.bg, color: risk.color, border: 'none', fontSize: 'var(--text-caption)' }}>
                          {risk.label}
                        </Badge>
                        <span style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-muted)' }}>{PLATFORM_LABELS[alert.platform]}</span>
                        <span style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-muted)' }}>{timeAgo(alert.detected_at)}</span>
                      </div>
                      <p className="font-medium truncate" style={{ fontSize: 'var(--text-callout)', color: 'var(--color-text)' }}>{alert.title}</p>
                      {alert.estimated_value > 0 && (
                        <p style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-secondary)' }}>Estimated value: {formatCurrency(alert.estimated_value)}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {isPending ? (
                        actionLoading === alert.id ? (
                          <RefreshCw size={16} strokeWidth={2} className="animate-spin" style={{ color: 'var(--color-text-muted)' }} aria-label="Processing" />
                        ) : (
                          <>
                            <Button size="sm" variant="destructive" className="h-9 text-xs" onClick={() => handleAction(alert.id, 'takedown')} aria-label="Take down this use">
                              <XCircle size={14} strokeWidth={2} className="mr-1" aria-hidden="true" />Take Down
                            </Button>
                            <Button size="sm" className="h-9 text-xs" onClick={() => handleAction(alert.id, 'monetize')} aria-label="Monetize this use">
                              <DollarSign size={14} strokeWidth={2} className="mr-1" aria-hidden="true" />Monetize
                            </Button>
                            <Button size="sm" variant="outline" className="h-9 text-xs" onClick={() => handleAction(alert.id, 'approve')} aria-label="Approve this use">
                              <CheckCircle size={14} strokeWidth={2} className="mr-1" aria-hidden="true" />Approve
                            </Button>
                          </>
                        )
                      ) : (
                        <Badge variant="outline" style={{ fontSize: 'var(--text-caption)', textTransform: 'capitalize' }}>
                          {alert.action_taken}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Platform Breakdown</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {([['Instagram', 48, 3200], ['TikTok', 31, 2100], ['YouTube', 22, 1800], ['News Sites', 18, 0], ['Ad Networks', 23, 2540]] as [string, number, number][]).map(([p, matches, earn]) => (
                <div key={p} className="flex items-center justify-between">
                  <div>
                    <div style={{ fontSize: 'var(--text-subhead)', fontWeight: 'var(--weight-medium)', color: 'var(--color-text)' }}>{p}</div>
                    <div style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-muted)' }}>{matches} matches</div>
                  </div>
                  <TrendingUp size={16} strokeWidth={2} style={{ color: earn > 0 ? 'var(--color-success)' : 'var(--color-text-muted)' }} aria-hidden="true" />
                  <span style={{ fontSize: 'var(--text-subhead)', fontWeight: 'var(--weight-semibold)', color: 'var(--color-text)' }}>{earn > 0 ? formatCurrency(earn) : '—'}</span>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">Licensing Tier</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2">
                {([['Social Media', true], ['News Coverage', true], ['Commercial Use', false], ['AI Generated', false]] as [string, boolean][]).map(([label, enabled]) => (
                  <div key={label} className="flex items-center justify-between py-1">
                    <span style={{ fontSize: 'var(--text-subhead)', color: 'var(--color-text)' }}>{label}</span>
                    <Badge style={{ backgroundColor: enabled ? 'rgba(22,163,74,0.1)' : 'rgba(220,38,38,0.08)', color: enabled ? 'var(--color-success)' : 'var(--color-error)', border: 'none', fontSize: 'var(--text-caption)' }}>
                      {enabled ? 'Allowed' : 'Restricted'}
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-muted)', marginBottom: 4 }}>CPM Rate</div>
                <div className="text-xl font-bold" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-mono)' }}>$4.20 / 1K views</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">Protection Score</CardTitle></CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-4">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-1" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-mono)' }}>87</div>
                  <div style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-overline)' }}>out of 100</div>
                </div>
              </div>
              <div className="space-y-2">
                {([['Monitoring Coverage', 95], ['Response Rate', 88], ['Enforcement Success', 94], ['Revenue Capture', 71]] as [string, number][]).map(([label, score]) => (
                  <div key={label}>
                    <div className="flex justify-between mb-1">
                      <span style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-secondary)' }}>{label}</span>
                      <span style={{ fontSize: 'var(--text-caption)', fontFamily: 'var(--font-mono)', color: 'var(--color-text)' }}>{score}%</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)' }}>
                      <div className="h-full rounded-full" style={{ width: `${score}%`, backgroundColor: 'var(--color-primary)' }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
