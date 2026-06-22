// ========================================
// 소개 섹션 컴포넌트
// ========================================
// 경력 소개 및 4줄 요약 카드를 표시합니다.

export default function About() {
  return (
    <section id="about" className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-navy mb-8 text-center">
          소개
        </h2>

        {/* 긴 소개 텍스트 */}
        <p className="text-base md:text-lg text-gray-700 mb-12 leading-relaxed text-center">
          삼성·SK·현대 등 대기업 HRD 교육 100개+ 기획, 한국관광공사 관광일자리센터에서
          3,000명+ 취업 서비스 진행.
          <br className="hidden md:block" />
          <br className="hidden md:block" />
          NCS 기반 HR컨설팅으로 100개 관광기업 컨설팅, 고용노동부 기관평가 S등급.
          <br className="hidden md:block" />
          <br className="hidden md:block" />
          매일 500자 글쓰기·독서·운동으로 '어제보다 1% 나은 오늘'을 삶으로 증명합니다.
        </p>

        {/* 요약 카드 */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-navy text-white p-6 rounded-xl">
            <p className="text-sm font-medium mb-2 opacity-80">경력</p>
            <p className="text-lg font-bold whitespace-normal">14년차 교육기획자</p>
          </div>
          <div className="bg-navy text-white p-6 rounded-xl">
            <p className="text-sm font-medium mb-2 opacity-80">전문분야</p>
            <p className="text-lg font-bold whitespace-normal">
              관광일자리·이력서 강사
            </p>
          </div>
          <div className="bg-navy text-white p-6 rounded-xl">
            <p className="text-sm font-medium mb-2 opacity-80">저술</p>
            <p className="text-lg font-bold whitespace-normal">베스트셀러 작가</p>
          </div>
          <div className="bg-navy text-white p-6 rounded-xl">
            <p className="text-sm font-medium mb-2 opacity-80">추구하는 삶</p>
            <p className="text-lg font-bold whitespace-normal">
              육퇴 후 자기계발 실천가
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
