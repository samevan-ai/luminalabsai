// ✅ Logo Entrance Animation
window.addEventListener('load', () => {
  const logo = document.querySelector('.logo-wrapper');
  if (logo) logo.classList.add('loaded');
});

// ✅ Global Fade-In Observer
(function() {
  function attachFadeObserver() {
    const fadeElements = document.querySelectorAll('.fade-in');
    if (!fadeElements.length) return;

    const io = new IntersectionObserver((entries, io) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { 
      rootMargin: "0px 0px 20% 0px",
      threshold: 0.01
    });

    fadeElements.forEach(el => io.observe(el));
  }

  // Master observer waits until DOM has fade-in elements
  const masterObserver = new MutationObserver(() => {
    const fadeSections = document.querySelectorAll('.fade-in');
    if (!fadeSections.length) return;

    attachFadeObserver();
    masterObserver.disconnect();
  });

  masterObserver.observe(document.body, { childList: true, subtree: true });

  // Immediate pass for fast-load
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    attachFadeObserver();
  } else {
    document.addEventListener("DOMContentLoaded", attachFadeObserver);
  }
})();

// ✅ Force Hero Fade-In if above-the-fold
document.addEventListener("DOMContentLoaded", function() {
  const hero = document.querySelector('.hero');
  if (hero) hero.classList.add('in-view');
});

// ✅ AI Slider (horizontal scroll) Snap Reset
window.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".ai-slider");
  if (!slider) return;

  // Disable snapping temporarily
  slider.style.scrollSnapType = "none";
  slider.scrollLeft = 0;
  requestAnimationFrame(() => {
    slider.scrollLeft = 0;
    slider.style.scrollSnapType = "x mandatory";
  });
  setTimeout(() => { slider.scrollLeft = 0; }, 400);
});

// ✅ Lumina Recovery Card Focus (carousel highlight)
window.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector('.lumina-recovery-grid');
  if (!grid) return;
  const cards = grid.querySelectorAll('.lumina-recovery-card');
  function updateFocus() {
    const center = grid.scrollLeft + grid.offsetWidth / 2;
    let closestIndex = 0, closestDistance = Infinity;
    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(center - cardCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    });
    cards.forEach((card, i) => card.classList.toggle('focused', i === closestIndex));
  }
  grid.addEventListener('scroll', updateFocus);
  updateFocus();
});





