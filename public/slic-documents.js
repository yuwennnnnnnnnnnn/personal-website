import { revealGroup } from './page-motion.js';

export const documents = [
  { id: 'final-report', title: 'Final Report', pages: 45, width: 696, height: 900 },
  { id: 'business-handout', title: 'Business Handout', pages: 1, width: 636, height: 900 },
  { id: 'presentation-slides', title: 'Presentation Slides', pages: 7, width: 900, height: 507 }
];
const asset = id => `/assets/slic/${id}.pdf`;

export function documentCards() {
  return `<div class="slic-documents">${documents.map(doc => `<button class="slic-document-card" type="button" data-document="${doc.id}" aria-haspopup="dialog" aria-label="Preview ${doc.title}, PDF, ${doc.pages} ${doc.pages === 1 ? 'page' : 'pages'}"><span class="slic-document-cover"><img src="/assets/slic/previews/${doc.id}.png" width="${doc.width}" height="${doc.height}" alt="First page of ${doc.title}" loading="lazy"></span><span class="slic-document-info"><span class="slic-document-title">${doc.title}</span><span class="slic-document-meta">PDF · ${doc.pages} ${doc.pages === 1 ? 'page' : 'pages'}</span></span></button>`).join('')}</div>`;
}

export function initDocumentViewer() {
  const dialog = document.createElement('dialog');
  dialog.className = 'slic-pdf-viewer';
  dialog.setAttribute('aria-labelledby', 'slic-pdf-title');
  dialog.innerHTML = `<header class="slic-pdf-header"><h2 id="slic-pdf-title"></h2><div class="slic-pdf-actions"><a class="slic-pdf-download" download>Download ↓</a><button type="button" class="slic-pdf-fullscreen" aria-pressed="false">Full screen</button><button type="button" class="slic-pdf-close" aria-label="Close document preview" autofocus>Close ×</button></div></header><div class="slic-pdf-toolbar"><div class="slic-pdf-pagination" role="group" aria-label="Page navigation"><button type="button" data-pdf-action="previous" aria-label="Previous page">←</button><label>Page <input class="slic-pdf-page" type="number" min="1" value="1" aria-label="Page number"></label><span class="slic-pdf-count"></span><button type="button" data-pdf-action="next" aria-label="Next page">→</button></div><div class="slic-pdf-zoom" role="group" aria-label="Document zoom"><button type="button" data-pdf-action="zoom-out" aria-label="Zoom out">−</button><output class="slic-pdf-scale" aria-label="Zoom level">100%</output><button type="button" data-pdf-action="zoom-in" aria-label="Zoom in">＋</button><button type="button" data-pdf-action="fit">Fit page</button></div></div><div class="slic-pdf-stage" tabindex="0" aria-label="Document page. Use arrow keys to change pages."><div class="slic-pdf-paper"></div></div><p class="slic-pdf-status" role="status" aria-live="polite"></p>`;
  document.body.append(dialog);
  const $ = selector => dialog.querySelector(selector);
  const stage = $('.slic-pdf-stage'), paper = $('.slic-pdf-paper');
  const status = $('.slic-pdf-status'), pageInput = $('.slic-pdf-page');
  const pagination = $('.slic-pdf-pagination');
  const previous = $('[data-pdf-action="previous"]'), next = $('[data-pdf-action="next"]');
  const zoomOut = $('[data-pdf-action="zoom-out"]'), zoomIn = $('[data-pdf-action="zoom-in"]');
  const fullButton = $('.slic-pdf-fullscreen');
  let pdf, loadingTask, renderTask, opener, selected;
  let session = 0, revision = 0, pageNumber = 1, zoom = 1, fitScale = 1;
  let libraryPromise, resizeTimer;
  const busyControls = disabled => {
    pageInput.disabled = disabled;
    $('[data-pdf-action="fit"]').disabled = disabled;
    previous.disabled = disabled || pageNumber <= 1;
    next.disabled = disabled || pageNumber >= (pdf?.numPages || 1);
    zoomOut.disabled = disabled || zoom <= .5;
    zoomIn.disabled = disabled || zoom >= 3;
  };
  async function renderPage({ fit = false } = {}) {
    if (!pdf || !dialog.open) return;
    const current = ++revision, currentSession = session;
    renderTask?.cancel();
    status.textContent = `Loading page ${pageNumber}…`;
    stage.setAttribute('aria-busy', 'true');
    pageInput.value = pageNumber;
    busyControls(false);
    try {
      const page = await pdf.getPage(pageNumber);
      if (current !== revision || currentSession !== session) return;
      const natural = page.getViewport({ scale: 1 });
      if (fit) {
        fitScale = Math.min((stage.clientWidth - 48) / natural.width, (stage.clientHeight - 48) / natural.height);
        zoom = 1;
      }
      const viewport = page.getViewport({ scale: Math.max(.05, fitScale) * zoom });
      const canvas = document.createElement('canvas');
      // Cap canvas memory on large handouts and high-DPI phones.
      const ratio = Math.min(devicePixelRatio || 1, 2, Math.sqrt(16000000 / (viewport.width * viewport.height)));
      canvas.width = Math.ceil(viewport.width * ratio);
      canvas.height = Math.ceil(viewport.height * ratio);
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;
      canvas.setAttribute('role', 'img');
      canvas.setAttribute('aria-label', `${selected.title}, page ${pageNumber} of ${pdf.numPages}`);
      renderTask = page.render({ canvasContext: canvas.getContext('2d'), viewport, transform: [ratio, 0, 0, ratio, 0, 0] });
      await renderTask.promise;
      if (current !== revision || currentSession !== session) return;
      paper.replaceChildren(canvas);
      $('.slic-pdf-scale').value = `${Math.round(zoom * 100)}%`;
      status.textContent = `${selected.title} · Page ${pageNumber} of ${pdf.numPages}`;
      stage.removeAttribute('aria-busy');
      busyControls(false);
    } catch (error) {
      if (current !== revision || currentSession !== session || error.name === 'RenderingCancelledException') return;
      stage.removeAttribute('aria-busy');
      status.textContent = 'This page could not be displayed. Try another page or download the PDF.';
    }
  }
  async function open(doc, button) {
    selected = doc; opener = button;
    const current = ++session;
    pageNumber = 1; zoom = 1; pdf = null;
    paper.replaceChildren();
    $('#slic-pdf-title').textContent = doc.title;
    $('.slic-pdf-download').href = asset(doc.id);
    $('.slic-pdf-download').download = `${doc.title}.pdf`;
    pagination.hidden = doc.pages === 1;
    pageInput.value = 1; pageInput.max = doc.pages;
    $('.slic-pdf-count').textContent = `of ${doc.pages}`;
    $('.slic-pdf-scale').value = '100%';
    busyControls(true);
    status.textContent = 'Loading document…';
    stage.setAttribute('aria-busy', 'true');
    dialog.showModal();
    document.body.classList.add('modal-open');
    revealGroup(dialog, { fade: true });
    try {
      libraryPromise ||= import('/vendor/pdfjs/pdf.js');
      const library = await libraryPromise;
      if (current !== session) return;
      library.GlobalWorkerOptions.workerSrc = '/vendor/pdfjs/pdf.worker.js';
      const task = library.getDocument({ url: asset(doc.id), cMapUrl: '/vendor/pdfjs/cmaps/', cMapPacked: true, standardFontDataUrl: '/vendor/pdfjs/standard_fonts/', wasmUrl: '/vendor/pdfjs/wasm/', disableAutoFetch: true, disableStream: true, isEvalSupported: false });
      loadingTask = task;
      const documentPDF = await task.promise;
      if (current !== session) { await documentPDF.destroy(); return; }
      pdf = documentPDF;
      pageInput.max = pdf.numPages;
      pagination.hidden = pdf.numPages === 1;
      $('.slic-pdf-count').textContent = `of ${pdf.numPages}`;
      await renderPage({ fit: true });
    } catch {
      if (current !== session) return;
      stage.removeAttribute('aria-busy');
      status.textContent = 'The preview could not load. You can still download the original PDF above.';
    }
  }
  function changePage(number) {
    if (!pdf || !Number.isFinite(number)) return;
    pageNumber = Math.max(1, Math.min(pdf.numPages, Math.round(number)));
    stage.scrollTo(0, 0);
    renderPage();
  }
  function changeZoom(amount) {
    if (!pdf) return;
    zoom = Math.max(.5, Math.min(3, Math.round((zoom + amount) * 100) / 100));
    renderPage();
  }
  document.querySelectorAll('[data-document]').forEach(button => button.addEventListener('click', () => {
    const doc = documents.find(item => item.id === button.dataset.document);
    if (doc) open(doc, button);
  }));
  previous.addEventListener('click', () => changePage(pageNumber - 1));
  next.addEventListener('click', () => changePage(pageNumber + 1));
  pageInput.addEventListener('change', () => changePage(Number(pageInput.value) || pageNumber));
  pageInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') { event.preventDefault(); changePage(Number(pageInput.value) || pageNumber); }
  });
  zoomIn.addEventListener('click', () => changeZoom(.25));
  zoomOut.addEventListener('click', () => changeZoom(-.25));
  $('[data-pdf-action="fit"]').addEventListener('click', () => { stage.scrollTo(0, 0); renderPage({ fit: true }); });
  $('.slic-pdf-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('keydown', event => {
    if (event.target === pageInput || event.ctrlKey || event.metaKey || event.altKey) return;
    if (event.key === 'ArrowRight' && !next.disabled) { event.preventDefault(); changePage(pageNumber + 1); }
    if (event.key === 'ArrowLeft' && !previous.disabled) { event.preventDefault(); changePage(pageNumber - 1); }
    if (event.key === '+' || event.key === '=') { event.preventDefault(); changeZoom(.25); }
    if (event.key === '-') { event.preventDefault(); changeZoom(-.25); }
  });
  const updateFullscreen = () => {
    const full = document.fullscreenElement === dialog || dialog.classList.contains('is-fullscreen');
    fullButton.textContent = full ? 'Exit full screen' : 'Full screen';
    fullButton.setAttribute('aria-pressed', String(full));
  };
  fullButton.addEventListener('click', async () => {
    try {
      if (document.fullscreenElement === dialog) await document.exitFullscreen();
      else if (dialog.classList.contains('is-fullscreen')) dialog.classList.remove('is-fullscreen');
      else if (dialog.requestFullscreen) await dialog.requestFullscreen();
      else dialog.classList.add('is-fullscreen');
    } catch { dialog.classList.toggle('is-fullscreen'); }
    updateFullscreen();
  });
  document.addEventListener('fullscreenchange', updateFullscreen);
  new ResizeObserver(() => {
    clearTimeout(resizeTimer);
    if (dialog.open && pdf) resizeTimer = setTimeout(() => renderPage({ fit: true }), 120);
  }).observe(stage);
  dialog.addEventListener('close', () => {
    ++session; ++revision;
    clearTimeout(resizeTimer);
    renderTask?.cancel(); renderTask = null;
    loadingTask?.destroy().catch(() => {}); loadingTask = null; pdf = null;
    if (document.fullscreenElement === dialog) document.exitFullscreen().catch(() => {});
    dialog.classList.remove('is-fullscreen'); updateFullscreen();
    paper.replaceChildren();
    document.body.classList.remove('modal-open');
    opener?.focus({ preventScroll: true });
  });
}
