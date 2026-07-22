/**
 * Utility functions for ZeroixDark Marketplace
 */

/**
 * Escape HTML to prevent XSS
 */
export function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/**
 * Format timestamp to readable date
 */
export function formatDate(timestamp) {
  if (!timestamp) return 'N/A';
  const d = new Date(timestamp);
  return d.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Format short date (DD/MM/YYYY)
 */
export function formatShortDate(timestamp) {
  if (!timestamp) return 'N/A';
  const d = new Date(timestamp);
  return d.toLocaleDateString('id-ID');
}

/**
 * Generate random ID
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Format WhatsApp message and open link
 */
export function openWhatsApp(message) {
  const waNumber = import.meta.env.VITE_WA_ADMIN || '6281234567890';
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${waNumber}?text=${encoded}`, '_blank');
}

/**
 * WhatsApp message templates
 */
export function getRamPackageMessage(packageName, price) {
  const session = JSON.parse(localStorage.getItem('mp_session') || '{}');
  return `Halo Admin, saya mau beli Panel Pterodactyl dengan spesifikasi:
📦 Paket: RAM ${escapeHtml(packageName)}
💰 Harga: Rp ${escapeHtml(price)}
👤 Username: ${escapeHtml(session.username || '')}
📧 Email: ${escapeHtml(session.email || '')}
📱 WA: ${escapeHtml(session.whatsapp || '')}

Mohon diproses ya, terima kasih! 🙏`;
}

export function getRolePackageMessage(roleName, price, isRenewal = false) {
  const session = JSON.parse(localStorage.getItem('mp_session') || '{}');
  return `Halo Admin, saya mau ${isRenewal ? 'perpanjang' : 'beli'} Role Panel:
🏷️ Role: ${escapeHtml(roleName)}
💰 Harga: Rp ${escapeHtml(price)} (${isRenewal ? 'perpanjang' : 'baru'})
👤 Username: ${escapeHtml(session.username || '')}
📧 Email: ${escapeHtml(session.email || '')}
📱 WA: ${escapeHtml(session.whatsapp || '')}

Mohon diproses ya, terima kasih! 🙏`;
}

/**
 * Calculate remaining time
 */
export function getRemainingTime(expiredAt) {
  if (!expiredAt) return { expired: true, text: 'EXPIRED' };
  const now = Date.now();
  const remaining = expiredAt - now;
  if (remaining <= 0) return { expired: true, text: 'EXPIRED' };
  
  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
  
  return {
    expired: false,
    days,
    hours,
    minutes,
    seconds,
    text: `${days}d ${hours}j ${minutes}m ${seconds}d`
  };
}

/**
 * Format remaining time in mini format
 */
export function getRemainingTimeMini(expiredAt) {
  if (!expiredAt) return { expired: true, text: 'EXPIRED' };
  const remaining = expiredAt - Date.now();
  if (remaining <= 0) return { expired: true, text: 'EXPIRED' };
  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  if (days >= 1) return { expired: false, text: `Sisa ${days} hari` };
  const hours = Math.floor(remaining / (1000 * 60 * 60));
  return { expired: false, text: `Sisa ${hours} jam` };
}

/**
 * Map RAM packages to display info
 */
export const RAM_PACKAGES = [
  { id: '5gb', name: '5 GB', price: '3.000', priceNum: 3000 },
  { id: '6gb', name: '6 GB', price: '4.000', priceNum: 4000 },
  { id: '7gb', name: '7 GB', price: '5.000', priceNum: 5000 },
  { id: '8gb', name: '8 GB', price: '6.000', priceNum: 6000 },
  { id: '9gb', name: '9 GB', price: '7.000', priceNum: 7000 },
  { id: '10gb', name: '10 GB', price: '8.000', priceNum: 8000 },
  { id: 'unlimited', name: 'Unlimited', price: '10.000', priceNum: 10000 }
];

/**
 * Map Role packages to display info
 */
export const ROLE_PACKAGES = [
  { id: 'reseller', name: 'Reseller', price: '20.000', renewalPrice: '15.000' },
  { id: 'partner_publik_v1', name: 'Partner Publik V1', price: '35.000', renewalPrice: '20.000' },
  { id: 'partner_publik_v2', name: 'Partner Publik V2', price: '35.000', renewalPrice: '20.000' },
  { id: 'reseller_private', name: 'Reseller Private', price: '30.000', renewalPrice: '20.000' }
];

/**
 * Get role badge color class
 */
export function getRoleColorClass(role) {
  const map = {
    'admin': 'badge-admin',
    'reseller': 'badge-reseller',
    'partner_publik_v1': 'badge-partner',
    'partner_publik_v2': 'badge-partner',
    'reseller_private': 'badge-reseller-private'
  };
  return map[role] || 'badge-user';
}

/**
 * Get readable role name
 */
export function getRoleDisplayName(role) {
  const map = {
    'admin': 'Admin',
    'reseller': 'Reseller',
    'partner_publik_v1': 'Partner Publik V1',
    'partner_publik_v2': 'Partner Publik V2',
    'reseller_private': 'Reseller Private'
  };
  return map[role] || role;
}

/**
 * Show loading skeleton
 */
export function showLoading(container) {
  container.innerHTML = `
    <div class="skeleton-loader">
      <div class="skeleton-row" style="width:80%;margin-bottom:12px;"></div>
      <div class="skeleton-row" style="width:60%;margin-bottom:12px;"></div>
      <div class="skeleton-row" style="width:90%;margin-bottom:12px;"></div>
      <div class="skeleton-row" style="width:45%;margin-bottom:12px;"></div>
    </div>
  `;
}

/**
 * Log activity to Firebase
 */
export async function logActivity(uid, username, action, detail) {
  try {
    const { database } = await import('../config/firebase.js');
    const { ref, push, set } = await import('firebase/database');
    const logRef = push(ref(database, 'activityLogs'));
    await set(logRef, {
      uid,
      username,
      action,
      detail,
      timestamp: Date.now()
    });
  } catch (e) {
    console.error('Failed to log activity:', e);
  }
}
