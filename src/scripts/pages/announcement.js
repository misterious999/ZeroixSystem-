/**
 * Announcement page renderer (Admin only)
 */
import { database } from '../../config/firebase.js';
import { ref, get, set, update } from 'firebase/database';
import { showToast, showConfirm } from '../toast.js';
import { escapeHtml, formatDate, logActivity } from '../utils.js';
import { getSession } from '../auth.js';

export async function renderAnnouncement() {
  const pageContent = document.getElementById('pageContent');

  try {
    const snap = await get(ref(database, 'pengumuman'));
    const data = snap.val() || {};

    pageContent.innerHTML = `
      <div style="max-width:600px;">
        <div class="settings-section">
          <h3><i data-lucide="megaphone" style="width:16px;height:16px;vertical-align:middle;margin-right:6px;"></i> Kirim Pengumuman</h3>
          <p style="font-size:13px;color:var(--text-secondary);margin-bottom:16px;">
            Pengumuman akan ditampilkan ke semua user saat mereka login.
          </p>
          <div class="form-group">
            <label class="form-label">Pesan Pengumuman</label>
            <textarea class="form-input" id="announcementMsg" rows="6" placeholder="Tulis pengumuman di sini..." 
                      style="resize:vertical;min-height:120px;"></textarea>
          </div>
          <button class="btn btn-primary" onclick="sendAnnouncement()">
            <i data-lucide="send"></i> Kirim Pengumuman
          </button>
        </div>

        <!-- Current Announcement -->
        <div class="settings-section">
          <h3><i data-lucide="info" style="width:16px;height:16px;vertical-align:middle;margin-right:6px;"></i> Pengumuman Saat Ini</h3>
          ${data.pesan ? `
            <div class="announcement-banner" style="margin-bottom:0;">
              <i data-lucide="megaphone"></i>
              <div class="announcement-content">
                <p style="white-space:pre-wrap;">${escapeHtml(data.pesan)}</p>
                <div class="announcement-meta">
                  Oleh: ${escapeHtml(data.oleh || 'Admin')} · ${formatDate(data.timestamp)}
                </div>
              </div>
            </div>
          ` : `
            <div class="empty-state" style="padding:24px;">
              <i data-lucide="message-square-off" style="width:32px;height:32px;display:block;margin:0 auto 8px;"></i>
              <p>Belum ada pengumuman.</p>
            </div>
          `}
        </div>

        <!-- Broadcast to all users -->
        <div class="settings-section">
          <h3><i data-lucide="radio" style="width:16px;height:16px;vertical-align:middle;margin-right:6px;"></i> Broadcast ke Semua User</h3>
          <p style="font-size:13px;color:var(--text-secondary);margin-bottom:16px;">
            Kirim pesan broadcast yang akan muncul sebagai popup saat user login.
          </p>
          <div class="form-group">
            <label class="form-label">Pesan Broadcast</label>
            <textarea class="form-input" id="broadcastMsg" rows="4" placeholder="Tulis pesan broadcast..." 
                      style="resize:vertical;min-height:100px;"></textarea>
          </div>
          <button class="btn btn-success" onclick="sendBroadcast()">
            <i data-lucide="send"></i> Broadcast ke Semua User
          </button>
        </div>
      </div>
    `;

    if (window.lucide) lucide.createIcons();
  } catch (error) {
    console.error('Announcement error:', error);
    showToast('Gagal memuat pengumuman.', 'error');
  }
}

window.sendAnnouncement = async function() {
  const session = getSession();
  const msg = document.getElementById('announcementMsg').value.trim();

  if (!msg) {
    showToast('Pesan pengumuman tidak boleh kosong.', 'warning');
    return;
  }

  try {
    await set(ref(database, 'pengumuman'), {
      pesan: msg,
      timestamp: Date.now(),
      oleh: session.username
    });

    await logActivity(session.uid, session.username, 'send_announcement', 'Pengumuman dikirim');
    showToast('Pengumuman berhasil dikirim!', 'success');
    document.getElementById('announcementMsg').value = '';
    await renderAnnouncement();
  } catch (error) {
    console.error('Send announcement error:', error);
    showToast('Gagal mengirim pengumuman.', 'error');
  }
};

window.sendBroadcast = async function() {
  const session = getSession();
  const msg = document.getElementById('broadcastMsg').value.trim();

  if (!msg) {
    showToast('Pesan broadcast tidak boleh kosong.', 'warning');
    return;
  }

  showConfirm(
    'Kirim Broadcast',
    `Apakah Anda yakin ingin mengirim broadcast ke SEMUA user? Pesan: "${escapeHtml(msg.substring(0, 50))}${msg.length > 50 ? '...' : ''}"`,
    async () => {
      try {
        // Store as broadcast (separate from announcement)
        const { push } = await import('firebase/database');
        const bcRef = push(ref(database, 'broadcasts'));
        await set(bcRef, {
          message: msg,
          sender: session.username,
          senderUid: session.uid,
          timestamp: Date.now(),
          readBy: {}
        });

        await logActivity(session.uid, session.username, 'send_broadcast', `Broadcast dikirim ke semua user`);
        showToast('Broadcast berhasil dikirim ke semua user!', 'success');
        document.getElementById('broadcastMsg').value = '';
      } catch (error) {
        console.error('Broadcast error:', error);
        showToast('Gagal mengirim broadcast.', 'error');
      }
    }
  );
};
