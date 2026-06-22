<!-- 
  copilot-instructions.md 파일이 필요한 경우 여기에 추가하세요.
  이 파일은 GitHub Copilot에 대한 커스텀 지시사항을 제공합니다.
-->

# 홍요셉 홈페이지 프로젝트 가이드

## 프로젝트 개요
- Next.js 14 (App Router) 기반 개인 브랜드 홈페이지
- Supabase (PostgreSQL) 기반 이메일 구독 시스템
- Tailwind CSS로 반응형 디자인 구현

## 개발 시 주의사항

### 코드 스타일
- TypeScript 엄격 모드 사용
- 모든 React 컴포넌트에 "use client" 지시사항 명시 (필요한 경우만)
- 한글 음절 끊김 방지: `word-break: keep-all`

### 환경변수
- `.env.local` 파일은 git에 커밋하지 않음 (.gitignore 확인)
- Supabase 서비스 역할 키는 서버 사이드 API에서만 사용
- 민감한 정보는 절대 클라이언트 코드에 하드코딩하지 않음

### Supabase 작업
- 테이블 생성 후 RLS (Row Level Security) 정책 설정
- 익명 사용자는 INSERT만 가능, SELECT는 불가
- 서비스 역할 키로만 완전한 접근 가능

### 배포
- Vercel 사용 (GitHub 연동 권장)
- 환경변수를 Vercel 대시보드에 설정
- 도메인은 Vercel 설정에서 추가

## 파일별 역할

| 파일 | 역할 |
|------|------|
| `src/app/page.tsx` | 메인 홈페이지 (모든 섹션 조합) |
| `src/app/admin/page.tsx` | 관리자 대시보드 (구독자 관리) |
| `src/app/api/subscribe/route.ts` | 이메일 구독 API |
| `src/app/api/admin/route.ts` | 관리자 인증 & CSV 내보내기 |
| `src/components/*.tsx` | UI 섹션 컴포넌트 |
| `src/lib/supabase.ts` | Supabase 클라이언트 설정 |
| `src/lib/utils.ts` | 유틸리티 함수 (검증, 포맷팅) |
| `database.sql` | 데이터베이스 초기화 SQL |

## 커스터마이징 팁

- 강사 사진, 저서 표지 등은 `public/` 폴더에 추가
- 색상 변경: `tailwind.config.js`의 `colors` 수정
- 섹션 추가/제거: `src/app/page.tsx`에서 컴포넌트 조정
- API 추가 필요시: `src/app/api/` 폴더에 새 `route.ts` 생성
