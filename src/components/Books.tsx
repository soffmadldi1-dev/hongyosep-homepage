// ========================================
// 저서 섹션 컴포넌트
// ========================================
// 1권의 종이책 + 3권의 전자책을 소개합니다.

export default function Books() {
  const books = [
    {
      title: '어른의 진짜 공부',
      type: '종이책',
      date: '2026.5.27',
      publisher: '아토북',
      status: 'YES24 자기계발 실시간 1위 (공저)',
      link: 'https://m.yes24.com/goods/detail/189654613',
      icon: '📘',
    },
    {
      title: '회사 말고도 돈 벌고 싶다면 글부터 써라',
      type: '전자책',
      platform: '교보·예스24 베스트셀러',
      icon: '📱',
    },
    {
      title: '아무튼 해봤습니다',
      type: '전자책',
      platform: '교보·예스24 베스트셀러',
      icon: '📱',
    },
    {
      title: '어른이 된다는 착각',
      type: '전자책',
      platform: '교보·예스24 베스트셀러',
      icon: '📱',
    },
  ]

  return (
    <section id="books" className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-navy mb-12 text-center">
          저서
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* 종이책 - 더 크게 */}
          <div className="md:col-span-2 lg:col-span-1 bg-white p-8 rounded-xl border-2 border-navy shadow-lg">
            <div className="flex items-start gap-6">
              <div className="text-6xl">{books[0].icon}</div>
              <div className="flex-1">
                <p className="text-sm font-bold text-navy mb-2 uppercase">
                  {books[0].type}
                </p>
                <h3 className="text-2xl font-bold text-navy mb-2 whitespace-normal">
                  {books[0].title}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  {books[0].date} · {books[0].publisher}
                </p>
                <p className="text-sm font-medium text-green-600 mb-4">
                  ✨ {books[0].status}
                </p>
                <a
                  href={books[0].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-navy text-white text-sm font-semibold rounded-lg hover:shadow-lg transition"
                >
                  YES24에서 구매하기
                </a>
              </div>
            </div>
          </div>

          {/* 전자책 3권 */}
          {books.slice(1).map((book, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition"
            >
              <p className="text-4xl mb-4">{book.icon}</p>
              <p className="text-xs font-bold text-gray-500 mb-2 uppercase">
                {book.type}
              </p>
              <h3 className="text-lg font-bold text-navy mb-3 whitespace-normal">
                {book.title}
              </h3>
              <p className="text-sm text-gray-600">{book.platform}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
