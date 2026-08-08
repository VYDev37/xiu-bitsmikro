# Xiu (宿) Web Application

This directory contains the core Next.js application for Xiu (宿), the AI-powered Chinese Metaphysics Engine.

## Features Overview

- **Interactive Metaphysics Dashboard**: Visualizes BaZi pillars, elemental balances, and zodiac signs using 3D flipping cards and interactive canvases.
- **AI-Powered Insights**: Integrates with LLMs to generate daily luck readings, partner compatibility scores, and personalized monthly calendars.
- **Persistent Chat Interface**: Connects users to the Xiu (宿) AI for esoteric consultations, with conversations securely stored in a local SQLite database.

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
