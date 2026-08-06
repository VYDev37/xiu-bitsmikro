# BaZi AI Viewer & Metaphysics Engine 🌊

A modern, high-end web application that serves as a **Chinese Metaphysics Analysis Engine** (Zhou, BaZi, & Wuxing). This project combines ancient esoteric knowledge with a cinematic, data-driven "Abyssal/Oceanic" aesthetic and empirical physics-based logic reasoning.

## 🎯 Core Features

- **BaZi Pillar Extraction**: Automatically converts birth dates and times into precise 4-Pillar BaZi structures (calibrated by Winter Solstice/Dong Zhi).
- **Matchmaking (Compatibility)**: Analyzes relationship dynamics based on Wuxing elemental interactions (Generative/Destructive cycles, Clashes, Harms).
- **Daily Luck & Energy Prediction**: Evaluates daily elemental energies against user profiles to predict luck scores and potential Wuxing clashes.
- **Physics-Based Reasoning**: Explains esoteric metaphysical interactions using scientific analogies (e.g., Thermal Shock, Kinetic Friction, Inersia).
- **Cinematic "Abyssal" UI/UX**: Premium aesthetic featuring Three.js 3D ocean shaders, glassmorphism, interactive particles, and a dark "Vanguard" system motif.

## 🛠 Tech Stack

- **Frontend Framework**: Next.js v16 (App Router), React
- **Styling & UI**: Tailwind CSS v4, Glassmorphism patterns
- **3D & Animations**: Three.js, GSAP (ScrollTrigger)
- **State Management**: Zustand (with TypeScript)
- **Validation**: Zod (Type-safe schema validation)
- **Backend & Auth**: Next.js API Routes, Iron-Session (Secure cookie-based auth)
- **Database**: SQLite with Drizzle ORM

## 📁 Project Structure

- `/web` - The main Next.js application (Frontend & API). See [web/README.md](./web/README.md) for more details.
- `/data` - Prototyping, prompts, and reference materials.
- `/.agents/skills` - Installed AI Agent skills governing architecture and design standards.

## 🚀 Getting Started

Navigate to the `web` directory to start the application:

```bash
cd web
pnpm install
pnpm dev
```
