/**
 * Dashboard page renderer
 */
import { database } from '../../config/firebase.js';
import { ref, get } from 'firebase/database';
import { showToast, showInfoModal } from '../toast.js';
import { escapeHtml, formatDate, getRoleDisplayName, getRoleColorClass, logActivity, getRemainingTime } from '../utils.js';

export async function renderDashboard(role) {
  const pageContent = document.getElementById('pageContent');

  if (role === 'admin') {
    await renderAdminDashboard(pageContent);
  } else {
    // Handled by renderUserDashboard
  }
}

export async function renderAdminDashboard(pageContent) {
  try {
    const usersSnap = await get(ref(database, 'users'));
    const users = usersSnap.val() || {};
    const userCount = Object.keys(users).length;

    let activeCount = 0;
    let onlineCount = 0;
    let expiredCount = 0;
    let totalServers = 0;

    for (const [, user] of Object.entries(users)) {
      if (user.isActive !== false) activeCount++;
      if (user.isOnline) onlineCount++;
      if (user.expiredAt && Date.now() > user.expiredAt) expiredCount++;
      if (user.servers) {
        totalServers += Object.keys(user.servers).length;
      }
    }

    // Get recent users
    const recentUsers = Object.entries(users)
      .sort(([, a], [, b]) => (b.createdAt || 0) - (a.createdAt || 0))
      .slice(0, 5);

    // Get recent activity logs
    const logsSnap = await get(ref(database, 'activityLogs'));
    const logs = logsSnap.val() || {};
    const recentLogs = Object.entries(logs)
      .sort(([, a], [, b]) => (b.timestamp || 0) - (a.timestamp || 0))
      .slice(0, 10);

    pageContent.innerHTML = `
      <!-- Stats Grid -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon cyan"><i data-lucide="users"></i></div>
          <div class="stat-value">${userCount}</div>
          <div class="stat-label">Total User</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon green"><i data-lucide="user-check"></i></div>
          <div class="stat-value">${activeCount}</div>
          <div class="stat-label">User Aktif</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon violet"><i data-lucide="wifi"></i></div>
          <div class="stat-value">${onlineCount}</div>
          <div class="stat-label">User Online</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon red"><i data-lucide="user-x"></i></div>
          <div class="stat-value">${expiredCount}</div>
          <div class="stat-label">User Expired</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon cyan"><i data-lucide="server"></i></div>
          <div class="stat-value">${totalServers}</div>
          <div class="stat-label">Total Server</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon green"><i data-lucide="banknote"></i></div>
          <div class="stat-value">~</div>
          <div class="stat-label">Revenue Estimate</div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="section">
        <div class="section-title"><i data-lucide="zap"></i> Quick Actions</div>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <button class="btn btn-primary" onclick="openAddUserModal()">
            <i data-lucide="user-plus"></i> Tambah User
          </button>
          <button class="btn btn-secondary" onclick="window.location.hash='announcement'">
            <i data-lucide="megaphone"></i> Broadcast Pengumuman
          </button>
        </div>
      </div>

      <!-- Recent Users -->
      <div class="table-container">
        <div class="table-header">
          <h3>User Terbaru</h3>
          <button class="btn btn-sm btn-secondary" onclick="window.location.hash='manage_users'">Lihat Semua</button>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Nama</th>
              <th>Role</th>
              <th>Status</th>
              <th>Dibuat</th>
            </tr>
          </thead>
          <tbody>
            ${recentUsers.length === 0 ? '<tr><td colspan="5" style="text-align:center;color:var(--text-muted);padding:24px;">Belum ada user</td></tr>' : ''}
            ${recentUsers.map(([uid, u]) => `
              <tr>
                <td><strong>${escapeHtml(u.username || '')}</strong></td>
                <td>${escapeHtml(u.name || '-')}</td>
                <td><span class="badge ${getRoleColorClass(u.role)}">${getRoleDisplayName(u.role)}</span></td>
                <td>
                  <span class="badge ${u.isActive !== false ? 'badge-active' : 'badge-inactive'}">
                    ${u.isActive !== false ? 'Aktif' : 'Nonaktif'}
                  </span>
                </td>
                <td>${formatDate(u.createdAt)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Recent Activity -->
      <div class="table-container">
        <div class="table-header">
          <h3>Activity Log Terbaru</h3>
          <button class="btn btn-sm btn-secondary" onclick="window.location.hash='activity_logs'">Lihat Semua</button>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Waktu</th>
              <th>User</th>
              <th>Aksi</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            ${recentLogs.length === 0 ? '<tr><td colspan="4" style="text-align:center;color:var(--text-muted);padding:24px;">Belum ada aktivitas</td></tr>' : ''}
            ${recentLogs.map(([lid, log]) => `
              <tr>
                <td>${formatDate(log.timestamp)}</td>
                <td>${escapeHtml(log.username || '-')}</td>
                <td>${escapeHtml(log.action || '-')}</td>
                <td>${escapeHtml(log.detail || '-')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    if (window.lucide) lucide.createIcons();
  } catch (error) {
    console.error('Dashboard error:', error);
    pageContent.innerHTML = `<div class="empty-state"><p>Error memuat dashboard: ${escapeHtml(error.message)}</p></div>`;
    showToast('Gagal memuat dashboard.', 'error');
  }
}

export async function renderUserDashboard(session) {
  const pageContent = document.getElementById('pageContent');

  try {
    const userSnap = await get(ref(database, `users/${session.uid}`));
    const userData = userSnap.val() || session;

    const serverCount = userData.servers ? Object.keys(userData.servers).length : 0;
    const remaining = getRemainingTime(userData.expiredAt);
    const ramPkg = RAM_PACKAGES.find(p => p.id === userData.ramPackage) || { name: userData.ramPackage, price: '?' };
    const rolePkg = ROLE_PACKAGES.find(p => p.id === userData.panelRole) || { name: userData.panelRole, price: '?' };

    pageContent.innerHTML = `
      <!-- Welcome Card -->
      <div class="welcome-card">
        <div>
          <h2>Halo, ${escapeHtml(userData.name || userData.username)}! 👋</h2>
          <p>Selamat datang kembali di ZeroixDark Marketplace. Kelola hosting Anda dengan mudah.</p>
        </div>
      </div>

      <!-- Stats -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon cyan"><i data-lucide="server"></i></div>
          <div class="stat-value">${serverCount}</div>
          <div class="stat-label">Server Aktif</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon green"><i data-lucide="memory-stick"></i></div>
          <div class="stat-value">${escapeHtml(ramPkg.name)}</div>
          <div class="stat-label">RAM Package</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon violet"><i data-lucide="shield"></i></div>
          <div class="stat-value" style="font-size:16px;">${getRoleDisplayName(userData.panelRole)}</div>
          <div class="stat-label">Role Panel</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon ${remaining.expired ? 'red' : 'cyan'}"><i data-lucide="clock"></i></div>
          <div class="stat-value" style="font-size:16px;">${remaining.expired ? 'EXPIRED' : `${remaining.days}h ${remaining.hours}j`}</div>
          <div class="stat-label">Masa Aktif</div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="section">
        <div class="section-title"><i data-lucide="zap"></i> Aksi Cepat</div>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <button class="btn btn-primary" onclick="window.location.hash='packages'">
            <i data-lucide="upgrade"></i> Upgrade RAM
          </button>
          <button class="btn btn-secondary" onclick="window.location.hash='packages'">
            <i data-lucide="refresh-cw"></i> Perpanjang Role
          </button>
          <button class="btn btn-success" onclick="window.location.hash='packages'">
            <i data-lucide="shopping-cart"></i> Beli Role Baru
          </button>
        </div>
      </div>

      <!-- Active Package Info -->
      <div class="card">
        <div class="card-header">
          <div class="card-title"><i data-lucide="package"></i> Paket Aktif</div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;">
          <div>
            <div style="font-size:12px;color:var(--text-muted);margin-bottom:4px;">RAM</div>
            <div style="font-size:16px;font-weight:600;">${escapeHtml(ramPkg.name)}</div>
          </div>
          <div>
            <div style="font-size:12px;color:var(--text-muted);margin-bottom:4px;">Role Panel</div>
            <div style="font-size:16px;font-weight:600;">${getRoleDisplayName(userData.panelRole)}</div>
          </div>
          <div>
            <div style="font-size:12px;color:var(--text-muted);margin-bottom:4px;">Harga RAM/Bulan</div>
            <div style="font-size:16px;font-weight:600;color:var(--accent-cyan);">Rp ${escapeHtml(ramPkg.price)}</div>
          </div>
          <div>
            <div style="font-size:12px;color:var(--text-muted);margin-bottom:4px;">Expire Date</div>
            <div style="font-size:16px;font-weight:600;">${formatDate(userData.expiredAt)}</div>
          </div>
        </div>
      </div>

      <!-- Servers List -->
      <div class="table-container">
        <div class="table-header">
          <h3>Server Saya</h3>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Nama Server</th>
              <th>RAM</th>
              <th>Status</th>
              <th>Dibuat</th>
            </tr>
          </thead>
          <tbody>
            ${!userData.servers || Object.keys(userData.servers).length === 0 ? 
              '<tr><td colspan="4" style="text-align:center;color:var(--text-muted);padding:24px;">Belum ada server. Hubungi admin untuk membuat server.</td></tr>' :
              Object.entries(userData.servers).map(([sid, srv]) => `
                <tr>
                  <td><strong>${escapeHtml(srv.name || sid)}</strong></td>
                  <td>${escapeHtml(srv.ram || '-')}</td>
                  <td><span class="badge ${srv.status !== 'suspended' ? 'badge-active' : 'badge-inactive'}">${srv.status || 'active'}</span></td>
                  <td>${formatDate(srv.createdAt)}</td>
                </tr>
              `).join('')
            }
          </tbody>
        </table>
      </div>
    `;

    if (window.lucide) lucide.createIcons();
  } catch (error) {
    console.error('User dashboard error:', error);
    pageContent.innerHTML = `<div class="empty-state"><p>Error memuat dashboard.</p></div>`;
    showToast('Gagal memuat dashboard.', 'error');
  }
}
