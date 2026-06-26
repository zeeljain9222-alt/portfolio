const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const revealItems = document.querySelectorAll('.reveal');

menuToggle?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
});

window.addEventListener('click', (event) => {
  if (!event.target.closest('.header')) {
    navLinks?.classList.remove('open');
  }
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        sectionObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => sectionObserver.observe(item));

const links = document.querySelectorAll('a[href^="#"]');
links.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;
    event.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navLinks?.classList.remove('open');
    }
  });
});

// Lightbox functionality for gallery images
const galleryImages = Array.from(document.querySelectorAll('.gallery-image'));
const lightbox = document.querySelector('.lightbox');
const lightboxBackdrop = document.querySelector('[data-lightbox-close]');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-nav.prev');
const lightboxNext = document.querySelector('.lightbox-nav.next');
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  const image = galleryImages[currentIndex];
  if (!image) return;

  lightbox.classList.add('active');
  document.body.classList.add('lightbox-open');
  lightbox.setAttribute('aria-hidden', 'false');
  lightboxImage.classList.remove('loaded');
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt || 'Gallery image';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.classList.remove('lightbox-open');
  lightbox.setAttribute('aria-hidden', 'true');
}

function showNextImage() {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  openLightbox(currentIndex);
}

function showPrevImage() {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  openLightbox(currentIndex);
}

galleryImages.forEach((image, index) => {
  image.addEventListener('click', () => openLightbox(index));
});

lightboxClose?.addEventListener('click', closeLightbox);
lightboxBackdrop?.addEventListener('click', closeLightbox);
lightboxPrev?.addEventListener('click', (event) => {
  event.stopPropagation();
  showPrevImage();
});
lightboxNext?.addEventListener('click', (event) => {
  event.stopPropagation();
  showNextImage();
});

lightboxImage?.addEventListener('load', () => {
  lightboxImage.classList.add('loaded');
});

window.addEventListener('keydown', (event) => {
  if (!lightbox.classList.contains('active')) return;

  if (event.key === 'Escape') {
    closeLightbox();
  }

  if (event.key === 'ArrowRight') {
    showNextImage();
  }

  if (event.key === 'ArrowLeft') {
    showPrevImage();
  }
});

