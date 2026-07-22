/**
 * ZeroixDark Marketplace - Main Application Controller
 * SPA-style router with hash-based navigation
 */
import { database } from '../config/firebase.js';
import { requireAuth, requireAdmin, getSession, setOnline, setOffline, logout as authLogout } from './auth.js';
import { showToast } from './toast.js';
import { escapeHtml, getRemainingTime, getRemainingTimeMini, formatDate, logActivity, RAM_PACKAGES, ROLE_PACKAGES, getRoleColorClass, getRoleDisplayName } from './utils.js';
import { renderDashboard, renderUserDashboard } from './pages/dashboard.js';
import { renderManageUsers } from './pages/manage_users.js';
import { renderManageServers } from './pages/manage_servers.js';
import { renderActivityLogs } from './pages/activity_logs.js';
import { renderPackages } from './pages/packages.js';
import { renderSettings } from './pages/settings.js';
import { renderAnnouncement } from './pages/announcement.js';

// Initialize Lucide icons
function initIcons() {
  if (window.lucide) {
    lucide.createIcons();
  }
}

// Sidebar toggle
window.toggleSidebar = function() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('open');
};

// Logout
window.logout = async function() {
  await authLogout();
};

// Navigation items based on role
function getNavItems(role) {
  if (role === 'admin') {
    return [
      { hash: 'dashboard', icon: 'layout-dashboard', label: 'Dashboard' },
      { hash: 'manage_users', icon: 'users', label: 'Kelola User' },
      { hash: 'manage_servers', icon: 'server', label: 'Kelola Server' },
      { hash: 'activity_logs', icon: 'activity', label: 'Activity Logs' },
      { hash: 'announcement', icon: 'megaphone', label: 'Pengumuman' },
      { hash: 'settings', icon: 'settings', label: 'Pengaturan' }
    ];
  } else {
    return [
      { hash: 'dashboard', icon: 'layout-dashboard', label: 'Dashboard' },
      { hash: 'packages', icon: 'package', label: 'Beli Paket' },
      { hash: 'settings', icon: 'settings', label: 'Pengaturan' }
    ];
  }
}

// Page titles
const pageTitles = {
  dashboard: 'Dashboard',
  manage_users: 'Kelola User',
  manage_servers: 'Kelola Server',
  activity_logs: 'Activity Logs',
  announcement: 'Pengumuman',
  settings: 'Pengaturan',
  packages: 'Beli Paket'
};

// Countdown interval
let countdownInterval = null;
let sidebarCountdownInterval = null;

// Start countdown timers
function startCountdowns(expiredAt) {
  clearInterval(countdownInterval);
  clearInterval(sidebarCountdownInterval);

  const updateCountdown = () => {
    const mini = document.getElementById('countdownMini');
    const sidebar = document.getElementById('sidebarCountdown');
    
    if (!expiredAt) {
      if (mini) mini.textContent = 'Tanpa expiry';
      if (sidebar) sidebar.innerHTML = '';
      return;
    }

    const result = getRemainingTime(expiredAt);
    const miniResult = getRemainingTimeMini(expiredAt);

    if (mini) {
      mini.textContent = miniResult.text;
      if (miniResult.expired) {
        mini.classList.add('expired');
      } else {
        mini.classList.remove('expired');
      }
    }

    if (sidebar) {
      if (result.expired) {
        sidebar.innerHTML = `
          <div class="countdown-label">Masa Aktif</div>
          <div class="countdown-text expired">EXPIRED</div>
          <div class="countdown-label">${formatDate(expiredAt)}</div>
        `;
      } else {
        sidebar.innerHTML = `
          <div class="countdown-label">Masa Aktif</div>
          <div class="countdown-text">${result.days}h ${result.hours}j ${result.minutes}m ${result.seconds}d</div>
          <div class="countdown-label">${formatDate(expiredAt)}</div>
        `;
      }
    }

    // Show/hide expired banner
    const banner = document.getElementById('expiredBanner');
    if (banner) {
      banner.style.display = result.expired ? 'flex' : 'none';
    }
  };

  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
}

// Render sidebar navigation
function renderSidebarNav() {
  const session = getSession();
  const nav = document.getElementById('sidebarNav');
  const profile = document.getElementById('sidebarProfile');
  const roleBadge = document.getElementById('roleBadge');
  const avatarImg = document.getElementById('avatarImg');
  const brandName = document.getElementById('brandName');

  if (!nav || !session) return;

  // Brand name
  brandName.textContent = import.meta.env.VITE_APP_NAME || 'ZeroixDark Marketplace';

  // Navigation items
  const items = getNavItems(session.role);
  nav.innerHTML = items.map(item => `
    <div class="nav-item" data-hash="${item.hash}" onclick="navigateTo('${item.hash}')">
      <i data-lucide="${item.icon}"></i>
      <span>${escapeHtml(item.label)}</span>
    </div>
  `).join('');

  // Profile card
  profile.innerHTML = `
    <img src="${session.profilePic || 'https://ui-avatars.com/api/?name=${encodeURIComponent(session.name || session.username)}&background=131b33&color=38bdf8&size=72'}" 
         class="profile-avatar" alt="avatar" />
    <div class="profile-info">
      <div class="profile-name">${escapeHtml(session.name || session.username)}</div>
      <div class="profile-username">@${escapeHtml(session.username)}</div>
    </div>
  `;

  // Role badge in navbar
  if (roleBadge) {
    roleBadge.textContent = getRoleDisplayName(session.role);
    roleBadge.className = `role-badge ${getRoleColorClass(session.role)}`;
  }

  // Avatar
  if (avatarImg) {
    avatarImg.src = session.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(session.name || session.username)}&background=131b33&color=38bdf8&size=72`;
  }

  // Start countdown
  startCountdowns(session.expiredAt);
}

// Global navigate function
window.navigateTo = function(hash) {
  window.location.hash = hash;
};

// Render page based on hash
async function renderPage() {
  const hash = window.location.hash.replace('#', '') || 'dashboard';
  const session = getSession();
  const app = document.getElementById('app');
  const pageContent = document.getElementById('pageContent');
  const pageTitle = document.getElementById('pageTitle');

  // Update active nav
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.hash === hash);
  });

  // Update page title
  if (pageTitle) {
    pageTitle.textContent = pageTitles[hash] || 'Dashboard';
  }

  // Show loading
  if (pageContent) {
    pageContent.innerHTML = '<div class="skeleton-loader"><div class="skeleton-row" style="width:60%;margin-bottom:12px;"></div><div class="skeleton-row" style="width:80%;margin-bottom:12px;"></div></div>';
  }

  try {
    switch (hash) {
      case 'dashboard':
        if (session.role === 'admin') {
          await renderDashboard('admin');
        } else {
          await renderUserDashboard(session);
        }
        break;
      case 'manage_users':
        if (requireAdmin()) {
          await renderManageUsers();
        }
        break;
      case 'manage_servers':
        if (requireAdmin()) {
          await renderManageServers();
        }
        break;
      case 'activity_logs':
        if (requireAdmin()) {
          await renderActivityLogs();
        }
        break;
      case 'packages':
        await renderPackages();
        break;
      case 'settings':
        await renderSettings(session);
        break;
      case 'announcement':
        if (requireAdmin()) {
          await renderAnnouncement();
        }
        break;
      default:
        window.location.hash = 'dashboard';
        break;
    }
  } catch (error) {
    console.error('Page render error:', error);
    showToast('Terjadi kesalahan saat memuat halaman.', 'error');
  }

  initIcons();
}

// Check announcement on login
async function checkAnnouncement() {
  try {
    const { ref, get } = await import('firebase/database');
    const snap = await get(ref(database, 'pengumuman'));
    const data = snap.val();
    if (data) {
      const lastRead = localStorage.getItem('mp_last_announcement');
      const currentTs = data.timestamp || 0;
      if (!lastRead || parseInt(lastRead) < currentTs) {
        // Show announcement modal
        const overlay = document.getElementById('modalOverlay');
        const modal = document.getElementById('modalContent');
        overlay.style.display = 'flex';
        modal.innerHTML = `
          <div class="modal-header">
            <i data-lucide="megaphone" style="color:var(--accent-violet);"></i>
            <h2>Pengumuman</h2>
          </div>
          <div class="modal-body">
            <p style="white-space:pre-wrap;">${escapeHtml(data.pesan || '')}</p>
            <p style="font-size:12px;color:var(--text-muted);margin-top:12px;">
              Oleh: ${escapeHtml(data.oleh || 'Admin')} | ${formatDate(data.timestamp)}
            </p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" id="closeAnnouncement">Mengerti</button>
          </div>
        `;
        if (window.lucide) lucide.createIcons();
        document.getElementById('closeAnnouncement').onclick = () => {
          overlay.style.display = 'none';
          localStorage.setItem('mp_last_announcement', currentTs.toString());
        };
      }
    }
  } catch (e) {
    console.error('Check announcement error:', e);
  }
}

// Initialize app
async function init() {
  // Check if on login page
  if (window.location.pathname.includes('login')) {
    const session = getSession();
    if (session && isLoggedIn()) {
      window.location.href = '/';
      return;
    }
    // Show login page
    document.getElementById('app').style.display = 'none';
    return;
  }

  // Auth check
  if (!requireAuth()) return;

  const session = getSession();
  const app = document.getElementById('app');
  app.style.display = 'flex';

  // Set online
  setOnline(session.uid);
  
  // Set offline on unload
  window.addEventListener('beforeunload', () => {
    setOffline(session.uid);
  });

  // Render sidebar
  renderSidebarNav();

  // Check announcement for non-admin users
  if (session.role !== 'admin') {
    await checkAnnouncement();
  }

  // Listen for hash changes
  window.addEventListener('hashchange', renderPage);

  // Render initial page
  await renderPage();
}

// Run init
init();

// Make showToast available globally for inline onclick handlers
window.showToast = showToast;
