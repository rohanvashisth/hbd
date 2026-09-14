// ==========================================================================
// Birthday Celebration Interactive Logic for Barbie
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
  const wrongNameMessages = [
    "Nope! Only Barbie holds the VIP pass today! 🧐",
    "Nice try! Who are you really? 😉",
    "Access denied! Hint: Try typing 'nono' or 'barbie' ✨",
    "Hmm, that's not what the birthday scroll says! 📜",
    "Close, but not quite! Give it another shot 🎈"
  ];

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

    const randomMsg = wrongNameMessages[Math.floor(Math.random() * wrongNameMessages.length)];
    errorMsg.style.color = '#fb7185';
    errorMsg.textContent = randomMsg;
    nameInput.focus();
    nameInput.select();
  }

  function handleSuccessUnlock() {
    errorMsg.style.color = '#4ade80';
    errorMsg.textContent = "Identity verified! Welcome Barbie! 🎉";
    nameInput.disabled = true;
    unlockBtn.disabled = true;

    // Massive celebratory confetti cannon
    fireMassiveConfetti();

    // Start gentle, soft background music
    startSoftBackgroundMusic();

    // Smooth transition into the main celebration stage
    setTimeout(() => {
      lockscreen.classList.add('unlocked');
      mainStage.classList.add('visible');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 900);
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
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
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
  // Soft, Soothing Background Music (Web Audio API Synthesizer)
  // --------------------------------------------------------------------------
  let audioCtx = null;
  let isPlayingMusic = false;
  let musicLoopTimer = null;

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
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.13);
    } catch (e) {}
  }

  // Soft Music Box Frequencies (Gentle High Octave)
  const notes = {
    C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23,
    G4: 392.00, A4: 440.00, B4: 493.88, C5: 523.25, D5: 587.33
  };

  const softBirthdayMelody = [
    { note: notes.C4, dur: 0.35 }, { note: notes.C4, dur: 0.25 }, { note: notes.D4, dur: 0.6 },
    { note: notes.C4, dur: 0.6 }, { note: notes.F4, dur: 0.6 }, { note: notes.E4, dur: 1.1 },
    { note: notes.C4, dur: 0.35 }, { note: notes.C4, dur: 0.25 }, { note: notes.D4, dur: 0.6 },
    { note: notes.C4, dur: 0.6 }, { note: notes.G4, dur: 0.6 }, { note: notes.F4, dur: 1.1 },
    { note: notes.C4, dur: 0.35 }, { note: notes.C4, dur: 0.25 }, { note: notes.C5, dur: 0.6 },
    { note: notes.A4, dur: 0.6 }, { note: notes.F4, dur: 0.6 }, { note: notes.E4, dur: 0.6 }, { note: notes.D4, dur: 0.9 },
    { note: notes.B4, dur: 0.35 }, { note: notes.B4, dur: 0.25 }, { note: notes.A4, dur: 0.6 },
    { note: notes.F4, dur: 0.6 }, { note: notes.G4, dur: 0.6 }, { note: notes.F4, dur: 1.4 }
  ];

  function playSoftMelodySequence() {
    if (!isPlayingMusic) return;
    initAudio();

    const softVolume = (CONFIG.music && CONFIG.music.softVolume) ? CONFIG.music.softVolume : 0.08;
    let curTime = audioCtx.currentTime + 0.1;
    let totalDuration = 0;

    softBirthdayMelody.forEach(item => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      // Sine wave creates a gentle, warm, soothing music-box tone
      osc.type = 'sine';
      osc.frequency.setValueAtTime(item.note, curTime);

      // Gentle attack and soft decay to avoid harsh clicks
      gain.gain.setValueAtTime(0.0001, curTime);
      gain.gain.exponentialRampToValueAtTime(softVolume, curTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, curTime + item.dur - 0.02);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(curTime);
      osc.stop(curTime + item.dur);

      curTime += item.dur;
      totalDuration += item.dur;
    });

    // Loop softly after a brief soothing pause
    if (musicLoopTimer) clearTimeout(musicLoopTimer);
    musicLoopTimer = setTimeout(() => {
      if (isPlayingMusic) {
        playSoftMelodySequence();
      }
    }, (totalDuration + 2.5) * 1000);
  }

  function startSoftBackgroundMusic() {
    try {
      initAudio();
      isPlayingMusic = true;
      musicToggle.classList.add('music-playing');
      musicStatusText.textContent = "Soft Music: Playing 🌸";
      playSoftMelodySequence();
    } catch (e) {
      console.log("Audio autoplay prevented by browser policy until gesture");
    }
  }

  function stopSoftBackgroundMusic() {
    isPlayingMusic = false;
    musicToggle.classList.remove('music-playing');
    musicStatusText.textContent = "Soft Music: Off 🔇";
    if (musicLoopTimer) clearTimeout(musicLoopTimer);
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
        gain.gain.setValueAtTime(0.09, audioCtx.currentTime + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(audioCtx.currentTime + i * 0.1);
        osc.stop(audioCtx.currentTime + 1.2);
      });
    } catch (e) {}
  }

  musicToggle.addEventListener('click', () => {
    if (isPlayingMusic) {
      stopSoftBackgroundMusic();
    } else {
      startSoftBackgroundMusic();
    }
  });

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

    // Render Polaroid Cards with Click-to-Read Feature
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

      // Add click listener to each polaroid card
      polaroidGrid.querySelectorAll('.polaroid-card').forEach(card => {
        card.addEventListener('click', () => {
          const index = parseInt(card.getAttribute('data-index'), 10);
          openPhotoModal(index);
        });
      });
    }
  }
});
