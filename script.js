
const images = document.querySelectorAll('.carousel-image');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;
let autoplayInterval;
let lastInteraction = Date.now();

function updateCarousel() {
  images.forEach((img, idx) => {
    img.classList.remove('active');
    img.style.opacity = 0;
    img.style.transition = 'opacity 0.5s ease';
  });
  images[currentIndex].classList.add('active');
  images[currentIndex].style.opacity = 1;
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  updateCarousel();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateCarousel();
}

function resetAutoplayTimer() {
  lastInteraction = Date.now();
}

// autoplay logic
function startAutoplay() {
  autoplayInterval = setInterval(() => {
    if (Date.now() - lastInteraction >= 10000) {
      nextImage();
    }
  }, 3000); // changes every 3s if no user interaction
}

prevBtn.addEventListener('click', () => {
  prevImage();
  resetAutoplayTimer();
});

nextBtn.addEventListener('click', () => {
  nextImage();
  resetAutoplayTimer();
});

// Touch swipe
let startX = 0;
document.querySelector('.carousel-wrapper').addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
}, false);

document.querySelector('.carousel-wrapper').addEventListener('touchend', (e) => {
  let endX = e.changedTouches[0].clientX;
  if (endX < startX - 30) {
    nextImage();
    resetAutoplayTimer();
  } else if (endX > startX + 30) {
    prevImage();
    resetAutoplayTimer();
  }
}, false);

// init
updateCarousel();
startAutoplay();
