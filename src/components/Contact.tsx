// ========================================
// 연락처 섹션 컴포넌트
// ========================================
// 인스타그램, 카카오 오픈채팅 등 연락처를 표시합니다.

export default function Contact() {
  return (
    <section id="contact" className="bg-white py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <p className="text-gray-600 mb-6 text-sm">
          더 많은 정보와 일상을 나누고 싶다면
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href="https://www.instagram.com/bookcreation_"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gray-100 text-navy font-semibold rounded-lg hover:bg-gray-200 transition text-sm"
          >
            📷 인스타그램 DM (@bookcreation_)
          </a>
          <a
            href="https://open.kakao.com/me/yosepAI"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gray-100 text-navy font-semibold rounded-lg hover:bg-gray-200 transition text-sm"
          >
            💬 카카오 오픈채팅
          </a>
        </div>
      </div>
    </section>
  )
}
