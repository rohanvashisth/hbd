// ==========================================================================
// Birthday Celebration Interactive Logic for Barbie
// Pure Luxury Theme - Mobile Optimized - Sound Effects Removed
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const lockscreen = document.getElementById('lockscreen');
  const lockCard = document.querySelector('.lock-card');
  const nameInput = document.getElementById('name-input');
  const unlockBtn = document.getElementById('unlock-btn');
  const errorMsg = document.getElementById('error-msg');
  const mainStage = document.getElementById('main-stage');
  const musicToggle = document.getElementById('music-toggle');
  const musicStatusText = document.getElementById('music-status-text');
  const confettiBlastBtn = document.getElementById('confetti-blast-btn');
  const bgAudio = document.getElementById('bg-audio');

  // Background Slideshow Elements
  const bgSlideA = document.getElementById('bg-slide-a');
  const bgSlideB = document.getElementById('bg-slide-b');

  // Initialize and populate dynamic content from CONFIG
  setupConfigContent();

  // --------------------------------------------------------------------------
  // Gatekeeper: Name Verification
  // --------------------------------------------------------------------------
  function verifyName() {
    const rawValue = nameInput.value || '';
    const cleanValue = rawValue.trim().toLowerCase();

    // Strictly "nono" only (case-insensitive) - nothing else unlocks
    const isMatch = (cleanValue === "nono");

    if (isMatch) {
      handleSuccessUnlock();
    } else {
      handleFailedUnlock();
    }
  }

  function handleFailedUnlock() {
    lockCard.classList.remove('shake');
    void lockCard.offsetWidth; // Force reflow
    lockCard.classList.add('shake');

    errorMsg.textContent = "not your hbd";
    nameInput.focus();
    nameInput.select();
  }

  function handleSuccessUnlock() {
    errorMsg.textContent = "";
    nameInput.disabled = true;
    unlockBtn.disabled = true;

    // Start soft background music on direct user tap
    startSoftBackgroundMusic();

    // Elegant celebratory confetti cannon
    fireMassiveConfetti();

    // Smooth transition into the main celebration stage
    setTimeout(() => {
      lockscreen.classList.add('unlocked');
      mainStage.classList.add('visible');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  }

  unlockBtn.addEventListener('click', verifyName);
  nameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      verifyName();
    }
  });



  // --------------------------------------------------------------------------
  // Ambient Background Photo Slideshow (Dual-Buffer Cinematic Crossfade)
  // --------------------------------------------------------------------------
  const slideshowPhotos = (CONFIG.slideshow && CONFIG.slideshow.photos && CONFIG.slideshow.photos.length > 0)
    ? CONFIG.slideshow.photos
    : (CONFIG.memories ? CONFIG.memories.map(m => m.image) : []);

  let currentSlideIndex = 0;
  let activeSlideEl = bgSlideA;
  let inactiveSlideEl = bgSlideB;
  let slideshowTimer = null;
  const slideInterval = (CONFIG.slideshow && CONFIG.slideshow.intervalMs) || 5000;

  function preloadImage(url) {
    if (!url) return;
    const img = new Image();
    img.src = url;
  }

  function initBackgroundSlideshow() {
    if (!slideshowPhotos.length || !bgSlideA || !bgSlideB) return;

    // Load first photo on Slide A
    bgSlideA.style.backgroundImage = `url('${slideshowPhotos[0]}')`;
    bgSlideA.classList.add('active');
    currentSlideIndex = 0;

    // Preload second photo for instantaneous transition
    if (slideshowPhotos.length > 1) {
      preloadImage(slideshowPhotos[1]);
      if (!slideshowTimer) {
        slideshowTimer = setInterval(transitionNextSlide, slideInterval);
      }
    }
  }

  function transitionNextSlide() {
    if (slideshowPhotos.length <= 1) return;

    currentSlideIndex = (currentSlideIndex + 1) % slideshowPhotos.length;
    const nextPhotoUrl = slideshowPhotos[currentSlideIndex];

    // Preload the upcoming next photo ahead of time
    const upcomingIndex = (currentSlideIndex + 1) % slideshowPhotos.length;
    preloadImage(slideshowPhotos[upcomingIndex]);

    // Prepare inactive slide buffer with new photo
    inactiveSlideEl.style.backgroundImage = `url('${nextPhotoUrl}')`;

    // Smooth cinematic crossfade
    inactiveSlideEl.classList.add('active');
    activeSlideEl.classList.remove('active');

    // Swap slide buffers
    const temp = activeSlideEl;
    activeSlideEl = inactiveSlideEl;
    inactiveSlideEl = temp;
  }

  initBackgroundSlideshow();

  // --------------------------------------------------------------------------
  // Single Window Photo Viewer (Looping with Mobile Touch-Swipe Support)
  // --------------------------------------------------------------------------
  const viewerImg = document.getElementById('viewer-img');
  const viewerCounter = document.getElementById('viewer-counter');
  const viewerPrevArrow = document.getElementById('viewer-prev-arrow');
  const viewerNextArrow = document.getElementById('viewer-next-arrow');
  const viewerPrevBtn = document.getElementById('viewer-prev-btn');
  const viewerNextBtn = document.getElementById('viewer-next-btn');
  const viewerFrame = document.getElementById('viewer-frame');

  let currentViewerIndex = 0;

  function showViewerPhoto(index, animate = true) {
    if (!slideshowPhotos.length || !viewerImg) return;

    // Infinite loop wrap
    currentViewerIndex = (index + slideshowPhotos.length) % slideshowPhotos.length;
    const photoUrl = slideshowPhotos[currentViewerIndex];

    if (animate) {
      viewerImg.classList.add('fade-out');
      setTimeout(() => {
        viewerImg.src = photoUrl;
        viewerImg.classList.remove('fade-out');
      }, 150);
    } else {
      viewerImg.src = photoUrl;
    }

    if (viewerCounter) {
      viewerCounter.textContent = `${currentViewerIndex + 1} / ${slideshowPhotos.length}`;
    }

    // Preload adjacent images
    const nextIdx = (currentViewerIndex + 1) % slideshowPhotos.length;
    const prevIdx = (currentViewerIndex - 1 + slideshowPhotos.length) % slideshowPhotos.length;
    preloadImage(slideshowPhotos[nextIdx]);
    preloadImage(slideshowPhotos[prevIdx]);
  }

  function nextViewerPhoto() {
    showViewerPhoto(currentViewerIndex + 1);
  }

  function prevViewerPhoto() {
    showViewerPhoto(currentViewerIndex - 1);
  }

  if (viewerNextArrow) viewerNextArrow.addEventListener('click', nextViewerPhoto);
  if (viewerPrevArrow) viewerPrevArrow.addEventListener('click', prevViewerPhoto);
  if (viewerNextBtn) viewerNextBtn.addEventListener('click', nextViewerPhoto);
  if (viewerPrevBtn) viewerPrevBtn.addEventListener('click', prevViewerPhoto);

  // Mobile Touch Swipe Support
  let touchStartX = 0;
  let touchStartY = 0;

  if (viewerFrame) {
    viewerFrame.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    viewerFrame.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      // Trigger if primary motion is horizontal swipe
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 35) {
        if (diffX > 0) {
          prevViewerPhoto(); // Swipe right -> Previous
        } else {
          nextViewerPhoto(); // Swipe left -> Next
        }
      }
    }, { passive: true });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextViewerPhoto();
    if (e.key === 'ArrowLeft') prevViewerPhoto();
  });

  // Display initial photo in viewer
  showViewerPhoto(0, false);

  // --------------------------------------------------------------------------
  // Soft Music Control: Local MP3 Track (Gallan 4 Karaoke)
  // --------------------------------------------------------------------------
  let isPlayingMusic = false;

  function startSoftBackgroundMusic() {
    isPlayingMusic = true;
    musicToggle.classList.add('music-playing');
    musicStatusText.textContent = "Soft Music: Playing 🌸";

    if (bgAudio) {
      bgAudio.volume = (CONFIG.music && CONFIG.music.softVolume !== undefined) ? CONFIG.music.softVolume : 0.2;
      const playPromise = bgAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.log("Audio playback notice:", err);
        });
      }
    }
  }

  function pauseSoftBackgroundMusic() {
    isPlayingMusic = false;
    musicToggle.classList.remove('music-playing');
    musicStatusText.textContent = "Soft Music: Paused 🔇";

    if (bgAudio) {
      bgAudio.pause();
    }
  }

  musicToggle.addEventListener('click', () => {
    if (isPlayingMusic) {
      pauseSoftBackgroundMusic();
    } else {
      startSoftBackgroundMusic();
    }
  });

  // --------------------------------------------------------------------------
  // Canvas Confetti Effects (Champagne Gold, Ivory, Pearl & Soft Rose)
  // --------------------------------------------------------------------------
  function fireMassiveConfetti() {
    if (typeof confetti !== 'function') return;

    const end = Date.now() + 2.5 * 1000;
    const colors = ['#d4af37', '#f8fafc', '#e8d08d', '#e09faf', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 50,
        origin: { x: 0, y: 0.7 },
        colors: colors
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 50,
        origin: { x: 1, y: 0.7 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }

  confettiBlastBtn.addEventListener('click', () => {
    fireMassiveConfetti();
  });

  // --------------------------------------------------------------------------
  // Populate HTML from CONFIG
  // --------------------------------------------------------------------------
  function setupConfigContent() {
    const titleEl = document.getElementById('bday-title');
    if (titleEl) titleEl.innerHTML = `Happy Birthday, <em>${CONFIG.friendName}</em>`;

    const subtitleEl = document.getElementById('bday-subtitle');
    if (subtitleEl) subtitleEl.textContent = CONFIG.subtitle;

    const letterTitle = document.getElementById('letter-title');
    if (letterTitle) letterTitle.textContent = CONFIG.letter.title;

    const letterSalutation = document.getElementById('letter-salutation');
    if (letterSalutation) letterSalutation.textContent = CONFIG.letter.salutation;

    const letterBody = document.getElementById('letter-body');
    if (letterBody) {
      letterBody.innerHTML = CONFIG.letter.body.map(p => `<p>${p}</p>`).join('');
    }

    const letterSignoff = document.getElementById('letter-signoff');
    if (letterSignoff) {
      letterSignoff.innerHTML = `${CONFIG.letter.signoff} <span>${CONFIG.letter.sender}</span>`;
    }
  }
});
