# 🍽️ ServeAI – AI Powered Recipe Platform

> Transform your ingredients into delicious recipes using Artificial Intelligence.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript)
![Gemini AI](https://img.shields.io/badge/Google-Gemini_AI-orange?style=for-the-badge&logo=google)
![Clerk](https://img.shields.io/badge/Authentication-Clerk-purple?style=for-the-badge)
![MySQL](https://img.shields.io/badge/Database-MySQL-blue?style=for-the-badge&logo=mysql)

---

## 📖 Overview

ServeAI is an AI-powered recipe generation platform that helps users create personalized recipes from available ingredients. Users can manage their pantry, scan ingredients, browse recipe collections, save favorites, and generate recipes instantly using Google's Gemini AI.

The project is built using **Next.js**, **TypeScript**, **MySQL**, **Clerk Authentication**, and **Google Gemini AI** with a modern, responsive UI.

---

## ✨ Features

- 🤖 AI Recipe Generation using Google Gemini
- 🥗 Pantry Management
- 📷 Ingredient Scanner
- 📚 Recipe Library
- ❤️ Save Favorite Recipes
- 🕒 Recipe History
- 🔐 Secure Authentication with Clerk
- ⚡ Fast and Responsive UI
- 🌙 Modern Dashboard Design
- 📱 Mobile Friendly

---

# 🛠 Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Axios
- Clerk Authentication

### Backend

- Next.js API Routes
- TypeScript
- MySQL
- Gemini AI API
- Zod Validation

---

# 📂 Project Structure

```
ServeAI
│
├── frontend
│   ├── app
│   ├── components
│   ├── services
│   └── public
│
├── backend
│   ├── app/api
│   ├── services
│   ├── lib
│   ├── data
│   └── scripts
│
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/your-username/serve-ai.git
cd serve-ai
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Runs on

```
http://localhost:3000
```

---

## Backend Setup

```bash
cd backend

npm install

npm run dev
```

Runs on

```
http://localhost:3001
```

---

# 🔑 Environment Variables

### Frontend (.env.local)

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=

CLERK_SECRET_KEY=

NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

### Backend (.env)

```env
DATABASE_URL=

MYSQL_HOST=

MYSQL_PORT=

MYSQL_USER=

MYSQL_PASSWORD=

MYSQL_DATABASE=

GEMINI_API_KEY=

CLERK_SECRET_KEY=
```

---

# 🤖 AI Features

ServeAI uses Google's **Gemini AI** to:

- Generate recipes
- Suggest ingredients
- Create cooking instructions
- Estimate cooking time
- Suggest nutritional information

---

# 📚 Main Modules

- Authentication
- Dashboard
- Pantry Management
- Recipe Generation
- Recipe Library
- Saved Recipes
- History
- Settings

---

# 📈 Future Improvements

- Voice-based recipe generation
- OCR ingredient detection
- Barcode scanner
- Nutrition tracking
- Meal planning
- Shopping list generator
- AI image generation for recipes
- Multi-language support

---

# 👨‍💻 Author

**Sumit Kumar Singh**

AI Developer • Full Stack Developer • Software Engineer

---

# ⭐ If you like this project

Give this repository a ⭐ on GitHub.

It helps support future development.

---

## License

This project is licensed under the MIT License.
