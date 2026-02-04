# 🚀 Stellix — AI-Powered Image Sharing Platform

Stellix is a **Pinterest-inspired image sharing platform** enhanced with **AI image generation, computer vision, smart search, and social features**.

Users can create, discover, save, and organize visual content into boards, while the system intelligently understands images using AI.

> Built with **MERN Stack**, **Cloudinary**, **TensorFlow.js**, and **modern frontend UX patterns**.
> 

---

## ✨ Features

### 📌 Core Features

- Upload and share image pins
- Organize pins into boards (collections)
- Like, save, and discover pins
- Follow / unfollow users
- Personalized feeds (following-based)

### 🤖 AI Features

- **AI Image Generation** from text prompts
- **Automatic image understanding**
    - Object detection (COCO-SSD)
    - Dominant color extraction
    - OCR-ready pipeline
- Smart tag generation using AI + text analysis

### 🔍 Search & Discovery

- Full-text search across:
    - Titles
    - Descriptions
    - Tags
    - OCR text
- Two search modes:
    - **Strict** (all keywords must match)
    - **Loose** (any keyword matches)
- Related pins recommendation engine

### ⚡ Performance & UX

- Optimistic UI updates (likes)
- IntersectionObserver-based prefetching
- Pin preview caching
- Masonry grid layout
- Mobile + Desktop responsive UI
- Animated route transitions

---

## 🏗️ Tech Stack

### Frontend

- React
- React Router
- Context API
- GSAP & Framer Motion
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication (HTTP-only cookies)
- Multer (file uploads)

### AI / Media

- TensorFlow.js
- COCO-SSD (object detection)
- get-image-colors
- Nearest-color matching
- Pollinations AI (image generation)
- Cloudinary (image hosting + CDN)

---

## 🧠 System Architecture Overview

```
Client(React)
   │
   │HTTPS+Cookies(JWT)
   ▼
APIServer(Express)
   │
   ├──Auth/Users
   ├──Pins(CRUD,Search,Likes)
   ├──Boards(Collections)
   ├──AIImageGeneration
   │
   ▼
MongoDB(Atlas)
   │
   ▼
CloudinaryCDN
   │
   ▼
AILayer(TFJS+ImageAnalysis)

```

---

## 🔌 API Overview

### 🔐 Authentication

```
POST   /api/user/register
POST   /api/user/login
GET    /api/user/logout
GET    /api/user/me
POST   /api/user/follow/:id

```

### 📌 Pins

```
POST   /api/pins/createpin
GET    /api/pins/all
GET    /api/pins/single/:id
POST   /api/pins/search
PUT    /api/pins/like/:id
DELETE /api/pins/:id

```

### 📂 Boards

```
POST   /api/boards/newboard
GET    /api/boards/userboards
POST   /api/boards/newpin/:id
POST   /api/boards/deletepins
POST   /api/boards/relatedpinsinboard

```

### 🤖 AI

```
POST   /api/ai/generate-image
POST   /api/ai/savepin

```

---

## 🗄️ Database Schema

### 👤 User

```jsx
{
name:String,
email:String,
password:String,
followers: [UserId],
following: [UserId],
image: { id, url }
}

```

### 📌 Pin

```jsx
{
title:String,
description:String,
owner:UserId,
image: { id, url },

tags: [String],
objects: [String],
colors: [String],
ocrText:String,

likes: [UserId],
boards: [BoardId]
}

```

### 📂 Board

```jsx
{
name:String,
owner:UserId,
pins: [PinId]
}

```

### 🔍 Indexes

- Full-text index on:
    - title
    - description
    - tags
    - ocrText

---

## ⚙️ Environment Variables

Create a `.env` file in your backend directory:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SEC=your_jwt_secret

CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx

MAIL_USER=your_email
APP_PASSWORD=your_email_app_password

HF_API_KEY=your_huggingface_key

```

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
gitclone https://github.com/yourusername/stellix.git
cd stellix

```

### 2️⃣ Install dependencies

### Backend

```bash
cd Backend
npm install

```

### Frontend

```bash
cd Frontend
npm install

```

### 3️⃣ Run the app

### Backend

```bash
npm run dev

```

### Frontend

```bash
npm run dev

```

---

## ⚡ Performance Optimizations

- Cached AI models (loaded once)
- Async image analysis after pin creation
- Client-side pin caching
- Prefetching on scroll
- Cloudinary CDN for all images

---

## 🚨 Known Bottlenecks & Tradeoffs

| Area | Tradeoff |
| --- | --- |
| Regex search | Flexible but CPU heavy |
| Likes array | Simple, but grows large |
| MongoDB | Easy scaling, weak joins |
| Local AI inference | Free, CPU intensive |
| JWT auth | Stateless, harder revocation |

---

## 🔮 Future Improvements

- Vector search using embeddings
- Redis caching (trending, feeds)
- Separate AI worker service
- Notifications system
- Realtime updates (WebSockets)
- Recommendation ranking engine

---

## 📌 Project Status

✅ Actively developed

✅ Portfolio-ready

✅ Scalable architecture

✅ Interview-ready system design
