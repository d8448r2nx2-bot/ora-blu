/* script.js - progressive enhancements for ORA BLU site */
document.addEventListener('DOMContentLoaded', function () {

  // NAV TOGGLE (accessible)
  const navToggle = document.querySelectorAll('.nav-toggle');
  const mainNav = document.getElementById('main-nav');
  navToggle.forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if (mainNav) mainNav.style.display = expanded ? '' : 'flex';
    });
  });

  // Ensure mainNav visible on resize (desktop)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && mainNav) mainNav.style.display = '';
  });

  // LAZY YOUTUBE EMBEDS: replace button with iframe on click
  const ytButtons = document.querySelectorAll('.yt-thumb');
  ytButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const id = this.dataset.youtubeId;
      if (!id) return;
      const iframe = document.createElement('iframe');
      iframe.setAttribute('src', `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`);
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      iframe.setAttribute('allowfullscreen', '');
      iframe.className = 'video-iframe';
      // replace button with iframe
      this.replaceWith(iframe);
    });
  });

  // FILMSTRIP CONTROLS & AUTOSCROLL
  const filmstrip = document.getElementById('filmstrip');
  const leftBtn = document.querySelector('.film-left');
  const rightBtn = document.querySelector('.film-right');
  if (filmstrip) {
    const step = Math.round(window.innerWidth * 0.7);

    leftBtn && leftBtn.addEventListener('click', () => {
      filmstrip.scrollBy({ left: -step, behavior: 'smooth' });
    });
    rightBtn && rightBtn.addEventListener('click', () => {
      filmstrip.scrollBy({ left: step, behavior: 'smooth' });
    });

    // optional gentle auto scroll
    let autoScroll;
    const startAuto = () => {
      stopAuto();
      autoScroll = setInterval(() => {
        if (filmstrip.scrollLeft + filmstrip.clientWidth >= filmstrip.scrollWidth - 10) {
          filmstrip.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          filmstrip.scrollBy({ left: 360, behavior: 'smooth' });
        }
      }, 4200);
    };
    const stopAuto = () => { if (autoScroll) clearInterval(autoScroll); };
    filmstrip.addEventListener('mouseenter', stopAuto);
    filmstrip.addEventListener('focusin', stopAuto);
    filmstrip.addEventListener('mouseleave', startAuto);
    filmstrip.addEventListener('focusout', startAuto);
    // start autoplay if user allows reduced motion check
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) startAuto();
  }

});
