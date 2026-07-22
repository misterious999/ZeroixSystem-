/**
 * Manage Users page renderer (Admin only)
 */
import { database } from '../../config/firebase.js';
import { ref, get, set, update, remove, push } from 'firebase/database';
import { showToast, showConfirm } from '../toast.js';
import { escapeHtml, formatDate, generateId, getRoleColorClass, getRoleDisplayName, logActivity, RAM_PACKAGES, ROLE_PACKAGES } from '../utils.js';
import { getSession } from '../auth.js';

let allUsers = {};
let filteredUsers = [];
let currentPage = 1;
const perPage = 15;

export async function renderManageUsers() {
  const pageContent = document.getElementById('pageContent');

  try {
    const snap = await get(ref(database, 'users'));
    allUsers = snap.val() || {};
    filteredUsers = Object.entries(allUsers);
    currentPage = 1;
    renderUserTable(pageContent);
  } catch (error) {
    console.error('Manage users error:', error);
    pageContent.innerHTML = '<div class="empty-state"><p>Gagal memuat data user.</p></div>';
    showToast('Gagal memuat data user.', 'error');
  }
}

function renderUserTable(pageContent) {
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const paged = filteredUsers.slice(start, end);
  const totalPages = Math.ceil(filteredUsers.length / perPage);

  pageContent.innerHTML = `
    <div class="table-container">
      <div class="table-header">
        <h3>Kelola User (${filteredUsers.length})</h3>
        <div class="table-actions">
          <input type="text" class="search-input" id="userSearch" placeholder="Cari username..." 
                 oninput="filterUsers()" />
          <select class="form-select" id="roleFilter" onchange="filterUsers()" style="width:auto;padding:8px 36px 8px 12px;">
            <option value="">Semua Role</option>
            <option value="admin">Admin</option>
            <option value="reseller">Reseller</option>
            <option value="partner_publik_v1">Partner Publik V1</option>
            <option value="partner_publik_v2">Partner Publik V2</option>
            <option value="reseller_private">Reseller Private</option>
          </select>
          <select class="form-select" id="statusFilter" onchange="filterUsers()" style="width:auto;padding:8px 36px 8px 12px;">
            <option value="">Semua Status</option>
            <option value="active">Aktif</option>
            <option value="inactive">Nonaktif</option>
            <option value="expired">Expired</option>
          </select>
          <button class="btn btn-primary" onclick="openAddUserModal()">
            <i data-lucide="user-plus"></i> Tambah User
          </button>
        </div>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Nama</th>
            <th>Role</th>
            <th>RAM</th>
            <th>Expired</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          ${paged.length === 0 ? '<tr><td colspan="7" style="text-align:center;color:var(--text-muted);padding:24px;">Tidak ada data</td></tr>' : ''}
          ${paged.map(([uid, u]) => {
            const isExpired = u.expiredAt && Date.now() > u.expiredAt;
            return `
              <tr>
                <td><strong>${escapeHtml(u.username || '')}</strong></td>
                <td>${escapeHtml(u.name || '-')}</td>
                <td><span class="badge ${getRoleColorClass(u.role)}">${getRoleDisplayName(u.role)}</span></td>
                <td>${escapeHtml(u.ramPackage || '-')}</td>
                <td style="font-size:12px;">${formatDate(u.expiredAt)}</td>
                <td>
                  <span class="badge ${isExpired ? 'badge-expired' : (u.isActive !== false ? 'badge-active' : 'badge-inactive')}">
                    ${isExpired ? 'Expired' : (u.isActive !== false ? 'Aktif' : 'Nonaktif')}
                  </span>
                </td>
                <td>
                  <div class="table-actions-cell">
                    <button class="btn-icon" title="Edit" onclick="openEditUserModal('${uid}')"><i data-lucide="edit-2"></i></button>
                    <button class="btn-icon" title="Perpanjang" onclick="openExtendModal('${uid}')"><i data-lucide="calendar-plus"></i></button>
                    <button class="btn-icon" title="${u.isActive !== false ? 'Nonaktifkan' : 'Aktifkan'}" onclick="toggleUserActive('${uid}')">
                      <i data-lucide="${u.isActive !== false ? 'user-x' : 'user-check'}"></i>
                    </button>
                    <button class="btn-icon" title="Lihat Server" onclick="viewUserServers('${uid}')"><i data-lucide="server"></i></button>
                    <button class="btn-icon danger" title="Hapus" onclick="deleteUser('${uid}')"><i data-lucide="trash-2"></i></button>
                  </div>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
      ${totalPages > 1 ? `
        <div class="pagination">
          <button class="page-btn" onclick="goToPage(${currentPage - 1})" ${currentPage <= 1 ? 'disabled' : ''}>←</button>
          ${Array.from({ length: totalPages }, (_, i) => i + 1).map(p => `
            <button class="page-btn ${p === currentPage ? 'active' : ''}" onclick="goToPage(${p})">${p}</button>
          `).join('')}
          <button class="page-btn" onclick="goToPage(${currentPage + 1})" ${currentPage >= totalPages ? 'disabled' : ''}>→</button>
        </div>
      ` : ''}
    </div>
  `;

  if (window.lucide) lucide.createIcons();
}

window.filterUsers = function() {
  const search = (document.getElementById('userSearch')?.value || '').toLowerCase();
  const roleFilter = document.getElementById('roleFilter')?.value || '';
  const statusFilter = document.getElementById('statusFilter')?.value || '';

  filteredUsers = Object.entries(allUsers).filter(([uid, u]) => {
    const matchSearch = !search || (u.username || '').toLowerCase().includes(search) || (u.name || '').toLowerCase().includes(search);
    const matchRole = !roleFilter || u.role === roleFilter;
    const isExpired = u.expiredAt && Date.now() > u.expiredAt;
    let matchStatus = true;
    if (statusFilter === 'active') matchStatus = u.isActive !== false && !isExpired;
    else if (statusFilter === 'inactive') matchStatus = u.isActive === false;
    else if (statusFilter === 'expired') matchStatus = isExpired;
    return matchSearch && matchRole && matchStatus;
  });

  currentPage = 1;
  const pageContent = document.getElementById('pageContent');
  renderUserTable(pageContent);
};

window.goToPage = function(page) {
  const totalPages = Math.ceil(filteredUsers.length / perPage);
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  const pageContent = document.getElementById('pageContent');
  renderUserTable(pageContent);
};

window.openAddUserModal = function() {
  const overlay = document.getElementById('modalOverlay');
  const modal = document.getElementById('modalContent');
  overlay.style.display = 'flex';
  
  const ramOptions = RAM_PACKAGES.map(p => `<option value="${p.id}">${p.name} - Rp ${p.price}</option>`).join('');
  const roleOptions = [
    ...ROLE_PACKAGES.map(p => `<option value="${p.id}">${p.name}</option>`),
  ].join('');

  modal.innerHTML = `
    <div class="modal-header">
      <i data-lucide="user-plus" style="color:var(--accent-cyan);"></i>
      <h2>Tambah User Baru</h2>
    </div>
    <div class="modal-body">
      <form id="addUserForm">
        <div class="form-group">
          <label class="form-label">Username *</label>
          <input type="text" class="form-input" id="addUsername" required placeholder="Masukkan username" />
        </div>
        <div class="form-group">
          <label class="form-label">Password *</label>
          <input type="password" class="form-input" id="addPassword" required placeholder="Masukkan password" />
        </div>
        <div class="form-group">
          <label class="form-label">Nama Lengkap *</label>
          <input type="text" class="form-input" id="addName" required placeholder="Nama lengkap" />
        </div>
        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" class="form-input" id="addEmail" placeholder="email@example.com" />
        </div>
        <div class="form-group">
          <label class="form-label">WhatsApp</label>
          <input type="text" class="form-input" id="addWhatsapp" placeholder="08xxxxxxxxxx" />
        </div>
        <div class="form-group">
          <label class="form-label">Role *</label>
          <select class="form-select" id="addRole">
            <option value="reseller">Reseller</option>
            <option value="partner_publik_v1">Partner Publik V1</option>
            <option value="partner_publik_v2">Partner Publik V2</option>
            <option value="reseller_private">Reseller Private</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Paket RAM *</label>
          <select class="form-select" id="addRam">${ramOptions}</select>
        </div>
        <div class="form-group">
          <label class="form-label">Expired At *</label>
          <input type="date" class="form-input" id="addExpired" required />
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal()">Batal</button>
      <button class="btn btn-primary" onclick="saveNewUser()">Simpan</button>
    </div>
  `;

  if (window.lucide) lucide.createIcons();
};

window.saveNewUser = async function() {
  const username = document.getElementById('addUsername').value.trim();
  const password = document.getElementById('addPassword').value.trim();
  const name = document.getElementById('addName').value.trim();
  const email = document.getElementById('addEmail').value.trim();
  const whatsapp = document.getElementById('addWhatsapp').value.trim();
  const role = document.getElementById('addRole').value;
  const ramPackage = document.getElementById('addRam').value;
  const expiredDate = document.getElementById('addExpired').value;

  if (!username || !password || !name) {
    showToast('Mohon isi semua field yang wajib (*).', 'warning');
    return;
  }

  // Check duplicate username
  for (const [, u] of Object.entries(allUsers)) {
    if (u.username && u.username.toLowerCase() === username.toLowerCase()) {
      showToast('Username sudah digunakan.', 'error');
      return;
    }
  }

  const uid = generateId();
  const expiredAt = expiredDate ? new Date(expiredDate).getTime() : null;

  try {
    const userRef = ref(database, `users/${uid}`);
    await set(userRef, {
      username,
      password,
      role,
      name,
      email,
      whatsapp,
      profilePic: '',
      panelRole: role,
      ramPackage,
      expiredAt,
      createdAt: Date.now(),
      isActive: true,
      isOnline: false,
      lastLoginAt: 0,
      servers: {}
    });

    const session = getSession();
    await logActivity(session.uid, session.username, 'create_user', `User baru dibuat: ${username}`);

    closeModal();
    showToast(`User "${username}" berhasil ditambahkan.`, 'success');
    await renderManageUsers();
  } catch (error) {
    console.error('Create user error:', error);
    showToast('Gagal menambahkan user.', 'error');
  }
};

window.openEditUserModal = async function(uid) {
  const overlay = document.getElementById('modalOverlay');
  const modal = document.getElementById('modalContent');
  const user = allUsers[uid];
  if (!user) return;

  overlay.style.display = 'flex';

  const ramOptions = RAM_PACKAGES.map(p => 
    `<option value="${p.id}" ${p.id === user.ramPackage ? 'selected' : ''}>${p.name} - Rp ${p.price}</option>`
  ).join('');

  const roleOptions = ['reseller', 'partner_publik_v1', 'partner_publik_v2', 'reseller_private', 'admin']
    .map(r => `<option value="${r}" ${r === user.role ? 'selected' : ''}>${getRoleDisplayName(r)}</option>`)
    .join('');

  const expiryDate = user.expiredAt ? new Date(user.expiredAt).toISOString().split('T')[0] : '';

  modal.innerHTML = `
    <div class="modal-header">
      <i data-lucide="edit-2" style="color:var(--accent-cyan);"></i>
      <h2>Edit User: ${escapeHtml(user.username)}</h2>
    </div>
    <div class="modal-body">
      <form id="editUserForm">
        <div class="form-group">
          <label class="form-label">Username</label>
          <input type="text" class="form-input" value="${escapeHtml(user.username)}" disabled style="opacity:0.6;" />
        </div>
        <div class="form-group">
          <label class="form-label">Nama Lengkap *</label>
          <input type="text" class="form-input" id="editName" value="${escapeHtml(user.name || '')}" />
        </div>
        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" class="form-input" id="editEmail" value="${escapeHtml(user.email || '')}" />
        </div>
        <div class="form-group">
          <label class="form-label">WhatsApp</label>
          <input type="text" class="form-input" id="editWhatsapp" value="${escapeHtml(user.whatsapp || '')}" />
        </div>
        <div class="form-group">
          <label class="form-label">Role *</label>
          <select class="form-select" id="editRole">${roleOptions}</select>
        </div>
        <div class="form-group">
          <label class="form-label">Paket RAM *</label>
          <select class="form-select" id="editRam">${ramOptions}</select>
        </div>
        <div class="form-group">
          <label class="form-label">Expired At</label>
          <input type="date" class="form-input" id="editExpired" value="${expiryDate}" />
        </div>
        <div class="form-group">
          <label class="form-label">URL Foto Profil</label>
          <input type="url" class="form-input" id="editProfilePic" value="${escapeHtml(user.profilePic || '')}" placeholder="https://..." />
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal()">Batal</button>
      <button class="btn btn-primary" onclick="saveEditUser('${uid}')">Simpan</button>
    </div>
  `;

  if (window.lucide) lucide.createIcons();
};

window.saveEditUser = async function(uid) {
  const name = document.getElementById('editName').value.trim();
  const email = document.getElementById('editEmail').value.trim();
  const whatsapp = document.getElementById('editWhatsapp').value.trim();
  const role = document.getElementById('editRole').value;
  const ramPackage = document.getElementById('editRam').value;
  const expiredDate = document.getElementById('editExpired').value;
  const profilePic = document.getElementById('editProfilePic').value.trim();

  if (!name) {
    showToast('Nama wajib diisi.', 'warning');
    return;
  }

  const expiredAt = expiredDate ? new Date(expiredDate).getTime() : null;

  try {
    await update(ref(database, `users/${uid}`), {
      name,
      email,
      whatsapp,
      role,
      panelRole: role,
      ramPackage,
      expiredAt,
      profilePic
    });

    const session = getSession();
    await logActivity(session.uid, session.username, 'edit_user', `User diedit: ${uid}`);

    closeModal();
    showToast('User berhasil diperbarui.', 'success');
    await renderManageUsers();
  } catch (error) {
    console.error('Edit user error:', error);
    showToast('Gagal memperbarui user.', 'error');
  }
};

window.toggleUserActive = async function(uid) {
  const user = allUsers[uid];
  if (!user) return;

  const isActive = user.isActive !== false;
  showConfirm(
    isActive ? 'Nonaktifkan User' : 'Aktifkan User',
    `Apakah Anda yakin ingin ${isActive ? 'menonaktifkan' : 'mengaktifkan'} user "${escapeHtml(user.username)}"?`,
    async () => {
      try {
        await update(ref(database, `users/${uid}`), { isActive: !isActive });
        const session = getSession();
        await logActivity(session.uid, session.username, isActive ? 'deactivate_user' : 'activate_user', 
          `User ${isActive ? 'dinonaktifkan' : 'diaktifkan'}: ${user.username}`);
        showToast(`User berhasil ${isActive ? 'dinonaktifkan' : 'diaktifkan'}.`, 'success');
        await renderManageUsers();
      } catch (error) {
        console.error('Toggle user error:', error);
        showToast('Gagal mengubah status user.', 'error');
      }
    }
  );
};

window.openExtendModal = function(uid) {
  const overlay = document.getElementById('modalOverlay');
  const modal = document.getElementById('modalContent');
  const user = allUsers[uid];
  if (!user) return;

  overlay.style.display = 'flex';

  modal.innerHTML = `
    <div class="modal-header">
      <i data-lucide="calendar-plus" style="color:var(--accent-cyan);"></i>
      <h2>Perpanjang User: ${escapeHtml(user.username)}</h2>
    </div>
    <div class="modal-body">
      <p style="margin-bottom:16px;color:var(--text-secondary);">
        Expired saat ini: <strong>${formatDate(user.expiredAt)}</strong>
      </p>
      <div class="form-group">
        <label class="form-label">Tambah Hari</label>
        <input type="number" class="form-input" id="extendDays" min="1" placeholder="Jumlah hari (misal: 30)" />
      </div>
      <div class="form-group">
        <label class="form-label">Atau Tanggal Custom</label>
        <input type="date" class="form-input" id="extendDate" />
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal()">Batal</button>
      <button class="btn btn-primary" onclick="extendUser('${uid}')">Perpanjang</button>
    </div>
  `;

  if (window.lucide) lucide.createIcons();
};

window.extendUser = async function(uid) {
  const days = parseInt(document.getElementById('extendDays').value);
  const customDate = document.getElementById('extendDate').value;

  let newExpiredAt;
  if (customDate) {
    newExpiredAt = new Date(customDate).getTime();
  } else if (days && days > 0) {
    const currentExpired = allUsers[uid].expiredAt || Date.now();
    newExpiredAt = currentExpired + (days * 24 * 60 * 60 * 1000);
  } else {
    showToast('Masukkan jumlah hari atau tanggal custom.', 'warning');
    return;
  }

  try {
    await update(ref(database, `users/${uid}`), { expiredAt: newExpiredAt, isActive: true });
    const session = getSession();
    await logActivity(session.uid, session.username, 'extend_user', `User diperpanjang: ${allUsers[uid].username}`);
    closeModal();
    showToast('User berhasil diperpanjang.', 'success');
    await renderManageUsers();
  } catch (error) {
    console.error('Extend user error:', error);
    showToast('Gagal memperpanjang user.', 'error');
  }
};

window.deleteUser = function(uid) {
  const user = allUsers[uid];
  if (!user) return;

  showConfirm(
    'Hapus User',
    `Apakah Anda yakin ingin menghapus user "${escapeHtml(user.username)}"? Tindakan ini tidak dapat dibatalkan.`,
    async () => {
      try {
        await remove(ref(database, `users/${uid}`));
        const session = getSession();
        await logActivity(session.uid, session.username, 'delete_user', `User dihapus: ${user.username}`);
        showToast(`User "${user.username}" berhasil dihapus.`, 'success');
        await renderManageUsers();
      } catch (error) {
        console.error('Delete user error:', error);
        showToast('Gagal menghapus user.', 'error');
      }
    }
  );
};

window.viewUserServers = function(uid) {
  const user = allUsers[uid];
  if (!user || !user.servers) {
    showInfoModal('Server User', '<p>User ini belum memiliki server.</p>');
    return;
  }

  const serversHtml = Object.entries(user.servers).map(([sid, srv]) => `
    <div style="padding:12px;background:var(--bg-primary);border-radius:8px;margin-bottom:8px;border:1px solid var(--border-color);">
      <div style="font-weight:600;">${escapeHtml(srv.name || sid)}</div>
      <div style="font-size:12px;color:var(--text-muted);">RAM: ${escapeHtml(srv.ram || '-')} | Status: ${srv.status || 'active'}</div>
      <div style="font-size:11px;color:var(--text-muted);margin-top:4px;">Node: ${escapeHtml(srv.node || '-')}</div>
    </div>
  `).join('');

  showInfoModal(`Server milik ${escapeHtml(user.username)}`, serversHtml);
};

window.closeModal = function() {
  document.getElementById('modalOverlay').style.display = 'none';
};
