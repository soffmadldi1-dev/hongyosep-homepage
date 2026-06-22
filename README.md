# 홍요셉 개인 홈페이지 + 이메일 구독 플랫폼

14년차 HRD 교육기획자 홍요셉의 개인 브랜드 홈페이지입니다. 방문자가 이메일을 등록하면 자동으로 Supabase DB에 저장되어, 추후 정보를 전송할 수 있는 구독 기반의 웹사이트입니다.

## 🎯 핵심 기능

- ✉️ **이메일 구독**: 방문자가 이메일을 남기면 Supabase에 자동 저장
- 📊 **관리자 대시보드**: `/admin` 페이지에서 구독자 목록 조회 및 CSV 내보내기
- 🎨 **반응형 디자인**: 모바일/태블릿/PC 모두 최적화
- 🚀 **Vercel 배포 준비**: 환경변수만 설정하면 즉시 배포 가능
- 📧 **웰컴메일** (선택): Resend API가 있으면 자동 웰컴메일 발송

---

## 📋 기술 스택

| 영역 | 기술 |
|------|------|
| **프론트엔드** | Next.js 14 (App Router) + React 18 + TypeScript |
| **스타일** | Tailwind CSS |
| **데이터베이스** | Supabase (PostgreSQL) |
| **이메일** | Resend (선택사항) |
| **배포** | Vercel |

---

## 🚀 로컬 개발 시작하기

### 1️⃣ 프로젝트 클론 및 의존성 설치

```bash
cd hongyosep-homepage
npm install
```

### 2️⃣ Supabase 프로젝트 생성

1. [Supabase](https://supabase.com) 가입 및 로그인
2. **New Project** 생성
3. 프로젝트 **Settings > API**에서 다음 정보 복사:
   - `URL` (NEXT_PUBLIC_SUPABASE_URL)
   - `anon public` (NEXT_PUBLIC_SUPABASE_ANON_KEY)
   - `service_role secret` (SUPABASE_SERVICE_ROLE_KEY)

### 3️⃣ 환경변수 설정

`.env.local` 파일을 프로젝트 루트에 생성하고 다음 내용을 입력하세요:

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
ADMIN_PASSWORD=your-secure-admin-password-here

# 선택사항 - Resend 웰컴메일
# RESEND_API_KEY=your-resend-api-key-here
```

### 4️⃣ Supabase 데이터베이스 테이블 생성

1. Supabase 대시보드 > **SQL Editor** 열기
2. `database.sql` 파일의 SQL 코드를 복사해서 실행

**또는** Supabase 대시보드에서 직접 테이블 생성:

```sql
create table if not exists subscribers (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  name text,
  source text default 'website',
  consent boolean default false,
  created_at timestamptz default now()
);

alter table subscribers enable row level security;

create policy "subscribers_insert_policy" on subscribers
  for insert with check (true);

create policy "subscribers_select_policy" on subscribers
  for select using (false);

create index if not exists idx_subscribers_email on subscribers(email);
create index if not exists idx_subscribers_created_at on subscribers(created_at desc);
```

### 5️⃣ 로컬 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

---

## 👤 관리자 페이지 접근

1. `http://localhost:3000/admin` 방문
2. `.env.local`의 `ADMIN_PASSWORD` 입력
3. 구독자 목록 조회 및 CSV 다운로드 가능

---

## 🌐 Vercel 배포

### 1️⃣ Vercel 계정 생성 및 프로젝트 연결

```bash
npm install -g vercel
vercel login
vercel
```

### 2️⃣ 환경변수 추가

Vercel 대시보드 > **Settings > Environment Variables**에서 다음 변수 추가:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_PASSWORD=your-secure-password
RESEND_API_KEY=your-resend-api-key (선택사항)
```

### 3️⃣ 배포

```bash
vercel --prod
```

배포가 완료되면 Vercel이 제공하는 URL이 표시됩니다.

### 4️⃣ 커스텀 도메인 연결 (선택)

Vercel 대시보드 > **Settings > Domains**에서 도메인 추가

---

## 📁 프로젝트 구조

```
hongyosep-homepage/
├── public/                    # 정적 이미지, 파비콘
├── src/
│   ├── app/
│   │   ├── layout.tsx        # 루트 레이아웃
│   │   ├── page.tsx          # 메인 페이지 (모든 섹션)
│   │   ├── admin/
│   │   │   └── page.tsx      # 관리자 대시보드
│   │   └── api/
│   │       ├── subscribe/
│   │       │   └── route.ts  # POST /api/subscribe - 이메일 저장
│   │       └── admin/
│   │           └── route.ts  # GET/POST /api/admin - 관리자 인증/CSV
│   ├── components/
│   │   ├── Header.tsx        # 헤더 (고정 상단)
│   │   ├── Hero.tsx          # 히어로 섹션 + 첫 구독 폼
│   │   ├── SubscribeForm.tsx  # 재사용 가능한 구독 폼
│   │   ├── Stats.tsx         # 신뢰 숫자 바
│   │   ├── Achievements.tsx   # 공인 성과
│   │   ├── About.tsx         # 소개
│   │   ├── Services.tsx      # 강의/컨설팅
│   │   ├── Books.tsx         # 저서
│   │   ├── Contact.tsx       # 연락처
│   │   └── Footer.tsx        # 푸터
│   ├── lib/
│   │   ├── supabase.ts       # Supabase 클라이언트
│   │   └── utils.ts          # 유틸 함수
│   └── styles/
│       └── globals.css       # 글로벌 스타일
├── .env.local.example        # 환경변수 예시
├── .gitignore
├── database.sql              # Supabase 테이블 생성 SQL
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── README.md                 # 이 파일
```

---

## 🎨 페이지 구조 (한 페이지 스크롤)

1. **헤더** - 상단 고정 로고 + 네비게이션
2. **히어로** - 메인 메시지 + 첫 번째 구독 폼
3. **신뢰 숫자** - 14년, 100+기업, 1만명 등
4. **공인 성과** - 고용노동부 S등급, 네이버 공식 작가 등
5. **소개** - 경력 소개 + 4줄 요약 카드
6. **강의·컨설팅** - 3개 프로그램 카드
7. **저서** - 1권 종이책 + 3권 전자책
8. **구독 CTA** - 두 번째 구독 폼 (스크롤 끝 전환)
9. **연락처** - 인스타그램, 카카오 오픈채팅
10. **푸터** - 저작권, SNS 아이콘, 개인정보처리방침

---

## 📧 이메일 구독 플로우

### 사용자 관점
1. 히어로 섹션 또는 끝 부분의 폼에 **이름(선택), 이메일(필수)** 입력
2. **개인정보 수집·이용 동의** 체크
3. **"인사이트 메일 받기"** 버튼 클릭
4. 성공 메시지 표시

### 백엔드 플로우
1. `POST /api/subscribe` 요청
2. 이메일 형식 검증
3. 동의 여부 확인
4. Supabase `subscribers` 테이블에 저장 (upsert)
5. (선택) Resend API로 웰컴메일 발송
6. 성공 응답 반환

### 관리자 관점
1. `/admin` 페이지 방문
2. 관리자 비밀번호 입력
3. 구독자 목록 조회
4. CSV 다운로드 가능

---

## 🔒 보안 사항

- ✅ `.env.local`의 민감한 키는 `.gitignore`에 포함
- ✅ Supabase RLS (Row Level Security) 설정으로 데이터 접근 제어
- ✅ 관리자 비밀번호로 `/admin` 페이지 보호
- ✅ 이메일 유효성 검증
- ✅ 중복 이메일 처리 (친절한 에러 메시지)

---

## 🎨 디자인 가이드

- **배경**: 흰색 (#ffffff)
- **주 색상**: 네이비 (#1e293b)
- **보조 배경**: 라이트 그레이 (#f3f4f6)
- **텍스트**: 다크 그레이 (#111827)
- **모바일 우선 설계**: 모든 섹션이 세로 쌓임
- **한글 음절 끊김 방지**: `word-break: keep-all` + `overflow-wrap: break-word` 적용

---

## 🚀 배포 후 하면 좋은 것들

1. **도메인 연결**: Vercel에서 커스텀 도메인 추가
2. **HTTPS**: Vercel에서 자동 적용
3. **이메일 서비스**: Resend API 키 추가해서 웰컴메일 자동 발송
4. **Analytics**: Vercel Analytics 또는 Google Analytics 연동
5. **홈페이지 이미지**: `public/` 폴더에 강사 사진, 저서 표지 추가
6. **개인정보처리방침**: `/privacy` 페이지 추가
7. **Slack 알림**: 새 구독자 알림 설정

---

## 📞 문제 해결

### "Supabase 연결 안 됨"
- `.env.local` 파일 존재 확인
- 환경변수명 정확성 확인 (`NEXT_PUBLIC_SUPABASE_URL` 등)
- Supabase 프로젝트 활성 상태 확인

### "CSV 다운로드 실패"
- 관리자 비밀번호 확인
- 브라우저 콘솔 오류 메시지 확인
- Supabase service_role_key 유효성 확인

### "이메일 폼이 제출되지 않음"
- 이메일 형식 검증 (예: `user@example.com`)
- 동의 체크박스 확인
- 브라우저 콘솔의 네트워크 오류 확인

---

## 📚 참고 링크

- [Next.js 공식 문서](https://nextjs.org/docs)
- [Tailwind CSS 공식 문서](https://tailwindcss.com/docs)
- [Supabase 공식 문서](https://supabase.com/docs)
- [Resend 공식 문서](https://resend.com/docs)
- [Vercel 배포 가이드](https://vercel.com/docs)

---

## 📝 라이선스

개인 프로젝트입니다. 자유롭게 커스터마이징하세요.

---

**마지막 업데이트**: 2026년 6월  
**제작자**: 홍요셉 · bookcreation_
