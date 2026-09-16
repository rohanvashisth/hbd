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
  // Interactive Birthday Cake & Candles (Sound Effects Removed)
  // --------------------------------------------------------------------------
  const cakeContainer = document.getElementById('cake-container');
  const flames = document.querySelectorAll('.flame');
  const blowStatus = document.getElementById('blow-status');
  let blownCount = 0;

  cakeContainer.addEventListener('click', (e) => {
    const flameEl = e.target.closest('.flame');
    if (flameEl && !flameEl.classList.contains('blown-out')) {
      extinguishFlame(flameEl);
    } else {
      flames.forEach(flame => {
        if (!flame.classList.contains('blown-out')) {
          extinguishFlame(flame);
        }
      });
    }
  });

  function extinguishFlame(flame) {
    flame.classList.add('blown-out');
    blownCount++;

    if (blownCount >= flames.length) {
      blowStatus.innerHTML = `✨ Make a wish, ${CONFIG.friendName}! May all your dreams come true! 🎂✨`;
      fireHeartConfetti();
    }
  }

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
  // Floating Orbs / Wishes (Sound Effects Removed)
  // --------------------------------------------------------------------------
  const balloonArea = document.getElementById('balloon-area');
  const popToast = document.getElementById('pop-toast');
  const orbGradients = [
    'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.5), rgba(212, 175, 55, 0.3) 50%, rgba(20, 22, 34, 0.7) 100%)',
    'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.5), rgba(224, 159, 175, 0.3) 50%, rgba(20, 22, 34, 0.7) 100%)',
    'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.5), rgba(180, 205, 235, 0.3) 50%, rgba(20, 22, 34, 0.7) 100%)',
    'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.5), rgba(230, 215, 180, 0.3) 50%, rgba(20, 22, 34, 0.7) 100%)'
  ];

  function spawnBalloons() {
    balloonArea.innerHTML = '';
    CONFIG.balloonCompliments.forEach((compliment, index) => {
      const balloon = document.createElement('div');
      balloon.className = 'floating-balloon';
      const gradient = orbGradients[index % orbGradients.length];
      balloon.style.background = gradient;
      balloon.style.animationDelay = `${(index * 0.35).toFixed(2)}s`;

      balloon.addEventListener('click', () => {
        fireBalloonPopConfetti(balloon);
        popToast.textContent = `✨ "${compliment}"`;
        balloon.style.transform = 'scale(1.35)';
        balloon.style.opacity = '0';
        setTimeout(() => balloon.remove(), 250);
      });

      balloonArea.appendChild(balloon);
    });
  }

  spawnBalloons();

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

  function fireHeartConfetti() {
    if (typeof confetti !== 'function') return;
    confetti({
      particleCount: 60,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#d4af37', '#f8fafc', '#e8d08d', '#e09faf', '#ffffff']
    });
  }

  function fireBalloonPopConfetti(balloonEl) {
    if (typeof confetti !== 'function') return;
    const rect = balloonEl.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 20,
      spread: 50,
      origin: { x, y },
      colors: ['#d4af37', '#f8fafc', '#e8d08d', '#e09faf']
    });
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
