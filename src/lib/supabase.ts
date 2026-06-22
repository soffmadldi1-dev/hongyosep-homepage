// ========================================
// Supabase 클라이언트 설정
// ========================================
// 이 파일은 Supabase 데이터베이스와 통신하는 클라이언트를 초기화합니다.
// 서버 사이드와 클라이언트 사이드 모두에서 사용됩니다.

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// 클라이언트 사이드 인스턴스 (익명 접근)
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)

// 서버 사이드 인스턴스 (관리자 권한)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// 타입 정의
export interface Subscriber {
  id: string
  email: string
  name?: string
  source: string
  consent: boolean
  created_at: string
}
