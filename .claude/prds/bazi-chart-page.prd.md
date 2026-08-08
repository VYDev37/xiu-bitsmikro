# BaZi Chart Page

## Problem
Orang awam dan enthusiast metafisika ringan kesulitan memahami BaZi karena tool yang ada saat ini terlalu teknikal, memiliki UI yang usang, dan output yang sulit dipahami atau dibagikan ke orang lain. Akibatnya, mereka lebih memilih menggunakan alat self-discovery yang lebih mudah diakses seperti MBTI atau Zodiak Barat, meskipun filosofi BaZi sebenarnya jauh lebih kaya.

## Evidence
- Perilaku orang sekitar: Sangat banyak yang membagikan hasil MBTI/Zodiak di sosmed, namun awam terhadap BaZi karena "barrier to entry" yang tinggi.
- Observasi pribadi: Kesulitan mengakses hasil BaZi yang *insightful* memaksa pembuatan prompt mandiri sebagai *workaround*.
- Data konten: Konten "baca karakter dari tanggal lahir/shio" mencapai jutaan penonton di TikTok/YouTube Indonesia, namun *traffic* tersebut tidak tersalurkan ke sebuah tool interaktif.

## Users
- **Primary**: Gen Z / mahasiswa Indonesia yang penasaran dengan *self-discovery* berbasis Chinese metaphysics, menginginkan hasil yang mudah dipahami, relevan, dan *shareable*.
- **Secondary**: Enthusiast metafisika ringan yang sudah familiar dengan BaZi tetapi frustrasi dengan tool yang rumit atau berbayar.
- **Not for**: Praktisi BaZi profesional yang membutuhkan fitur lanjutan seperti 10-year luck pillars atau komparasi kecocokan mendalam (pada iterasi ini).

## Hypothesis
Kita percaya bahwa menyediakan **kalkulasi BaZi otomatis dengan narasi AI yang mudah dipahami dan visual chart yang shareable** akan menyelesaikan masalah **barrier tinggi untuk memahami BaZi** untuk **Gen Z / mahasiswa Indonesia**. 
Kita tahu kita berhasil jika:
- Engagement: User menghabiskan lebih dari 2 menit di halaman chart.
- Funnel completion: User langsung berlanjut ke fitur Chat setelah membaca chart.
- Organic curiosity: Saat demo, minimal 2 dari 3 juri secara sukarela memasukkan tanggal lahir mereka sendiri.

## Success Metrics
| Metric | Target | How measured |
|---|---|---|
| Halaman Chart Engagement | > 2 menit | Analytics (Time on page) |
| Funnel ke Chat | > 30% dari view chart | Click-through rate ke '/chat' |
| Organic input saat demo | 2/3 juri | Observasi langsung |

## Scope
**MVP**
1. **4 Pillars Table**: Input tanggal, bulan, tahun, jam lahir -> Output pilar Tahun, Bulan, Hari, dan Jam beserta Elemen & Shio.
2. **Element Balance Visual**: Visualisasi proporsi 5 elemen (grafik bar/donut), dengan menonjolkan elemen dominan & yang kurang.
3. **AI Personality Summary**: Narasi 3-4 kalimat tentang kepribadian berdasarkan Day Master yang *relatable* dan tidak kaku.

**Out of scope**
- Compatibility checker (Matchmaking)
- 10-year luck pillars (Da Yun)
- Integrasi Feng Shui
- Akun pengguna / Save Chart
- Ekspor sebagai PNG / Share download (nice to have)
- Multi-bahasa (Hanya Bahasa Indonesia untuk MVP)
- Fortune cards per kategori (Career/Love/Wealth/Health)

## Delivery Milestones
| # | Milestone | Outcome | Status | Plan |
|---|---|---|---|---|
| 1 | Skema & API Endpoint | Zod schema untuk BAZI_CHART & endpoint AI selesai | pending | — |
| 2 | Komponen UI: 4 Pillars | Menampilkan data 4 pilar secara akurat & visual menarik | pending | — |
| 3 | Komponen UI: Element Balance | Menampilkan grafik 5 elemen secara visual (bar/donut) | pending | — |
| 4 | Komponen UI: Narasi AI | Menampilkan AI Personality Summary | pending | — |
| 5 | Halaman BaZi Calculator | Menyatukan Input Form & hasil (4 Pillars, Balance, Summary) | pending | — |

## Open Questions
- [ ] Konsistensi Kalkulasi AI: Apakah AI (Claude/Gemini) akan selalu menghasilkan pilar yang sama persis (deterministik) untuk input tanggal lahir yang sama? Perlu pengujian *edge cases*.
- [ ] Timezone Handling: Apakah input waktu dari user di Indonesia (WIB/WITA/WIT) perlu di-normalize ke UTC sebelum diproses AI?
- [ ] Render Aksara Han (Chinese): Apakah *font* saat ini mendukung karakter CJK dengan baik atau butuh *fallback font*?
- [ ] Information Density: Bagaimana cara menyajikan 16+ *data points* (4 pilar x 4 atribut) tanpa membuat user kewalahan?
- [ ] Disclaimer Keakuratan: Apakah perlu *disclaimer* untuk mencegah kritik dari praktisi tradisional terkait hasil kalkulasi AI?

## Risks
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Halusinasi kalkulasi 4 Pillars | Medium | High | Menggunakan prompt yang sangat terstruktur dan suhu (temperature) 0.0 pada API (atau serendah mungkin). |
| UI terlalu padat & membingungkan | Medium | Medium | Menerapkan *progressive disclosure* atau desain *card-based* untuk memecah informasi. |
| Masalah font CJK (kotak-kotak) | Low | Medium | Memastikan integrasi Google Fonts Noto Sans SC/TC di Root Layout. |

---
*Status: DRAFT — requirements only. Implementation planning pending via /plan.*
