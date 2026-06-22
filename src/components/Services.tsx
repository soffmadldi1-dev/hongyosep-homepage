// ========================================
// 강의·컨설팅 섹션 컴포넌트
// ========================================
// 3개 강의/컨설팅 프로그램을 카드로 표시합니다.

export default function Services() {
  const services = [
    {
      icon: '📝',
      title: '이력서·자기소개서·비즈니스 문서 작성법',
      description:
        '현역 강사, 매달 진행 / 한국관광공사·인천관광공사·GKL·노사발전재단 출강',
      tags: ['강의', '실무'],
    },
    {
      icon: '🎯',
      title: '퍼스널브랜딩·AI 활용 문서작성·핵심가치 워크숍',
      description: '퍼스널브랜딩 1급 자격',
      tags: ['워크숍', '컨설팅'],
    },
    {
      icon: '🏢',
      title: 'HRD·정부지원사업 기획 컨설팅',
      description:
        'NCS 개발·개선, 제안서, S등급 경험 / 대기업·정부 기관 컨설팅 경력',
      tags: ['컨설팅', 'B2B'],
    },
  ]

  return (
    <section id="services" className="bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-navy mb-12 text-center">
          강의 · 컨설팅
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:shadow-lg hover:border-navy transition"
            >
              <p className="text-4xl mb-4">{service.icon}</p>
              <h3 className="text-lg font-bold text-navy mb-4">{service.title}</h3>
              <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                {service.description}
              </p>
              <div className="flex gap-2 flex-wrap">
                {service.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className="text-xs bg-navy bg-opacity-10 text-navy px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
