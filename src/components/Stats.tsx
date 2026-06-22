// ========================================
// 신뢰 숫자 바 컴포넌트
// ========================================
// 경력, 기업, 인원, 저서 등 주요 지표를 시각화합니다.
// 모바일: 2열 / PC: 6열 그리드

export default function Stats() {
  const stats = [
    { label: '14년', description: 'HRD 교육기획' },
    { label: '100+', description: '기업 교육 기획·운영' },
    { label: '1만+', description: '교육 인원' },
    { label: '4권', description: '저서' },
    { label: '4천+', description: '인스타 팔로워' },
    { label: '3천+', description: '취업 서비스' },
  ]

  return (
    <section id="stats" className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl border border-gray-200 text-center hover:shadow-md transition"
            >
              <p className="text-3xl md:text-4xl font-bold text-navy mb-2">
                {stat.label}
              </p>
              <p className="text-xs md:text-sm text-gray-600 whitespace-normal">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
