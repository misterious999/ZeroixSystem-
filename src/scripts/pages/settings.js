/**
 * Settings page renderer
 */
import { database } from '../../config/firebase.js';
import { ref, update } from 'firebase/database';
import { showToast } from '../toast.js';
import { escapeHtml, logActivity } from '../utils.js';
import { getSession } from '../auth.js';

export async function renderSettings(session) {
  const pageContent = document.getElementById('pageContent');

  try {
    // Fetch latest user data
    const { get } = await import('firebase/database');
    const snap = await get(ref(database, `users/${session.uid}`));
    const userData = snap.val() || session;

    pageContent.innerHTML = `
      <div style="max-width:600px;">
        <!-- Profile Photo -->
        <div class="settings-section">
          <h3><i data-lucide="image" style="width:16px;height:16px;vertical-align:middle;margin-right:6px;"></i> Foto Profil</h3>
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:16px;">
            <img src="${userData.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name || userData.username)}&background=131b33&color=38bdf8&size=96`}" 
                 alt="avatar" style="width:80px;height:80px;border-radius:50%;border:2px solid var(--border-color);object-fit:cover;" />
            <div>
              <p style="font-size:13px;color:var(--text-secondary);">Masukkan URL gambar untuk foto profil Anda.</p>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">URL Foto Profil</label>
            <input type="url" class="form-input" id="settingProfilePic" value="${escapeHtml(userData.profilePic || '')}" placeholder="https://example.com/avatar.jpg" />
          </div>
          <button class="btn btn-primary" onclick="saveProfilePic()">
            <i data-lucide="save"></i> Simpan Foto
          </button>
        </div>

        <!-- Password -->
        <div class="settings-section">
          <h3><i data-lucide="lock" style="width:16px;height:16px;vertical-align:middle;margin-right:6px;"></i> Ganti Password</h3>
          <div class="form-group">
            <label class="form-label">Password Baru</label>
            <input type="password" class="form-input" id="settingNewPassword" placeholder="Masukkan password baru" />
          </div>
          <div class="form-group">
            <label class="form-label">Konfirmasi Password</label>
            <input type="password" class="form-input" id="settingConfirmPassword" placeholder="Ulangi password baru" />
          </div>
          <button class="btn btn-primary" onclick="savePassword()">
            <i data-lucide="save"></i> Ganti Password
          </button>
        </div>

        <!-- Account Info (Read-only) -->
        <div class="settings-section">
          <h3><i data-lucide="user" style="width:16px;height:16px;vertical-align:middle;margin-right:6px;"></i> Info Akun</h3>
          <div style="display:grid;gap:12px;">
            <div>
              <div style="font-size:12px;color:var(--text-muted);margin-bottom:2px;">Username</div>
              <div style="font-size:14px;font-weight:500;">${escapeHtml(userData.username)}</div>
            </div>
            <div>
              <div style="font-size:12px;color:var(--text-muted);margin-bottom:2px;">Role</div>
              <div style="font-size:14px;font-weight:500;">${escapeHtml(userData.role)}</div>
            </div>
            <div>
              <div style="font-size:12px;color:var(--text-muted);margin-bottom:2px;">Panel Role</div>
              <div style="font-size:14px;font-weight:500;">${escapeHtml(userData.panelRole || '-')}</div>
            </div>
            <div>
              <div style="font-size:12px;color:var(--text-muted);margin-bottom:2px;">Email</div>
              <div style="font-size:14px;font-weight:500;">${escapeHtml(userData.email || '-')}</div>
            </div>
            <div>
              <div style="font-size:12px;color:var(--text-muted);margin-bottom:2px;">WhatsApp</div>
              <div style="font-size:14px;font-weight:500;">${escapeHtml(userData.whatsapp || '-')}</div>
            </div>
            <div>
              <div style="font-size:12px;color:var(--text-muted);margin-bottom:2px;">Bergabung Sejak</div>
              <div style="font-size:14px;font-weight:500;">${escapeHtml(userData.createdAt ? new Date(userData.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }) : '-')}</div>
            </div>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) lucide.createIcons();
  } catch (error) {
    console.error('Settings error:', error);
    showToast('Gagal memuat pengaturan.', 'error');
  }
}

window.saveProfilePic = async function() {
  const session = getSession();
  const profilePic = document.getElementById('settingProfilePic').value.trim();

  try {
    await update(ref(database, `users/${session.uid}`), { profilePic });
    // Update localStorage
    const stored = getSession();
    stored.profilePic = profilePic;
    localStorage.setItem('mp_session', JSON.stringify(stored));

    await logActivity(session.uid, session.username, 'update_profile_pic', 'Foto profil diperbarui');
    showToast('Foto profil berhasil diperbarui.', 'success');

    // Refresh the page to show new avatar
    setTimeout(() => window.location.hash = 'settings', 1000);
  } catch (error) {
    console.error('Save profile pic error:', error);
    showToast('Gagal menyimpan foto profil.', 'error');
  }
};

window.savePassword = async function() {
  const session = getSession();
  const newPass = document.getElementById('settingNewPassword').value.trim();
  const confirmPass = document.getElementById('settingConfirmPassword').value.trim();

  if (!newPass || !confirmPass) {
    showToast('Mohon isi semua field password.', 'warning');
    return;
  }

  if (newPass !== confirmPass) {
    showToast('Password tidak cocok.', 'error');
    return;
  }

  if (newPass.length < 6) {
    showToast('Password minimal 6 karakter.', 'warning');
    return;
  }

  try {
    await update(ref(database, `users/${session.uid}`), { password: newPass });
    await logActivity(session.uid, session.username, 'change_password', 'Password berhasil diganti');
    
    // Clear fields
    document.getElementById('settingNewPassword').value = '';
    document.getElementById('settingConfirmPassword').value = '';
    
    showToast('Password berhasil diganti.', 'success');
  } catch (error) {
    console.error('Save password error:', error);
    showToast('Gagal mengganti password.', 'error');
  }
};
