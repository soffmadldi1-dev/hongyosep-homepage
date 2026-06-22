// ========================================
// POST /api/admin (관리자 인증)
// GET /api/admin (구독자 목록)
// ========================================
// 관리자 비밀번호 검증 및 구독자 데이터 조회 API

import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { verifyAdminPassword, errorResponse, generateCSV } from '@/lib/utils'

// 관리자 인증 및 구독자 목록 조회
export async function GET(req: NextRequest) {
  try {
    // 1. 쿼리 파라미터에서 비밀번호 확인
    const searchParams = req.nextUrl.searchParams
    const password = searchParams.get('password')

    if (!password || !verifyAdminPassword(password)) {
      return NextResponse.json(
        errorResponse('관리자 인증에 실패했습니다.'),
        { status: 401 }
      )
    }

    // 2. 구독자 목록 조회 (서버 권한)
    const { data: subscribers, error } = await supabaseAdmin
      .from('subscribers')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        errorResponse('데이터 조회 중 오류가 발생했습니다.'),
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        count: subscribers?.length || 0,
        data: subscribers || [],
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      errorResponse('예상치 못한 오류가 발생했습니다.'),
      { status: 500 }
    )
  }
}

// CSV 내보내기
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { password } = body

    // 1. 관리자 인증
    if (!password || !verifyAdminPassword(password)) {
      return NextResponse.json(
        errorResponse('관리자 인증에 실패했습니다.'),
        { status: 401 }
      )
    }

    // 2. 구독자 목록 조회
    const { data: subscribers, error } = await supabaseAdmin
      .from('subscribers')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json(
        errorResponse('데이터 조회 중 오류가 발생했습니다.'),
        { status: 500 }
      )
    }

    // 3. CSV 생성
    const csv = generateCSV(subscribers || [])

    // 4. 파일 다운로드 응답
    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv;charset=utf-8',
        'Content-Disposition': `attachment; filename="subscribers_${new Date().toISOString().split('T')[0]}.csv"`,
      },
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      errorResponse('예상치 못한 오류가 발생했습니다.'),
      { status: 500 }
    )
  }
}
