// ========================================
// POST /api/subscribe
// ========================================
// 이메일 구독 신청을 처리하는 API입니다.
// 폼에서 제출한 이메일과 이름을 Supabase에 저장합니다.

import { NextRequest, NextResponse } from 'next/server'
import { supabaseClient, supabaseAdmin } from '@/lib/supabase'
import { validateEmail, errorResponse, successResponse } from '@/lib/utils'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, name, consent } = body

    // 1. 폼 검증
    if (!email || !email.trim()) {
      return NextResponse.json(
        errorResponse('이메일을 입력해 주세요.'),
        { status: 400 }
      )
    }

    // 2. 이메일 형식 검증
    if (!validateEmail(email)) {
      return NextResponse.json(
        errorResponse('유효한 이메일 형식이 아닙니다.'),
        { status: 400 }
      )
    }

    // 3. 동의 확인
    if (!consent) {
      return NextResponse.json(
        errorResponse('개인정보 수집·이용에 동의해야 합니다.'),
        { status: 400 }
      )
    }

    // 4. Supabase에 저장 (관리자 권한 사용)
    const { error, data } = await supabaseAdmin
      .from('subscribers')
      .upsert(
        {
          email: email.toLowerCase().trim(),
          name: name?.trim() || null,
          source: 'website',
          consent: true,
        },
        { onConflict: 'email' }
      )
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        errorResponse('구독 신청 중 오류가 발생했습니다.'),
        { status: 500 }
      )
    }

    // 5. (선택) Resend를 통한 웰컴메일 발송
    if (process.env.RESEND_API_KEY) {
      try {
        // Resend 이메일 발송 코드는 별도 구현
        console.log(`웰컴메일 발송 대기: ${email}`)
      } catch (emailError) {
        console.error('Resend error:', emailError)
        // 이메일 발송 실패해도 구독은 성공
      }
    }

    return NextResponse.json(
      successResponse(data, '구독 완료! 메일함을 확인해 주세요.'),
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
