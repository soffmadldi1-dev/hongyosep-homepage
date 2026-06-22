// ========================================
// 공인 성과 컴포넌트
// ========================================
// 고용노동부 인정, 네이버 공식 작가 등 신뢰 요소를 4개 카드로 표시합니다.

export default function Achievements() {
  const achievements = [
    {
      icon: '🏆',
      title: '고용노동부 기관평가 S등급',
      description: 'NCS 활용 HR컨설팅 사업 총괄',
    },
    {
      icon: '⭐',
      title: '고용노동부 우수사례 선정',
      description: '청년맞춤형 훈련사업',
    },
    {
      icon: '📚',
      title: '네이버 공식 작가 / 저서 4권',
      description: '브런치 공식 인증 작가',
    },
    {
      icon: '📺',
      title: 'KT 밀리의 서재 사내방송 출연',
      description: '베스트셀러 저자 인터뷰',
    },
  ]

  return (
    <section id="achievements" className="bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-navy mb-12 text-center">
          공인된 성과
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:shadow-lg transition"
            >
              <p className="text-4xl mb-4">{item.icon}</p>
              <h3 className="text-lg font-bold text-navy mb-2">{item.title}</h3>
              <p className="text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
