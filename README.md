# Xiu (宿): Celestial Metaphysics Engine

Xiu (宿) is an AI-powered Chinese Metaphysics Engine. It calculates and interprets BaZi (Four Pillars of Destiny), Wuxing (Five Elements), and Zodiac alignments using a polished, interactive celestial interface.

## Features

- **BaZi Destiny Chart**: Calculates the Four Pillars based on birth data and provides AI-driven personality insights.
- **Daily Luck & Metaphysics Calendar**: Analyzes daily elemental energies to provide personalized luck scores and monthly favorable/unfavorable dates.
- **Partner Compatibility**: Evaluates relationship dynamics based on elemental interactions and clashes.
- **Xiu (宿) AI Astrologer**: Features an integrated chat system to ask deep, esoteric questions regarding destiny and elements.
- **Interactive Celestial UI**: Utilizes 3D starry sky shaders, interactive zodiac grids, and glassmorphism for a premium desktop and mobile experience.

## Tech Stack

- **Frontend**: Next.js (App Router), React, Tailwind CSS
- **3D & Animation**: Three.js, GSAP, Framer Motion
- **State Management**: Zustand
- **Validation**: Zod, React Hook Form
- **Backend**: Next.js API Routes, Iron-Session
- **Database**: SQLite, Drizzle ORM
- **AI Integration**: Google Gemini API

## Setup and Installation

### 1. Prerequisites
Ensure Node.js and `pnpm` are installed on your system.

### 2. Installation
Navigate to the web directory and install the required dependencies:
```bash
cd web
pnpm install
```

### 3. Environment Variables
Create a `.env.local` file in the `web` directory. Supply the required environment variables, including your Gemini API key and Iron-Session password.

### 4. Database Setup
Push the Drizzle schema to initialize the local SQLite database:
```bash
pnpm db:push
```

### 5. Running the Application
Start the development server:
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.
