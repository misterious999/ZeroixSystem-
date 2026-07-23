document.addEventListener('DOMContentLoaded', async () => {
  while (!window.firebaseAPI) { await new Promise(r => setTimeout(r, 100)); }
  
  const path = window.location.pathname.split('/').pop() || 'dashboard.html';
  const isAdminPage = path.startsWith('admin-');
  const session = window.auth.checkSession(isAdminPage);
  if (!session) return;
  
  window.utils.renderLayout();
  const contentDiv = document.getElementById('page-content');
  const { db, ref, get, set, update, remove } = window.firebaseAPI;

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

  else if (path === 'admin-users.html') {
    document.getElementById('page-title').innerText = "Kelola Pengguna";
    
    contentDiv.innerHTML = `
      <div class="glass-card" style="margin-bottom:25px; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <h3>Daftar Pengguna</h3>
          <p class="text-muted" style="font-size:0.9rem;">Kelola akses dan data user panel.</p>
        </div>
        <button class="btn btn-primary" onclick="openAddUserModal()"><i data-lucide="plus"></i> Tambah User</button>
      </div>
      
      <div class="glass-card" style="overflow-x:auto;">
        <table id="users-table">
          <thead><tr><th>Username</th><th>Nama</th><th>WhatsApp</th><th>Sisa Waktu</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody><tr><td colspan="6" style="text-align:center;"><i data-lucide="loader" class="spin"></i> Memuat...</td></tr></tbody>
        </table>
      </div>

      <div id="addUserModal" class="modal-overlay">
        <div class="modal-box">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
            <h3 style="display:flex; align-items:center; gap:10px;"><i data-lucide="server" class="text-cyan"></i> Buat User & Server Node.js</h3>
            <button class="btn-icon" onclick="closeAddUserModal()"><i data-lucide="x"></i></button>
          </div>
          <form id="formAddUser" onsubmit="submitAddUser(event)">
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px;">
              <div class="form-group">
                <label>Username (Tanpa Spasi)</label>
                <input type="text" id="addUname" class="form-control" required pattern="[a-zA-Z0-9_]+">
              </div>
              <div class="form-group">
                <label>Password Panel</label>
                <input type="text" id="addPass" class="form-control" required>
              </div>
              <div class="form-group">
                <label>Nama Lengkap</label>
                <input type="text" id="addName" class="form-control" required>
              </div>
              <div class="form-group">
                <label>No. WhatsApp</label>
                <input type="number" id="addWA" class="form-control" required>
              </div>
            </div>
            <div class="form-group" style="margin-top:15px;">
              <label>Paket RAM Server</label>
              <select id="addRam" class="form-control" required style="background: var(--bg-dark);">
                ${window.CONFIG.pricing.ram.map(r => `<option value="${r.id}" data-price="${r.price}">${r.name}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label>Masa Aktif (Hari)</label>
              <input type="number" id="addDays" class="form-control" placeholder="Contoh: 30" required>
            </div>
            <button type="submit" id="btnSubmitUser" class="btn btn-primary" style="width:100%; margin-top:20px;">
              <i data-lucide="zap"></i> Buat Sekarang
            </button>
          </form>
        </div>
      </div>
    `;

    const snap = await get(ref(db, 'users'));
    const tbody = document.querySelector('#users-table tbody');
    if(snap.exists()) {
      tbody.innerHTML = '';
      Object.entries(snap.val()).forEach(([uname, data]) => {
        if(uname === 'admin') return; 
        const badge = data.isActive ? '<span class="badge-cyan">Aktif</span>' : '<span class="badge-danger">Nonaktif</span>';
        const sisaWaktu = window.utils.getCountdown(data.expiredAt);
        const teksSisaWaktu = sisaWaktu.isExpired 
            ? `<span class="text-danger">Expired</span>` 
            : `<span class="text-muted" style="font-size:0.85rem">${sisaWaktu.text}</span>`;

        tbody.innerHTML += `
          <tr>
            <td><b>${window.utils.escapeHtml(uname)}</b></td>
            <td>${window.utils.escapeHtml(data.name)}</td>
            <td><a href="https://wa.me/${data.whatsapp}" target="_blank" class="text-cyan">${data.whatsapp || '-'}</a></td>
            <td>${teksSisaWaktu}</td>
            <td>${badge}</td>
            <td>
              <button class="btn-icon" onclick="perpanjangUser('${uname}', ${data.expiredAt || 0})" title="Perpanjang Masa Aktif"><i data-lucide="calendar-clock" class="text-gold"></i></button>
              <button class="btn-icon" onclick="hapusUser('${uname}')" title="Hapus User & Server"><i data-lucide="trash-2" class="text-danger"></i></button>
            </td>
          </tr>
        `;
      });
    } else {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Hanya ada akun kamu.</td></tr>';
    }

    window.openAddUserModal = () => { document.getElementById('addUserModal').classList.add('active'); lucide.createIcons(); };
    window.closeAddUserModal = () => { document.getElementById('addUserModal').classList.remove('active'); document.getElementById('formAddUser').reset(); };

    window.submitAddUser = async (e) => {
        e.preventDefault();
        const btn = document.getElementById('btnSubmitUser');
        btn.innerHTML = '<i data-lucide="loader" class="spin"></i> Memproses...';
        btn.disabled = true;

        const uname = document.getElementById('addUname').value.toLowerCase();
        const pass = document.getElementById('addPass').value;
        const name = document.getElementById('addName').value;
        const wa = document.getElementById('addWA').value;
        const ram = document.getElementById('addRam').value;
        const days = parseInt(document.getElementById('addDays').value);
        const serverId = `srv-${Date.now().toString().slice(-6)}`;

        try {
            const checkUser = await get(ref(db, `users/${uname}`));
            if(checkUser.exists()) throw new Error("Username sudah terdaftar di Database!");

            await set(ref(db, `users/${uname}`), {
                password: pass, role: "user", name: name, whatsapp: wa,
                profilePic: "", panelRole: "member", ramPackage: ram,
                expiredAt: Date.now() + (days * 24 * 60 * 60 * 1000), 
                createdAt: Date.now(), isActive: true, isOnline: false
            });

            await set(ref(db, `servers/${serverId}`), {
                ownerUsername: uname, name: `Node.js Server (${name})`,
                ram: ram, node: "Node-1", status: "active", createdAt: Date.now()
            });

            window.utils.showToast('Berhasil! User & Server Node.js telah dibuat.', 'success');
            window.utils.logActivity('CREATE', `Membuat user ${uname} dengan paket ${ram}`);
            
            setTimeout(() => location.reload(), 1500);
        } catch (error) {
            window.utils.showToast(error.message, 'error');
            btn.innerHTML = '<i data-lucide="zap"></i> Buat Sekarang';
            btn.disabled = false;
        }
    };

    window.perpanjangUser = async (username, currentExpired) => {
        const daysInput = prompt(`Berapa HARI Anda ingin memperpanjang masa aktif user '${username}'?\n\n(Ketik angka saja, contoh: 30)`);
        if(daysInput === null || daysInput.trim() === "") return; 

        const days = parseInt(daysInput);
        if(isNaN(days) || days <= 0) {
            window.utils.showToast("Jumlah hari tidak valid!", "error");
            return;
        }

        try {
            const baseTime = (currentExpired && currentExpired > Date.now()) ? currentExpired : Date.now();
            const newExpiredAt = baseTime + (days * 24 * 60 * 60 * 1000);
            
            await update(ref(db, `users/${username}`), { expiredAt: newExpiredAt });
            window.utils.showToast(`Sukses! Masa aktif ${username} ditambah ${days} hari.`, 'success');
            window.utils.logActivity('UPDATE', `Menambah expired ${username} sebanyak ${days} hari`);
            
            setTimeout(() => location.reload(), 1500);
        } catch(e) {
            window.utils.showToast(e.message, 'error');
        }
    };

    window.hapusUser = async (username) => {
        if(!confirm(`⚠️ Hapus user '${username}'?\nKlik OK, lalu sistem akan menanyakan penghapusan server.`)) return;
        const hapusServerJuga = confirm(`🔥 HAPUS SERVER JUGA? (User + Semua Server)`);
        try {
            if(hapusServerJuga) {
                const srvSnap = await get(ref(db, 'servers'));
                if(srvSnap.exists()) {
                    for(let [sId, sData] of Object.entries(srvSnap.val())) {
                        if(sData.ownerUsername === username) await remove(ref(db, `servers/${sId}`));
                    }
                }
            }
            await remove(ref(db, `users/${username}`));
            window.utils.showToast('User berhasil dihapus!', 'success');
            setTimeout(() => location.reload(), 1000);
        } catch(e) { window.utils.showToast(e.message, 'error'); }
    };
  }

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
