# THE SOCRATES TECH. CHUNIAN – Institute Website & Student Management System

React + Vite + Tailwind CSS frontend, Supabase (PostgreSQL, Auth, Storage) backend, jsPDF for vouchers and certificates. Free-tier friendly (Supabase free plan + Netlify free plan).

> **Honest status:** this code was written without being able to install packages or run a build in the authoring environment, so it has **not been compiled or tested in a browser yet**. Expect to fix a few small errors on first run (Step 4 tells you how to get them fixed quickly).

---

## What is built

| Area | Pages / features |
|---|---|
| Public site | Home, About, Courses (search + filter), a details page for every course, Admissions, Physical / Online / Government / Private program pages, Scholarships & Support, Faculty, Gallery, Events, News, Careers, FAQs, Contact, Privacy, Terms, Refund, Student Guidelines, Verify Certificate, Application Status |
| Design | Navy / royal blue / gold theme, dark mode toggle, responsive menu, WhatsApp button, click-to-call, email, Google Map |
| Admissions | Full online form, validation, private document upload, unique application ID, status check |
| Auth | Student / Teacher / Admin login, signup with email verification, forgot + reset password, Google & Facebook buttons (need setup, Step 6) |
| Student portal | Overview, profile, courses, lessons + progress, quizzes, fees + PDF vouchers, payment history, attendance, timetable, results, assignments (upload), materials, certificates, notifications, support, change password |
| Admin panel | Live stats, applications (approve / reject / request correction), students, courses (add/edit/delete/activate; verified-only government courses), fee vouchers (monthly generation, manual, mark paid after verification, reminders), attendance, materials & assignments, results (publish), certificates, scholarship requests, teachers & permissions, announcements, contact messages, testimonials / banners / FAQs. Search, sorting, filters and CSV export on tables |
| Teacher portal | Classes + students, attendance, notes & assignments, marks, timetable (all limited to assigned courses and admin-granted permissions) |
| Security | Row Level Security on every table, role-based policies, private storage buckets, no secret keys in the frontend |

## What is NOT built / needs your input

- **Email and WhatsApp notifications:** only in-app notifications exist. Email/WhatsApp need a paid or externally configured service; not included.
- **Online payments:** none. Fees are paid outside the site; the admin marks them paid only after verifying. This is intentional.
- **Quiz, module and lesson creation screens:** the student side works; the admin screens to author modules/lessons/quizzes are not built yet. Add them in the Supabase Table Editor (tables `modules`, `lessons`, `quizzes`, `quiz_questions`) for now.
- **Timetable and banner editing screens:** timetable rows are added in the Table Editor (`timetable`). Banners can be stored but are not displayed on the homepage yet.
- **Course fees are 0 (placeholder)** and no government courses are seeded. Set real values in Admin → Courses.
- Policy pages are **templates**. Have them reviewed. The gallery, About text and achievements need your real content.

---

## Step 1 – Install the tools (once)
1. Install **Node.js LTS** from https://nodejs.org
2. Open this folder in a terminal and run: `npm install`

## Step 2 – Create the database (free)
1. Go to https://supabase.com → sign up → **New project** (choose a strong database password, region close to Pakistan, e.g. Singapore).
2. Open **SQL Editor → New query**, paste the whole of `supabase/schema.sql`, click **Run**.
3. New query again: paste `supabase/seed_courses.sql`, click **Run** (adds 25 courses + starter FAQs).
4. **Project Settings → API**: copy the **Project URL** and the **anon public key**.
5. Copy `.env.example` to a new file named `.env` and paste both values. Never use the `service_role` key anywhere in this project.

## Step 3 – Authentication settings
In Supabase: **Authentication → URL Configuration**: set *Site URL* to your website address (`http://localhost:5173` while testing, your Netlify address after deployment) and add the same address (plus `/**`) under *Redirect URLs*. Leave **Confirm email** switched on.

## Step 4 – Run it on your computer
```
npm run dev
```
Open http://localhost:5173. If something does not work, copy the exact error text from the terminal or browser console and send it to Claude to fix.

## Step 5 – Make yourself the administrator
1. On the website go to **Student Portal → Create an account**, sign up with your email and verify it.
2. In Supabase **SQL Editor** run (use your email):
   ```sql
   update public.profiles set role = 'admin' where email = 'YOUR-EMAIL@gmail.com';
   ```
3. Log in at `/admin-login`. Only accounts with the `admin` role can reach the admin area; this is enforced by the database, not just the screen.

To create a teacher: they sign up normally; then in **Admin → Teachers & Permissions** add them with their login email and assign courses.

## Step 6 – Google and Facebook login (optional, needs setup)
These buttons only work after you do this. Until then they show an explanatory message.
- **Google:** https://console.cloud.google.com → create project → *APIs & Services → OAuth consent screen* → *Credentials → Create OAuth client ID (Web)*. Add the redirect URI shown in Supabase under *Authentication → Providers → Google*. Paste the Client ID and Secret into Supabase and enable the provider. Free.
- **Facebook:** https://developers.facebook.com → create app → add *Facebook Login* → copy App ID and Secret into Supabase *Providers → Facebook* and add Supabase's callback URL in Facebook's settings. Facebook may require app review and business verification before the public can use it.

## Step 7 – Deploy for free on Netlify
1. Put this folder on GitHub (create a free account, new repository, upload the files; **do not upload `.env`**).
2. https://netlify.com → *Add new site → Import from Git* → choose the repository. Build command `npm run build`, publish directory `dist` (already set in `netlify.toml`).
3. In Netlify *Site configuration → Environment variables* add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
4. Deploy, then put the Netlify address into Supabase *Site URL / Redirect URLs* (Step 3).

## Free vs paid
- Supabase free plan: limited database size, storage and bandwidth; inactive free projects may be paused. Netlify free plan: sufficient for starting out.
- A custom domain (e.g. a .com / .pk) costs money. Email/WhatsApp automation costs money or needs a third-party account.

## Before real students use it
- Set real course fees and schedules; add real teachers, photos and testimonials.
- Review Privacy, Terms and Refund pages. Only describe government programs after you have verified them (the admin form enforces a "Verified" tick before they show).
- Do a test run: apply → approve → generate voucher → mark paid → issue certificate → verify certificate.

## Folder structure
```
index.html, netlify.toml, vite/tailwind/postcss configs, .env.example
public/logo.svg
supabase/schema.sql, seed_courses.sql
src/
  main.jsx, App.jsx (all routes), index.css
  lib/        supabase client, auth context, hooks, config, pdf (vouchers/certificates)
  components/ Layout, PortalShell, ProtectedRoute, DataTable, CourseCard, ui
  pages/public, pages/student, pages/admin, pages/teacher
```
