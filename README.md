<h1 align="center">🎓 Edu Care 🎓 </h1>
<h2 align="center">🚀 Edu Care Client 🚀</h2>
<h3 align="center">Develop Edu Care course enrollment System built with a modern React ecosystem MERN stack. Modern tools in the React ecosystem, including React Router, Redux Toolkit, RTK Query, and TypeScript. </h3>

<p align="center">
🎓 EduCare – Course Enrollment System 🎓

EduCare is a full-stack course enrollment platform designed to simplify the process of discovering, enrolling in, and managing courses. The system provides an engaging user experience for learners and powerful tools for administrators to manage courses, users, and enrollments.
Edu Care delivers a clean, modern learning marketplace: discover courses, inspect details, enroll , and track learning. The app features authentication with multi‑role permissions, responsive UI, analytics dashboards, and a purchase flow.

</p>

---

## 🚀 Key Features

### 🌍 Public Access (Anyone can view)

- 🏠 **Home Page** – Modern landing page showcasing featured courses and information.
- 📚 **Courses Page** – Browse all available courses with details.
- 📖 **Course Details** – View specific course information (only logged-in users can enroll).
- ℹ️ **About, FAQ, Contact** – Informational pages for visitors.
- 🔑 **Authentication** – Secure login & registration system.

### 👤 User Role (Student Dashboard)

- 🎯 **Course Enrollment** – Enroll in available courses.
- 🛒 **Cart Management** – Add/remove courses before confirming enrollment.
- 📝 **Enrollment History** – View enrolled courses.
- ⚙️ **Profile & Overview** – Personal details and enrollment status.

### 🛠️ Admin Role (Admin Dashboard)

- 📚 **Course Management** – Create, update, and delete courses.
- 👥 **User Management** – View and remove users.
- 📝 **Enrollment Management** – Track all student enrollments.
- 📊 **Statistics Dashboard** – Overview of courses, users, and enrollment data.

---

---

## 🗺️ Route Navigation Flow

```text
/
├── 🏠 Home (Public)
├── 📚 Courses
│   ├── /courses (Public)
│   └── /courses/:id (User only)
├── ℹ️ About (Public)
├── ❓ FAQ (Public)
├── ✉️ Contact (Public)
├── 🔑 Auth
│   ├── /login (Public)
│   └── /register (Public)
├── 🚫 Unauthorized (Public)

👤 /cart (User only)
👤  /enrollment (User only)





🛠️ Admin Dashboard (/admin/*) [ADMIN]
  ├── /admin/overview (Admin stats)
  ├── /admin/table-course (View Courses)
  ├── /admin/create-course
  ├── /admin/update-course
  ├── /admin/delete-course
  ├── /admin/user-view
  ├── /admin/user-delete
  └── /admin/enrollment-view

```

---

## 📌 Public Pages

- `/` → **Home**
- `/courses` → Browse courses
- `/courses/:id` → Course details (**User only**)
- `/about` → About page
- `/faq` → FAQ page
- `/contact` → Contact page
- `/login` → Login
- `/register` → Registration
- `/unauthorized` → Unauthorized access page

---

## 👤 User Pages

- `/cart` → View cart (**User only**)
- `/enrollment` → My enrollments (**User only**)

### User Dashboard (`/user/*`)

Role: **USER**

- `/user/user-overview` → Overview Dashboard
- (Generated from `userSidebarItems`) → Additional user modules

---

## 🛠️ Admin Pages

### Admin Dashboard (`/admin/*`)

Role: **ADMIN**

- `/admin/overview` → Admin Overview (stats, analytics)
- `/admin/table-course` → View all courses
- `/admin/create-course` → Create new course
- `/admin/update-course` → Update existing course
- `/admin/delete-course` → Delete course
- `/admin/user-view` → View all users
- `/admin/user-delete` → Delete user
- `/admin/enrollment-view` → View all enrollments

---

## 🔐 Authentication & Role Guards

- **withAuth HOC** is used to protect routes.
- Supported roles:
  - `PUBLIC` → Accessible by all
  - `USER` → Logged-in students
  - `ADMIN` → Platform admins
- If unauthorized, user is redirected to `/unauthorized`.

---

## 🧭 Navigation

Dynamic navigation links:

- `Home`, `Courses`, `About`, `Faq`, `Contact` → Public
- `Enrollment` → User only
- `Dashboard` → Admin only

---

**Vercel Deploy Link**

- Backend Deploy

```bash
https://edu-care-server-ten.vercel.app
```

- Frontend Deploy

```bash
https://edu-care-client-flax.vercel.app
```

---

**Github Code Link**

- Backend

```bash
https://github.com/muntasirmoin/Edu-Care-Server.git
```

- Frontend

```bash
https://github.com/muntasirmoin/Edu-Care-Client.git
```

---

## 🎨 Frontend Tech Stack

- ⚛ **React.js** — Component-based UI library for building interactive interfaces
- 🌐 **HTML5 & CSS3** — Semantically structured and responsive layout design
- 🎯 **Bootstrap**, **Tailwind CSS**, **daisyUI**, **ShadCN UI** — Utility-first, modern design systems
- 🧭 **React Router v7** — Declarative client-side routing for SPAs
- 📋 **React Hook Form** — Form management and validation
- 🧪 **Zod** — Schema-based validation for forms and data
- 🎛 **Redux Toolkit** — Scalable and predictable state management
- ⚡ **Vite** — Superfast development and build tooling
- 🔤 **TypeScript** — Strong typing for improved code reliability
- 🧹 **ESLint** — Code linting to maintain code quality
- 🧱 **Radix UI** + 🖼 **Lucide Icons** — Accessible components and modern icons

### 🏷️ Frontend Tech Stack Badges

<p align="left">
  <img src="https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-593D88?style=flat&logo=redux&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=react-router&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-0EA5E9?style=flat&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/ShadCN_UI-1E293B?style=flat&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Zod-4A5568?style=flat&logoColor=white" />
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint&logoColor=white" />
</p>

---

### 📦 Installation Steps

1. **Clone the Repository**

- Backend

```bash
https://github.com/muntasirmoin/Edu-Care-Server.git
```

- Frontend

```bash
https://github.com/muntasirmoin/Edu-Care-Client.git
```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Create Environment Variables File**

   Create a `.env` file in the root directory.

4. **Start the Development Server**

- BackEnd

```bash
npm run dev
```

- FrontEnd

```bash
bun dev
```
