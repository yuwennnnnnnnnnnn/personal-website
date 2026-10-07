import React, {forwardRef, useEffect, useMemo, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import HTMLFlipBook from 'react-pageflip';
import manifest from '../public/assets/handmaiden/pages/manifest.json';

const pages = manifest.slice(1);
const BookPage = forwardRef(function BookPage({page}, ref) {
  return <div ref={ref} className="hm-flat-page"><img src={page.src} width={page.width} height={page.height} alt={`${page.label} of The Handmaiden photobook`} draggable="false" /></div>;
});
function BookReader() {
  const stage = useRef(null);
  const fullscreenButton = useRef(null);
  const [fullscreen, setFullscreen] = useState(false);
  const book = useRef(null);
  const current = useRef(0);
  const [size, setSize] = useState(null);
  const [page, setPage] = useState(0);
  
  useEffect(() => {
    if (!fullscreen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = event => {
      if (event.key === 'Escape') setFullscreen(false);
      if (event.key === 'Tab') { event.preventDefault(); fullscreenButton.current?.focus(); }
    };
    fullscreenButton.current?.focus();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
      fullscreenButton.current?.focus();
    };
  }, [fullscreen]);
  useEffect(() => {
    const resize = () => {
      const available = stage.current.clientWidth;
      const single = window.matchMedia('(max-width: 700px)').matches;
      // Leave room for the shared chapter heading, hint, indicator and breathing space.
      const heightLimit = Math.max(180, window.innerHeight - (fullscreen ? 156 : single ? 200 : 320));
      const width = Math.floor(Math.min(fullscreen ? Infinity : single ? 360 : 480, available / (single ? 1 : 2), heightLimit / 1.5));
      setSize(previous => previous?.width === width && previous?.single === single ? previous : {width, single});
    };
    const observer = new ResizeObserver(resize);
    observer.observe(stage.current);
    window.addEventListener('resize', resize);
    return () => { observer.disconnect(); window.removeEventListener('resize', resize); };
  }, [fullscreen]);
  const children = useMemo(() => pages.map((item) => <BookPage key={item.src} page={item}/>), []);
  const start = size?.single ? current.current : Math.floor(current.current / 2) * 2;
  const last = size?.single ? page : Math.min(page + 1, pages.length - 1);
  const updatePage = index => { current.current = index; setPage(index); };
  return <div className={`hm-reader${fullscreen ? ' hm-reader-fullscreen' : ''}`} aria-label="Interactive photobook" role={fullscreen ? 'dialog' : undefined} aria-modal={fullscreen || undefined}>
    <div className="hm-reader-toolbar">
      <p className="hm-reader-hint">Click or drag a page to turn it.</p>
      <button ref={fullscreenButton} type="button" className="hm-reader-expand" aria-expanded={fullscreen} aria-label={fullscreen ? 'Close fullscreen' : 'Fullscreen'} title={fullscreen ? 'Close fullscreen' : 'Fullscreen'} onClick={() => setFullscreen(value => !value)}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={fullscreen ? 'M4 9h5V4M20 9h-5V4M4 15h5v5M20 15h-5v5' : 'M9 4H4v5M15 4h5v5M4 15v5h5M20 15v5h-5'}/></svg></button>
    </div>
    <div ref={stage} className="hm-reader-stage" data-mode={size?.single ? 'single' : 'spread'}>
      {size && <HTMLFlipBook key={`${size.width}-${size.single}`} ref={book}
        width={size.width} height={size.width * 1.5} size="fixed" startPage={start}
        usePortrait={size.single} showCover={false} autoSize={true}
        drawShadow={true} maxShadowOpacity={0.12} flippingTime={500}
        mobileScrollSupport={false} useMouseEvents={true} swipeDistance={30}
        clickEventForward={true} showPageCorners={true} disableFlipByClick={false}
        className="hm-flipbook" style={{margin:'0 auto'}}
        onInit={event => updatePage(event.object.getCurrentPageIndex())}
        onFlip={event => updatePage(event.data)}>
        {children}
      </HTMLFlipBook>}
    </div>
    <div className="hm-reader-pagination">
      <output aria-live="polite" aria-atomic="true">{size?.single ? `Page ${page+1}` : `Pages ${page+1}–${last+1}`} / {pages.length}</output>
    </div>
  </div>;
}
const mount = document.querySelector('#handmaiden-book');
if (mount) createRoot(mount).render(<BookReader/>);
