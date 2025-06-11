<!-- ✅ Logo Entrance Animation -->
<script>
window.addEventListener('load', () => {
  const logo = document.querySelector('.logo-wrapper');
  if (logo) logo.classList.add('loaded');
});
</script>

<!-- ✅ Global Fade-In Observer -->
<script>
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
      rootMargin: "0px 0px 20% 0px",  // ✅ Use our optimized earlier trigger
      threshold: 0.01
    });

    fadeElements.forEach(el => io.observe(el));
  }

  // ✅ Master observer waits until DOM has fade-in elements
  const masterObserver = new MutationObserver(() => {
    const fadeSections = document.querySelectorAll('.fade-in');
    if (!fadeSections.length) return;

    attachFadeObserver();
    masterObserver.disconnect();
  });

  masterObserver.observe(document.body, { childList: true, subtree: true });
})();
</script>


<!-- ✅ Optional safety preload (instant load when fully DOM loaded) -->
<script>
document.addEventListener("DOMContentLoaded", function() {
  const hero = document.querySelector('.hero');
  if (hero) hero.classList.add('in-view');
});
</script>

<!-- ✅ Progress Bar Sync Logic -->
<script>
function setupProgress(gridClass, progressClass, steps) {
  const grid = document.querySelector(gridClass);
  const progress = document.querySelector(progressClass);
  if (!grid || !progress) return;

  grid.scrollLeft = 0;

  grid.addEventListener("scroll", () => {
    const cardWidth = grid.querySelector('.lumina-recovery-card').offsetWidth + 16;
    const index = Math.round(grid.scrollLeft / cardWidth);
    const percent = ((index + 1) / steps) * 100;
    progress.style.width = percent + "%";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupProgress('.system-grid', '.system-progress', 6);
  setupProgress('.case-grid', '.case-progress', 3);
});
</script>

<!-- ✅ Mobile Scroll Reset Logic -->
<script>
document.addEventListener("DOMContentLoaded", () => {
  const systemGrid = document.querySelector(".system-grid");
  const caseGrid = document.querySelector(".case-grid");

  function fullyResetScroll(grid) {
    setTimeout(() => {
      grid.scrollTo({
        left: 0,
        behavior: "instant"
      });
    }, 500);
  }

  if (window.innerWidth < 768) {
    fullyResetScroll(systemGrid);
    fullyResetScroll(caseGrid);
  }
});
</script>

<!-- ✅ Industry Slider Logic -->
<script>
(() => {
  const slider = document.getElementById('industry-slider-v4');
  if (!slider) return;

  const slides = slider.querySelectorAll('.slide');
  const prevBtn = slider.querySelector('.slider-nav.prev');
  const nextBtn = slider.querySelector('.slider-nav.next');
  const dotsContainer = slider.querySelector('.slider-dots');
  let currentSlide = 0;
  let slideInterval = null;
  const autoSlideDelay = 6000;

  // Build dots dynamically
  slides.forEach((_, idx) => {
    const dot = document.createElement('div');
    if (idx === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      currentSlide = idx;
      showSlide(currentSlide);
      resetAutoSlide();
    });
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('div');

  function updateDots() {
    dots.forEach((dot, idx) => dot.classList.toggle('active', idx === currentSlide));
  }

  function showSlide(i) {
    slides.forEach((slide, idx) => slide.classList.toggle('active', idx === i));
    updateDots();
  }

  function changeSlide(direction) {
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  function startAutoSlide() {
    slideInterval = setInterval(() => changeSlide(1), autoSlideDelay);
  }

  function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      changeSlide(-1);
      resetAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
      changeSlide(1);
      resetAutoSlide();
    });
  }

  // Start on load
  showSlide(currentSlide);
  startAutoSlide();
})();
</script>




<script>
// industry-section.js
(() => {
  const cards = document.querySelectorAll('.llai-industry-card');

  function parallaxScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const viewportHeight = window.innerHeight;
    cards.forEach(card => {
      const speed = parseFloat(card.dataset.parallaxSpeed) || 0;
      const rect = card.getBoundingClientRect();
      if (rect.top < viewportHeight && rect.bottom > 0) {
        let translateY = (scrollTop * speed);
        translateY = Math.max(Math.min(translateY, 10), -10);
        card.style.transform = `translateY(${translateY}px)`;
      }
    });
  }

  function isMobile() {
    return window.matchMedia("(max-width: 768px)").matches;
  }

  if (!isMobile()) {
    window.addEventListener('scroll', parallaxScroll);
    parallaxScroll();
  } else {
    cards.forEach(card => {
      card.style.transform = 'none';
    });
  }
})();
</script>




  
  
  
  

<script>
window.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".ai-slider");
  if (!slider) return;

  // Disable snapping temporarily
  slider.style.scrollSnapType = "none";

  // Scroll left immediately
  slider.scrollLeft = 0;

  // Re-enable snapping after layout
  requestAnimationFrame(() => {
    slider.scrollLeft = 0;
    slider.style.scrollSnapType = "x mandatory";
  });

  // Last-resort backup
  setTimeout(() => {
    slider.scrollLeft = 0;
  }, 400);
});
</script>


<script>
const grid = document.querySelector('.lumina-recovery-grid');
const cards = document.querySelectorAll('.lumina-recovery-card');

function updateFocus() {
  const center = grid.scrollLeft + grid.offsetWidth / 2;
  let closestIndex = 0;
  let closestDistance = Infinity;

  cards.forEach((card, i) => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const distance = Math.abs(center - cardCenter);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = i;
    }
  });

  cards.forEach((card, i) => {
    card.classList.toggle('focused', i === closestIndex);
  });
}

grid.addEventListener('scroll', updateFocus);
updateFocus();
</script>





