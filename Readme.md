# 🌙 ZeroixDark Ptero — Hosting Panel Store

Project SPA berbasis Vanilla JS dan Firebase SDK V10 (Modular). 
Tanpa framework, tanpa build tools, ringan, dengan tema "Midnight Glass".

## 🚀 Panduan Setup & Deploy

### 1. Setup Firebase
1. Buka [Firebase Console](https://console.firebase.google.com).
2. Buat Project Baru -> "ZeroixDark Ptero".
3. Tambahkan "Web App" `</>`. Copy config keys-nya.
4. Pergi ke **Realtime Database** -> Create Database -> Region bebas (Singapore direkomendasikan).
5. Masuk ke tab **Rules**, paste isi file `firebase.rules.json` lalu Publish.

### 2. Mengisi Konfigurasi (Single Source of Truth)
Buka file `js/config.js` dan edit bagian berikut:
- **`CONFIG.firebase`**: Ganti dengan API key dan URL dari Firebase Console Anda.
- **`CONFIG.ptero`**: Isi dengan URL Panel Pterodactyl Anda dan API Key yang di-generate dari Panel (Application API).
- **`CONFIG.whatsapp.ownerNumber`**: Ubah ke nomor WA Anda (Format: 628...).

### 3. Login Admin Pertama (Seed Admin)
- Buka `index.html` di browser lokal atau setelah deploy.
- Pergi ke halaman Login.
- Masukkan Username: `admin` dan Password: `admin123`.
- Sistem secara otomatis akan men-*generate* node admin ini di database Firebase jika database kosong. 
- **PENTING**: Segera ganti password admin di menu pengaturan atau langsung edit di Firebase Console demi keamanan.

### 4. Deploy ke Vercel (Paling Mudah)
Aplikasi ini menggunakan struktur *Flat Directory*, siap langsung deploy:
1. Buat folder `zeroixdark-ptero` dan masukkan ke-16 file/folder ini ke dalamnya.
2. Buka [Vercel](https://vercel.com) -> Add New Project.
3. Hubungkan dengan akun GitHub Anda (Push folder ke repo GitHub) **ATAU** cukup *Drag & Drop* folder `zeroixdark-ptero` ke dashboard Vercel.
4. Selesai! Website Anda live secara instan.
