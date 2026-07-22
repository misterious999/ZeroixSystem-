# ZeroixDark Marketplace - Hosting Store Panel Pterodactyl

Website Hosting Store Panel Pterodactyl dengan tema **"Midnight Glass"** — dark blue glass morphism. Dibuat dengan Vanilla JavaScript + Vite + Firebase Realtime Database.

---

## Fitur Utama

- **Sistem Login & Role** — Admin & User dengan akses berbeda
- **Dashboard Admin** — Kelola semua user, server, activity logs, pengumuman
- **Dashboard User** — Lihat server, paket aktif, masa aktif dengan countdown
- **Kelola User** — CRUD user, toggle aktif/nonaktif, perpanjang expired
- **Kelola Server** — Lihat, suspend/unsuspend, hapus server semua user
- **Activity Logs / CCTV** — Catat semua aktivitas user secara real-time
- **Pengumuman** — Broadcast global ke semua user
- **Beli Paket** — RAM & Role Panel dengan integrasi WhatsApp
- **Pengaturan** — Ganti foto profil, password, info akun

---

## Tech Stack

| Teknologi | Keterangan |
|-----------|-----------|
| Vite 5.x | Build tool & dev server |
| Vanilla JS | Tanpa framework (ringan) |
| Firebase RTDB | Database real-time |
| Lucide Icons | Ikon modern via CDN |
| Google Fonts | Inter font family |

---

## Struktur Proyek

```
zeroixdark-marketplace/
├── .env                    # Konfigurasi (jangan commit!)
├── .env.example            # Template env
├── package.json
├── vite.config.js
├── vercel.json
├── firebase.rules.json
├── index.html              # Entry point (SPA)
├── public/
│   └── favicon.ico
├── src/
│   ├── config/
│   │   └── firebase.js     # Firebase initialization
│   ├── styles/
│   │   └── theme.css       # Midnight Glass theme
│   ├── scripts/
│   │   ├── app.js          # Main app controller & router
│   │   ├── auth.js         # Authentication & session
│   │   ├── toast.js        # Toast & modal system
│   │   ├── utils.js        # Helper functions
│   │   └── pages/
│   │       ├── dashboard.js
│   │       ├── manage_users.js
│   │       ├── manage_servers.js
│   │       ├── activity_logs.js
│   │       ├── packages.js
│   │       ├── settings.js
│   │       └── announcement.js
│   └── pages/
│       └── login.html      # Login page (standalone)
└── README.md
```

---

## Panduan Setup

### 1. Clone / Download

```bash
git clone <repository-url>
cd zeroixdark-marketplace
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Konfigurasi Firebase

1. Buat project baru di [Firebase Console](https://console.firebase.google.com/)
2. Aktifkan **Realtime Database**
3. Copy konfigurasi Firebase Anda
4. Buat file `.env` dari template:

```bash
cp .env.example .env
```

5. Isi file `.env` dengan konfigurasi Firebase Anda:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123

VITE_WA_ADMIN=6281234567890

VITE_APP_NAME=ZeroixDark Marketplace
VITE_APP_VERSION=1.0.0
```

### 4. Setup Firebase Rules

Import `firebase.rules.json` ke Firebase Realtime Database Rules, atau paste isi file tersebut.

### 5. Buat Admin Pertama

Karena tidak ada halaman register, buat admin pertama langsung di Firebase:

1. Buka Firebase Console → Realtime Database
2. Buat node `users` → buat child baru dengan UID random
3. Isi field:
   - `username`: "admin"
   - `password`: "admin123"
   - `role`: "admin"
   - `name`: "Admin"
   - `email`: "admin@email.com"
   - `whatsapp`: "08xxxxxxxxxx"
   - `panelRole`: "reseller"
   - `ramPackage`: "5gb"
   - `isActive`: true
   - `isOnline`: false
   - `createdAt`: (timestamp, misal 1700000000000)
   - `expiredAt`: (timestamp masa depan, misal 1735689600000)
   - `servers`: {}

### 6. Jalankan Development Server

```bash
npm run dev
```

Buka browser di `http://localhost:3000`

### 7. Build untuk Production

```bash
npm run build
```

Output akan ada di folder `dist/`.

---

## Deploy ke Vercel

### Opsi 1: Deploy via Vercel CLI

```bash
npm install -g vercel
vercel
```

### Opsi 2: Deploy via GitHub

1. Push kode ke GitHub repository
2. Buka [Vercel Dashboard](https://vercel.com/dashboard)
3. Import repository
4. Set Environment Variables di **Settings → Environment Variables**:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_DATABASE_URL`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_WA_ADMIN`
   - `VITE_APP_NAME`
   - `VITE_APP_VERSION`
5. Framework Preset: **Vite**
6. Build Command: `npm run build`
7. Output Directory: `dist`
8. Deploy!

### Opsi 3: Manual Upload

```bash
npm run build
vercel --prod
```

---

## Konfigurasi WhatsApp

Setel nomor WhatsApp admin di `.env`:

```env
VITE_WA_ADMIN=6281234567890
```

Format: kode negara + nomor tanpa tanda `+` atau spasi.
Contoh: Indonesia `62`, nomor `08123456789` → `628123456789`

---

## Keamanan

- **Session Management**: localStorage dengan timeout 24 jam
- **Role-based Access**: Halaman admin dilindungi dengan cek role
- **XSS Prevention**: Semua input di-escape dengan `escapeHtml()`
- **Password**: Tidak ditampilkan di manapun, selalu masked
- **Firebase Rules**: Configure sesuai `firebase.rules.json`
- **HTTP Headers**: Security headers via `vercel.json`

---

## Struktur Database Firebase

```json
{
  "users": {
    "user_id": {
      "username": "string",
      "password": "string",
      "role": "admin | user",
      "name": "string",
      "email": "string",
      "whatsapp": "string",
      "profilePic": "url",
      "panelRole": "reseller | partner_publik_v1 | partner_publik_v2 | reseller_private",
      "ramPackage": "5gb | 6gb | 7gb | 8gb | 9gb | 10gb | unlimited",
      "expiredAt": "timestamp",
      "createdAt": "timestamp",
      "isActive": "boolean",
      "isOnline": "boolean",
      "lastLoginAt": "timestamp",
      "servers": {}
    }
  },
  "activityLogs": {
    "log_id": {
      "uid": "string",
      "username": "string",
      "action": "string",
      "detail": "string",
      "timestamp": "number"
    }
  },
  "pengumuman": {
    "pesan": "string",
    "timestamp": "number",
    "oleh": "string"
  },
  "broadcasts": {
    "broadcast_id": {
      "message": "string",
      "sender": "string",
      "senderUid": "string",
      "timestamp": "number",
      "readBy": {}
    }
  }
}
```

---

## Lisensi

MIT License. Gunakan secara bebas.

---

## Catatan Penting

- Proyek ini menggunakan **Vanilla JavaScript** (bukan React/Vue)
- Firebase SDK versi modular (v10+)
- Single Page Application dengan hash routing
- Countdown timer real-time (update per detik)
- Fully responsive (mobile, tablet, desktop)
- Dark mode only
