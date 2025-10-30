(function(){
  "use strict";

  // PUBLIC_INTERFACE
  function initIndiceInteractions(){
    /** Initialize click handlers for prototype launch buttons. */
    const buttons = document.querySelectorAll('.cta-btn[data-proto]');
    buttons.forEach((btn)=>{
      const id = btn.getAttribute('data-proto');
      if (!btn.title) btn.title = `Iniciar prototipo ${id}`;

      btn.addEventListener('click', ()=>{
        const protoId = btn.getAttribute('data-proto');
        // Hook for external Play workflow - do not remove
        console.log(`Iniciar prototipo ${protoId}`);
        btn.classList.add('clicked');
        setTimeout(()=>btn.classList.remove('clicked'), 220);
      }, { passive: true });

      btn.addEventListener('keydown', (e)=>{
        const key = e.key || e.code;
        if (key === 'Enter' || key === ' ' || key === 'Spacebar') {
          e.preventDefault();
          btn.click();
        }
      });
    });
  }

  // Safeguard + performance hints for figmaimages
  function ensureFigmaImagePlaceholders(){
    try {
      const imgs = document.querySelectorAll('img[src*="figmaimages/"]');
      imgs.forEach(img => {
        if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
        if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
        img.classList.add('img-placeholder');
        if (!img.getAttribute('width') && !img.style.width) img.style.width = '120px';
        if (!img.getAttribute('height') && !img.style.height) img.style.height = '80px';
        img.addEventListener('error', () => {
          img.setAttribute('aria-hidden', 'true');
        }, { once: true, passive: true });
      });
    } catch (e) {
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

  // PUBLIC_INTERFACE
  window.initIndiceInteractions = initIndiceInteractions;
})();
