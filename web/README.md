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
- **Backend & Database**: Next.js API Routes, Drizzle ORM, SQLite, Iron-Session

## Setup Instructions

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Configure Environment
Create a `.env.local` file containing your AI provider keys and session secrets.

### 3. Initialize Database
Apply the database schema to your local SQLite instance:
```bash
pnpm db:push
```

### 4. Start Development Server
```bash
pnpm dev
```
The application will be available at [http://localhost:3000](http://localhost:3000).
