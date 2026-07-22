/**
 * Router utility
 * Hash-based routing for SPA navigation
 */

export function getCurrentRoute() {
  const hash = window.location.hash.replace('#', '') || 'dashboard';
  return hash;
}

export function navigateTo(route) {
  window.location.hash = route;
}

export function onRouteChange(callback) {
  window.addEventListener('hashchange', () => {
    callback(getCurrentRoute());
  });
  // Also fire on initial load
  callback(getCurrentRoute());
}

// Re-export for convenience
export default {
  getCurrentRoute,
  navigateTo,
  onRouteChange
};
