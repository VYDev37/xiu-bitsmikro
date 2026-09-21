# Xiu (宿) Web Application

This directory contains the core Next.js application for Xiu (宿), the AI-powered Chinese Metaphysics Engine.

## Features Overview

- **Interactive Metaphysics Dashboard**: Calculate BaZi pillars, read elemental balances, and explore zodiac signs via 3D flipping cards.
- **AI-Powered Insights**: Receive daily luck readings, check partner compatibility scores, and view personalized monthly calendars.
- **Persistent Chat Interface**: Ask esoteric questions to the Xiu (宿) AI astrologer and review your consultation history.
- **Cosmic Zodiac Matrix**: Uncover elemental energy, character traits, and emotions for the 12 Chinese zodiacs using Mahjong-style tiles.
- **Personal Artifacts**: Store daily notes and track life insights like romance and career on interactive cards.
- **Interactive Celestial UI**: Navigate a vivid 3D starry sky featuring the 28 Xiu Mansions (二十八宿).

## Tech Stack

- **Core**: Next.js (App Router), React
- **Styling**: Tailwind CSS, GSAP, Framer Motion, Three.js
- **Data & State**: Zustand, Zod, React Hook Form, Axios
- **Backend & Database**: Next.js API Routes, Drizzle ORM, PostgreSQL (postgres.js), Iron-Session

## Setup Instructions

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Configure Environment
Create a `.env.local` file containing your database connection string (`DATABASE_URL`), AI provider keys, and session secrets.
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/projek_trio_darksistem
SECRET_COOKIE_PASSWORD=complex_password_at_least_32_characters_long_for_iron_session
GEMINI_API_KEY=your_gemini_api_key
```

### 3. Initialize Database
Apply the database schema to your PostgreSQL database:
```bash
pnpm db:push
```
Or apply migration files:
```bash
pnpm db:migrate
```

### 4. Start Development Server
```bash
pnpm dev
```
The application will be available at [http://localhost:3000](http://localhost:3000).
