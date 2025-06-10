const track = document.querySelector('.carousel-track');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const images = document.querySelectorAll('.carousel-image');
let currentIndex = 0;
let lastInteraction = Date.now();

function updateTrackWidth() {
  track.style.width = `${images.length * 100}%`;
  images.forEach(img => {
    img.style.width = `${100 / images.length}%`;
  });
}

function updateSlidePosition() {
  const slideWidth = document.querySelector('.carousel').clientWidth;
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  updateSlidePosition();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateSlidePosition();
}

function resetAutoplayTimer() {
  lastInteraction = Date.now();
}

function startAutoplay() {
  setInterval(() => {
    if (Date.now() - lastInteraction > 10000) {
      nextImage();
    }
  }, 3000);
}

nextBtn.addEventListener('click', () => {
  nextImage();
  resetAutoplayTimer();
});

prevBtn.addEventListener('click', () => {
  prevImage();
  resetAutoplayTimer();
});

// Touch swipe
let startX = 0;
document.querySelector('.carousel').addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

document.querySelector('.carousel').addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  if (endX < startX - 30) {
    nextImage();
    resetAutoplayTimer();
  } else if (endX > startX + 30) {
    prevImage();
    resetAutoplayTimer();
  }
});

window.addEventListener('resize', updateSlidePosition);

// Initialize
updateTrackWidth();
updateSlidePosition();
startAutoplay();
