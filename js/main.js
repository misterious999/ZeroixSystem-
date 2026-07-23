// ============================================
// ZEROIXDARK PTERO - LOGIC PER HALAMAN
// ============================================

document.addEventListener('DOMContentLoaded', async () => {
  while (!window.firebaseAPI) { await new Promise(r => setTimeout(r, 100)); }
  
  const path = window.location.pathname.split('/').pop() || 'dashboard.html';
  const isAdminPage = path.startsWith('admin-');
  const session = window.auth.checkSession(isAdminPage);
  if (!session) return;
  
  window.utils.renderLayout();
  const contentDiv = document.getElementById('page-content');
  const { db, ref, get, set, update, remove } = window.firebaseAPI;

  // ----------------------------------------------------
  // 1. HALAMAN: DASHBOARD.HTML
  // ----------------------------------------------------
  if (path === 'dashboard.html' || path === '') {
    document.getElementById('page-title').innerText = "Dashboard Overview";
    
    if (session.role === 'admin') {
      const usersSnap = await get(ref(db, 'users'));
      const users = usersSnap.exists() ? Object.values(usersSnap.val()) : [];
      const active = users.filter(u => u.isActive).length;
      const online = users.filter(u => u.isOnline).length;

      contentDiv.innerHTML = `
        <div class="stats-grid">
          <div class="glass-card stat-card">
            <div class="stat-icon"><i data-lucide="users"></i></div>
            <div class="stat-info"><h4>Total User</h4><h2>${users.length}</h2></div>
          </div>
          <div class="glass-card stat-card">
            <div class="stat-icon"><i data-lucide="check-circle"></i></div>
            <div class="stat-info"><h4>User Aktif</h4><h2>${active}</h2></div>
          </div>
          <div class="glass-card stat-card">
            <div class="stat-icon text-gold" style="background: rgba(251,191,36,0.1);"><i data-lucide="wifi"></i></div>
            <div class="stat-info"><h4>User Online</h4><h2>${online}</h2></div>
          </div>
        </div>
        <div class="glass-card">
          <h3 style="margin-bottom: 15px;">Aksi Cepat</h3>
          <div style="display:flex; gap:15px; flex-wrap: wrap;">
            <a href="admin-users.html" class="btn btn-primary"><i data-lucide="user-plus"></i> Kelola User</a>
            <a href="admin-servers.html" class="btn btn-secondary"><i data-lucide="server"></i> Cek Server</a>
          </div>
        </div>
      `;
    }
  }

  // ----------------------------------------------------
  // 2. HALAMAN: ADMIN-USERS.HTML (Kelola & Hapus User)
  // ----------------------------------------------------
  else if (path === 'admin-users.html') {
    document.getElementById('page-title').innerText = "Kelola Pengguna";
    
    contentDiv.innerHTML = `
      <div class="glass-card" style="margin-bottom:25px; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <h3>Daftar Pengguna</h3>
          <p class="text-muted" style="font-size:0.9rem;">Kelola akses dan data user panel.</p>
        </div>
        <button class="btn btn-primary" onclick="alert('Form Tambah User Pterodactyl API akan muncul di sini.')"><i data-lucide="plus"></i> Tambah User</button>
      </div>
      <div class="glass-card" style="overflow-x:auto;">
        <table id="users-table">
          <thead><tr><th>Username</th><th>Nama</th><th>WhatsApp</th><th>Role</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody><tr><td colspan="6" style="text-align:center;"><i data-lucide="loader" class="spin"></i> Memuat...</td></tr></tbody>
        </table>
      </div>
    `;

    // Fetch users
    const snap = await get(ref(db, 'users'));
    const tbody = document.querySelector('#users-table tbody');
    if(snap.exists()) {
      tbody.innerHTML = '';
      Object.entries(snap.val()).forEach(([uname, data]) => {
        if(uname === 'admin') return; // Sembunyikan super admin utama dari tabel hapus
        
        const badge = data.isActive ? '<span class="badge-cyan">Aktif</span>' : '<span class="badge-danger">Nonaktif</span>';
        tbody.innerHTML += `
          <tr>
            <td><b>${window.utils.escapeHtml(uname)}</b></td>
            <td>${window.utils.escapeHtml(data.name)}</td>
            <td><a href="https://wa.me/${data.whatsapp}" target="_blank" class="text-cyan">${data.whatsapp || '-'}</a></td>
            <td><span class="badge-${data.role==='admin'?'gold':'cyan'}">${data.role.toUpperCase()}</span></td>
            <td>${badge}</td>
            <td>
              <button class="btn-icon" onclick="hapusUser('${uname}')" title="Hapus User & Server"><i data-lucide="trash-2" class="text-danger"></i></button>
            </td>
          </tr>
        `;
      });
    } else {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Hanya ada akun kamu.</td></tr>';
    }

    // FUNGSI SAKTI: HAPUS USER + SERVER
    window.hapusUser = async (username) => {
        const isConfirm = confirm(`⚠️ PERINGATAN!\n\nApakah Anda yakin ingin menghapus user '${username}'?\nJika Anda menekan OK, sistem akan menanyakan apakah server miliknya juga ingin dihapus.`);
        if(!isConfirm) return;

        const hapusServerJuga = confirm(`🔥 HAPUS SERVER JUGA?\n\nKlik 'OK' untuk menghapus User + SEMUA Server miliknya.\nKlik 'Cancel' jika hanya ingin menghapus User saja.`);

        try {
            if(hapusServerJuga) {
                // Cari dan hapus semua server milik user ini
                const srvSnap = await get(ref(db, 'servers'));
                if(srvSnap.exists()) {
                    for(let [sId, sData] of Object.entries(srvSnap.val())) {
                        if(sData.ownerUsername === username || sData.ownerUsername === undefined) {
                            await remove(ref(db, `servers/${sId}`));
                        }
                    }
                }
            }
            // Hapus usernya
            await remove(ref(db, `users/${username}`));
            window.utils.showToast(`User ${username} ${hapusServerJuga ? '+ Servernya' : ''} berhasil dihapus!`, 'success');
            window.utils.logActivity('DELETE', `Menghapus ${username} ${hapusServerJuga ? 'beserta servernya' : ''}`);
            setTimeout(() => location.reload(), 1500);
        } catch(e) {
            window.utils.showToast(e.message, 'error');
        }
    };
  }

  // ----------------------------------------------------
  // 3. HALAMAN: ADMIN-SERVERS.HTML (Hapus Server Saja)
  // ----------------------------------------------------
  else if (path === 'admin-servers.html' || path === 'user-servers.html') {
    const isUserMode = path === 'user-servers.html';
    document.getElementById('page-title').innerText = isUserMode ? "Server Saya" : "Kelola Semua Server";
    
    contentDiv.innerHTML = `
      <div class="glass-card" style="margin-bottom:25px;">
        <h3>${isUserMode ? 'Daftar Server Kamu' : 'Daftar Seluruh Server'}</h3>
        <p class="text-muted" style="font-size:0.9rem;">Terkoneksi langsung ke database ZeroixDark.</p>
      </div>
      <div class="glass-card" style="overflow-x:auto;">
        <table id="servers-table">
          <thead><tr><th>ID Server</th><th>Pemilik</th><th>Nama Server</th><th>Node</th><th>Status</th>${isUserMode ? '' : '<th>Aksi</th>'}</tr></thead>
          <tbody><tr><td colspan="${isUserMode ? '5' : '6'}" style="text-align:center;"><i data-lucide="loader" class="spin"></i> Memuat...</td></tr></tbody>
        </table>
      </div>
    `;

    const srvSnap = await get(ref(db, 'servers'));
    const tbody = document.querySelector('#servers-table tbody');
    
    if(srvSnap.exists() && Object.keys(srvSnap.val()).length > 0 && !srvSnap.val()._placeholder) {
      tbody.innerHTML = '';
      Object.entries(srvSnap.val()).forEach(([sId, sData]) => {
        if(sId === '_placeholder') return;
        
        // Filter jika ini halaman user (hanya tampilkan miliknya)
        if(isUserMode && sData.ownerUsername !== session.username) return;

        const badgeStatus = sData.status === 'active' ? '<span class="badge-cyan">Active</span>' : '<span class="badge-danger">Suspended</span>';
        tbody.innerHTML += `
          <tr>
            <td><code>${sId.substring(0,8)}</code></td>
            <td><b>${sData.ownerUsername || 'Unknown'}</b></td>
            <td>${window.utils.escapeHtml(sData.name || 'Server')}</td>
            <td>${sData.node || 'Node-1'}</td>
            <td>${badgeStatus}</td>
            ${isUserMode ? '' : `<td><button class="btn-icon" onclick="hapusServer('${sId}')" title="Hapus Server"><i data-lucide="trash-2" class="text-danger"></i></button></td>`}
          </tr>
        `;
      });
      if(tbody.innerHTML === '') tbody.innerHTML = `<tr><td colspan="${isUserMode ? '5' : '6'}" style="text-align:center;">Tidak ada server.</td></tr>`;
    } else {
      tbody.innerHTML = `<tr><td colspan="${isUserMode ? '5' : '6'}" style="text-align:center;">Belum ada server yang dibuat.</td></tr>`;
    }

    // FUNGSI SAKTI: HAPUS SERVER SAJA
    if(!isUserMode) {
      window.hapusServer = async (serverId) => {
          if(!confirm(`🔥 Yakin ingin menghapus Server ID ${serverId} secara permanen?`)) return;
          try {
              await remove(ref(db, `servers/${serverId}`));
              window.utils.showToast(`Server berhasil dihapus!`, 'success');
              window.utils.logActivity('DELETE', `Menghapus server ID ${serverId}`);
              setTimeout(() => location.reload(), 1500);
          } catch(e) {
              window.utils.showToast(e.message, 'error');
          }
      };
    }
  }

  // Placeholder untuk halaman lain (mencegah blank)
  else {
    document.getElementById('page-title').innerText = "Halaman Tidak Ditemukan";
    contentDiv.innerHTML = `
      <div class="glass-card" style="text-align:center; padding: 50px;">
        <i data-lucide="alert-circle" class="text-danger" style="width:64px;height:64px; margin-bottom:20px;"></i>
        <h2>Halaman Belum Tersedia</h2>
        <p class="text-muted" style="margin-top:10px;">Fitur ini masih dalam tahap pengembangan.</p>
        <a href="dashboard.html" class="btn btn-primary" style="margin-top:20px;">Kembali ke Dashboard</a>
      </div>
    `;
  }

  lucide.createIcons();
});
