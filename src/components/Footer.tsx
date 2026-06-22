// ========================================
// 푸터 컴포넌트
// ========================================
// 저작권, SNS 링크, 개인정보처리방침 링크

export default function Footer() {
  return (
    <footer className="bg-navy text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8 text-sm">
          {/* 정보 */}
          <div>
            <p className="font-bold mb-2">홍요셉 · bookcreation_</p>
            <p className="text-gray-300 text-xs">
              14년차 HRD 교육기획자
              <br />
              베스트셀러 작가
            </p>
          </div>

          {/* SNS */}
          <div>
            <p className="font-bold mb-3">SNS</p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/bookcreation_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition text-lg"
                title="Instagram"
              >
                📷
              </a>
              <a
                href="https://brunch.co.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition text-lg"
                title="Brunch"
              >
                📖
              </a>
              <a
                href="https://threads.net"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition text-lg"
                title="Threads"
              >
                🧵
              </a>
              <a
                href="https://blog.naver.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition text-lg"
                title="Blog"
              >
                📝
              </a>
            </div>
          </div>

          {/* 법률 */}
          <div>
            <a
              href="#privacy"
              className="text-gray-300 hover:text-white transition text-xs block mb-2"
            >
              개인정보처리방침
            </a>
            <a
              href="#terms"
              className="text-gray-300 hover:text-white transition text-xs block"
            >
              이용약관
            </a>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-xs text-gray-400">
          <p>© 2026 홍요셉 · bookcreation_. All rights reserved.</p>
          <p className="mt-2">
            이 사이트는 Next.js + Tailwind CSS로 제작되었습니다.
          </p>
        </div>
      </div>
    </footer>
  )
}
