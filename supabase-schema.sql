-- 程式學院資料庫設定（在 Supabase Dashboard > SQL Editor 執行）
-- Supabase Auth 會管理使用者；不要自行建立或儲存明文密碼。

create table if not exists public.lesson_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null,
  completed boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, course_id)
);

alter table public.lesson_progress enable row level security;

-- 使用者只能讀取自己的學習紀錄
create policy "Users can read their own lesson progress"
on public.lesson_progress
for select
to authenticated
using ((select auth.uid()) = user_id);

-- 使用者只能新增自己的學習紀錄
create policy "Users can insert their own lesson progress"
on public.lesson_progress
for insert
to authenticated
with check ((select auth.uid()) = user_id);

-- 使用者只能更新自己的學習紀錄
create policy "Users can update their own lesson progress"
on public.lesson_progress
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

-- 不建立公開讀取政策；未登入的訪客無法讀寫這張表。
-- 不要將 service_role key 放進前端程式碼。
