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

![image](https://github.com/user-attachments/assets/043cd147-e7f2-4a42-bb88-ede6400d3ed4)
![image](https://github.com/user-attachments/assets/1a983951-9368-41d0-b213-b59352de3c70)

![image](https://github.com/user-attachments/assets/e2510da5-cb01-4b98-9c0b-bb7a8ad981fe)

![image](https://github.com/user-attachments/assets/4c67f028-b3fe-4536-99ab-d3551ac17a9f)
![image](https://github.com/user-attachments/assets/ef1292c8-2d48-4f7c-af2a-ea933b10f897)

---

Made with 💻 + ☕ by [Ramya](https://github.com/Ramya1446)
