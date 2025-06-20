# 📧 Automatic Mail & Report Generator

A web app that lets you generate professional emails and reports from bullet points using Generative AI. Built with React, Flask, and Together.ai.

## 🚀 Live Demo

👉 [Try it Live on Vercel](https://automatic-mail-report-generator.vercel.app)

## 💡 Features

- Choose between Email or Report generation
- Select tone: professional, formal, casual, etc.
- Add recipient name (for emails)
- Paste bullet points and generate content instantly
- Copy to clipboard or export as PDF (for reports)

## 🛠️ Tech Stack

- **Frontend**: React + TailwindCSS
- **Backend**: Flask + Together.ai API
- **LLM**: meta-llama/70B via Together API
- **Deployment**: Vercel (Frontend), Render (Backend)

## 📂 Project Structure

ai-content/
├── bullet-burst-craft/ # Frontend (React)
└── backend/ # Backend (Flask)


## ✨ How It Works

The frontend sends bullet points + tone + type (email/report) → Flask backend → LLM via Together API → returns generated content.

---

Made with 💻 + ☕ by [Ramya](https://github.com/Ramya1446)
