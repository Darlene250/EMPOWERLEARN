# EmpowerLearn

A digital learning platform built for women in Africa who have paused their education due to life challenges such as family responsibilities, pregnancy, financial difficulty, or early marriage. The platform provides free, flexible access to courses so women can continue learning at their own pace, from any device.

---

## What it does

- Sign in with Google, no separate account needed
- Complete a short profile with your learning goal and background
- Browse and search thousands of free video courses sourced from YouTube
- Enroll in courses and watch them directly on the platform
- Mark lessons complete and track progress on a personal dashboard
- Instructors can create and upload their own course content
- Admins can manage users, roles, and view platform statistics

---

## Tech stack

Layer
Technology

Frontend
React

Backend
Node.js with Express

Database
Supabase (PostgreSQL)

Auth
Supabase Google OAuth

Courses
YouTube Data API v3

---

## Project structure

```
empowerlearn/
├── frontend/        React app
├── backend/         Node.js Express API
└── README.md
```

---

## Getting started

### Requirements

- Node.js installed
- A Supabase account (free at supabase.com)
- A Google Cloud project with OAuth credentials
- A YouTube Data API v3 key

### Setup

1. Clone the repository
2. Follow the setup steps in the full README inside each folder
3. Create your Supabase project and run the SQL setup script
4. Fill in your environment variables in both `.env` files
5. Run the backend and frontend

```
# Backend
cd backend
npm install
node src/server.js

# Frontend (separate terminal)
cd frontend
npm install
npm start
```

The app runs at `http://localhost:3000`

---

## User roles

Role
Access

Learner
Browse courses, enroll, track progress

Instructor
Everything above, plus create and manage courses

Admin
Everything above, plus manage all users and view platform stats

New users are assigned the learner role by default. To change a role, go to Supabase, open the profiles table, find the user, and update their role field.

---

## Pages

Route
Description

/
Landing page

/login
Sign in with Google

/complete-profile
First time profile setup

/dashboard
Enrolled courses and progress stats

/courses
Browse and search courses

/course/:id
Watch a course and mark lessons complete

/profile
View and edit your profile

/instructor
Instructor course management panel

/admin
Admin user management panel

---

## Mission

EmpowerLearn was created as part of a student project at the African Leadership University. The goal is to reduce the number of women who drop out of education permanently by giving them a flexible, low-barrier way to keep learning during difficult periods of their lives.
