// Progressive enhancement: content stays visible without JS or when motion is reduced.
export function initPageMotion() {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches || !Element.prototype.animate) return;
  const animations = new Set();
  const seen = new WeakSet();
  const selector = [
    'main h1', 'main h2', 'main > .intro > *', '.home-intro > *',
    '.intro-bottom', '.project-card', '.section-heading', '.overview-subtitle',
    '.overview-intro', '.overview .tags', '.overview-art', '.project-meta',
    '.overview-changes', '.story-section > p', '.story-section > figure',
    '.decision', '.finding-grid > div', '.final-phones', '.next-chapters',
    '.hm-cover-wordmark', '.hm-cover-label', '.hm-cover-return', '.hm-meta',
    '.hm-content > p', '.hm-content > h3', '.hm-content > div', '.hm-photo',
    '.artwork-slot', '.wall-note', '.site-footer'
  ].join(',');
  const candidates = [...document.querySelectorAll(selector)];
  // Only animate the outermost selected block, so nested pictures and text don't bounce twice.
  const targets = candidates.filter(el => !candidates.some(parent => parent !== el && parent.contains(el)));
  function reveal(el, delay = 0) {
    if (seen.has(el) || preference.matches) return;
    seen.add(el);
    // Animate the independent translate property so CSS centering/scaling remains intact.
    const animation = el.animate([
      {opacity:0, translate:'0 24px', offset:0, easing:'cubic-bezier(.2,.75,.3,1)'},
      {opacity:1, translate:'0 -4px', offset:.65, easing:'ease-in-out'},
      {opacity:1, translate:'0 1px', offset:.85, easing:'ease-out'},
      {opacity:1, translate:'0 0', offset:1}
    ], {duration:850, delay, fill:'backwards'});
    animations.add(animation);
    animation.finished.then(() => animations.delete(animation)).catch(() => animations.delete(animation));
  }
  let initialIndex = 0;
  const later = [];
  for (const el of targets) {
    const rect = el.getBoundingClientRect();
    if (!rect.width || !rect.height) continue;
    if (rect.top < innerHeight && rect.bottom > 0) reveal(el, Math.min(initialIndex++ * 100, 650));
    else later.push(el);
  }
  let observer;
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => {
      let index = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        reveal(entry.target, Math.min(index++ * 100, 300));
        observer.unobserve(entry.target);
      }
    }, {threshold:.06});
    later.forEach(el => observer.observe(el));
  }
  const finish = () => {animations.forEach(a => a.cancel()); animations.clear();};
  preference.addEventListener('change', () => {if (preference.matches) {finish(); observer?.disconnect();}});
  window.addEventListener('resize', finish, {passive:true});
  window.addEventListener('pagehide', () => {finish(); observer?.disconnect();}, {once:true});
}
