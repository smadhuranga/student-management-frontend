# 🎓 Student Management Frontend

A modern and intuitive **Frontend UI** for the Student Management System application — built with **React**, **Vite**, and **TypeScript**. This frontend works seamlessly with the backend API to perform **CRUD operations** on student data and supports **user authentication**, search, filtering, and real‑time updates.

---

## ✨ Features

💻 **User Authentication**  
✔ Login page (username & password)  
✔ Redirect to dashboard on successful login

📊 **Dashboard**  
✔ Shows total number of students  
✔ Navigation to student management page

📋 **Student Management**  
✔ List all students in a table view  
✔ Add new students  
✔ Edit student details  
✔ Delete students with confirmation  
✔ Search students by name or email  
✔ Modern input validation

📦 **API Integration**  
✔ Connects with Spring Boot backend APIs  
✔ Uses Axios for HTTP requests  
✔ Handles errors gracefully

🎨 **Frontend Tech Stack**  
✔ React with TypeScript  
✔ Vite for fast development  
✔ Tailwind CSS for styling  
✔ React Router for client side routing  
✔ Functional components with hooks

---

## 🚀 Live Demo

**Coming soon!** *(You can add your hosted deployment link here)*

---

## 🧱 Folder Structure

student-management-frontend/
├── public/
├── src/
│   ├── api/
│   │   └── api.ts                # Axios base configuration
│   │
│   ├── components/               # Reusable UI components
│   │
│   ├── pages/
│   │   ├── Dashboard.tsx         # Dashboard page
│   │   ├── Login.tsx             # Login page
│   │   └── Students.tsx          # Students CRUD page
│   │
│   ├── services/
│   │   ├── authservice.ts        # Auth HTTP calls
│   │   └── studentsService.ts    # Student HTTP calls
│   │
│   ├── types/
│   │   ├── User.ts               # User interface
│   │   └── Student.ts            # Student interface
│   │
│   ├── App.tsx                   # Application routes
│   └── main.tsx                  # Vite entry
├── tailwind.config.js
├── vite.config.ts
└── package.json

---

## 🧠 Core Concepts

**Axios API Service**  
Centralized HTTP client (`api.ts`) that points to backend base URL (`http://localhost:8080/api/v1`). Used by all services.

**Auth Service**  
Handles `loginUser()` and `register()` requests to backend.

**Students Service**  
Handles:
- `getStudents()`
- `createStudent()`
- `updateStudent()`
- `deleteStudent()`

**React Router**  
Client‑side navigation between:
- Login
- Dashboard
- Students page

**State Management**  
Local state using React Hooks (`useState`, `useEffect`) and controlled form inputs.

---

## 📦 Installation & Setup

### Prerequisites

Make sure you have the following installed:

✔ Node.js (v14+)  
✔ npm / yarn

---

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/smadhuranga/student-management-frontend.git

	2.	Go into the project directory

cd student-management-frontend


	3.	Install dependencies

npm install
# or
yarn


	4.	Run the development server

npm run dev


	5.	Open in Browser

http://localhost:5173



⸻

🔗 Connect to Backend

This frontend expects the backend API at:

http://localhost:8080/api/v1

Make sure your backend service (Spring Boot) is running and accessible.

⸻

🧪 Usage

Login

✔ Enter your registered username and password
✔ On success → redirect to /dashboard

Students Management

✔ See list of student records
✔ Filter by search box
✔ Add → Edit → Delete operations with confirmation

⸻

⚙ Scripts

Command	Description
npm run dev	Start development server
npm run build	Build production optimized app
npm run preview	Preview production build


⸻

📌 What You’ll Learn

By exploring this frontend project you will learn:

✔ How React + Vite works together
✔ TypeScript interfaces for typing
✔ Axios HTTP calls with backend
✔ React Router navigation
✔ Form handling and validation
✔ Component structure planning
✔ Basic authentication flow

⸻

🤝 Contributing

Contributions are always welcome!
If you have ideas for improving features, UI, performance, or bug fixes — feel free to submit a pull request.

Steps:
1️⃣ Fork the Repo
2️⃣ Create your feature branch
3️⃣ Commit your changes
4️⃣ Push to branch
5️⃣ Open a Pull Request

⸻

📄 License

Distributed under the MIT License.
See LICENSE for more information.

⸻

👤 Contact

Supun Madhuranga
📧 Email: your_email@example.com
🔗 GitHub: https://github.com/smadhuranga

⸻

🎉 Thank you for exploring the Student Management Frontend! Build, Learn, and Share.  ￼