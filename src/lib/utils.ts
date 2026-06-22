// ========================================
// 유틸리티 함수
// ========================================
// 이메일 검증, 비밀번호 암호화 등 공통 함수를 정의합니다.

// 이메일 형식 검증
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

// 관리자 비밀번호 검증
export const verifyAdminPassword = (inputPassword: string): boolean => {
  const adminPassword = process.env.ADMIN_PASSWORD || ''
  return inputPassword === adminPassword
}

// API 응답 포맷
export const successResponse = (data: any, message: string = '성공') => {
  return {
    success: true,
    message,
    data,
  }
}

export const errorResponse = (message: string, statusCode: number = 400) => {
  return {
    success: false,
    message,
    statusCode,
  }
}

// CSV 데이터 생성
export const generateCSV = (subscribers: any[]): string => {
  if (subscribers.length === 0) {
    return 'email,name,source,consent,created_at'
  }

  const headers = ['email', 'name', 'source', 'consent', 'created_at']
  const rows = subscribers.map((sub) => [
    `"${sub.email}"`,
    `"${sub.name || ''}"`,
    sub.source,
    sub.consent,
    sub.created_at,
  ])

  return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n')
}

// 날짜 포맷팅
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
