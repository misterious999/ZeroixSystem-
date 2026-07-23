// ============================================
// LOGIKA PER HALAMAN BERDASARKAN URL PATH
// ============================================

document.addEventListener('DOMContentLoaded', async () => {
  // Tunggu Firebase Module Ready
  while (!window.firebaseAPI) { await new Promise(r => setTimeout(r, 100)); }
  
  const path = window.location.pathname.split('/').pop() || 'dashboard.html';
  
  // Guard Clauses
  const isAdminPage = path.startsWith('admin-');
  const session = window.auth.checkSession(isAdminPage);
  if (!session) return; // auth.js will redirect
  
  // Inject Sidebar & Navbar UI (Menghemat duplikasi HTML)
  window.utils.renderLayout();
  const contentDiv = document.getElementById('page-content');
  const { db, ref, get, set, update, remove } = window.firebaseAPI;

  // --- DASHBOARD.HTML ---
  if (path === 'dashboard.html') {
    document.getElementById('page-title').innerText = "Dashboard Overview";
    
    if (session.role === 'admin') {
      // Admin Dashboard View
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
          <h3>Quick Actions</h3>
          <div style="display:flex; gap:10px; margin-top:15px;">
            <a href="admin-users.html" class="btn btn-primary"><i data-lucide="user-plus"></i> Tambah User</a>
            <a href="admin-servers.html" class="btn btn-secondary"><i data-lucide="server"></i> Cek Server</a>
          </div>
        </div>
      `;
    } else {
      // User Dashboard View
      const myPackage = window.CONFIG.pricing.ram.find(p => p.id === session.ramPackage) || { name: 'Belum ada' };
      const roleName = session.panelRole ? session.panelRole.replace(/_/g, ' ').toUpperCase() : 'Member';
      
      contentDiv.innerHTML = `
        <div class="glass-card" style="margin-bottom:20px; background: radial-gradient(circle at right, rgba(56,189,248,0.1), transparent 50%); border-color: rgba(56,189,248,0.3);">
          <h2>Selamat datang, ${window.utils.escapeHtml(session.name)}! ⚡</h2>
          <p class="text-muted" style="margin-top:5px;">Kelola server ZeroixDark Ptero Anda di sini.</p>
        </div>
        <div class="stats-grid">
          <div class="glass-card stat-card">
            <div class="stat-icon"><i data-lucide="hard-drive"></i></div>
            <div class="stat-info"><h4>Paket RAM</h4><h2>${myPackage.name}</h2></div>
          </div>
          <div class="glass-card stat-card">
            <div class="stat-icon text-violet" style="background:rgba(124,58,237,0.1); color:var(--accent-violet)"><i data-lucide="shield"></i></div>
            <div class="stat-info"><h4>Role Panel</h4><h2>${roleName}</h2></div>
          </div>
        </div>
        <a href="user-servers.html" class="btn btn-primary">Lihat Server Saya <i data-lucide="arrow-right"></i></a>
      `;
    }
  }

  // --- ADMIN-USERS.HTML ---
  else if (path === 'admin-users.html') {
    document.getElementById('page-title').innerText = "Kelola Pengguna";
    contentDiv.innerHTML = `
      <div class="glass-card" style="margin-bottom:20px; display:flex; justify-content:space-between; align-items:center;">
        <h3>Daftar Pengguna</h3>
        <button class="btn btn-primary" onclick="alert('Fitur tambah user (Form Modal) diimplementasikan di sini. Terhubung ke Pterodactyl API.')"><i data-lucide="plus"></i> User Baru</button>
      </div>
      <div class="glass-card" style="overflow-x:auto;">
        <table id="users-table">
          <thead><tr><th>Username</th><th>Nama</th><th>WhatsApp</th><th>Role</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody><tr><td colspan="6" style="text-align:center;">Memuat data...</td></tr></tbody>
        </table>
      </div>
    `;
    // Fetch users
    const snap = await get(ref(db, 'users'));
    const tbody = document.querySelector('#users-table tbody');
    if(snap.exists()) {
      tbody.innerHTML = '';
      Object.entries(snap.val()).forEach(([uname, data]) => {
        const badge = data.isActive ? '<span class="badge-cyan">Aktif</span>' : '<span class="badge-danger">Nonaktif</span>';
        tbody.innerHTML += `
          <tr>
            <td>${window.utils.escapeHtml(uname)}</td>
            <td>${window.utils.escapeHtml(data.name)}</td>
            <td><a href="https://wa.me/${data.whatsapp}" target="_blank" class="text-cyan">${data.whatsapp || '-'}</a></td>
            <td><span class="badge-${data.role==='admin'?'gold':'cyan'}">${data.role.toUpperCase()}</span></td>
            <td>${badge}</td>
            <td>
              <button class="btn-icon" title="Edit"><i data-lucide="edit"></i></button>
              <button class="btn-icon" title="Hapus"><i data-lucide="trash-2" class="text-danger"></i></button>
            </td>
          </tr>
        `;
      });
    } else {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Tidak ada user</td></tr>';
    }
  }

  // --- USER-PACKAGES.HTML ---
  else if (path === 'user-packages.html') {
    document.getElementById('page-title').innerText = "Upgrade Paket";
    let html = `<h3 style="margin-bottom:20px;">Paket RAM Server Panel</h3><div class="grid" style="padding:0; margin-bottom:40px;">`;
    
    CONFIG.pricing.ram.forEach(pkg => {
      const msg = `Halo Admin ZeroixDark Ptero,\nSaya ingin upgrade paket:\n📦 Paket RAM: ${pkg.name}\n👤 Username: ${session.username}`;
      const url = `https://wa.me/${CONFIG.whatsapp.ownerNumber}?text=${encodeURIComponent(msg)}`;
      html += `
        <div class="glass-card">
          <h4>${pkg.name}</h4>
          <h2 class="text-cyan" style="margin:10px 0;">Rp ${pkg.price}</h2>
          <a href="${url}" target="_blank" class="btn btn-primary" style="width:100%; margin-top:15px;"><i data-lucide="shopping-cart"></i> Beli via WA</a>
        </div>
      `;
    });
    
    html += `</div><h3 style="margin-bottom:20px;">Role Panel (Bulanan)</h3><div class="grid" style="padding:0;">`;
    
    CONFIG.pricing.roles.forEach(role => {
      const msg = `Halo Admin ZeroixDark Ptero,\nSaya ingin berlangganan Role:\n🏷️ Role: ${role.name}\n👤 Username: ${session.username}`;
      const url = `https://wa.me/${CONFIG.whatsapp.ownerNumber}?text=${encodeURIComponent(msg)}`;
      html += `
        <div class="glass-card">
          <h4>${role.name}</h4>
          <h2 class="text-violet" style="margin:10px 0;">Rp ${role.price}</h2>
          <p class="text-muted" style="font-size:0.8rem;">Perpanjang: Rp ${role.renew}/bln</p>
          <a href="${url}" target="_blank" class="btn btn-secondary" style="width:100%; margin-top:15px;"><i data-lucide="message-circle"></i> Pesan via WA</a>
        </div>
      `;
    });
    
    html += `</div>`;
    contentDiv.innerHTML = html;
  }

  // --- ADMIN-LOGS.HTML ---
  else if (path === 'admin-logs.html') {
    document.getElementById('page-title').innerText = "Activity Logs";
    contentDiv.innerHTML = `
      <div class="glass-card">
        <table id="logs-table">
          <thead><tr><th>Waktu</th><th>User</th><th>Aksi</th><th>Detail</th></tr></thead>
          <tbody><tr><td colspan="4" style="text-align:center;">Memuat data...</td></tr></tbody>
        </table>
      </div>
    `;
    const snap = await get(ref(db, 'activityLogs'));
    const tbody = document.querySelector('#logs-table tbody');
    if(snap.exists()) {
      const logs = Object.values(snap.val()).sort((a,b) => b.timestamp - a.timestamp);
      tbody.innerHTML = logs.map(l => `
        <tr>
          <td><span class="text-muted" style="font-size:0.85rem">${window.utils.formatTanggal(l.timestamp)}</span></td>
          <td><b>${window.utils.escapeHtml(l.username)}</b></td>
          <td><span class="badge-cyan">${l.action}</span></td>
          <td>${window.utils.escapeHtml(l.detail)}</td>
        </tr>
      `).join('');
    } else {
      tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;">Tidak ada catatan aktivitas.</td></tr>';
    }
  }
  
  // Fallbacks for other pages (Placeholder visual untuk kelengkapan struktur)
  else {
    document.getElementById('page-title').innerText = path.replace('.html', '').replace('-', ' ').toUpperCase();
    contentDiv.innerHTML = `
      <div class="glass-card" style="text-align:center; padding: 50px;">
        <i data-lucide="layout" class="text-cyan" style="width:64px;height:64px; margin-bottom:20px;"></i>
        <h2>UI Halaman ${path}</h2>
        <p class="text-muted" style="margin-top:10px;">Halaman di-render sempurna berdasarkan konfigurasi ZeroixDark Ptero.</p>
      </div>
    `;
  }

  lucide.createIcons();
});
