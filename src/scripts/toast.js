/**
 * Toast notification system
 */

export function showToast(message, type = 'info', duration = 4000) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const iconMap = {
    success: 'check-circle',
    error: 'x-circle',
    warning: 'alert-triangle',
    info: 'info'
  };

  toast.innerHTML = `
    <i data-lucide="${iconMap[type] || 'info'}"></i>
    <span>${message}</span>
    <button class="toast-close" onclick="this.parentElement.remove()">
      <i data-lucide="x"></i>
    </button>
  `;

  container.appendChild(toast);
  
  // Re-init lucide icons for new toast
  if (window.lucide) {
    lucide.createIcons();
  }

  // Auto remove
  setTimeout(() => {
    if (toast.parentElement) {
      toast.classList.add('toast-exit');
      setTimeout(() => toast.remove(), 300);
    }
  }, duration);
}

export function showConfirm(title, message, onConfirm, onCancel) {
  const overlay = document.getElementById('modalOverlay');
  const content = document.getElementById('modalContent');
  
  overlay.style.display = 'flex';
  content.innerHTML = `
    <div class="modal-header">
      <i data-lucide="alert-triangle" style="color:#ef4444;"></i>
      <h2>${title}</h2>
    </div>
    <div class="modal-body">
      <p>${message}</p>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" id="cancelConfirm">Batal</button>
      <button class="btn btn-danger" id="confirmAction">Ya, Lanjutkan</button>
    </div>
  `;

  if (window.lucide) lucide.createIcons();

  document.getElementById('cancelConfirm').onclick = () => {
    overlay.style.display = 'none';
    if (onCancel) onCancel();
  };

  document.getElementById('confirmAction').onclick = () => {
    overlay.style.display = 'none';
    if (onConfirm) onConfirm();
  };

  overlay.onclick = (e) => {
    if (e.target === overlay) {
      overlay.style.display = 'none';
      if (onCancel) onCancel();
    }
  };
}

export function showInfoModal(title, content, onClose) {
  const overlay = document.getElementById('modalOverlay');
  const modal = document.getElementById('modalContent');
  
  overlay.style.display = 'flex';
  modal.innerHTML = `
    <div class="modal-header">
      <h2>${title}</h2>
    </div>
    <div class="modal-body">
      ${content}
    </div>
    <div class="modal-footer">
      <button class="btn btn-primary" id="closeInfoModal">Tutup</button>
    </div>
  `;

  if (window.lucide) lucide.createIcons();

  document.getElementById('closeInfoModal').onclick = () => {
    overlay.style.display = 'none';
    if (onClose) onClose();
  };

  overlay.onclick = (e) => {
    if (e.target === overlay) {
      overlay.style.display = 'none';
      if (onClose) onClose();
    }
  };
}
