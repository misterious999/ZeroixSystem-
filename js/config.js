// ============================================
// ZEROIXDARK PTERO - SINGLE SOURCE OF TRUTH
// ============================================
const CONFIG = {
  // 🔥 FIREBASE REALTIME DATABASE (Isi dengan kredensial Anda)
  firebase: {
    apiKey: "AIzaSyBsSQqxgxeto9FeCWSLPFqfEXtFJ@avoYQ",
    authDomain: "zeroixdark-market.firebaseapp.com",
    databaseURL: "https://zeroixdark-market-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "zeroixdark-market",
    storageBucket: "zeroixdark-market.firebasestorage.app",
    messagingSenderId: "950810511981",
    appId: "1:950810511981: web:486718ea1a10d6fea08d64"
  },
  // 🦖 PTERODACTYL PANEL API
  ptero: {
    primary: {
      url: "https://assistantzeroix.bypstar7.online",
      apiKey: "ptla_WlmF4CJ2yI68CQEKcFeDieij2gXE67CESbqGISbXOeB",
      name: "Server Utama"
    },
    secondary: {
      url: "https://assistantzeroix.bypstar7.online",
      apiKey: "ptla_WlmF4CJ2yI68CQEKcFeDieij2gXE67CESbqGISbXOeB",
      name: "Server Backup"
    }
  },
  // 💬 WHATSAPP OWNER
  whatsapp: {
    ownerNumber: "62895416479539",
    ownerName: "Admin Keknya Pstar7"
  },
  // 🏷️ APP INFO
  app: {
    name: "ZeroixDark Ptero",
    tagline: "Server Cepat, Harga Merakyat",
    version: "1.0.0",
    domain: "https://zeroixdark-ptero.vercel.app"
  },
  // 💰 BUSINESS LOGIC PRICING
  pricing: {
    ram: [
      { id: "5gb", name: "5 GB", price: 3000 },
      { id: "6gb", name: "6 GB", price: 4000 },
      { id: "7gb", name: "7 GB", price: 5000 },
      { id: "8gb", name: "8 GB", price: 6000 },
      { id: "9gb", name: "9 GB", price: 7000 },
      { id: "10gb", name: "10 GB", price: 8000 },
      { id: "unlimited", name: "Unlimited", price: 10000 }
    ],
    roles: [
      { id: "reseller", name: "Reseller", price: 20000, renew: 15000 },
      { id: "partner_publik_v1", name: "Partner Publik V1", price: 35000, renew: 20000 },
      { id: "partner_publik_v2", name: "Partner Publik V2", price: 35000, renew: 20000 },
      { id: "reseller_private", name: "Reseller Private", price: 30000, renew: 20000 }
    ]
  }
};

// 🔒 Security hardening: Mencegah manipulasi config dari console browser
Object.freeze(CONFIG);
Object.freeze(CONFIG.firebase);
Object.freeze(CONFIG.ptero);
Object.freeze(CONFIG.ptero.primary);
Object.freeze(CONFIG.ptero.secondary);
Object.freeze(CONFIG.whatsapp);
Object.freeze(CONFIG.app);
Object.freeze(CONFIG.pricing);

window.CONFIG = CONFIG;
