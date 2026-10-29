/* ==================== LIGHTBOX ==================== */
const lightbox = document.getElementById('lightbox');
const mediaBox = document.getElementById('lightbox-media');
const captionBox = document.getElementById('lightbox-caption');
const prevBtn = document.getElementById('lightbox-prev');
const nextBtn = document.getElementById('lightbox-next');

let currentImages = [];
let currentIndex = 0;
let lastTrigger = null;

function openLightbox(el) {
  lastTrigger = el;
  captionBox.innerHTML = el.dataset.caption || ''; // caption HTML is your own, so trusted

  if (el.dataset.images) {
    currentImages = JSON.parse(el.dataset.images);
  } else if (el.dataset.youtube) {
    currentImages = [{ type: 'youtube', src: el.dataset.youtube }];
  } else if (el.dataset.video) {
    currentImages = [{ type: 'video', src: el.dataset.video }];
  } else {
    currentImages = [{ type: 'image', src: el.currentSrc || el.src }];
  }

  currentIndex = 0;
  showSlide();
  lightbox.showModal();
  raiseClickLayer(); // keeps click splatter at the very top
}

function buildMedia(slide) {
  if (slide.type === 'youtube') {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${slide.src}?autoplay=1`;
    iframe.title = 'YouTube video player';
    iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
    iframe.allowFullscreen = true;
    return iframe;
  }
  if (slide.type === 'video') {
    const video = document.createElement('video');
    video.src = slide.src;
    video.controls = true;
    video.autoplay = true;
    return video;
  }
  const img = document.createElement('img');
  img.src = slide.src;
  img.alt = captionBox.textContent.trim().slice(0, 100) || 'Gallery image';
  return img;
}

function showSlide() {
  // Removing the old element stops video/YouTube playback and never leaves an element sitting around with an empty src
  mediaBox.replaceChildren(buildMedia(currentImages[currentIndex]));

  const multiple = currentImages.length > 1;
  prevBtn.classList.toggle('hidden', !multiple);
  nextBtn.classList.toggle('hidden', !multiple);

  // Preload the neighbors so flipping is instant
  if (multiple) {
    [1, -1].forEach(step => {
      const i = (currentIndex + step + currentImages.length) % currentImages.length;
      if (currentImages[i].type === 'image') new Image().src = currentImages[i].src;
    });
  }
}

function changeSlide(direction) {
  currentIndex = (currentIndex + direction + currentImages.length) % currentImages.length;
  showSlide();
}

/* ---- Events ---- */
document.querySelectorAll('.lightbox-trigger').forEach(el => {
  el.addEventListener('click', () => openLightbox(el));
  el.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLightbox(el);
    }
  });
});

document.getElementById('lightbox-close').addEventListener('click', () => lightbox.close());
prevBtn.addEventListener('click', () => changeSlide(-1));
nextBtn.addEventListener('click', () => changeSlide(1));

// Click on the empty area (the dialog itself, not its contents) closes it
//lightbox.addEventListener('click', e => {
//  if (e.target === lightbox) lightbox.close();
//});

// Arrow keys (Escape is handled natively by the dialog)
lightbox.addEventListener('keydown', e => {
  if (currentImages.length < 2) return;
  if (e.key === 'ArrowLeft') changeSlide(-1);
  if (e.key === 'ArrowRight') changeSlide(1);
});

// Runs however the dialog closes: button, Escape, or backdrop click
  lightbox.addEventListener('close', () => {
  mediaBox.replaceChildren();
  captionBox.innerHTML = '';
  console.log('closed'); //testing works!
  if (lastTrigger) lastTrigger.focus();
});
/* ==================== END LIGHTBOX ==================== */


// click animation
const clickLayer = document.getElementById('click-layer');
const SPLAT_SRC = '../Homepage%20Images/Kimbro_Click.png';   // make sure this is the real .apng
const SPLAT_SIZE = 360;
const SPLAT_DURATION = 400;   // match apng's length in ms

// preload once so the first click doesn't wait on the download
const preload = new Image();
preload.src = SPLAT_SRC;

function raiseClickLayer() { //meant to keep the click splatter above everything in the page.
  if (clickLayer.matches(':popover-open')) clickLayer.hidePopover();
  clickLayer.showPopover();
}
raiseClickLayer(); //meant to keep the click splatter above everything in the page.

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