(function(){
  "use strict";

  // PUBLIC_INTERFACE
  function initIndiceInteractions(){
    /** Initialize click handlers for prototype launch buttons. */
    const buttons = document.querySelectorAll('.cta-btn[data-proto]');
    buttons.forEach((btn)=>{
      // Add descriptive title attribute for additional assistive cue
      const id = btn.getAttribute('data-proto');
      if (!btn.title) {
        btn.title = `Iniciar prototipo ${id}`;
      }

      // Click handling
      btn.addEventListener('click', ()=>{
        const protoId = btn.getAttribute('data-proto');
        // Hook for external Play workflow - do not remove
        // eslint-disable-next-line no-console
        console.log(`Iniciar prototipo ${protoId}`);
        btn.classList.add('clicked');
        // Keep pressed state brief for visual feedback
        setTimeout(()=>btn.classList.remove('clicked'), 220);
      }, { passive: true });

      // Keyboard hint: Enter/Space should activate button in all browsers
      // Most browsers handle this natively for <button>, but this ensures consistency.
      btn.addEventListener('keydown', (e)=>{
        const key = e.key || e.code;
        if (key === 'Enter' || key === ' ' || key === 'Spacebar') {
          e.preventDefault();
          btn.click();
        }
      });
    });
  }

  // Ensure images with figmaimages/ path keep space with placeholders if not present.
  // Also set loading & decoding attributes for performance.
  function ensureFigmaImagePlaceholders(){
    try {
      const imgs = document.querySelectorAll('img[src*="figmaimages/"]');
      imgs.forEach(img => {
        // Lazy/perf attributes
        if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
        if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');

        // Add placeholder styling if image fails to load
        img.classList.add('img-placeholder');

        // If no explicit dimensions, assign safe defaults to avoid layout collapse
        if (!img.getAttribute('width') && !img.style.width) {
          img.style.width = '120px';
        }
        if (!img.getAttribute('height') && !img.style.height) {
          img.style.height = '80px';
        }
        // On error, keep placeholder styling visible
        img.addEventListener('error', () => {
          img.setAttribute('aria-hidden', 'true'); // decorative if missing
        }, { once: true, passive: true });
      });
    } catch (e) {
      // No-op: do not block render if query fails
      // eslint-disable-next-line no-console
      console.debug('Placeholder setup skipped', e);
    }
  }

  function onReady(){
    initIndiceInteractions();
    ensureFigmaImagePlaceholders();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady, { once: true });
  } else {
    onReady();
  }

  // Expose for external tooling if needed
  // PUBLIC_INTERFACE
  window.initIndiceInteractions = initIndiceInteractions;
})();
