// ==========================================================================
// Birthday Celebration Interactive Logic for Barbie
// ==========================================================================

// YouTube Player Instance
let ytPlayer = null;
let isYtReady = false;

window.onYouTubeIframeAPIReady = function() {
  const videoId = (window.CONFIG && CONFIG.music && CONFIG.music.youtubeVideoId) ? CONFIG.music.youtubeVideoId : 'iLfWmakK8R8';
  const softVol = (window.CONFIG && CONFIG.music && CONFIG.music.softVolume) ? CONFIG.music.softVolume : 20;

  try {
    ytPlayer = new YT.Player('yt-player', {
      height: '100',
      width: '100',
      videoId: videoId,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        loop: 1,
        playlist: videoId,
        playsinline: 1,
        rel: 0
      },
      events: {
        onReady: function(event) {
          isYtReady = true;
          event.target.setVolume(softVol); // Soft background volume
        },
        onError: function(err) {
          console.log("YouTube Player notice: will fallback to soft ambient synth", err);
        }
      }
    });
  } catch (e) {
    console.log("YouTube API init error, fallback active", e);
  }
};

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

    // Start soft YouTube background music immediately on user gesture
    startSoftBackgroundMusic();

    // Massive celebratory confetti cannon
    fireMassiveConfetti();

    // Smooth transition into the main celebration stage
    setTimeout(() => {
      lockscreen.classList.add('unlocked');
      mainStage.classList.add('visible');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 700);
  }

  unlockBtn.addEventListener('click', verifyName);
  nameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      verifyName();
    }
  });

  // --------------------------------------------------------------------------
  // Interactive Birthday Cake & Candles
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
    playSoftPopSound(800);

    if (blownCount >= flames.length) {
      blowStatus.innerHTML = `✨ Make a wish, ${CONFIG.friendName}! May all your dreams come true! 🎂✨`;
      fireHeartConfetti();
      playSoftCheerTune();
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
  // Balloon Pop Mini-Game
  // --------------------------------------------------------------------------
  const balloonArea = document.getElementById('balloon-area');
  const popToast = document.getElementById('pop-toast');
  const balloonColors = ['#ff4081', '#7c4dff', '#ffd700', '#00e5ff', '#ff5252', '#69f0ae', '#ff9100'];

  function spawnBalloons() {
    balloonArea.innerHTML = '';
    CONFIG.balloonCompliments.forEach((compliment, index) => {
      const balloon = document.createElement('div');
      balloon.className = 'floating-balloon';
      const color = balloonColors[index % balloonColors.length];
      balloon.style.backgroundColor = color;
      balloon.style.animationDelay = `${(index * 0.35).toFixed(2)}s`;

      balloon.addEventListener('click', () => {
        playSoftPopSound(550 + index * 50);
        fireBalloonPopConfetti(balloon);
        popToast.textContent = `🎈 "${compliment}"`;
        balloon.style.transform = 'scale(1.4)';
        balloon.style.opacity = '0';
        setTimeout(() => balloon.remove(), 250);
      });

      balloonArea.appendChild(balloon);
    });
  }

  spawnBalloons();

  // --------------------------------------------------------------------------
  // Soft Music Control: YouTube Track (Gallan 4 Karaoke) + Synth Fallback
  // --------------------------------------------------------------------------
  let isPlayingMusic = false;

  function startSoftBackgroundMusic() {
    isPlayingMusic = true;
    musicToggle.classList.add('music-playing');
    musicStatusText.textContent = "Soft Music: Playing 🌸";

    const softVol = (CONFIG.music && CONFIG.music.softVolume) ? CONFIG.music.softVolume : 20;

    if (ytPlayer && typeof ytPlayer.playVideo === 'function') {
      try {
        ytPlayer.setVolume(softVol);
        ytPlayer.playVideo();
      } catch (e) {
        console.log("YouTube play retry", e);
      }
    } else {
      // If YouTube is still initializing, attempt after brief delay or use fallback
      setTimeout(() => {
        if (ytPlayer && typeof ytPlayer.playVideo === 'function') {
          ytPlayer.setVolume(softVol);
          ytPlayer.playVideo();
        } else {
          startSoftMelodySequence();
        }
      }, 800);
    }
  }

  function pauseSoftBackgroundMusic() {
    isPlayingMusic = false;
    musicToggle.classList.remove('music-playing');
    musicStatusText.textContent = "Soft Music: Paused 🔇";

    if (ytPlayer && typeof ytPlayer.pauseVideo === 'function') {
      try {
        ytPlayer.pauseVideo();
      } catch (e) {}
    }
    stopSoftMelodySequence();
  }

  musicToggle.addEventListener('click', () => {
    if (isPlayingMusic) {
      pauseSoftBackgroundMusic();
    } else {
      startSoftBackgroundMusic();
    }
  });

  // Soft Web Audio API Synthesizer (Fallback and Sound Effects)
  let audioCtx = null;
  let synthLoopTimer = null;

  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playSoftPopSound(freq = 600) {
    try {
      initAudio();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.13);
    } catch (e) {}
  }

  const notes = {
    C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23,
    G4: 392.00, A4: 440.00, B4: 493.88, C5: 523.25
  };

  const softMelodyNotes = [
    { note: notes.C4, dur: 0.35 }, { note: notes.C4, dur: 0.25 }, { note: notes.D4, dur: 0.6 },
    { note: notes.C4, dur: 0.6 }, { note: notes.F4, dur: 0.6 }, { note: notes.E4, dur: 1.1 }
  ];

  function startSoftMelodySequence() {
    initAudio();
    let curTime = audioCtx.currentTime + 0.1;
    let totalDuration = 0;

    softMelodyNotes.forEach(item => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(item.note, curTime);

      gain.gain.setValueAtTime(0.0001, curTime);
      gain.gain.exponentialRampToValueAtTime(0.06, curTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, curTime + item.dur - 0.02);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(curTime);
      osc.stop(curTime + item.dur);

      curTime += item.dur;
      totalDuration += item.dur;
    });

    if (synthLoopTimer) clearTimeout(synthLoopTimer);
    synthLoopTimer = setTimeout(() => {
      if (isPlayingMusic && (!ytPlayer || ytPlayer.getPlayerState() !== 1)) {
        startSoftMelodySequence();
      }
    }, (totalDuration + 2.5) * 1000);
  }

  function stopSoftMelodySequence() {
    if (synthLoopTimer) clearTimeout(synthLoopTimer);
  }

  function playSoftCheerTune() {
    try {
      initAudio();
      const chordNotes = [notes.C4, notes.E4, notes.G4, notes.C5];
      chordNotes.forEach((f, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, audioCtx.currentTime + i * 0.1);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(audioCtx.currentTime + i * 0.1);
        osc.stop(audioCtx.currentTime + 1.2);
      });
    } catch (e) {}
  }

  // --------------------------------------------------------------------------
  // Canvas Confetti Effects
  // --------------------------------------------------------------------------
  function fireMassiveConfetti() {
    if (typeof confetti !== 'function') return;

    const end = Date.now() + 2.5 * 1000;
    const colors = ['#ff4081', '#ffd700', '#7c4dff', '#ffffff', '#ff80ab'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
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
      particleCount: 80,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#ff4081', '#ffd700', '#ff80ab', '#ffffff']
    });
  }

  function fireBalloonPopConfetti(balloonEl) {
    if (typeof confetti !== 'function') return;
    const rect = balloonEl.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 30,
      spread: 60,
      origin: { x, y },
      colors: ['#ff4081', '#ffd700', '#00e5ff']
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
    if (titleEl) titleEl.textContent = CONFIG.birthdayTitle;

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
        <div class="polaroid-card" data-index="${index}" title="Click to read Barbie's special note 💌">
          <div class="tape"></div>
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
