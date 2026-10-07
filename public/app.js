import { initPageMotion } from './page-motion.js';
import { handmaidenPage } from './handmaiden.js';
import { aboutPage } from './about.js';
import { bybitCase, initDirectory } from './case-study.js';
history.scrollRestoration = 'manual';
const assets = '/assets/bybit/';
const imageSizes = {"combined-deposit.png": [600, 1300], "blik-confirm.png": [600, 1300], "verification-notice.png": [600, 1300], "blik-code.png": [600, 1300], "blik-review.png": [600, 1300], "before-method.png": [600, 1300], "before-amount.png": [600, 1300], "document-form.png": [637, 1378], "upload-entry.png": [600, 1300], "verification-before.png": [600, 1300], "web-setup.png": [684, 731]};
const imageNodes = {"upload-entry.png": "82:82212", "verification-notice.png": "82:82295", "verification-before.png": "82:82443", "document-form.png": "82:81130", "web-setup.png": "82:82572", "blik-code.png": "82:81457", "blik-confirm.png": "82:81524", "blik-review.png": "82:81558"};
const navigation = [{ label: 'WORK', href: '/' }, { label: 'ABOUT', href: '/about' }, { label: 'PLAY', href: '/visual-works' }];
const path = location.pathname.replace(/\/$/, '') || '/';
const active = path === '/the-handmaiden' ? '/visual-works' : path.startsWith('/work/') ? '/' : path;
const arrow = '<span aria-hidden="true">↗</span>';
const tags = items => `<div class="tags">${items.map(item => `<span>${item}</span>`).join('')}</div>`;
const header = () => `<header class="site-header shell"><a class="brand" href="/" aria-label="Yuwen Chen — home"><span class="brand-square" aria-hidden="true"></span><span><strong>Yuwen Chen</strong><small>Product Designer</small></span></a><nav aria-label="Main navigation">${navigation.map(item => `<a href="${item.href}" ${active === item.href ? 'aria-current="page"' : ''}>${item.label}</a>`).join('')}</nav></header>`;
const footer = () => `<footer class="site-footer shell"><a href="/" class="footer-name"><span class="tiny-square" aria-hidden="true"></span>Yuwen Chen <span class="muted">/ Product Designer</span></a><a href="#top">Back to top ↑</a></footer>`;
const picture = (file, alt, caption, className = '', node = imageNodes[file] || '') => `<figure class="product-figure ${className}" ${node ? `data-figma-node="${node}"` : ''}><button class="image-button" type="button" data-image="${assets + file}" data-caption="${alt}" aria-label="Enlarge: ${alt}"><img src="${assets + file}" alt="${alt}" width="${imageSizes[file][0]}" height="${imageSizes[file][1]}" loading="lazy"><span class="image-expand" aria-hidden="true">↗</span></button>${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`;
const projects = [
  { title: 'BYBIT', description: 'Designing a clearer BLIK deposit experience for users in Poland.', tags: ['Fintech', 'UX / UI design', 'Mobile & web'], href: '/work/bybit' },
  ...[2, 3, 4].map(number => ({ number, title: 'Project to be selected', description: 'A space for the next case study.' }))
];
function projectCard(project) {
  if (!project.href) return `<article class="project-card placeholder"><div class="placeholder-art"><span class="slot-number">0${project.number}</span><span class="placeholder-mark" aria-hidden="true">＋</span><span class="eyebrow">PROJECT SLOT</span></div><div class="card-copy"><h3>${project.title}</h3><p>${project.description}</p><span class="status">Coming later</span></div></article>`;
  return `<article class="project-card"><a class="project-link" href="${project.href}"><div class="bybit-art"><div class="art-caption"><span class="eyebrow">BYBIT / FIAT DEPOSIT</span><p>A clearer<br>deposit journey.</p><span class="art-note">Product design · 2023–2024</span></div><img class="card-phone" src="${assets}blik-code.png" alt="BLIK payment design showing six-digit code entry" width="600" height="1300"><span class="card-arrow" aria-hidden="true">↗</span></div><div class="card-copy"><div class="card-title"><h3>${project.title}</h3>${arrow}</div><p>${project.description}</p>${tags(project.tags)}</div></a></article>`;
}
function home() {
  return `<main id="main" class="shell"><section class="home-intro"><p class="eyebrow intro-kicker"><span class="tiny-square" aria-hidden="true"></span> HELLO, I’M YUWEN CHEN</p><h1>A product designer making<br> complex tasks feel<br> <span class="accent-text">more straightforward.</span></h1><div class="intro-bottom"><p>I design digital experiences with a focus<br class="desktop-break"> on clear choices and thoughtful details.</p><a class="text-link" href="#selected-work">Explore my work <span aria-hidden="true">↓</span></a></div></section><section id="selected-work" class="selected-work"><div class="section-heading"><h2>Selected work</h2><span class="eyebrow">01 CASE STUDY · 03 SPACES TO COME</span></div><div class="project-grid">${projects.map(projectCard).join('')}</div></section></main>`;
}
function sectionIntro(number, label, title, content) {
  return `<div class="section-intro"><div class="section-index"><span>${number}</span><p class="eyebrow">${label}</p></div><div><h2>${title}</h2>${content}</div></div>`;
}
function bybit() { return bybitCase(picture, tags); }
function placeholderPage(kind) {
  const about = kind === 'about';
  return `<main id="main" class="shell holding-page"><p class="eyebrow">${about ? 'A LITTLE MORE ABOUT ME' : 'EXPLORATIONS & EXPERIMENTS'}</p><h1>${about ? 'Behind the <span class="accent-text">design.</span>' : 'Visual <span class="accent-text">works.</span>'}</h1><span class="holding-square" aria-hidden="true"></span><h2>${about ? 'More about Yuwen Chen, coming soon.' : 'A collection in progress.'}</h2><p>${about ? 'This page will share my background and approach to design.' : 'Selected visual work will be added here.'}</p><a class="text-link" href="/">Explore selected work ↗</a></main>`;
}
function visualWorks() {
  return `<main id="main" class="shell visual-works-page"><div class="holding-page visual-intro"><h1>Things I build for <span class="play-title-emphasis">the joy of building</span></h1><p class="play-intro-subtitle">Fun experiments, side projects, and creative explorations.</p></div><div class="project-grid"><article class="project-card"><a class="project-link" href="/listening-gallery"><div class="visual-cover"><img src="/assets/visual-works/listening-gallery.jpg" alt="Six paintings displayed with individual frames on The Listening Gallery's warm gallery wall" width="1240" height="827"></div><div class="card-copy"><div class="card-title"><h3>The Listening Gallery</h3></div><p>Step into a painting. Let its sounds keep you company.</p>${tags(['Interactive web experience'])}</div></a></article><article class="project-card"><a class="project-link" href="/the-handmaiden"><div class="visual-cover handmaiden-cover"><img src="/assets/handmaiden/imgScreenshot20240715At2036001.png" alt="Original purple-blue cover of The Handmaiden photobook" width="1774" height="1182"></div><div class="card-copy"><div class="card-title"><h3>The Handmaiden photobook</h3></div><p>Explore the film through the photo book.</p>${tags(['Book design', 'Graphic design'])}</div></a></article><article class="project-card"><a class="project-link" href="/poster-world"><div class="visual-cover poster-world-cover"><img src="/poster-world-cover.jpg?v=spring-festival" alt="Pink and lime Spring Festival poster floating among posters in Poster World" width="1080" height="716"></div><div class="card-copy"><div class="card-title"><h3>Poster World</h3></div><p>View all my experiments in poster design</p>${tags(['Graphic design', 'Interactive gallery'])}</div></a></article></div></main>`;
}
function preview() {
  const device = new URLSearchParams(location.search).get('device');
  if (device === 'desktop') return `<main id="main" class="single-preview"><div class="single-preview-label">1440px desktop preview · <a href="/preview">Desktop + mobile ↗</a></div><div class="preview-layout"><section><div class="desktop-preview"><iframe title="Desktop preview at 1440 pixels" width="1440" height="1300" src="${new URLSearchParams(location.search).get('page') === 'bybit' ? '/work/bybit' : '/'}"></iframe></div></section></div></main>`;
  return `<main id="main" class="preview-page"><h1>Portfolio preview</h1><p>Live layouts at 1440px and 390px. Open a page directly to explore it at your own window size.</p><div class="preview-controls"><label>Page <select id="preview-route"><option value="/">WORK</option><option value="/work/bybit">BYBIT</option><option value="/about">ABOUT</option><option value="/visual-works">PLAY</option></select></label><a href="/" id="open-preview" target="_blank" rel="noopener">Open page ↗</a></div><div class="preview-layout"><section><h2>Desktop · 1440px</h2><div class="desktop-preview"><iframe title="Desktop preview at 1440 pixels" width="1440" height="1040" src="/"></iframe></div></section><section><h2>Mobile · 390px</h2><div class="mobile-preview"><iframe title="Mobile preview at 390 pixels" width="390" height="844" src="/"></iframe></div></section></div></main>`;
}
const pageTitle = path === '/the-handmaiden' ? 'The Handmaiden photobook' : path === '/work/bybit' ? 'BYBIT — Fiat Deposit' : path === '/about' ? 'About' : path === '/visual-works' ? 'Play' : path === '/preview' ? 'Preview' : 'Work';
document.title = `${pageTitle} · Yuwen Chen — Product Designer`;
const pageDescriptions = {
  '/': 'Yuwen Chen is a product designer. Explore selected work, including the BYBIT fiat deposit case study.',
  '/about': 'About Yuwen Chen, a product designer working across interaction, visual, and service design.',
  '/the-handmaiden': 'The Handmaiden photobook by Yuwen Chen. Film imagery, visual storytelling and book design.',
  '/visual-works': 'Fun experiments, side projects, and creative explorations · Things I build for the joy of building',
  '/work/bybit': 'A BYBIT fiat deposit case study by Yuwen Chen, product designer.'
};
document.querySelector('meta[name="description"]').content = pageDescriptions[path] || pageDescriptions['/'];
document.querySelector('#app').innerHTML = `<div id="top"></div>${path === '/preview' || path === '/the-handmaiden' ? '' : header()}${path === '/the-handmaiden' ? handmaidenPage() : path === '/work/bybit' ? bybit() : path === '/about' ? aboutPage() : path === '/visual-works' ? visualWorks() : path === '/preview' ? preview() : home()}${path === '/preview' || path === '/the-handmaiden' ? '' : footer()}<dialog class="lightbox" aria-labelledby="lightbox-caption"><div class="lightbox-toolbar"><p id="lightbox-caption"></p><button type="button" class="close-lightbox" aria-label="Close image viewer">Close ×</button></div><div class="lightbox-image-wrap"><img alt=""></div><p class="lightbox-help">Scroll to inspect · Press Esc to close</p></dialog>`;
if (!location.hash) window.scrollTo(0, 0);
const dialog = document.querySelector('.lightbox');
let opener;
document.querySelectorAll('[data-image]').forEach(button => button.addEventListener('click', () => {
  opener = button;
  dialog.querySelector('img').src = button.dataset.image;
  dialog.querySelector('img').alt = button.dataset.caption;
  dialog.querySelector('#lightbox-caption').textContent = button.dataset.caption;
  dialog.showModal();
  document.body.classList.add('modal-open');
}));
document.querySelector('.close-lightbox').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); opener?.focus(); });
if (path === '/preview') {
  document.querySelector('#preview-route')?.addEventListener('change', event => {
    document.querySelectorAll('iframe').forEach(frame => { frame.src = event.target.value; });
    document.querySelector('#open-preview').href = event.target.value;
  });
  const resizePreview = () => {
    document.querySelectorAll('.desktop-preview, .mobile-preview').forEach(wrap => {
      const frame = wrap.querySelector('iframe');
      const scale = Math.min(1, wrap.clientWidth / Number(frame.width));
      frame.style.transform = `scale(${scale})`;
      wrap.style.height = `${Number(frame.height) * scale}px`;
    });
  };
  new ResizeObserver(resizePreview).observe(document.querySelector('.preview-layout'));
  resizePreview();
}

initDirectory();

if (path !== '/about' && path !== '/preview') initPageMotion();

if (path === '/about') import('./about-motion.js').then(({initAboutMotion}) => initAboutMotion()).catch(() => {});

if (path === '/the-handmaiden') import('./handmaiden-book.js').catch(() => { document.querySelector('#handmaiden-book').innerHTML = '<p>The photobook could not load. Please refresh the page.</p>'; });
