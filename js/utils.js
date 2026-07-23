// Utility Functions
const utils = {
  // Mencegah XSS injection
  escapeHtml: (unsafe) => {
    if (!unsafe) return '';
    return unsafe.toString()
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  },

  // Custom elegan toast notification
  showToast: (message, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = `glass-toast toast-${type}`;
    toast.innerHTML = `<i data-lucide="${type === 'success' ? 'check-circle' : 'alert-circle'}"></i> <span>${utils.escapeHtml(message)}</span>`;
    document.body.appendChild(toast);
    lucide.createIcons({ root: toast });
    
    // Animasi masuk
    requestAnimationFrame(() => toast.style.opacity = '1');
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },

  // Format tanggal ms ke string ID
  formatTanggal: (ms) => {
    if (!ms) return 'Belum diatur';
    return new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(ms));
  },

  // Hitung sisa waktu mundur
  getCountdown: (expiredAt) => {
    if (!expiredAt) return { text: "Permanen", isExpired: false };
    const now = Date.now();
    const diff = expiredAt - now;
    if (diff <= 0) return { text: "EXPIRED", isExpired: true };

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / 1000 / 60) % 60);
    return { text: `${days}h ${hours}j ${mins}m`, isExpired: false };
  },

  // Render Sidebar & Navbar Layout Dinamis
  renderLayout: () => {
    const session = JSON.parse(localStorage.getItem('session'));
    if (!session) return;

    const isAdmin = session.role === 'admin';
    const countdown = utils.getCountdown(session.expiredAt);
    
    const sidebarHTML = `
      <aside class="sidebar glass-card">
        <div class="sidebar-brand">
          <i data-lucide="zap" class="text-cyan"></i>
          <h2>${CONFIG.app.name}</h2>
        </div>
        <nav class="sidebar-nav">
          <a href="dashboard.html" class="nav-item"><i data-lucide="layout-dashboard"></i> Dashboard</a>
          ${isAdmin ? `
            <a href="admin-users.html" class="nav-item"><i data-lucide="users"></i> Kelola User</a>
            <a href="admin-servers.html" class="nav-item"><i data-lucide="server"></i> Kelola Server</a>
            <a href="admin-logs.html" class="nav-item"><i data-lucide="activity"></i> Activity Logs</a>
          ` : `
            <a href="user-servers.html" class="nav-item"><i data-lucide="server"></i> Server Saya</a>
            <a href="user-packages.html" class="nav-item"><i data-lucide="shopping-cart"></i> Upgrade Paket</a>
          `}
          <a href="settings.html" class="nav-item"><i data-lucide="settings"></i> Pengaturan</a>
        </nav>
        <div class="sidebar-profile">
          <img src="${session.profilePic || 'https://ui-avatars.com/api/?name='+session.username+'&background=38bdf8&color=fff'}" alt="Avatar">
          <div class="profile-info">
            <span class="name">${utils.escapeHtml(session.name || session.username)}</span>
            <span class="role badge-${isAdmin ? 'gold' : 'cyan'}">${isAdmin ? 'Admin' : 'User'}</span>
          </div>
          <button onclick="window.auth.logout()" class="btn-icon"><i data-lucide="log-out"></i></button>
        </div>
      </aside>
    `;

    const navbarHTML = `
      <nav class="top-navbar glass-card">
        <h2 id="page-title">Control Panel</h2>
        <div class="nav-right">
          <div class="countdown-badge ${countdown.isExpired ? 'expired' : ''}">
            <i data-lucide="clock"></i> Sisa: ${countdown.text}
          </div>
        </div>
      </nav>
    `;

    document.getElementById('layout-container').innerHTML = sidebarHTML + `<main class="main-content">${navbarHTML}<div id="page-content"></div></main>`;
    lucide.createIcons();
    
    // Highlight active nav
    const currentPath = window.location.pathname.split('/').pop();
    document.querySelectorAll('.sidebar-nav a').forEach(el => {
      if(el.getAttribute('href') === currentPath) el.classList.add('active');
    });

    // Guard expired
    if(countdown.isExpired && !isAdmin && currentPath !== 'user-packages.html') {
       document.getElementById('page-content').innerHTML = `
        <div class="expired-banner glass-card">
          <i data-lucide="alert-triangle"></i>
          <h3>Akun Anda Sudah Expired</h3>
          <p>Silakan perpanjang masa aktif panel Anda untuk melanjutkan.</p>
          <a href="user-packages.html" class="btn btn-primary">Perpanjang Sekarang</a>
        </div>
       `;
    }
  },

  logActivity: async (action, detail) => {
    const session = JSON.parse(localStorage.getItem('session'));
    if(!session) return;
    const { db, ref, set } = window.firebaseAPI;
    const logId = Date.now().toString();
    await set(ref(db, 'activityLogs/' + logId), {
      username: session.username,
      action,
      detail,
      timestamp: Date.now()
    });
  }
};
window.utils = utils;
