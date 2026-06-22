// ========================================
// 루트 레이아웃
// ========================================
// 모든 페이지의 기본 HTML 구조를 정의합니다.
// 메타데이터, 글로벌 스타일을 설정합니다.

import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: '홍요셉 · 매일 1%씩 성장하는 일상',
  description:
    '14년차 HRD 교육기획자, 베스트셀러 저자 홍요셉의 개인 홈페이지. 관광일자리, 이력서 강사, AI 활용 문서작성 전문가.',
  keywords: ['홍요셉', '이력서', '자기소개서', '강의', '컨설팅', 'AI', '문서작성'],
  openGraph: {
    title: '홍요셉 · 매일 1%씩 성장하는 일상',
    description:
      '14년차 HRD 교육기획자, 베스트셀러 저자 홍요셉의 개인 홈페이지.',
    type: 'website',
    locale: 'ko_KR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
