// ============================================
// ZEROIXDARK PTERO - LOGIKA UTAMA FULL AUTO (CORS BYPASSED)
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
  
  // Konfigurasi Pterodactyl API & Cloudflare Worker (Bypass CORS)
  const pteroConfig = window.CONFIG.ptero.primary;
  const WORKER_URL = "https://restless-truth-9b75.amisterious09.workers.dev";
  const pteroHeaders = {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${pteroConfig.apiKey}`
  };

  // =====================================================================
  // 🔥 FUNGSI SAKTI 1: AUTO-DELETE JIKA EXPIRED (Tembus CORS)
  // =====================================================================
  if (session.role === 'user' && session.expiredAt > 0 && Date.now() > session.expiredAt) {
      document.body.innerHTML = `
        <div style="height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; background:var(--bg-dark); color:var(--danger);">
            <i data-lucide="alert-triangle" style="width:80px;height:80px;margin-bottom:20px;" class="spin"></i>
            <h2>Akun Kedaluwarsa!</h2>
            <p style="color:var(--text-muted); margin-top:10px;">Menghapus server dan data Anda dari sistem...</p>
        </div>
      `;
      lucide.createIcons();
      
      try {
          const srvSnap = await get(ref(db, 'servers'));
          if (srvSnap.exists()) {
              for (let [sId, sData] of Object.entries(srvSnap.val())) {
                  if (sData.ownerUsername === session.username) {
                      // Bypass CORS untuk hapus Server & User
                      if (sData.pteroServerId) {
                          await fetch(`${WORKER_URL}/?${pteroConfig.url}/api/application/servers/${sData.pteroServerId}/force`, { method: 'DELETE', headers: pteroHeaders });
                      }
                      if (sData.pteroUserId) {
                          await fetch(`${WORKER_URL}/?${pteroConfig.url}/api/application/users/${sData.pteroUserId}`, { method: 'DELETE', headers: pteroHeaders });
                      }
                      await remove(ref(db, `servers/${sId}`));
                  }
              }
          }
          await remove(ref(db, `users/${session.username}`));
          window.utils.logActivity('AUTO_DELETE', `Sistem menghapus otomatis akun expired: ${session.username}`);
      } catch (e) {
          console.error("Gagal auto-delete Pterodactyl:", e);
      }
      
      setTimeout(() => {
          localStorage.removeItem('session');
          window.location.href = 'login.html';
      }, 3000);
      return; 
  }

  // =====================================================================
  // 1. HALAMAN DASHBOARD (ADMIN & USER)
  // =====================================================================
  if (path === 'dashboard.html' || path === '') {
    if (session.role === 'admin') {
      document.getElementById('page-title').innerText = "Dashboard Overview";
      const usersSnap = await get(ref(db, 'users'));
      const users = usersSnap.exists() ? Object.values(usersSnap.val()) : [];
      const active = users.filter(u => u.isActive).length;

      contentDiv.innerHTML = `
        <div class="stats-grid">
          <div class="glass-card stat-card"><div class="stat-icon"><i data-lucide="users"></i></div><div class="stat-info"><h4>Total User</h4><h2>${users.length}</h2></div></div>
          <div class="glass-card stat-card"><div class="stat-icon"><i data-lucide="check-circle"></i></div><div class="stat-info"><h4>User Aktif</h4><h2>${active}</h2></div></div>
        </div>
        <div class="glass-card">
          <h3 style="margin-bottom: 15px;">Aksi Cepat</h3>
          <div style="display:flex; gap:15px;"><a href="admin-users.html" class="btn btn-primary">Kelola User</a></div>
        </div>
      `;
    } else {
      document.getElementById('page-title').innerText = "Monitoring Server";
      
      contentDiv.innerHTML = `
        <div class="glass-card" style="margin-bottom:20px; border-color: var(--accent-cyan);">
          <h2 style="margin-bottom:5px;">Sisa Waktu Panel Anda:</h2>
          <h1 id="live-countdown" class="text-cyan" style="font-size:2.5rem; letter-spacing: 2px;">Memuat...</h1>
        </div>
        
        <div class="glass-card">
           <h3 style="margin-bottom:20px; display:flex; align-items:center; gap:10px;"><i data-lucide="activity" class="text-cyan"></i> Server Resource (Live)</h3>
           
           <div style="margin-bottom:15px;">
               <div style="display:flex; justify-content:space-between; margin-bottom:5px;"><label>RAM Usage</label><span id="stat-ram">0 MB / 0 MB</span></div>
               <div style="width:100%; background:rgba(0,0,0,0.3); border-radius:10px; height:12px; overflow:hidden;">
                   <div id="bar-ram" style="width:0%; height:100%; background:var(--accent-cyan); transition:0.5s;"></div>
               </div>
           </div>
           
           <div style="margin-bottom:15px;">
               <div style="display:flex; justify-content:space-between; margin-bottom:5px;"><label>CPU Usage</label><span id="stat-cpu">0%</span></div>
               <div style="width:100%; background:rgba(0,0,0,0.3); border-radius:10px; height:12px; overflow:hidden;">
                   <div id="bar-cpu" style="width:0%; height:100%; background:var(--accent-gold); transition:0.5s;"></div>
               </div>
           </div>

           <div style="margin-bottom:15px;">
               <div style="display:flex; justify-content:space-between; margin-bottom:5px;"><label>Disk Storage</label><span id="stat-disk">0 MB</span></div>
               <div style="width:100%; background:rgba(0,0,0,0.3); border-radius:10px; height:12px; overflow:hidden;">
                   <div id="bar-disk" style="width:0%; height:100%; background:var(--accent-violet); transition:0.5s;"></div>
               </div>
           </div>
        </div>
      `;

      setInterval(() => {
          const diff = session.expiredAt - Date.now();
          if (diff <= 0) {
              document.getElementById('live-countdown').innerHTML = `<span class="text-danger">EXPIRED</span>`;
              window.location.reload(); 
              return;
          }
          const d = Math.floor(diff / (1000 * 60 * 60 * 24));
          const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const m = Math.floor((diff / 1000 / 60) % 60);
          const s = Math.floor((diff / 1000) % 60);
          document.getElementById('live-countdown').innerText = `${d} Hari ${h} Jam ${m} Mnt ${s} Dtk`;
      }, 1000);

      const fetchStats = async () => {
          try {
              const srvSnap = await get(ref(db, 'servers'));
              if(srvSnap.exists()) {
                  const myServer = Object.values(srvSnap.val()).find(s => s.ownerUsername === session.username);
                  if(myServer && myServer.pteroIdentifier) {
                      // Bypass CORS untuk ambil live stat
                      const statRes = await fetch(`${WORKER_URL}/?${pteroConfig.url}/api/client/servers/${myServer.pteroIdentifier}/resources`, {
                          headers: { "Accept": "application/json", "Authorization": `Bearer ${window.CONFIG.ptero.clientApiKey || pteroConfig.apiKey}` }
                      });
                      
                      if(statRes.ok) {
                          const stats = await statRes.json();
                          const ramUsed = (stats.attributes.resources.memory_bytes / 1024 / 1024).toFixed(0);
                          const diskUsed = (stats.attributes.resources.disk_bytes / 1024 / 1024).toFixed(0);
                          const cpuUsed = stats.attributes.resources.cpu_absolute.toFixed(1);
                          
                          document.getElementById('stat-ram').innerText = `${ramUsed} MB`;
                          document.getElementById('bar-ram').style.width = `${Math.min((ramUsed/1024)*100, 100)}%`;
                          document.getElementById('stat-cpu').innerText = `${cpuUsed}%`;
                          document.getElementById('bar-cpu').style.width = `${Math.min(cpuUsed, 100)}%`;
                          document.getElementById('stat-disk').innerText = `${diskUsed} MB`;
                          document.getElementById('bar-disk').style.width = `${Math.min((diskUsed/5120)*100, 100)}%`;
                      } else { simulasiVisual(); }
                  } else { simulasiVisual(); }
              }
          } catch(e) { simulasiVisual(); }
      };
      
      const simulasiVisual = () => {
          document.getElementById('stat-ram').innerText = `Sedang sinkronisasi...`;
          document.getElementById('stat-cpu').innerText = `Sync...`;
          document.getElementById('stat-disk').innerText = `Sync...`;
      };
      fetchStats();
      setInterval(fetchStats, 5000); 
    }
  }

  // =====================================================================
  // 2. HALAMAN ADMIN-USERS (KELOLA PENGGUNA & POPUP RESI + CORS BYPASS)
  // =====================================================================
  else if (path === 'admin-users.html') {
    document.getElementById('page-title').innerText = "Kelola Pengguna";
    
    contentDiv.innerHTML = `
      <div class="glass-card" style="margin-bottom:25px; display:flex; justify-content:space-between; align-items:center;">
        <div><h3>Daftar Pengguna</h3></div>
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
            <h3><i data-lucide="server" class="text-cyan"></i> Buat User & Server</h3>
            <button class="btn-icon" onclick="closeAddUserModal()"><i data-lucide="x"></i></button>
          </div>
          <form id="formAddUser" onsubmit="submitAddUser(event)">
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px;">
              <div class="form-group"><label>Username</label><input type="text" id="addUname" class="form-control" required pattern="[a-zA-Z0-9_]+"></div>
              <div class="form-group"><label>Password Panel</label><input type="text" id="addPass" class="form-control" required></div>
              <div class="form-group"><label>Nama Lengkap</label><input type="text" id="addName" class="form-control" required></div>
              <div class="form-group"><label>No. WhatsApp</label><input type="number" id="addWA" class="form-control" required></div>
            </div>
            <div class="form-group" style="margin-top:15px;">
              <label>Paket RAM Server</label>
              <select id="addRam" class="form-control" required style="background: var(--bg-dark);">
                ${window.CONFIG.pricing.ram.map(r => `<option value="${r.id}">${r.name}</option>`).join('')}
              </select>
            </div>
            <div class="form-group"><label>Masa Aktif (Hari)</label><input type="number" id="addDays" class="form-control" required></div>
            <button type="submit" id="btnSubmitUser" class="btn btn-primary" style="width:100%; margin-top:20px;"><i data-lucide="zap"></i> Eksekusi Pembuatan</button>
          </form>
        </div>
      </div>

      <div id="successModal" class="modal-overlay">
        <div class="modal-box" style="text-align:center;">
          <i data-lucide="check-circle" class="text-success" style="width:70px; height:70px; margin-bottom:15px; color:var(--success);"></i>
          <h2 style="margin-bottom:10px;">Berhasil Dibuat!</h2>
          <p class="text-muted" style="margin-bottom:20px; font-size:0.9rem;">Silakan salin detail akun di bawah ini untuk dikirimkan ke pembeli.</p>
          
          <div style="background:rgba(0,0,0,0.3); padding:20px; border-radius:12px; text-align:left; margin-bottom:20px; font-family:monospace; line-height:1.8; border: 1px solid var(--glass-border);">
            <div style="display:flex; justify-content:space-between;"><b>👤 Username</b> <span id="resUname" class="text-cyan"></span></div>
            <div style="display:flex; justify-content:space-between;"><b>🔑 Password</b> <span id="resPass" class="text-gold"></span></div>
            <div style="display:flex; justify-content:space-between;"><b>📦 Paket RAM</b> <span id="resRam"></span></div>
            <div style="display:flex; justify-content:space-between;"><b>⏳ Masa Aktif</b> <span id="resDays"></span></div>
            <div style="display:flex; justify-content:space-between;"><b>🌐 Login web</b> <span class="text-cyan">Di sini</span></div>
          </div>
          
          <button class="btn btn-primary" onclick="tutupDanRefresh()" style="width:100%;"><i data-lucide="refresh-cw"></i> Tutup & Refresh Halaman</button>
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
        const teksSisaWaktu = sisaWaktu.isExpired ? `<span class="text-danger">Expired</span>` : `<span class="text-muted">${sisaWaktu.text}</span>`;

        tbody.innerHTML += `
          <tr>
            <td><b>${window.utils.escapeHtml(uname)}</b></td>
            <td>${window.utils.escapeHtml(data.name)}</td>
            <td><a href="https://wa.me/${data.whatsapp}" target="_blank" class="text-cyan">${data.whatsapp}</a></td>
            <td>${teksSisaWaktu}</td><td>${badge}</td>
            <td>
              <button class="btn-icon" onclick="perpanjangUser('${uname}', ${data.expiredAt || 0})"><i data-lucide="calendar-clock" class="text-gold"></i></button>
              <button class="btn-icon" onclick="hapusUser('${uname}')"><i data-lucide="trash-2" class="text-danger"></i></button>
            </td>
          </tr>
        `;
      });
    }

    window.openAddUserModal = () => { document.getElementById('addUserModal').classList.add('active'); lucide.createIcons(); };
    window.closeAddUserModal = () => { document.getElementById('addUserModal').classList.remove('active'); document.getElementById('formAddUser').reset(); };
    window.tutupDanRefresh = () => { location.reload(); }; 

    // EKSEKUSI PEMBUATAN FULL AUTO BYPASS CORS
    window.submitAddUser = async (e) => {
        e.preventDefault();
        const btn = document.getElementById('btnSubmitUser');
        btn.innerHTML = '<i data-lucide="loader" class="spin"></i> Mengeksekusi API...';
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
            if(checkUser.exists()) throw new Error("Username sudah ada di DB!");

            let pteroUserId = null, pteroServerId = null, pteroIdentifier = null;

            // MENGGUNAKAN WORKER PROXY UNTUK TEMBUS CORS
            try {
                let allocId = 1; 
                const allocRes = await fetch(`${WORKER_URL}/?${pteroConfig.url}/api/application/nodes/1/allocations?filter[server_id]=`, { headers: pteroHeaders });
                const allocData = await allocRes.json();
                const availableAlloc = allocData.data.find(a => !a.attributes.assigned);
                if (availableAlloc) allocId = availableAlloc.attributes.id;

                const pteroUserRes = await fetch(`${WORKER_URL}/?${pteroConfig.url}/api/application/users`, {
                    method: 'POST', headers: pteroHeaders,
                    body: JSON.stringify({ email: `${uname}@zeroixdark.com`, username: uname, first_name: name, last_name: "Member", password: pass })
                });
                const pteroUserData = await pteroUserRes.json();
                if(pteroUserData.errors) throw new Error(pteroUserData.errors[0].detail);
                pteroUserId = pteroUserData.attributes.id;

                let ramMB = parseInt(ram.replace('gb', '')) * 1024; 
                if(ram === 'unlimited') ramMB = 0;
                
                const pteroSrvRes = await fetch(`${WORKER_URL}/?${pteroConfig.url}/api/application/servers`, {
                    method: 'POST', headers: pteroHeaders,
                    body: JSON.stringify({
                        name: `NodeJS-${uname}`,
                        user: pteroUserId,
                        egg: 15,
                        docker_image: "ghcr.io/pterodactyl/yolks:nodejs_18",
                        startup: "npm start",
                        environment: { USER_UPLOAD: "1", AUTO_UPDATE: "0", JS_FILE: "index.js" },
                        limits: { memory: ramMB, swap: 0, disk: 5120, io: 500, cpu: 100 },
                        feature_limits: { databases: 1, backups: 1 },
                        allocation: { default: allocId }
                    })
                });
                const pteroServerData = await pteroSrvRes.json();
                pteroServerId = pteroServerData.attributes.id;
                pteroIdentifier = pteroServerData.attributes.identifier;
            } catch(apiError) {
                console.error("API Panel Error:", apiError);
                throw new Error("Gagal mengeksekusi Pterodactyl. Cek API Key atau koneksi Worker Anda.");
            }

            await set(ref(db, `users/${uname}`), {
                password: pass, role: "user", name: name, whatsapp: wa,
                expiredAt: Date.now() + (days * 24 * 60 * 60 * 1000), 
                createdAt: Date.now(), isActive: true, isOnline: false
            });

            await set(ref(db, `servers/${serverId}`), {
                ownerUsername: uname, name: `Node.js Server`,
                ram: ram, node: "Node-1", status: "active", createdAt: Date.now(),
                pteroUserId: pteroUserId || 0,
                pteroServerId: pteroServerId || 0,
                pteroIdentifier: pteroIdentifier || ""
            });

            document.getElementById('resUname').innerText = uname;
            document.getElementById('resPass').innerText = pass;
            document.getElementById('resRam').innerText = ram.toUpperCase();
            document.getElementById('resDays').innerText = `${days} Hari`;
            
            closeAddUserModal();
            document.getElementById('successModal').classList.add('active');
            lucide.createIcons();

        } catch (error) {
            window.utils.showToast(error.message, 'error');
            btn.innerHTML = '<i data-lucide="zap"></i> Eksekusi Pembuatan';
            btn.disabled = false;
        }
    };

    window.perpanjangUser = async (username, currentExpired) => {
        const days = parseInt(prompt(`Perpanjang masa aktif ${username} berapa hari?`));
        if(isNaN(days) || days <= 0) return;
        const baseTime = (currentExpired && currentExpired > Date.now()) ? currentExpired : Date.now();
        await update(ref(db, `users/${username}`), { expiredAt: baseTime + (days * 24 * 60 * 60 * 1000) });
        window.utils.showToast(`Sukses diperpanjang ${days} hari.`, 'success');
        setTimeout(() => location.reload(), 1000);
    };

    window.hapusUser = async (username) => {
        if(!confirm(`Hapus user ${username}?`)) return;
        try {
            const srvSnap = await get(ref(db, 'servers'));
            if(srvSnap.exists()) {
                for(let [sId, sData] of Object.entries(srvSnap.val())) {
                    if(sData.ownerUsername === username) {
                        // Hapus Pterodactyl via Proxy Worker
                        if (sData.pteroServerId) fetch(`${WORKER_URL}/?${pteroConfig.url}/api/application/servers/${sData.pteroServerId}/force`, { method: 'DELETE', headers: pteroHeaders });
                        if (sData.pteroUserId) fetch(`${WORKER_URL}/?${pteroConfig.url}/api/application/users/${sData.pteroUserId}`, { method: 'DELETE', headers: pteroHeaders });
                        await remove(ref(db, `servers/${sId}`));
                    }
                }
            }
            await remove(ref(db, `users/${username}`));
            window.utils.showToast('User dihapus secara permanen!', 'success');
            setTimeout(() => location.reload(), 1000);
        } catch(e) { window.utils.showToast(e.message, 'error'); }
    };
  }

  // =====================================================================
  // 3. HALAMAN KELOLA SERVER & SERVER SAYA
  // =====================================================================
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
              // Hapus Pterodactyl via Worker Proxy
              const srvSnap = await get(ref(db, `servers/${serverId}`));
              if(srvSnap.exists()) {
                  let sData = srvSnap.val();
                  if (sData.pteroServerId) await fetch(`${WORKER_URL}/?${pteroConfig.url}/api/application/servers/${sData.pteroServerId}/force`, { method: 'DELETE', headers: pteroHeaders });
              }
              await remove(ref(db, `servers/${serverId}`));
              window.utils.showToast(`Server berhasil dihapus!`, 'success');
              setTimeout(() => location.reload(), 1500);
          } catch(e) { window.utils.showToast(e.message, 'error'); }
      };
    }
  }

  // =====================================================================
  // 4. HALAMAN LAINNYA
  // =====================================================================
  else {
      contentDiv.innerHTML = `<div class="glass-card" style="text-align:center; padding: 50px;"><h3>Fitur Sedang Dikembangkan</h3></div>`;
  }

  lucide.createIcons();
});
