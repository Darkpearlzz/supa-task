Supa Task Manager

A simple task manager built with Next.js (App Router), TypeScript, Supabase Auth + Database, Prisma ORM, and Tailwind CSS.
Users can register, login, create tasks, view their tasks, and delete them. Each task is private to the user who created it.

Features

User authentication with Supabase (email + password)

Register and login pages with show/hide password feature

Create, view, and delete tasks

Each user sees only their own tasks

Responsive UI using Tailwind CSS

Logout functionality

Folder Structure
supa-task/
├─ app/
│ ├─ login/page.tsx # Login page
│ ├─ register/page.tsx # Registration page
│ └─ tasks/page.tsx # Task manager page
├─ lib/
│ └─ supabaseClient.ts # Supabase client instance
├─ prisma/
│ ├─ schema.prisma # Database schema
├─ .env # Environment variables
├─ tailwind.config.js
├─ postcss.config.js
├─ package.json
└─ README.md

Setup Instructions

1. Clone the repository
   git clone https://github.com/Darkpearlzz/supa-task.git
   cd supa-task

2. Install dependencies
   npm install

3. Setup Supabase

Go to Supabase
and create a project.

Create a table called tasks with the following fields:

id: UUID, primary key, default value gen_random_uuid().

title: text, required.

description: text, required.

user_id: UUID, references the auth.users.id from Supabase Auth.

created_at: timestamp, default value now().

Get your database URL:

Go to Project Settings → Database → Connection string.

Copy the postgres:// URL.

Create a .env file in your project root:

NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
DATABASE_URL="your-postgres-connection-url"

4. Setup Prisma
   npx prisma generate
   npx prisma db push

This will create the database tables according to your schema.

Although for this project Prisma was not used because it requires a direct Postgres connection and full database privileges, which were limited on Supabase’s free tier.
Instead, Supabase’s JavaScript client handles authentication and all task CRUD operations, providing a fully functional backend.

5. Run the project locally
   npm run dev

Visit http://localhost:3000

You should see the Register page first.

Implementation Notes

Authentication:

Uses Supabase Auth (signUp and signInWithPassword).

Tasks are linked to user_id to ensure privacy.

Prisma:

Prisma is used as the ORM to interact with the PostgreSQL database.

DATABASE_URL is required in .env.

Tasks UI:

Input fields and task list are full width and centered.

Password and confirm password fields have show/hide icons.

Logout button is added at the top-right (or under title) for easy session management.

Routing:

/ redirects to /register by default.

Authenticated users accessing /tasks are allowed; unauthenticated users are redirected to /login.

Styling:

Tailwind CSS used for responsive styling.

Task list (ul) width matches input fields and buttons for a clean layout.

Future Improvements

Add task editing functionality

Add task completion toggle

Add due dates and priority

Implement notifications for tasks
Supa Task
