/**
 * Login Page Renderer
 * Integrated into the SPA — rendered inside #app div
 */
import { database } from '../../config/firebase.js';
import { ref, get, update } from 'firebase/database';
import { escapeHtml, logActivity } from '../utils.js';
import { saveSession } from '../auth.js';
import { showToast } from '../toast.js';

export async function renderLoginPage() {
  const app = document.getElementById('app');
  const appName = import.meta.env.VITE_APP_NAME || 'ZeroixDark Marketplace';

  // Show login UI, hide main app shell
  app.innerHTML = `
    <div class="login-page-wrapper">
      <div class="login-page">
        <div class="login-card">
          <div class="login-header">
            <div class="login-icon">
              <i data-lucide="server-cog"></i>
            </div>
            <h1>${escapeHtml(appName)}</h1>
            <p>Masuk ke akun hosting Anda</p>
          </div>

          <form id="loginForm">
            <div class="form-group">
              <label class="form-label" for="loginUsername">Username</label>
              <div class="input-icon-wrapper">
                <i data-lucide="user"></i>
                <input type="text" class="form-input" id="loginUsername" placeholder="Masukkan username" autocomplete="username" required />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label" for="loginPassword">Password</label>
              <div class="input-icon-wrapper">
                <i data-lucide="lock"></i>
                <input type="password" class="form-input" id="loginPassword" placeholder="Masukkan password" autocomplete="current-password" required />
              </div>
            </div>
            <button type="submit" class="login-btn" id="loginBtn">
              Masuk
            </button>
          </form>

          <div class="login-footer">
            <span>${escapeHtml(appName)}</span> v${import.meta.env.VITE_APP_VERSION || '1.0.0'}
          </div>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();

  // Attach login form handler
  document.getElementById('loginForm').addEventListener('submit', handleLogin);
}

async function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value;
  const btn = document.getElementById('loginBtn');

  if (!username || !password) {
    showToast('Mohon isi username dan password.', 'warning');
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Memproses...';

  try {
    const usersRef = ref(database, 'users');
    const snapshot = await get(usersRef);
    const users = snapshot.val();

    if (!users) {
      showLoginError('Database tidak tersedia. Silakan coba lagi.');
      return;
    }

    // Find user
    let foundUser = null;
    let foundUid = null;

    for (const [uid, user] of Object.entries(users)) {
      if (user.username && user.username.toLowerCase() === username.toLowerCase()) {
        foundUser = user;
        foundUid = uid;
        break;
      }
    }

    if (!foundUser) {
      showLoginError('Username tidak ditemukan.');
      return;
    }

    if (foundUser.password !== password) {
      showLoginError('Password salah.');
      return;
    }

    // Check active status
    if (foundUser.isActive === false) {
      showLoginError('Akun Anda telah dinonaktifkan oleh admin. Hubungi admin untuk informasi lebih lanjut.');
      return;
    }

    // Check expired
    if (foundUser.expiredAt && Date.now() > foundUser.expiredAt) {
      showLoginError('Paket Anda telah EXPIRED. Hubungi admin untuk perpanjangan.');
      return;
    }

    // Update last login
    await update(ref(database, `users/${foundUid}`), {
      lastLoginAt: Date.now(),
      isOnline: true
    });

    // Log activity
    try {
      await logActivity(foundUid, foundUser.username, 'login', 'User berhasil login');
    } catch (e) {
      console.warn('Log activity failed:', e);
    }

    // Save session
    const session = saveSession({
      ...foundUser,
      uid: foundUid
    });

    showToast('Login berhasil! Mengalihkan...', 'success');

    // Reload to enter the main app
    setTimeout(() => {
      window.location.reload();
    }, 800);

  } catch (error) {
    console.error('Login error:', error);
    showLoginError('Terjadi kesalahan. Silakan coba lagi.');
  }

  btn.disabled = false;
  btn.textContent = 'Masuk';
}

function showLoginError(message) {
  const container = document.getElementById('errorModalContainer');
  if (container) container.remove();

  const modal = document.createElement('div');
  modal.id = 'errorModalContainer';
  modal.innerHTML = `
    <div class="error-modal" onclick="if(event.target===this)this.remove()">
      <div class="error-card">
        <div class="error-icon">
          <i data-lucide="x-circle"></i>
        </div>
        <h3>Login Gagal</h3>
        <p>${escapeHtml(message)}</p>
        <button class="btn-close" onclick="this.closest('#errorModalContainer').remove()">Tutup</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  if (window.lucide) lucide.createIcons();
}
