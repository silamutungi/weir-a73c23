export type RiskLevel = 'high' | 'medium' | 'low'
export type ActionType = 'takedown' | 'monetize' | 'approve' | 'pending'
export type PlatformType = 'instagram' | 'tiktok' | 'youtube' | 'news' | 'ad_network'
export type MonetizationTier = 'restricted' | 'balanced' | 'open'

export interface Alert {
  id: string
  user_id: string
  title: string
  source_url: string
  platform: PlatformType
  risk_level: RiskLevel
  action_taken: ActionType
  detected_at: string
  estimated_value: number
  match_confidence: number
  created_at: string
  deleted_at: string | null
}

export interface MonetizationSettings {
  id: string
  user_id: string
  tier: MonetizationTier
  cpm_rate: number
  allow_social: boolean
  allow_news: boolean
  allow_commercial: boolean
  allow_ai_generated: boolean
  created_at: string
  deleted_at: string | null
}

export interface DashboardMetrics {
  protection_score: number
  monthly_earnings: number
  content_matches: number
  pending_actions: number
}

export interface PlatformStats {
  platform: PlatformType
  matches: number
  earnings: number
}

export interface UserProfile {
  id: string
  user_id: string
  display_name: string
  creator_type: string
  created_at: string
  deleted_at: string | null
}
