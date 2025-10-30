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

      btn.addEventListener('click', ()=>{
        const protoId = btn.getAttribute('data-proto');
        // Hook for external Play workflow - do not remove
        console.log(`Iniciar prototipo ${protoId}`);
        btn.classList.add('clicked');
        // Keep pressed state brief for visual feedback
        setTimeout(()=>btn.classList.remove('clicked'), 220);
      }, { passive: true });

      // Also support Enter/Space while focused
      btn.addEventListener('keydown', (e)=>{
        if(e.key === 'Enter' || e.key === ' '){
          e.preventDefault();
          btn.click();
        }
      });
    });
  }

  // Safeguard: ensure images with figmaimages/ path keep space with placeholders if not present
  function ensureFigmaImagePlaceholders(){
    try {
      const imgs = document.querySelectorAll('img[src*="figmaimages/"]');
      imgs.forEach(img => {
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
