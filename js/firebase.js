// Inisialisasi Firebase Modular SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, get, set, update, remove, child } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Menggunakan config terpusat
const app = initializeApp(window.CONFIG.firebase);
const db = getDatabase(app);

// Expose fungsi ke global untuk digunakan file JS lain
window.firebaseAPI = { db, ref, get, set, update, remove, child };
