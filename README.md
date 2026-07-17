# EmpowerLearn - Women Digital Learning Platform

## What This App Does
A full learning platform for women. Users sign in with Google, complete
a profile, browse free courses from YouTube, enroll, track progress,
and mark lessons complete. Instructors can upload courses. Admins
manage users and see platform stats.

---

## STEP 1 - Supabase Setup

1. Go to https://supabase.com and create a free account
2. Click "New Project" - give it a name, set a password, choose a region
3. Wait for it to finish setting up (about 1 minute)
4. Go to Settings > API - copy your:
   - Project URL  →  SUPABASE_URL
   - anon public key  →  SUPABASE_ANON_KEY
   - service_role key  →  SUPABASE_SERVICE_KEY  (keep this secret)

---

## STEP 2 - Create Database Tables

Go to your Supabase project > SQL Editor > New Query
Paste and run this entire block:

```sql
-- Profiles table
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  name text,
  email text,
  avatar text,
  role text default 'learner',
  bio text default '',
  country text default '',
  phone text default '',
  learning_goal text default '',
  challenges text default '',
  profile_completed boolean default false,
  created_at timestamp default now()
);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, email, avatar)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.email,
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- Enrollments table
create table enrollments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  course_id text not null,
  course_title text,
  course_thumbnail text,
  course_source text default 'youtube',
  progress_percent integer default 0,
  completed_lessons text[] default '{}',
  enrolled_at timestamp default now(),
  last_accessed_at timestamp default now(),
  unique(user_id, course_id)
);

-- Courses table (instructor-created)
create table courses (
  id uuid default gen_random_uuid() primary key,
  instructor_id uuid references profiles(id),
  title text,
  description text,
  topic text,
  playlist_url text,
  created_at timestamp default now()
);

-- Row Level Security
alter table profiles enable row level security;
alter table enrollments enable row level security;
alter table courses enable row level security;

create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);
create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);
create policy "Service role full access profiles"
  on profiles for all using (true);

create policy "Users manage own enrollments"
  on enrollments for all using (auth.uid() = user_id);

create policy "Anyone can view courses"
  on courses for select using (true);
create policy "Instructors manage own courses"
  on courses for all using (auth.uid() = instructor_id);
```

---

## STEP 3 - Google OAuth in Supabase

1. Go to https://console.cloud.google.com
2. Create a new project
3. APIs & Services > OAuth consent screen > External > fill in app name
4. APIs & Services > Credentials > Create > OAuth 2.0 Client ID
5. Application type: Web application
6. Authorized redirect URI:
   https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
   (find YOUR_PROJECT_REF in your Supabase URL)
7. Copy Client ID and Client Secret
8. In Supabase: Authentication > Providers > Google
   - Enable it
   - Paste Client ID and Client Secret
   - Save

---

## STEP 4 - Set Up Environment Files

### backend/.env
Copy backend/.env.example to backend/.env and fill in:
```
PORT=5000
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_KEY=your_service_role_key
CLIENT_URL=http://localhost:3000
YOUTUBE_API_KEY=your_youtube_api_key
```

### frontend/.env
Copy frontend/.env.example to frontend/.env and fill in:
```
REACT_APP_SUPABASE_URL=https://xxxxx.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_anon_key
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_YOUTUBE_API_KEY=your_youtube_api_key
```

---

## STEP 5 - Install and Run

Open two terminals:

### Terminal 1 - Backend
```bash
cd backend
npm install
node src/server.js
```
You should see: Server running on port 5000

### Terminal 2 - Frontend
```bash
cd frontend
npm install
npm start
```
Browser opens at http://localhost:3000

---

## User Flow
1. Visit http://localhost:3000 → redirected to /login
2. Click "Continue with Google" → Google sign-in
3. New users → /complete-profile → fill in details → save
4. Returning users → /dashboard
5. Browse courses at /courses → search → enroll
6. Watch a course at /course/:id → mark lessons complete
7. Progress tracked per course on dashboard

## Roles
- learner (default) - browse, enroll, track progress
- instructor - everything learner can do + create courses at /instructor
- admin - everything + manage all users at /admin

To make yourself admin: go to Supabase > Table Editor > profiles >
find your row > change role from 'learner' to 'admin' > save

---

## Pages
| Route | Page |
|-------|------|
| /login | Login with Google |
| /auth/callback | Handles Google redirect |
| /complete-profile | First-time profile setup |
| /dashboard | My courses + stats |
| /courses | Browse + search YouTube courses |
| /course/:id | Watch video + track progress |
| /profile | View and edit profile |
| /instructor | Create and manage courses |
| /admin | Manage users + platform stats |

## API Endpoints (Backend)
| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/users/profile | Get my profile |
| PUT | /api/users/profile | Update my profile |
| GET | /api/enrollments | Get my enrollments |
| POST | /api/enrollments | Enroll in a course |
| DELETE | /api/enrollments/:id | Unenroll |
| PATCH | /api/enrollments/:id/progress | Update progress |
| GET | /api/enrollments/:courseId | Get single enrollment |
| GET | /api/youtube/search | Search YouTube videos |
| GET | /api/youtube/related | Get related videos |
| POST | /api/courses | Create course (instructor) |
| GET | /api/courses | Get all courses |
| GET | /api/courses/mine | Get my courses (instructor) |
| GET | /api/admin/users | Get all users (admin) |
| PATCH | /api/admin/users/:id/role | Change user role (admin) |
| DELETE | /api/admin/users/:id | Delete user (admin) |
| GET | /api/admin/stats | Platform stats (admin) |
