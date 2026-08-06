## INFO DASAR
IDE: Google Antigravity IDE
Model: Gemini 3.1 Pro

## REKAPAN PROMPT HARIAN
### DAY 1 - 06/08/2026
Ringkasan percakapan: Perencanaan awal aplikasi BaZi AI Viewer, setup arsitektur lokal (Drizzle/SQLite/iron-session), pengembangan UI/UX dengan tema Oceanic (termasuk Three.js dan partikel interaktif), serta instalasi agent skills (Zod, Zustand, React/Next.js, UI/UX).
- Prompt: Buat website bentuk HTML file only, tema laut HD 4K modern, aesthetic, dengan komponen 3D (menggunakan skill ui-ux-pro-max & taste-skill).
Response: Membuat prototipe `index.html` dengan tema laut (Abyssal), animasi canvas 3D (Three.js) untuk ombak dan globe, serta partikel interaktif.
- Prompt: Buat efek 3D lebih terlihat jelas dan estetik.
Response: Memperbarui shader Three.js dan pencahayaan agar efek lautan lebih jernih, dramatis, dan realistis.
Response: Melakukan perombakan besar (cinematic dark mode, tipografi elegan, efek liquid glass) melalui perencanaan eksekusi terstruktur.
- Prompt: Install skills untuk UI/UX (ui-ux-pro-max, taste-skill), validasi (zod-validation-expert), state management (zustand-store-ts), serta react/nextjs best practices ke folder `.agents/skills`.
Response: Menginstal semua skill yang diminta (via `git clone` dan `pnpm dlx skills add`) ke dalam direktori project untuk memandu agent dengan standar arsitektur dan desain estetika tingkat tinggi.
- Prompt: Buat perencanaan (PRD) untuk aplikasi BaZi viewer dengan AI reading, mengambil data tanggal dan jam lahir, serta menggunakan referensi tema dari index.html. Target user meliputi kalangan muda dan profesional.
Response: Membuat dokumen perencanaan awal dan menentukan struktur aplikasi berbasis Next.js App Router.
- Prompt: Jangan gunakan Supabase, gunakan database lokal (Drizzle + SQLite), iron-session untuk autentikasi, serta buat schema (Zod) dan state (Zustand) terlebih dahulu.
Response: Melakukan setup Drizzle ORM dengan SQLite, konfigurasi autentikasi iron-session pada API endpoint, serta membuat Zod schemas dan Zustand stores untuk user.
- Prompt: Mulai buat halaman register, login, dan profile. Pastikan UI agar sesuai dengan referensi desain oceanic (data/index.html) yang konsisten dan mobile-friendly.
Response: Membuat halaman autentikasi dan profil, lalu melakukan perombakan total pada globals.css, komponen Navbar, serta halaman Home menggunakan efek glassmorphism dan partikel CSS.
- Prompt: Tambahkan elemen Three.js untuk efek visual maksimal di halaman tertentu.
Response: Menginstal Three.js dan membuat komponen shader 3D (OceanCanvas) pada background halaman utama (Home) dengan manajemen performa (next/dynamic & reduced-motion).
- Prompt: Tambahkan partikel air yang ringan mengikuti arah kursor.
Response: Memperbarui Particles.tsx dengan menambahkan layer canvas khusus untuk efek gelembung air yang mengikuti pergerakan kursor pengguna.
- Prompt: Update `README.md` dan `web/README.md` dengan deskripsi aplikasi.
Response: Memperbarui dokumentasi dengan menjelaskan tech stack (Next.js, Drizzle, Zustand, Zod), fitur utama Metaphysics Engine, tema Oceanic/Abyssal, dan daftar AI skills.
- Prompt: Rancang arsitektur folder frontend berdasarkan `frontend-patterns` dan sesuaikan struktur saat ini.
Response: Membuat `implementation_plan.md` untuk struktur folder yang scalable (ui, forms, animations, layout, features, hooks, types), dan memindahkan komponen yang ada (`Navbar`, `OceanCanvas`, `Particles`) ke folder baru beserta update path *import*-nya.