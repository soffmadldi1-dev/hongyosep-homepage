// ========================================
// 히어로 섹션 컴포넌트
// ========================================
// 페이지 상단 소개 영역입니다.
// 배지, 큰 제목, 부제, 구독 폼을 포함합니다.

import SubscribeForm from './SubscribeForm'

export default function Hero() {
  return (
    <section id="hero" className="bg-white pt-20 pb-16 md:pt-32 md:pb-24">
      <div className="max-w-3xl mx-auto px-4 text-center">
        {/* 배지 */}
        <div className="inline-block mb-6 px-4 py-2 bg-gray-100 rounded-full">
          <p className="text-sm font-medium text-navy">
            🎓 HRD 14년차 · 육퇴 후 자기계발 실천가
          </p>
        </div>

        {/* 메인 제목 */}
        <h1 className="text-3xl md:text-5xl font-bold text-navy mb-6 leading-tight">
          <span className="whitespace-normal">
            매일 1%씩,<br />
            어제와 다른 오늘을<br />
            선물합니다
          </span>
        </h1>

        {/* 부제 */}
        <p className="text-base md:text-lg text-gray-700 mb-12 leading-relaxed">
          관광·취업·AI문서 인사이트를 메일로 받아보세요.
          <br className="hidden md:block" />
          이력서·자기소개서·비즈니스 문서, 그리고 매일 쌓는 성장 루틴까지 —
          <br className="hidden md:block" />
          요셉쌤이 직접 정리해 보내드립니다.
        </p>

        {/* 구독 폼 */}
        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
          <SubscribeForm />
        </div>
      </div>
    </section>
  )
}
