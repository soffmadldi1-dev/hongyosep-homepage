// ========================================
// 이메일 구독 폼 컴포넌트
// ========================================
// 이름과 이메일을 입력받고 동의 체크박스를 확인한 후
// Supabase에 저장하는 폼입니다.

'use client'

import { useState } from 'react'

interface SubscribeFormProps {
  title?: string
  subtitle?: string
}

export default function SubscribeForm({ title, subtitle }: SubscribeFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    // 폼 검증
    if (!email.trim()) {
      setMessage({ type: 'error', text: '이메일을 입력해 주세요.' })
      return
    }

    if (!consent) {
      setMessage({
        type: 'error',
        text: '개인정보 수집·이용에 동의해야 합니다.',
      })
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, consent }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: data.message })
        setName('')
        setEmail('')
        setConsent(false)
      } else {
        setMessage({
          type: 'error',
          text: data.message || '구독 신청에 실패했습니다.',
        })
      }
    } catch (error) {
      setMessage({ type: 'error', text: '오류가 발생했습니다. 다시 시도해 주세요.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      {title && (
        <h2 className="text-2xl md:text-3xl font-bold text-navy mb-2 whitespace-normal">
          {title}
        </h2>
      )}
      {subtitle && <p className="text-gray-600 mb-6">{subtitle}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 이름 입력 (선택사항) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            이름 (선택)
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="홍요셉"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy focus:ring-opacity-20"
          />
        </div>

        {/* 이메일 입력 (필수) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            이메일 <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy focus:ring-opacity-20"
          />
        </div>

        {/* 동의 체크박스 */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="consent"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 w-5 h-5 cursor-pointer accent-navy"
          />
          <label htmlFor="consent" className="text-sm text-gray-700 cursor-pointer">
            <span className="font-medium text-red-500">[필수]</span> 개인정보 수집·이용에
            동의합니다.
            <br />
            <span className="text-xs text-gray-500">
              수집 항목: 이메일(이름) / 목적: 정보·인사이트 메일 발송 / 보유: 구독 해지
              시까지. 언제든 수신거부 가능합니다.
            </span>
          </label>
        </div>

        {/* 메시지 표시 */}
        {message && (
          <div
            className={`p-4 rounded-lg text-sm font-medium ${
              message.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* 제출 버튼 */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-6 font-semibold rounded-lg transition-all duration-300 text-white ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-navy hover:shadow-lg hover:scale-105 active:scale-95'
          }`}
        >
          {loading ? '구독 중...' : '인사이트 메일 받기'}
        </button>

        {/* 안내 문구 */}
        <p className="text-center text-xs text-gray-500">
          구독하시면 「AI 활용 합격 자기소개서 프롬프트 모음」을 보내드려요.
          <br />
          언제든 수신거부 가능합니다.
        </p>
      </form>
    </div>
  )
}
