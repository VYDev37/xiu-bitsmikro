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

### DAY 2 - 07/08/2026
Ringkasan percakapan: Pembuatan prototipe 3D `data/index2.html` berkonsep celestial (langit malam berbintang, zodiak, hujan meteor), integrasi metafisika Tiongkok (BaZi 4 Pillars, Wuxing 5 Elements, 28 Xiu Mansions), penyesuaian estetika midnight mountain sky, perbaikan layout tumpang tindih, serta penambahan smooth scrolling.
- Prompt: Buat website bentuk HTML file only, tema langit malam berbintang dengan tema zodiak, hujan meteor ringan, HD 4K modern, aesthetic, dan komponen 3D (`data/index2.html`).
Response: Membuat prototipe `data/index2.html` berbasis Three.js dengan latar belakang 3D starry sky, garis konstelasi zodiak, animasi hujan meteor, bento grid glassmorphism, dan tipografi Cinzel.
- Prompt: Tambahkan night sky yang jernih dan starry ke `data/index2.html` tanpa menghilangkan zodiak (untuk tema BaZi, Wuxing, Xiu).
Response: Memperbarui `index2.html` dengan 7,500+ bintang 3D, mengurangi kerapatan *fog* agar jernih, serta mengintegrasikan modul BaZi 4 Pillars, Wuxing 5 Elements, dan 28 Xiu Mansions (二十八宿).
- Prompt: Ubah night sky agar tidak full hitam, tapi biru kehitaman seperti langit malam jernih di pegunungan.
Response: Mengubah warna latar belakang menjadi *radial gradient midnight navy blue* (`#0f1c3f` ke `#081026`) dan menyesuaikan warna *fog* Three.js agar menyatu secara konsisten.
- Prompt: Perbaiki elemen hero section di `data/index2.html` yang tumpang tindih dengan navbar.
Response: Memberikan efek *glass backdrop* blur pada Navbar serta menambahkan *top padding* (`pt-32`) dan *margin* pada Hero section agar posisi badge berada di bawah Navbar.
- Prompt: Adjust `data/index2.html` agar smooth-scroll ketika navbar diklik.
Response: Menambahkan `scroll-behavior: smooth` dan `scroll-padding-top: 5rem` pada CSS `html` untuk pergerakan navigasi menu yang mulus dan presisi.
- Prompt: Ganti layout dan konsep desain aplikasi Next.js dari tema lautan (Ocean) ke tema langit malam berbintang (Celestial) sesuai referensi `data/index2.html`.
Response: Melakukan perencanaan dan eksekusi integrasi komponen `StarrySkyCanvas` berbasis Three.js ke dalam Next.js, serta memperbarui skema warna, palet, dan font di `globals.css` ke tema Celestial.
- Prompt: Bangun halaman antarmuka `chat` AI (sebagai BaZi Astrologer) lengkap dengan sidebar histori, input streaming Gemini API, dan sistem penyimpanan database menggunakan SQLite & Drizzle.
Response: Membuat arsitektur fitur *chat* yang fungsional (`app/chat/page.tsx` dan `api/chat/route.ts`), mendesain UI interaktif bergaya *glassmorphism* malam hari, serta menghubungkannya dengan database lokal untuk menyimpan sesi histori percakapan pengguna.
- Prompt: Buat fitur "Luck" harian yang menggunakan Gemini API untuk menghitung dan menampilkan persentase keberuntungan Lima Elemen (Kayu, Api, Tanah, Logam, Air) beserta pesan nasihat spiritual.
Response: Membangun *endpoint* khusus (`api/luck/route.ts`) yang memaksa Gemini mengembalikan struktur JSON, lalu membuat komponen antarmuka `LuckDisplay.tsx` dengan *progress bar* melingkar estetik dan pewarnaan elemen semantik Tiongkok (Wuxing).
- Prompt: Review seluruh codebase dan terapkan konsep Separation of Concerns (SoC) untuk meminimalisir penggunaan Client Component yang berlebihan tanpa mengubah layout desain.
Response: Melakukan refactoring menyeluruh dengan mengubah semua halaman utama (Home, Login, Register, Profile) menjadi Server Component. Mengisolasi interaktivitas (form, efek spotlight, animasi GSAP, dan canvas Three.js) ke dalam Client Component yang lebih spesifik (`SpotlightCard`, `HomeAnimations`, `DynamicStarrySky`), serta memastikan aplikasi berjalan sukses tanpa *build error* (Turbopack).
- Prompt: Buat perencanaan (*plan*) untuk *axios interceptor* dan refactoring komponen "raksasa" yang menumpuk tanggung jawab (kurangnya Separation of Concerns), serta ubah metode pemanggilan `fetch()` menggunakan klien axios.
Response: Mengimplementasikan klien API Axios terpusat di `lib/api.ts` dengan *error interceptor*. Mengekstraksi logika state/fetch komponen `LuckDisplay.tsx` ke dalam *custom hook* `useLuckData.ts` dan memecah elemen UI menjadi sub-komponen terpisah, serta melakukan migrasi seluruh pemanggilan `fetch()` di berbagai komponen form dan layout agar konsisten menggunakan metode Axios.
- Prompt: Satukan sidebar chat dan container chat agar tidak ada gap, serta atur agar chat otomatis load 5 pesan terakhir saja dan scroll ke atas untuk baca lebih banyak tanpa mengubah layout fixed.
Response: Memperbarui UI `ChatClient.tsx` untuk menyatukan sidebar dan area chat, serta mengimplementasikan logika *infinite scroll up* yang memuat 5 pesan awal, dipadukan dengan desain *fixed layout* bergaya celestial.
- Prompt: Refactor `ChatClient.tsx` menggunakan konsep SoC berdasarkan hooks, lib, dan komponen sesuai pedoman, serta pastikan tidak mencatat chat kosong (saat inisiasi 'chat baru') ke database. Minta AI bantu generate title untuk chat baru.
Response: Memisahkan logika pengelolaan *state* dan *API consumption* ke dalam *custom hooks* (menggunakan arsitektur Zustand di `useChatStore.ts`), memecah elemen antarmuka, menambahkan pencegahan pencatatan sesi kosong, serta mengimplementasikan fitur *AI-generated title* secara otomatis setelah pesan pertama pengguna terkirim.
- Prompt: Sesuaikan seluruh warna layout (landing page, chat, auth) agar konsisten dengan palet biru kehitaman langit malam (tanpa efek warna *purple/indigo* AI generik) dan aplikasikan pada `DynamicStarrySky.tsx`.
Response: Melakukan sinkronisasi estetika pada seluruh *codebase*, menyelaraskan palet warna komponen *glassmorphism*, bayangan, pendaran cahaya (glow), dan warna *fog* kanvas 3D menjadi *midnight navy* dan *sky blue*, sambil mengamankan warna semantik elemen metafisika Tiongkok (seperti merah untuk Api, hijau untuk Kayu).
- Prompt: Kenapa API luck kadang error JSON token? Perbaiki safety berdasarkan pedoman `backend-patterns`.
Response: Mendiagnosis dan menyelesaikan kegagalan *parsing* balasan dari AI Gemini dengan membangun pola `fetchWithRetry` tangguh di `api/luck/route.ts`, memangkas sisa *markdown* yang menempel (regex), dan menurunkan parameter suhu *temperature* menjadi 0.3 demi konsistensi data JSON.
- Prompt: Tambahkan objek grafis pengisi kekosongan di landing page, perbaiki animasi yang melompat di `BentoMicroInteractions.tsx`.
Response: Mendesain dan menginjeksi komponen murni SVG (`LandingGraphics.tsx`) ke berbagai area bento grid `page.tsx` (Hero Luopan, Bagua 3D, Wuxing Watermarks, dan Orbit Celestial). Serta memperbaiki animasi *seamless marquee loop* (mengubah rotasi translasi X dari -100% ke -50%) agar perputarannya sempurna.
- Prompt: Desain rasi bintang warnanya bertabrakan (*nabrak*) dan grafisnya tidak lengkap.
Response: Merancang ulang 28 Konstelasi Xiu secara historis (tepat 7 node bintang per zodiak dengan bentuk anatomi Naga, Burung, Macan, dan Kura-kura), menyematkan animasi denyut (*pulse*) pada bintang utama, serta mengubah warna rasi menjadi *sky-300* agar membaur indah dengan latar langit malam.
Response: Melakukan penyesuaian (*fine-tuning*) tingkat *opacity* pada seluruh komponen SVG (Luopan, Bagua, Wuxing, Orbit, dan Constellations) dari angka ekstrem 3%-8% ditingkatkan menjadi 20%-30% agar grafis terlihat tegas namun tetap tidak menghalangi keterbacaan teks (*z-index*).
- Prompt: tolong perbaiki ini dibagian animasi nya karena saat di refresh dia seperti tenggelam dan hilang 
Response: Memperbaiki animasi masuk (*entrance animation*) di `HomeAnimations.tsx` yang bermasalah saat halaman di-refresh (elemen tertahan di `opacity: 0`). Mengganti `gsap.from()` dengan `gsap.fromTo()` dan menambahkan perintah `ScrollTrigger.refresh()` untuk memastikan posisi *scroll* diproses ulang, sehingga grafik muncul dengan semestinya.
- Prompt: Buatkan sebuah halaman web interaktif yang menampilkan 12 shio Tiongkok dalam lingkaran zodiak dengan tema Wuxing (Lima Elemen)...
Response: Membangun komponen interaktif baru menggunakan `framer-motion` (awalnya `ZodiacCircle.tsx`) yang merender 12 zodiak. Mengimplementasikan efek partikel animasi khusus sesuai elemen (Daun untuk Kayu, Pijar untuk Api, Riak untuk Air, dll.) lengkap dengan pancaran warna (*glow*) elemen saat interaksi *hover*.
- Prompt: tolong itu ada kesalahn di perbaiki 12 shionya ada gambar dong dan animasi sesuai tema backgroundnya
Response: Menginstal pustaka ikon `react-icons` untuk menggunakan set ikon *Game Icons (RPG style)* beresolusi tinggi guna menggantikan teks karakter, lantaran limitasi kuota pembuatan gambar AI. Ikon ini kemudian diberi warna pancaran elemen agar menyatu pekat dengan atmosfer estetik *glassmorphism* malam di *landing page*.
- Prompt: gini aja buat 12 shio gambar shio saat satu shio di click dia akan seperti flip card depan gambar saat flip ada keterangan emosi dan sifat dari shio tersebut pake kayak bentukan mahyong dibagi menjadi 6 colloumn
Response: Merombak sepenuhnya desain *Cosmic Wheel* melingkar menjadi rancangan matriks grid 6 kolom (`ZodiacGrid.tsx`). Mengubah wujud antarmuka menjadi kartu balok estetik *(Mahjong Tiles)* yang didukung animasi transisi 3D Flip 180 derajat yang mulus 60fps saat di-klik. Sisi depan menampilkan grafis shio, sementara sisi belakang kartu diintegrasikan dengan konteks data Bazi/Wuxing akurat yang merinci Energi, Karakter Sifat, dan Emosi Inti tiap zodiak.