# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# 🎯 Quiz App

Quiz App is a clean, responsive quiz application built with **React**, **Vite**, and **Tailwind CSS**.  
It lets you test your knowledge with fun quizzes, track your performance, and save your high scores locally.

---

## ✨ Features

- ✅ Fetches questions from the **Open Trivia DB API**
- 📦 Offline fallback: uses local JSON if API is unavailable
- ⏱️ 30-second timer per question with auto-lock
- 📊 Progress bar with smooth animation
- 🎯 Choose difficulty (Easy, Medium, Hard)
- ✅ Tracks correct and incorrect answers
- 🏆 Saves top 10 high scores in `localStorage`
- 📱 Responsive UI (mobile-first) with dark mode support

---

## 🚀 How It Works

### 1. Home Page
- Configure quiz settings (source, number of questions, difficulty)
- Start the quiz or try a quick demo
- View saved Top Scores

### 2. Quiz Page
- Answer one question at a time
- Track progress with smooth animations
- Timer auto-locks each question after 30 seconds
- Navigate to next or previous question

### 3. Result Page
- View your final score
- See correct and incorrect answers
- Save score to `localStorage` for future reference

---

## 🛠️ Tech Stack
- **React** – Frontend library
- **Vite** – Development build tool
- **Tailwind CSS** – Styling
- **Open Trivia DB API** – Quiz data
- **LocalStorage** – Save top scores locally

---

