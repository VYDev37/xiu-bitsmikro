# BaZi AI Viewer - Web Application 🌊

This is the Next.js frontend and backend application for the **BaZi AI Metaphysics Engine**.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Database Setup:**
   Ensure you have pushed the Drizzle schema to your local SQLite database:
   ```bash
   pnpm db:push
   ```

3. **Run the development server:**
   ```bash
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🌊 Aesthetic & Design System

This application utilizes a premium **Abyssal (Deep Ocean)** theme, designed to feel like a high-end cinematic Vanguard system.
- **Colors**: Deep Ocean Blue (`#060e1a`), Surface Blue (`#0b1a2e`), Teal (`#14b8a6`), and Accent Cyan (`#0ea5e9`).
- **Typography**: `Playfair Display` for elegant, cinematic headings, and `Outfit` for clean, readable body text.
- **3D Components**: Custom `OceanCanvas` utilizes raw WebGL shaders (via Three.js) for a dynamic, moving ocean background, complemented by floating cursor particles.

## ⚙️ Architecture

- **Framework**: Next.js App Router (`/app`).
- **Auth**: `iron-session` handles encrypted, stateless cookie sessions without relying on third-party services.
- **Database**: `drizzle-orm` connecting to a local `sqlite` database (`db/index.ts`).
- **State**: `zustand` is used for global client-side state management.
- **Validation**: `zod` enforces strict runtime validation across all API routes and form inputs.

## 🤖 AI Skills Configuration

This project is configured with several AI agent skills inside `../.agents/skills` to maintain high code quality and design consistency:
- `ui-ux-pro-max` & `taste-skill` (High-end aesthetic guidance)
- `react-nextjs-development` & `react-nextjs-patterns` (React best practices)
- `zod-validation-expert` (Schema and API validation)
- `zustand-store-ts` (State management patterns)
