-- ========================================
-- Supabase 테이블 생성 SQL
-- ========================================
-- Supabase 대시보드 > SQL Editor에서 복사해서 실행해주세요.

-- 1. subscribers 테이블 생성
-- 이메일 구독자 정보를 저장합니다.
create table if not exists subscribers (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  name text,
  source text default 'website',
  consent boolean default false,
  created_at timestamptz default now()
);

-- 2. RLS(Row Level Security) 활성화
alter table subscribers enable row level security;

-- 3. 정책 설정 (누구나 INSERT 가능, 관리자만 SELECT/UPDATE/DELETE)
-- 익명 사용자: INSERT만 가능
create policy "subscribers_insert_policy" on subscribers
  for insert with check (true);

-- 익명 사용자: SELECT 불가
-- (관리자는 service_role_key로 우회 가능)
create policy "subscribers_select_policy" on subscribers
  for select using (false);

-- ========================================
-- 인덱스 생성 (성능 최적화)
-- ========================================
create index if not exists idx_subscribers_email on subscribers(email);
create index if not exists idx_subscribers_created_at on subscribers(created_at desc);
