# EmpowerLearn

EmpowerLearn is a digital learning platform dedicated to empowering women across Africa. It provides flexible, self-paced, and completely free courses sourced from high-quality educational content on YouTube. The platform is designed specifically for women balancing life, education, and family responsibilities, allowing them to track their learning goals, browse a vast library of courses, and learn anywhere, on any device.

## Features
- **Goal-Oriented Learning**: Users define their personal goals (e.g., career change, personal growth, starting a business) and get tailored course experiences.
- **Free Course Library**: Thousands of free courses integrated directly through the YouTube API.
- **Progress Tracking**: Keep track of watched lessons and overall course completion.
- **Flexible Access**: Fully responsive design meaning it works seamlessly on mobile devices or desktops.
- **Seamless Login**: One-click Google authentication powered by Supabase.

## Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js & Express
- **Database & Auth**: Supabase (PostgreSQL)

---

## How to Run Locally

### 1. Prerequisites
- Node.js (v18+ recommended)
- A Supabase Project

### 2. Setup Environment Variables
You need to set up environment variables for both the frontend and backend.
1. Check the `.env.example` file in the `frontend` folder to see what variables are required. Create a new `.env` file and fill them in.
2. Check the `.env.example` file in the `backend` folder to see what variables are required. Create a new `.env` file and fill them in.

### 3. Start the Backend
Open a terminal in the main project folder and run:
```bash
cd backend
npm install
node src/server.js
```

### 4. Start the Frontend
Open a second terminal in the main project folder and run:
```bash
cd frontend
npm install
npm start
```
The application will automatically open in your browser at `http://localhost:3000`.

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