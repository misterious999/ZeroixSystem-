/**
 * Authentication and session management
 */
import { database } from '../config/firebase.js';
import { ref, get, set, update, push } from 'firebase/database';
import { showToast } from './toast.js';
import { escapeHtml, logActivity, generateId } from './utils.js';

const SESSION_KEY = 'mp_session';
const SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 hours in ms

/**
 * Save session to localStorage
 */
export function saveSession(userData) {
  const session = {
    uid: userData.uid || generateId(),
    username: userData.username,
    role: userData.role,
    panelRole: userData.panelRole || 'reseller',
    name: userData.name,
    email: userData.email,
    whatsapp: userData.whatsapp,
    profilePic: userData.profilePic || '',
    ramPackage: userData.ramPackage || '5gb',
    expiredAt: userData.expiredAt || null,
    isActive: userData.isActive !== false,
    createdAt: userData.createdAt || Date.now(),
    lastLoginAt: Date.now()
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

/**
 * Get current session
 */
export function getSession() {
  const data = localStorage.getItem(SESSION_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

/**
 * Check if user is logged in
 */
export function isLoggedIn() {
  const session = getSession();
  if (!session) return false;
  
  // Check session timeout
  const now = Date.now();
  if (session.lastLoginAt && (now - session.lastLoginAt) > SESSION_TIMEOUT) {
    clearSession();
    return false;
  }
  
  return true;
}

/**
 * Clear session and redirect to login
 */
export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

/**
 * Login function
 */
export async function login(username, password) {
  try {
    const usersRef = ref(database, 'users');
    const snapshot = await get(usersRef);
    const users = snapshot.val();
    
    if (!users) {
      return { success: false, message: 'Database tidak tersedia.' };
    }

    // Find user by username (case-insensitive)
    let foundUser = null;
    let foundUid = null;
    
    for (const [uid, user] of Object.entries(users)) {
      if (user.username && user.username.toLowerCase() === username.toLowerCase()) {
        foundUser = user;
        foundUid = uid;
        break;
      }
    }

    if (!foundUser) {
      return { success: false, message: 'Username tidak ditemukan.' };
    }

    if (foundUser.password !== password) {
      return { success: false, message: 'Password salah.' };
    }

    // Check if user is active
    if (foundUser.isActive === false) {
      return { success: false, message: 'Akun Anda telah dinonaktifkan oleh admin.' };
    }

    // Check if user is expired
    if (foundUser.expiredAt && Date.now() > foundUser.expiredAt) {
      return { 
        success: false, 
        message: 'Paket Anda telah expired. Hubungi admin untuk perpanjangan.',
        expired: true
      };
    }

    // Update last login
    const userRef = ref(database, `users/${foundUid}`);
    await update(userRef, {
      lastLoginAt: Date.now(),
      isOnline: true
    });

    // Log activity
    await logActivity(foundUid, foundUser.username, 'login', 'User berhasil login');

    // Save session
    const session = saveSession({
      ...foundUser,
      uid: foundUid
    });

    return { success: true, session };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Terjadi kesalahan. Silakan coba lagi.' };
  }
}

/**
 * Logout function
 */
export async function logout() {
  const session = getSession();
  if (session) {
    try {
      // Set user offline
      await update(ref(database, `users/${session.uid}`), {
        isOnline: false
      });
      await logActivity(session.uid, session.username, 'logout', 'User berhasil logout');
    } catch (e) {
      console.error('Logout error:', e);
    }
  }
  clearSession();
  window.location.href = '/login';
}

/**
 * Check admin access - redirect if not admin
 */
export function requireAdmin() {
  if (!isLoggedIn()) {
    window.location.href = '/login';
    return false;
  }
  const session = getSession();
  if (session.role !== 'admin') {
    showToast('Akses ditolak. Halaman ini hanya untuk admin.', 'error');
    setTimeout(() => {
      window.location.hash = 'dashboard';
    }, 1500);
    return false;
  }
  return true;
}

/**
 * Check auth - redirect if not logged in
 */
export function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = '/login';
    return false;
  }
  return true;
}

/**
 * Set user online status on page load
 */
export async function setOnline(uid) {
  if (!uid) return;
  try {
    await update(ref(database, `users/${uid}`), {
      isOnline: true,
      lastLoginAt: Date.now()
    });
  } catch (e) {
    console.error('Set online error:', e);
  }
}

/**
 * Set user offline on page unload
 */
export function setOffline(uid) {
  if (!uid) return;
  const url = `${database.app.options.databaseURL}/users/${uid}.json`;
  navigator.sendBeacon?.(url, JSON.stringify({ isOnline: false }));
  // Also update via fetch as fallback
  fetch(url, {
    method: 'PATCH',
    body: JSON.stringify({ isOnline: false }),
    headers: { 'Content-Type': 'application/json' }
  }).catch(() => {});
}
