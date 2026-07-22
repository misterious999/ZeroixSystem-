/**
 * Packages page renderer (Buy/Upgrade packages)
 */
import { getSession } from '../auth.js';
import { escapeHtml, openWhatsApp, getRamPackageMessage, getRolePackageMessage, RAM_PACKAGES, ROLE_PACKAGES, getRoleDisplayName } from '../utils.js';

export async function renderPackages() {
  const pageContent = document.getElementById('pageContent');
  const session = getSession();

  const ramCards = RAM_PACKAGES.map((pkg, idx) => `
    <div class="package-card ${pkg.id === 'unlimited' ? 'popular' : ''}">
      ${pkg.id === 'unlimited' ? '<span class="package-badge">Populer</span>' : ''}
      <div style="margin-bottom:8px;">
        <i data-lucide="memory-stick" style="width:32px;height:32px;color:var(--accent-cyan);"></i>
      </div>
      <div class="package-name">RAM ${escapeHtml(pkg.name)}</div>
      <div class="package-price">Rp ${escapeHtml(pkg.price)}</div>
      <div class="package-price-label">/bulan</div>
      <ul class="package-features">
        <li><i data-lucide="check"></i> ${escapeHtml(pkg.name)} RAM Dedicated</li>
        <li><i data-lucide="check"></i> Panel Pterodactyl</li>
        <li><i data-lucide="check"></i> Unlimited Disk Space</li>
        <li><i data-lucide="check"></i> DDoS Protection</li>
        <li><i data-lucide="check"></i> 24/7 Support</li>
      </ul>
      <button class="btn btn-primary" style="width:100%;" 
        onclick="buyRamPackage('${escapeHtml(pkg.name)}', '${escapeHtml(pkg.price)}')">
        <i data-lucide="shopping-cart"></i> Beli Sekarang
      </button>
    </div>
  `).join('');

  const roleCards = ROLE_PACKAGES.map((pkg, idx) => `
    <div class="package-card ${pkg.id === 'partner_publik_v1' ? 'popular' : ''}">
      ${pkg.id === 'partner_publik_v1' ? '<span class="package-badge">Populer</span>' : ''}
      <div style="margin-bottom:8px;">
        <i data-lucide="shield" style="width:32px;height:32px;color:var(--accent-violet);"></i>
      </div>
      <div class="package-name">${escapeHtml(pkg.name)}</div>
      <div class="package-price">Rp ${escapeHtml(pkg.price)}</div>
      <div class="package-price-label">awal · Perpanjang: Rp ${escapeHtml(pkg.renewalPrice)}/bulan</div>
      <ul class="package-features">
        <li><i data-lucide="check"></i> Full Panel Access</li>
        <li><i data-lucide="check"></i> Server Management</li>
        <li><i data-lucide="check"></i> ${pkg.id === 'reseller' || pkg.id === 'reseller_private' ? 'Resell ke customer' : 'Priority Support'}</li>
        <li><i data-lucide="check"></i> Backup & Restore</li>
        <li><i data-lucide="check"></i> API Access</li>
      </ul>
      <div style="display:flex;gap:8px;">
        <button class="btn btn-primary" style="flex:1;" 
          onclick="buyRolePackage('${escapeHtml(pkg.name)}', '${escapeHtml(pkg.price)}', false)">
          <i data-lucide="shopping-cart"></i> Beli Baru
        </button>
        <button class="btn btn-secondary" style="flex:1;" 
          onclick="buyRolePackage('${escapeHtml(pkg.name)}', '${escapeHtml(pkg.renewalPrice)}', true)">
          <i data-lucide="refresh-cw"></i> Perpanjang
        </button>
      </div>
    </div>
  `).join('');

  pageContent.innerHTML = `
    <!-- RAM Packages -->
    <div class="section">
      <div class="section-title">
        <i data-lucide="memory-stick"></i> Paket RAM Panel Pterodactyl
      </div>
      <div class="card-grid">
        ${ramCards}
      </div>
    </div>

    <!-- Role Packages -->
    <div class="section">
      <div class="section-title">
        <i data-lucide="shield"></i> Role Panel
      </div>
      <div class="card-grid">
        ${roleCards}
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();
}

window.buyRamPackage = function(name, price) {
  const message = getRamPackageMessage(name, price);
  openWhatsApp(message);
};

window.buyRolePackage = function(name, price, isRenewal) {
  const message = getRolePackageMessage(name, price, isRenewal);
  openWhatsApp(message);
};
