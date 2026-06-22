// ========================================
// 관리자 페이지 (/admin)
// ========================================
// 비밀번호로 보호된 관리자 대시보드입니다.
// 구독자 목록 조회 및 CSV 내보내기 기능을 제공합니다.

'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Subscriber {
  id: string
  email: string
  name?: string
  source: string
  consent: boolean
  created_at: string
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  // 관리자 인증
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const response = await fetch(`/api/admin?password=${password}`)
      const data = await response.json()

      if (response.ok) {
        setIsAuthenticated(true)
        setSubscribers(data.data || [])
        setMessage({
          type: 'success',
          text: `인증 성공! 총 ${data.count}명의 구독자입니다.`,
        })
      } else {
        setMessage({ type: 'error', text: data.message })
      }
    } catch (error) {
      setMessage({ type: 'error', text: '오류가 발생했습니다.' })
    } finally {
      setLoading(false)
    }
  }

  // CSV 다운로드
  const handleDownloadCSV = async () => {
    setLoading(true)

    try {
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, format: 'csv' }),
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `subscribers_${new Date().toISOString().split('T')[0]}.csv`
        a.click()
        setMessage({ type: 'success', text: 'CSV 파일이 다운로드되었습니다.' })
      } else {
        setMessage({ type: 'error', text: '다운로드 중 오류가 발생했습니다.' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: '오류가 발생했습니다.' })
    } finally {
      setLoading(false)
    }
  }

  // 로그아웃
  const handleLogout = () => {
    setIsAuthenticated(false)
    setPassword('')
    setSubscribers([])
    setMessage(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-navy text-white p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">관리자 대시보드</h1>
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition text-sm"
            >
              로그아웃
            </button>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {!isAuthenticated ? (
          // 로그인 폼
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-navy mb-6">관리자 인증</h2>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  관리자 비밀번호
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy focus:ring-opacity-20"
                  required
                />
              </div>

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

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 font-semibold rounded-lg transition-all duration-300 text-white ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-navy hover:shadow-lg'
                }`}
              >
                {loading ? '인증 중...' : '로그인'}
              </button>
            </form>

            <p className="text-xs text-gray-500 mt-6 text-center">
              .env.local 파일의 ADMIN_PASSWORD를 입력하세요.
            </p>
          </div>
        ) : (
          // 관리 대시보드
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-navy mb-2">구독자 목록</h2>
              <p className="text-gray-600">
                총 {subscribers.length}명의 구독자 정보
              </p>
            </div>

            {/* CSV 다운로드 버튼 */}
            <div className="mb-6">
              <button
                onClick={handleDownloadCSV}
                disabled={loading}
                className={`px-6 py-3 font-semibold rounded-lg transition-all duration-300 text-white ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {loading ? 'CSV 생성 중...' : '📥 CSV 내보내기'}
              </button>
            </div>

            {/* 메시지 */}
            {message && (
              <div
                className={`mb-6 p-4 rounded-lg text-sm font-medium ${
                  message.type === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {message.text}
              </div>
            )}

            {/* 구독자 테이블 */}
            {subscribers.length > 0 ? (
              <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold text-gray-900">
                        이메일
                      </th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-900">
                        이름
                      </th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-900">
                        구독일
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {subscribers.map((sub) => (
                      <tr key={sub.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-gray-900 font-medium">
                          {sub.email}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {sub.name || '—'}
                        </td>
                        <td className="px-6 py-4 text-gray-600 text-xs">
                          {new Date(sub.created_at).toLocaleDateString(
                            'ko-KR',
                            {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            }
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-600">아직 구독자가 없습니다.</p>
              </div>
            )}

            {/* 팁 */}
            <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900">
                <strong>💡 팁:</strong> Supabase 대시보드의 Table Editor에서도
                직접 구독자 데이터를 보고 관리할 수 있습니다.
              </p>
            </div>

            {/* 돌아가기 */}
            <div className="mt-8 text-center">
              <Link
                href="/"
                className="text-navy hover:underline text-sm font-medium"
              >
                ← 메인 페이지로 돌아가기
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
