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

  // Photo Modal Elements
  const photoModal = document.getElementById('photo-modal');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalImg = document.getElementById('modal-img');
  const modalCaption = document.getElementById('modal-caption');
  const modalDate = document.getElementById('modal-date');
  const modalMessage = document.getElementById('modal-message');
  const modalCounter = document.getElementById('modal-counter');
  const modalPrevBtn = document.getElementById('modal-prev-btn');
  const modalNextBtn = document.getElementById('modal-next-btn');

  let currentMemoryIndex = 0;

  // Initialize and populate dynamic content from CONFIG
  setupConfigContent();

  // --------------------------------------------------------------------------
  // Gatekeeper: Name Verification
  // --------------------------------------------------------------------------
  function verifyName() {
    const rawValue = nameInput.value || '';
    const cleanValue = rawValue.trim().toLowerCase();

    // Check against allowed names list (case-insensitive)
    const isMatch = CONFIG.allowedNames.some(name => name.trim().toLowerCase() === cleanValue);

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

    errorMsg.textContent = "incorrect name";
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
  // Interactive Photo Modal & Story Lightbox
  // --------------------------------------------------------------------------
  function openPhotoModal(index) {
    if (!CONFIG.memories || CONFIG.memories.length === 0) return;
    
    currentMemoryIndex = (index + CONFIG.memories.length) % CONFIG.memories.length;
    const item = CONFIG.memories[currentMemoryIndex];

    modalImg.src = item.image;
    modalCaption.textContent = item.caption || "Special Memory";
    modalDate.textContent = item.date || "Memory";
    modalMessage.textContent = item.message || "Thinking of you on your special day!";
    modalCounter.textContent = `${currentMemoryIndex + 1} of ${CONFIG.memories.length}`;

    photoModal.classList.add('active');
    photoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closePhotoModal() {
    photoModal.classList.remove('active');
    photoModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modalCloseBtn.addEventListener('click', closePhotoModal);
  modalOverlay.addEventListener('click', closePhotoModal);

  modalPrevBtn.addEventListener('click', () => {
    openPhotoModal(currentMemoryIndex - 1);
  });

  modalNextBtn.addEventListener('click', () => {
    openPhotoModal(currentMemoryIndex + 1);
  });

  document.addEventListener('keydown', (e) => {
    if (!photoModal.classList.contains('active')) return;
    if (e.key === 'Escape') closePhotoModal();
    if (e.key === 'ArrowLeft') openPhotoModal(currentMemoryIndex - 1);
    if (e.key === 'ArrowRight') openPhotoModal(currentMemoryIndex + 1);
  });

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

    const polaroidGrid = document.getElementById('polaroid-grid');
    if (polaroidGrid && CONFIG.memories) {
      polaroidGrid.innerHTML = CONFIG.memories.map((mem, index) => `
        <div class="polaroid-card" data-index="${index}" title="Tap to read Barbie's special note 💌">
          <div class="polaroid-img-wrapper">
            <img src="${mem.image}" alt="${mem.caption}" loading="lazy" />
          </div>
          <div class="polaroid-caption">${mem.caption}</div>
          <div class="polaroid-footer">
            <span class="polaroid-date">${mem.date}</span>
            <span class="polaroid-click-hint">Read note 💌</span>
          </div>
        </div>
      `).join('');

      polaroidGrid.querySelectorAll('.polaroid-card').forEach(card => {
        card.addEventListener('click', () => {
          const index = parseInt(card.getAttribute('data-index'), 10);
          openPhotoModal(index);
        });
      });
    }
  }
});
