/**
 * Activity Logs page renderer (Admin only)
 */
import { database } from '../../config/firebase.js';
import { ref, get, remove, update } from 'firebase/database';
import { showToast, showConfirm } from '../toast.js';
import { escapeHtml, formatDate, logActivity } from '../utils.js';
import { getSession } from '../auth.js';

let allLogs = [];
let refreshInterval = null;

export async function renderActivityLogs() {
  const pageContent = document.getElementById('pageContent');

  try {
    await loadLogs();
    renderLogsTable(pageContent, allLogs);
    
    // Auto-refresh every 10 seconds
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
      loadLogs().then(() => {
        renderLogsTable(pageContent, allLogs);
      }).catch(() => {});
    }, 10000);
  } catch (error) {
    console.error('Activity logs error:', error);
    pageContent.innerHTML = '<div class="empty-state"><p>Gagal memuat activity logs.</p></div>';
    showToast('Gagal memuat activity logs.', 'error');
  }
}

async function loadLogs() {
  const snap = await get(ref(database, 'activityLogs'));
  const logs = snap.val() || {};
  allLogs = Object.entries(logs)
    .sort(([, a], [, b]) => (b.timestamp || 0) - (a.timestamp || 0))
    .map(([id, log]) => ({ id, ...log }));
}

function renderLogsTable(pageContent, logs) {
  pageContent.innerHTML = `
    <div class="table-container">
      <div class="table-header">
        <h3>Activity Logs / CCTV (${logs.length})</h3>
        <div class="table-actions">
          <input type="text" class="search-input" id="logSearch" placeholder="Cari log..." 
                 oninput="filterLogs()" />
          <select class="form-select" id="logUserFilter" onchange="filterLogs()" style="width:auto;padding:8px 36px 8px 12px;">
            <option value="">Semua User</option>
            ${[...new Set(logs.map(l => l.username))].map(u => `<option value="${escapeHtml(u)}">${escapeHtml(u)}</option>`).join('')}
          </select>
          <select class="form-select" id="logActionFilter" onchange="filterLogs()" style="width:auto;padding:8px 36px 8px 12px;">
            <option value="">Semua Aksi</option>
            ${[...new Set(logs.map(l => l.action))].map(a => `<option value="${escapeHtml(a)}">${escapeHtml(a)}</option>`).join('')}
          </select>
          <button class="btn btn-danger btn-sm" onclick="clearAllLogs()">
            <i data-lucide="trash-2"></i> Bersihkan
          </button>
        </div>
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
          ${logs.length === 0 ? '<tr><td colspan="4" style="text-align:center;color:var(--text-muted);padding:24px;">Belum ada aktivitas</td></tr>' : ''}
          ${logs.slice(0, 200).map(log => `
            <tr>
              <td style="font-size:12px;white-space:nowrap;">${formatDate(log.timestamp)}</td>
              <td><strong>${escapeHtml(log.username || '-')}</strong></td>
              <td><span class="badge badge-user">${escapeHtml(log.action || '-')}</span></td>
              <td>${escapeHtml(log.detail || '-')}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

  if (window.lucide) lucide.createIcons();
}

window.filterLogs = function() {
  const search = (document.getElementById('logSearch')?.value || '').toLowerCase();
  const userFilter = document.getElementById('logUserFilter')?.value || '';
  const actionFilter = document.getElementById('logActionFilter')?.value || '';

  const filtered = allLogs.filter(l => {
    const matchSearch = !search || (l.action || '').toLowerCase().includes(search) || (l.detail || '').toLowerCase().includes(search) || (l.username || '').toLowerCase().includes(search);
    const matchUser = !userFilter || l.username === userFilter;
    const matchAction = !actionFilter || l.action === actionFilter;
    return matchSearch && matchUser && matchAction;
  });

  const pageContent = document.getElementById('pageContent');
  renderLogsTable(pageContent, filtered);
};

window.clearAllLogs = async function() {
  showConfirm(
    'Bersihkan Semua Log',
    'Apakah Anda yakin ingin menghapus SEMUA activity logs? Tindakan ini tidak dapat dibatalkan.',
    async () => {
      try {
        await remove(ref(database, 'activityLogs'));
        const session = getSession();
        await logActivity(session.uid, session.username, 'clear_logs', 'Semua activity logs dibersihkan');
        showToast('Semua log berhasil dihapus.', 'success');
        allLogs = [];
        const pageContent = document.getElementById('pageContent');
        renderLogsTable(pageContent, []);
      } catch (error) {
        console.error('Clear logs error:', error);
        showToast('Gagal menghapus logs.', 'error');
      }
    }
  );
};

// Clean up interval on page change
window.addEventListener('hashchange', () => {
  clearInterval(refreshInterval);
});
