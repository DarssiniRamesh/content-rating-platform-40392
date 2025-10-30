(function(){
  "use strict";
  // PUBLIC_INTERFACE
  function initIndiceInteractions(){
    /** Initialize simple click handlers for prototype launch buttons. */
    const buttons = document.querySelectorAll('.cta-btn[data-proto]');
    buttons.forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const id = btn.getAttribute('data-proto');
        // Placeholder for play-button integration hook
        console.log(`Iniciar prototipo ${id}`);
        btn.classList.add('clicked');
        setTimeout(()=>btn.classList.remove('clicked'), 300);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIndiceInteractions);
  } else {
    initIndiceInteractions();
  }
})();
