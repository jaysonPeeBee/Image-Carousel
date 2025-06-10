
const track = document.querySelector('.carousel-track');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const images = document.querySelectorAll('.carousel-image');
const slideCount = images.length - 1; // last is a clone
let currentIndex = 0;
let lastInteraction = Date.now();

function updateTrackWidth() {
  track.style.width = `${images.length * 100}%`;
  images.forEach(img => {
    img.style.width = `${100 / images.length}%`;
  });
}

function updateSlidePosition(animate = true) {
  const slideWidth = document.querySelector('.carousel').clientWidth;
  if (!animate) {
    track.style.transition = "none";
  } else {
    track.style.transition = "transform 0.5s ease-in-out";
  }
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

function nextImage() {
  if (currentIndex < slideCount) {
    currentIndex++;
    updateSlidePosition();
  }
  if (currentIndex === slideCount) {
    setTimeout(() => {
      currentIndex = 0;
      updateSlidePosition(false);
    }, 500);
  }
}

function prevImage() {
  if (currentIndex === 0) {
    currentIndex = slideCount;
    updateSlidePosition(false);
    setTimeout(() => {
      currentIndex--;
      updateSlidePosition();
    }, 50);
  } else {
    currentIndex--;
    updateSlidePosition();
  }
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

window.addEventListener('resize', () => updateSlidePosition(false));

// Init
updateTrackWidth();
updateSlidePosition(false);
startAutoplay();
