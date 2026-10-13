/* ===== LIGHTBOX (paste over your existing lightbox section in main.js) ===== */
let currentImages = [];
let currentIndex = 0;
 
function openLightbox(el) {
  document.getElementById('lightbox-caption').innerHTML = el.dataset.caption;
  document.getElementById('lightbox').classList.remove('hidden');
 
  // Build the mixed-media array
  if (el.dataset.images) {
    currentImages = JSON.parse(el.dataset.images);
  } else if (el.dataset.youtube) {
    currentImages = [{ type: 'youtube', src: el.dataset.youtube }];
  } else if (el.dataset.video) {
    currentImages = [{ type: 'video', src: el.dataset.video }];
  } else {
    currentImages = [{ type: 'image', src: el.src }];
  }
 
  currentIndex = 0;
  showSlide();
}
 
function showSlide() {
  const img = document.getElementById('lightbox-img');
  const video = document.getElementById('lightbox-video');
  const youtube = document.getElementById('lightbox-youtube');
 
  // Reset all media, and pause/clear video so it doesn't keep playing in the background
  img.classList.add('hidden');
  video.classList.add('hidden');
  video.pause();
  video.src = '';
  youtube.classList.add('hidden');
  youtube.src = '';
 
  const slide = currentImages[currentIndex];
 
  if (slide.type === 'youtube') {
    youtube.src = `https://www.youtube.com/embed/${slide.src}?autoplay=1`;
    youtube.classList.remove('hidden');
  } else if (slide.type === 'video') {
    video.src = slide.src;
    video.classList.remove('hidden');
    video.play();
  } else {
    img.src = slide.src;
    img.classList.remove('hidden');
  }
 
  // hide arrows if there's only one slide
  const showArrows = currentImages.length > 1;
  document.getElementById('lightbox-prev').style.display = showArrows ? 'block' : 'none';
  document.getElementById('lightbox-next').style.display = showArrows ? 'block' : 'none';
}
 
function changeSlide(direction) {
  currentIndex += direction;
  if (currentIndex >= currentImages.length) currentIndex = 0;
  if (currentIndex < 0) currentIndex = currentImages.length - 1;
  showSlide();
}
 
function closeLightbox() {
  document.getElementById('lightbox').classList.add('hidden');
  document.getElementById('lightbox-video').pause();
  document.getElementById('lightbox-video').src = '';
  document.getElementById('lightbox-youtube').src = '';
}
 
// NEW: Escape key closes the lightbox (only when it's actually open)
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !document.getElementById('lightbox').classList.contains('hidden')) {
    closeLightbox();
  }
});
/* ===== END LIGHTBOX ===== */


//scrollrow stuff
function scrollRow(btn, direction) {
  const wrapper = btn.closest('.work-row-wrapper');
  const row = wrapper.querySelector('.workRow');
  const scrollAmount = 1400;
  row.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}

// click animation
const clickLayer = document.getElementById('click-layer');
const SPLAT_SRC = '../Homepage Images/Kimbro_Click.png';   // make sure this is the real .gif
const SPLAT_SIZE = 360;
const SPLAT_DURATION = 400;   // match your gif's length in ms

// preload once so the first click doesn't wait on the download
const preload = new Image();
preload.src = SPLAT_SRC;

document.addEventListener('click', function (e) {
  const splat = document.createElement('div');
  splat.className = 'splat';

  // clientX/Y = position on screen (not the whole page), matching the fixed layer
  const x = e.clientX - SPLAT_SIZE / 2;
  const y = e.clientY - SPLAT_SIZE / 2;
  splat.style.transform = `translate(${x}px, ${y}px)`;

  const img = document.createElement('img');
  img.src = SPLAT_SRC;   // cached after preload, so no refetch
  splat.appendChild(img);

  clickLayer.appendChild(splat);
  setTimeout(() => splat.remove(), SPLAT_DURATION);
});

/*phone home nav button*/
const clickToOpen=document.getElementById("clickToOpen");
const menu = document.querySelector('nav');
const hamburgerMenu = document.querySelector('.hamburgerMenu');
const hamburgerMenuClose = document.querySelector('.hamburgerMenuClose');
clickToOpen.addEventListener('click', (e) => {
    menu.classList.toggle('clicked');
    hamburgerMenu.classList.toggle('clicked');
    hamburgerMenuClose.classList.toggle('clicked');
  console.log("Phone is active");
  e.stopPropagation(); // prevents this same click from being seen as an "outside" click below
});
document.addEventListener('click', (e) => {
  const isOpen = menu.classList.contains('is-open');
  if (isOpen && !clickedInsideMenu) {
    menu.classList.remove('clicked');
  }
});
/*phone home nav button*/