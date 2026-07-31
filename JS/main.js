let currentImages = [];
let currentIndex = 0;
//variables and other stuff
//edited July 31 12:40 am
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


function scrollRow(btn, direction) {
  const wrapper = btn.closest('.work-row-wrapper');
  const row = wrapper.querySelector('.workRow');
  const scrollAmount = 1400;
  row.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}

//click animation
document.addEventListener('click', function(e) {
  const splatter = document.createElement('img');
  splatter.src = 'Homepage Images/Kimbro_Click.png';
  splatter.className = 'click-splatter';

  // position it centered on the exact click point
  splatter.style.left = (e.pageX - 180) + 'px';   // 40 = half your splatter's width, to center it
  splatter.style.top = (e.pageY - 180) + 'px';

  document.body.appendChild(splatter);

  // remove it after the gif's animation duration finishes
  setTimeout(() => {
    splatter.remove();
  }, 400); // match this to your gif's actual playback length in milliseconds
});
