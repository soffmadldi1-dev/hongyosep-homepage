// ========================================
// 메인 페이지 (/)
// ========================================
// 모든 섹션을 조합하여 홈페이지를 구성합니다.
// 한 페이지 스크롤 구조: 헤더, 히어로, 신뢰, 성과, 소개, 강의, 저서, 구독 CTA, 연락처, 푸터

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import Achievements from '@/components/Achievements'
import About from '@/components/About'
import Services from '@/components/Services'
import Books from '@/components/Books'
import SubscribeForm from '@/components/SubscribeForm'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />

      {/* 1. 히어로 섹션 */}
      <Hero />

      {/* 2. 신뢰 숫자 바 */}
      <Stats />

      {/* 3. 공인 성과 */}
      <Achievements />

      {/* 4. 소개 */}
      <About />

      {/* 5. 강의·컨설팅 */}
      <Services />

      {/* 6. 저서 */}
      <Books />

      {/* 7. 구독 CTA 섹션 (재차 강조) */}
      <section id="subscribe" className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4 text-center">
            여기까지 읽으셨다면,
            <br className="hidden md:block" />
            <span className="whitespace-normal">
              메일로 계속 이어가요
            </span>
          </h2>
          <p className="text-center text-gray-600 mb-8">
            더 많은 인사이트와 일상을 받아보세요
          </p>
          <div className="bg-white p-8 rounded-2xl border border-gray-200">
            <SubscribeForm />
          </div>
        </div>
      </section>

      {/* 8. 연락처 */}
      <Contact />

      {/* 9. 푸터 */}
      <Footer />
    </>
  )
}
