// Progressive enhancement: no CSS hides content, and every animation expires.
// Inline words preserve natural wrapping; words on the same measured line move together.
export function initAboutMotion() {
  const page = document.querySelector('.about-page');
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  if (!page || preference.matches || !Element.prototype.animate) return;
  const animations = new Set();
  let observer;
  function reveal(element, delay = 0, duration = 600, distance = 14) {
    const animation = element.animate([
      { opacity: 0, transform: `translateY(${distance}px)` },
      { opacity: 1, transform: 'translateY(0)' }
    ], {duration, delay, easing:'cubic-bezier(.22,1,.36,1)', fill:'backwards'});
    animations.add(animation);
    animation.finished.then(()=>animations.delete(animation)).catch(()=>{});
  }
  function splitWords(element) {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    const words = [];
    nodes.forEach(node=>{
      const fragment = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach(text=>{
        if (!text) return;
        if (/^\s+$/.test(text)) fragment.append(document.createTextNode(text));
        else {const word = document.createElement('span'); word.className='reveal-word'; word.textContent=text; fragment.append(word); words.push(word);}
      });
      node.replaceWith(fragment);
    });
    return words;
  }
  page.querySelectorAll('[data-reveal-words]').forEach(element=>splitWords(element).forEach((word,i)=>reveal(word,i*65)));
  let lineIndex = 0;
  page.querySelectorAll('[data-reveal-lines]').forEach(element=>{
    let previousTop = -Infinity;
    splitWords(element).forEach(word=>{
      const top = word.getBoundingClientRect().top;
      if (Math.abs(top-previousTop)>2) {lineIndex++; previousTop=top;}
      reveal(word,220+Math.min(lineIndex*55,650));
    });
  });
  reveal(page.querySelector('.about-portrait'),160,700,10);
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if (!entry.isIntersecting) return;
        if (!preference.matches) reveal(entry.target,0,500,10);
        observer.unobserve(entry.target);
      });
    },{threshold:0.05});
    page.querySelectorAll('[data-card-reveal]').forEach(card=>observer.observe(card));
  }
  function finish() {animations.forEach(animation=>animation.cancel()); animations.clear();}
  preference.addEventListener('change',()=>{if(preference.matches){finish();observer?.disconnect();}});
  // Finish rather than retain stale line timing after a viewport/orientation change.
  window.addEventListener('resize',finish,{passive:true});
}
