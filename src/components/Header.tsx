// ========================================
// 헤더 컴포넌트
// ========================================
// 상단 고정 헤더: 로고, 네비게이션 메뉴
// 화면 상단에 항상 보여집니다.

'use client'

import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* 로고 */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-2xl font-bold text-navy cursor-pointer whitespace-nowrap"
        >
          홍요셉 · <span className="text-sm font-normal">bookcreation_</span>
        </div>

        {/* 데스크톱 메뉴 */}
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <button
            onClick={() => scrollToSection('about')}
            className="text-gray-700 hover:text-navy transition"
          >
            소개
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="text-gray-700 hover:text-navy transition"
          >
            강의
          </button>
          <button
            onClick={() => scrollToSection('books')}
            className="text-gray-700 hover:text-navy transition"
          >
            저서
          </button>
          <button
            onClick={() => scrollToSection('subscribe')}
            className="text-white bg-navy px-4 py-2 rounded-lg hover:shadow-lg transition"
          >
            구독
          </button>
        </nav>

        {/* 모바일 메뉴 버튼 */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-navy text-2xl"
        >
          ☰
        </button>

        {/* 모바일 메뉴 */}
        {mobileMenuOpen && (
          <nav className="absolute top-16 left-0 right-0 bg-white border-b border-gray-100 p-4 flex flex-col gap-4 md:hidden">
            <button
              onClick={() => scrollToSection('about')}
              className="text-left text-gray-700 hover:text-navy transition py-2"
            >
              소개
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-left text-gray-700 hover:text-navy transition py-2"
            >
              강의
            </button>
            <button
              onClick={() => scrollToSection('books')}
              className="text-left text-gray-700 hover:text-navy transition py-2"
            >
              저서
            </button>
            <button
              onClick={() => scrollToSection('subscribe')}
              className="text-left text-white bg-navy px-4 py-2 rounded-lg hover:shadow-lg transition"
            >
              구독
            </button>
          </nav>
        )}
      </div>
    </header>
  )
}
