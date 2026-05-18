# 🏃 RunSync — AI Running Coach

Interactive prototype aplikasi running coach untuk Gen Z & millennials Indonesia.

## 🚀 Cara Deploy ke Vercel (Pilih 1 Cara)

### ⭐ Cara 1: Drag & Drop ke Vercel Dashboard (PALING GAMPANG — 2 menit!)

1. Buka **https://vercel.com/new** (sign up dengan GitHub/Google kalau belum)
2. Klik **"Browse"** atau drag-drop folder `runsync/` ini
3. Klik **"Deploy"** — Vercel otomatis detect Next.js
4. Tunggu ~1 menit → dapet URL live: `https://runsync-xxxxx.vercel.app`

✅ **Selesai.** Share URL ke siapa aja.

---

### Cara 2: Pakai Vercel CLI (Buat yang Suka Terminal)

```bash
# 1. Install Vercel CLI (sekali aja)
npm install -g vercel

# 2. Login (browser akan kebuka)
vercel login

# 3. Deploy dari folder ini
cd runsync
vercel --prod
```

---

### Cara 3: GitHub + Auto Deploy (Recommended Long-term)

Cocok kalau kamu mau update aplikasi terus dan auto-redeploy setiap push:

1. **Buat repo baru di GitHub**: https://github.com/new (nama: `runsync`)
2. **Push project ke GitHub**:
   ```bash
   cd runsync
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/USERNAME/runsync.git
   git branch -M main
   git push -u origin main
   ```
3. **Connect ke Vercel**: di https://vercel.com/new pilih repo `runsync`
4. Setiap `git push` → auto-deploy 🎉

---

## 🛠️ Run Lokal (Development)

```bash
npm install
npm run dev
# Buka http://localhost:3000
```

## 📁 Struktur Project

```
runsync/
├── app/
│   ├── layout.js       # Root layout + metadata SEO
│   ├── page.js         # Halaman utama (import RunSync)
│   └── runsync.jsx     # Komponen utama (8 screens + interaksi)
├── next.config.js
├── package.json
└── README.md
```

## ✏️ Cara Edit

Buka **`app/runsync.jsx`** — semua di sini:

- **`TOKENS`** (baris ~20) — warna, gradient (edit di sini buat re-skin app)
- **`TRAINING_SESSIONS`** (~50) — program latihan per fitness level
- **`FOOD_DATA`** (~80) — rekomendasi makanan
- **`LandingScreen`, `Step1-3`, `DashOverview`, dll** — tiap screen function-nya

## 📦 Tech Stack

- **Next.js 16** (App Router)
- **React 18**
- **lucide-react** (icons)
- **DiceBear API** (auto-generated avatars)
- Inline styles (no Tailwind, easy to edit)

## 📜 License

Built untuk MVP & belajar. Free to modify & deploy commercially.
