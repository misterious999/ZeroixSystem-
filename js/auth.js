// Modul Autentikasi dan Guard
window.auth = {
  checkSession: (requireAdmin = false) => {
    const session = JSON.parse(localStorage.getItem('session'));
    if (!session) {
      window.location.href = 'login.html';
      return null;
    }
    
    // Auto logout jika lewat 24 jam
    if (Date.now() - session.loginAt > 24 * 60 * 60 * 1000) {
      window.auth.logout('Sesi berakhir, silakan login kembali.');
      return null;
    }

    if (requireAdmin && session.role !== 'admin') {
      window.location.href = 'dashboard.html';
      return null;
    }
    return session;
  },

  login: async (username, password) => {
    const { db, ref, get, update } = window.firebaseAPI;
    try {
      const userRef = ref(db, `users/${username}`);
      const snapshot = await get(userRef);
      
      if (!snapshot.exists()) {
        // Sistem Seed Admin Default
        const allUsers = await get(ref(db, 'users'));
        if (!allUsers.exists() && username === 'admin' && password === 'admin123') {
           await window.firebaseAPI.set(userRef, {
             password: 'admin123', role: 'admin', name: 'Super Admin', isActive: true, createdAt: Date.now()
           });
           return window.auth.login('admin', 'admin123'); // recursive retry
        }
        throw new Error('Username atau password salah.');
      }

      const userData = snapshot.val();
      if (userData.password !== password) throw new Error('Username atau password salah.');
      if (userData.isActive === false) throw new Error('Akun Anda dinonaktifkan.');

      // Buat session
      const sessionData = {
        username,
        role: userData.role,
        name: userData.name,
        profilePic: userData.profilePic,
        panelRole: userData.panelRole,
        expiredAt: userData.expiredAt,
        loginAt: Date.now()
      };
      
      localStorage.setItem('session', JSON.stringify(sessionData));
      
      // Update status online & log
      await update(userRef, { isOnline: true, lastLoginAt: Date.now() });
      await window.utils.logActivity('LOGIN', 'User berhasil login ke panel');

      window.location.href = 'dashboard.html';
    } catch (error) {
      window.utils.showToast(error.message, 'error');
    }
  },

  logout: async (msg = 'Berhasil logout') => {
    const session = JSON.parse(localStorage.getItem('session'));
    if(session) {
       try {
         const { db, ref, update } = window.firebaseAPI;
         await update(ref(db, `users/${session.username}`), { isOnline: false });
         await window.utils.logActivity('LOGOUT', 'User keluar dari panel');
       } catch(e) {}
    }
    localStorage.removeItem('session');
    window.utils.showToast(msg, 'success');
    setTimeout(() => window.location.href = 'login.html', 1000);
  }
};
