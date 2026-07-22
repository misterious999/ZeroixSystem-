/**
 * ZeroixDark Marketplace - Main Application Controller
 * SPA-style with integrated login page
 */
import { database } from '../config/firebase.js';
import { requireAdmin, getSession, setOnline, setOffline, logout as authLogout, isLoggedIn } from './auth.js';
import { showToast } from './toast.js';
import { escapeHtml, getRemainingTime, getRemainingTimeMini, formatDate, logActivity, RAM_PACKAGES, ROLE_PACKAGES, getRoleColorClass, getRoleDisplayName } from './utils.js';
import { renderDashboard, renderUserDashboard } from './pages/dashboard.js';
import { renderManageUsers } from './pages/manage_users.js';
import { renderManageServers } from './pages/manage_servers.js';
import { renderActivityLogs } from './pages/activity_logs.js';
import { renderPackages } from './pages/packages.js';
import { renderSettings } from './pages/settings.js';
import { renderAnnouncement } from './pages/announcement.js';
import { renderLoginPage } from './pages/login_page.js';

// Initialize Lucide icons
function initIcons() {
  if (window.lucide) {
    lucide.createIcons();
  }
}

// Sidebar toggle
window.toggleSidebar = function() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.classList.toggle('open');
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

// Start countdown timers
function startCountdowns(expiredAt) {
  clearInterval(countdownInterval);

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

// Show the main app shell (sidebar + navbar + content)
function showAppShell(session) {
  const app = document.getElementById('app');
  app.innerHTML = buildAppShellHTML();

  // Update brand name
  const brandName = document.getElementById('brandName');
  if (brandName) brandName.textContent = import.meta.env.VITE_APP_NAME || 'ZeroixDark Marketplace';

  // Render sidebar nav
  const nav = document.getElementById('sidebarNav');
  if (nav) {
    const items = getNavItems(session.role);
    nav.innerHTML = items.map(item => `
      <div class="nav-item" data-hash="${item.hash}" onclick="navigateTo('${item.hash}')">
        <i data-lucide="${item.icon}"></i>
        <span>${escapeHtml(item.label)}</span>
      </div>
    `).join('');
  }

  // Profile card
  const profile = document.getElementById('sidebarProfile');
  if (profile) {
    profile.innerHTML = `
      <img src="${session.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(session.name || session.username)}&background=131b33&color=38bdf8&size=72`}" 
           class="profile-avatar" alt="avatar" />
      <div class="profile-info">
        <div class="profile-name">${escapeHtml(session.name || session.username)}</div>
        <div class="profile-username">@${escapeHtml(session.username)}</div>
      </div>
    `;
  }

  // Role badge
  const roleBadge = document.getElementById('roleBadge');
  if (roleBadge) {
    roleBadge.textContent = getRoleDisplayName(session.role);
    roleBadge.className = `role-badge ${getRoleColorClass(session.role)}`;
  }

  // Avatar
  const avatarImg = document.getElementById('avatarImg');
  if (avatarImg) {
    avatarImg.src = session.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(session.name || session.username)}&background=131b33&color=38bdf8&size=72`;
  }

  // Start countdown
  startCountdowns(session.expiredAt);

  // Set online
  setOnline(session.uid);

  // Set offline on unload
  window.addEventListener('beforeunload', () => {
    setOffline(session.uid);
  });

  initIcons();
}

function buildAppShellHTML() {
  return `
    <!-- Sidebar -->
    <aside id="sidebar" class="sidebar">
      <div class="sidebar-brand">
        <div class="brand-icon">
          <i data-lucide="server-cog"></i>
        </div>
        <span class="brand-name" id="brandName">ZeroixDark Marketplace</span>
      </div>
      <nav class="sidebar-nav" id="sidebarNav"></nav>
      <div class="sidebar-bottom">
        <div class="sidebar-countdown" id="sidebarCountdown"></div>
        <div class="sidebar-profile" id="sidebarProfile"></div>
        <button class="sidebar-logout" id="btnLogout" onclick="logout()">
          <i data-lucide="log-out"></i> Logout
        </button>
      </div>
      <button class="sidebar-close-mobile" id="sidebarClose" onclick="toggleSidebar()">
        <i data-lucide="x"></i>
      </button>
    </aside>

    <!-- Main Content -->
    <div class="main-wrapper">
      <!-- Navbar -->
      <header class="navbar" id="navbar">
        <div class="navbar-left">
          <button class="sidebar-toggle-mobile" onclick="toggleSidebar()">
            <i data-lucide="menu"></i>
          </button>
          <h1 class="navbar-title" id="pageTitle">Dashboard</h1>
        </div>
        <div class="navbar-right">
          <span class="role-badge" id="roleBadge">User</span>
          <span class="countdown-mini" id="countdownMini">Memuat...</span>
          <div class="navbar-avatar" id="navbarAvatar" onclick="toggleSidebar()">
            <img src="" alt="avatar" id="avatarImg" />
          </div>
        </div>
      </header>

      <!-- Expired Banner -->
      <div class="expired-banner" id="expiredBanner" style="display:none;">
        <i data-lucide="alert-triangle"></i>
        <span>Akun Anda telah <strong>EXPIRED</strong>. Hubungi admin untuk perpanjangan.</span>
        <button onclick="window.location.hash='packages'">Perpanjang Sekarang</button>
      </div>

      <!-- Page Content -->
      <main class="page-content" id="pageContent"></main>
    </div>
  `;
}

// Global navigate function
window.navigateTo = function(hash) {
  window.location.hash = hash;
};

// Render page based on hash
async function renderPage() {
  const hash = window.location.hash.replace('#', '') || 'dashboard';
  const session = getSession();
  const pageContent = document.getElementById('pageContent');
  const pageTitle = document.getElementById('pageTitle');

  if (!pageContent || !session) return;

  // Update active nav
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.hash === hash);
  });

  // Update page title
  if (pageTitle) {
    pageTitle.textContent = pageTitles[hash] || 'Dashboard';
  }

  // Show loading skeleton
  pageContent.innerHTML = '<div class="skeleton-loader"><div class="skeleton-row" style="width:60%;margin-bottom:12px;"></div><div class="skeleton-row" style="width:80%;margin-bottom:12px;"></div></div>';

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
        const overlay = document.getElementById('modalOverlay');
        const modal = document.getElementById('modalContent');
        if (overlay && modal) {
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
    }
  } catch (e) {
    console.error('Check announcement error:', e);
  }
}

// Show login page
async function showLogin() {
  const app = document.getElementById('app');
  // Show app container so login renders inside it
  app.style.display = 'flex';
  await renderLoginPage();
}

// Initialize app
async function init() {
  const app = document.getElementById('app');

  // Check if already logged in
  if (isLoggedIn()) {
    const session = getSession();
    showAppShell(session);

    // Listen for hash changes
    window.addEventListener('hashchange', renderPage);

    // Check announcement for non-admin
    if (session.role !== 'admin') {
      await checkAnnouncement();
    }

    // Render initial page
    await renderPage();
  } else {
    // Show login page
    await showLogin();
  }
}

// Run init
init();

// Make showToast available globally for inline onclick handlers
window.showToast = showToast;
