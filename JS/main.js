let currentImages = [];
let currentIndex = 0;
//variables and other stuff

function openLightbox(el) {
  document.getElementById('lightbox-img').src = el.src;
  document.getElementById('lightbox-caption').textContent = el.dataset.caption;
  document.getElementById('lightbox').classList.remove('hidden');
  document.getElementById('lightbox-caption').innerHTML = el.dataset.caption;

// Video components
  const img = document.getElementById('lightbox-img');
  const video = document.getElementById('lightbox-video');
  const youtube = document.getElementById('lightbox-youtube');

  img.classList.add('hidden');
  video.classList.add('hidden');
  youtube.classList.add('hidden');

  if (el.dataset.youtube) {
    youtube.src = `https://www.youtube.com/embed/${el.dataset.youtube}?autoplay=1`;
    youtube.classList.remove('hidden');
  } else if (el.dataset.video) {
    video.src = el.dataset.video;
    video.classList.remove('hidden');
    video.play();
  } else {
    img.src = el.src;
    img.classList.remove('hidden');
  }
// Video components

    // if data-images exists, use that array; otherwise fall back to the single src
    currentImages = el.dataset.images ? JSON.parse(el.dataset.images) : [el.src];
    currentIndex = 0;
    showSlide();
}

function showSlide() {
  document.getElementById('lightbox-img').src = currentImages[currentIndex];

  // hide arrows if there's only one image
  const showArrows = currentImages.length > 1;
  document.getElementById('lightbox-prev').style.display = showArrows ? 'block' : 'none';
  document.getElementById('lightbox-next').style.display = showArrows ? 'block' : 'none';
}

function changeSlide(direction) {
  currentIndex += direction;
  // wrap around: past the last image goes to the first, and vice versa
  if (currentIndex >= currentImages.length) currentIndex = 0;
  if (currentIndex < 0) currentIndex = currentImages.length - 1;
  showSlide();
}


function closeLightbox() {
  document.getElementById('lightbox').classList.add('hidden');

 document.getElementById('lightbox-video').pause();
 document.getElementById('lightbox-video').src = '';
 document.getElementById('lightbox-youtube').src = '';   // stops YouTube playback on close
 document.getElementById('lightbox').classList.add('hidden');
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