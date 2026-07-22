/**
 * Manage Servers page renderer (Admin only)
 */
import { database } from '../../config/firebase.js';
import { ref, get, remove, update } from 'firebase/database';
import { showToast, showConfirm } from '../toast.js';
import { escapeHtml, formatDate, logActivity } from '../utils.js';
import { getSession } from '../auth.js';

let allServers = [];

export async function renderManageServers() {
  const pageContent = document.getElementById('pageContent');

  try {
    const snap = await get(ref(database, 'users'));
    const users = snap.val() || {};
    allServers = [];

    for (const [uid, user] of Object.entries(users)) {
      if (user.servers) {
        for (const [sid, srv] of Object.entries(user.servers)) {
          allServers.push({
            uid,
            sid,
            owner: user.username || uid,
            ...srv
          });
        }
      }
    }

    renderServerTable(pageContent, allServers);
  } catch (error) {
    console.error('Manage servers error:', error);
    pageContent.innerHTML = '<div class="empty-state"><p>Gagal memuat data server.</p></div>';
    showToast('Gagal memuat data server.', 'error');
  }
}

function renderServerTable(pageContent, servers) {
  // Group by node
  const nodes = {};
  servers.forEach(s => {
    const node = s.node || 'default';
    if (!nodes[node]) nodes[node] = [];
    nodes[node].push(s);
  });

  pageContent.innerHTML = `
    <!-- Stats -->
    <div class="stats-grid" style="margin-bottom:24px;">
      <div class="stat-card">
        <div class="stat-icon cyan"><i data-lucide="server"></i></div>
        <div class="stat-value">${servers.length}</div>
        <div class="stat-label">Total Server</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green"><i data-lucide="check-circle"></i></div>
        <div class="stat-value">${servers.filter(s => s.status !== 'suspended').length}</div>
        <div class="stat-label">Server Aktif</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon red"><i data-lucide="x-circle"></i></div>
        <div class="stat-value">${servers.filter(s => s.status === 'suspended').length}</div>
        <div class="stat-label">Server Suspend</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon violet"><i data-lucide="hard-drive"></i></div>
        <div class="stat-value">${Object.keys(nodes).length}</div>
        <div class="stat-label">Node Aktif</div>
      </div>
    </div>

    <!-- Filter -->
    <div class="table-container">
      <div class="table-header">
        <h3>Kelola Server</h3>
        <div class="table-actions">
          <input type="text" class="search-input" id="serverSearch" placeholder="Cari server/owner..." 
                 oninput="filterServers()" />
          <select class="form-select" id="nodeFilter" onchange="filterServers()" style="width:auto;padding:8px 36px 8px 12px;">
            <option value="">Semua Node</option>
            ${Object.keys(nodes).map(n => `<option value="${escapeHtml(n)}">${escapeHtml(n)}</option>`).join('')}
          </select>
          <select class="form-select" id="statusFilter" onchange="filterServers()" style="width:auto;padding:8px 36px 8px 12px;">
            <option value="">Semua Status</option>
            <option value="active">Aktif</option>
            <option value="suspended">Suspend</option>
          </select>
        </div>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>Nama Server</th>
            <th>Owner</th>
            <th>RAM</th>
            <th>Status</th>
            <th>Node</th>
            <th>Dibuat</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          ${servers.length === 0 ? '<tr><td colspan="7" style="text-align:center;color:var(--text-muted);padding:24px;">Belum ada server</td></tr>' : ''}
          ${servers.map(s => `
            <tr>
              <td><strong>${escapeHtml(s.name || s.sid)}</strong></td>
              <td>${escapeHtml(s.owner)}</td>
              <td>${escapeHtml(s.ram || '-')}</td>
              <td>
                <span class="badge ${s.status === 'suspended' ? 'badge-inactive' : 'badge-active'}">
                  ${s.status === 'suspended' ? 'Suspend' : 'Aktif'}
                </span>
              </td>
              <td>${escapeHtml(s.node || 'default')}</td>
              <td style="font-size:12px;">${formatDate(s.createdAt)}</td>
              <td>
                <div class="table-actions-cell">
                  <button class="btn-icon" title="${s.status === 'suspended' ? 'Unsuspend' : 'Suspend'}" 
                    onclick="toggleServerSuspend('${s.uid}', '${s.sid}', '${s.status || 'active'}')">
                    <i data-lucide="${s.status === 'suspended' ? 'play' : 'pause'}"></i>
                  </button>
                  <button class="btn-icon danger" title="Hapus" onclick="deleteServer('${s.uid}', '${s.sid}', '${escapeHtml(s.name || s.sid)}')">
                    <i data-lucide="trash-2"></i>
                  </button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

  if (window.lucide) lucide.createIcons();
}

window.filterServers = function() {
  const search = (document.getElementById('serverSearch')?.value || '').toLowerCase();
  const nodeFilter = document.getElementById('nodeFilter')?.value || '';
  const statusFilter = document.getElementById('statusFilter')?.value || '';

  const filtered = allServers.filter(s => {
    const matchSearch = !search || (s.name || '').toLowerCase().includes(search) || (s.owner || '').toLowerCase().includes(search);
    const matchNode = !nodeFilter || s.node === nodeFilter;
    const matchStatus = !statusFilter || (statusFilter === 'active' ? s.status !== 'suspended' : s.status === 'suspended');
    return matchSearch && matchNode && matchStatus;
  });

  const pageContent = document.getElementById('pageContent');
  renderServerTable(pageContent, filtered);
};

window.toggleServerSuspend = async function(uid, sid, currentStatus) {
  const newStatus = currentStatus === 'suspended' ? 'active' : 'suspended';
  const action = newStatus === 'suspended' ? 'suspend' : 'unsuspend';

  showConfirm(
    newStatus === 'suspended' ? 'Suspend Server' : 'Unsuspend Server',
    `Apakah Anda yakin ingin ${action === 'suspend' ? 'mensuspend' : 'mengaktifkan kembali'} server ini?`,
    async () => {
      try {
        await update(ref(database, `users/${uid}/servers/${sid}`), { status: newStatus });
        const session = getSession();
        await logActivity(session.uid, session.username, `${action}_server`, `Server ${action}: ${sid}`);
        showToast(`Server berhasil di-${action === 'suspend' ? 'suspend' : 'aktifkan'}.`, 'success');
        await renderManageServers();
      } catch (error) {
        console.error('Toggle server error:', error);
        showToast('Gagal mengubah status server.', 'error');
      }
    }
  );
};

window.deleteServer = function(uid, sid, name) {
  showConfirm(
    'Hapus Server',
    `Apakah Anda yakin ingin menghapus server "${escapeHtml(name)}"? Tindakan ini tidak dapat dibatalkan.`,
    async () => {
      try {
        await remove(ref(database, `users/${uid}/servers/${sid}`));
        const session = getSession();
        await logActivity(session.uid, session.username, 'delete_server', `Server dihapus: ${name}`);
        showToast(`Server "${name}" berhasil dihapus.`, 'success');
        await renderManageServers();
      } catch (error) {
        console.error('Delete server error:', error);
        showToast('Gagal menghapus server.', 'error');
      }
    }
  );
};
