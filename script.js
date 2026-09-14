// ==========================================================================
// Birthday Celebration Interactive Logic
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
  const confettiBlastBtn = document.getElementById('confetti-blast-btn');

  // Populate dynamic content from CONFIG
  setupConfigContent();

  // --------------------------------------------------------------------------
  // Gatekeeper: Name Verification
  // --------------------------------------------------------------------------
  const wrongNameMessages = [
    "Nope! Only Nono holds the VIP pass today! 🧐",
    "Nice try! Who are you really? 😉",
    "Access denied! Hint: It's a 4-letter magic name ✨",
    "Hmm, that's not what the birthday scroll says! 📜",
    "Close, but not quite! Try typing 'nono' 🎈"
  ];

  function verifyName() {
    const rawValue = nameInput.value || '';
    const cleanValue = rawValue.trim().toLowerCase();

    // Check if entered name is in allowed list (case-insensitive)
    const isMatch = CONFIG.allowedNames.some(name => name.trim().toLowerCase() === cleanValue);

    if (isMatch) {
      handleSuccessUnlock();
    } else {
      handleFailedUnlock();
    }
  }

  function handleFailedUnlock() {
    // Trigger shake animation
    lockCard.classList.remove('shake');
    void lockCard.offsetWidth; // Force reflow
    lockCard.classList.add('shake');

    // Pick random playful error message
    const randomMsg = wrongNameMessages[Math.floor(Math.random() * wrongNameMessages.length)];
    errorMsg.textContent = randomMsg;
    nameInput.focus();
    nameInput.select();
  }

  function handleSuccessUnlock() {
    errorMsg.style.color = '#4ade80';
    errorMsg.textContent = "Identity verified! Opening party gates... 🎉";
    nameInput.disabled = true;
    unlockBtn.disabled = true;

    // Massive confetti cannon
    fireMassiveConfetti();

    // Start background birthday melody
    playMelody();

    // Transition smoothly to the main stage
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
    // If user clicked a specific candle flame
    const flameEl = e.target.closest('.flame');
    if (flameEl && !flameEl.classList.contains('blown-out')) {
      extinguishFlame(flameEl);
    } else {
      // Blow out all remaining flames
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
    playPopSound(800);

    if (blownCount >= flames.length) {
      blowStatus.innerHTML = "✨ Make a wish, Nono! May all your dreams come true! 🎂✨";
      fireHeartConfetti();
      playCheerTune();
    }
  }

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
        playPopSound(550 + index * 60);
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
  // Web Audio API Synthesizer (No external broken audio links)
  // --------------------------------------------------------------------------
  let audioCtx = null;
  let isPlayingMusic = false;

  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playPopSound(freq = 600) {
    try {
      initAudio();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.13);
    } catch (e) {
      // Audio context policy fallback
    }
  }

  // Happy Birthday Chime Notes (C4, D4, etc.)
  const notes = {
    C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23,
    G4: 392.00, A4: 440.00, B4: 493.88, C5: 523.25
  };

  const melody = [
    { note: notes.C4, dur: 0.3 }, { note: notes.C4, dur: 0.2 }, { note: notes.D4, dur: 0.5 },
    { note: notes.C4, dur: 0.5 }, { note: notes.F4, dur: 0.5 }, { note: notes.E4, dur: 0.9 },
    { note: notes.C4, dur: 0.3 }, { note: notes.C4, dur: 0.2 }, { note: notes.D4, dur: 0.5 },
    { note: notes.C4, dur: 0.5 }, { note: notes.G4, dur: 0.5 }, { note: notes.F4, dur: 0.9 },
    { note: notes.C4, dur: 0.3 }, { note: notes.C4, dur: 0.2 }, { note: notes.C5, dur: 0.5 },
    { note: notes.A4, dur: 0.5 }, { note: notes.F4, dur: 0.5 }, { note: notes.E4, dur: 0.5 }, { note: notes.D4, dur: 0.7 }
  ];

  function playMelody() {
    try {
      initAudio();
      isPlayingMusic = true;
      musicToggle.classList.add('music-playing');
      musicToggle.innerHTML = `<span class="music-icon">🎵</span> Music: Playing`;

      let curTime = audioCtx.currentTime + 0.1;
      melody.forEach(item => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(item.note, curTime);

        gain.gain.setValueAtTime(0.18, curTime);
        gain.gain.exponentialRampToValueAtTime(0.001, curTime + item.dur - 0.05);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(curTime);
        osc.stop(curTime + item.dur);
        curTime += item.dur;
      });
    } catch (e) {
      console.log("Audio play blocked by browser policy until interaction");
    }
  }

  function playCheerTune() {
    try {
      initAudio();
      const chordNotes = [notes.C4, notes.E4, notes.G4, notes.C5];
      chordNotes.forEach((f, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, audioCtx.currentTime + i * 0.1);
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(audioCtx.currentTime + i * 0.1);
        osc.stop(audioCtx.currentTime + 1.2);
      });
    } catch (e) {}
  }

  musicToggle.addEventListener('click', () => {
    if (isPlayingMusic) {
      isPlayingMusic = false;
      musicToggle.classList.remove('music-playing');
      musicToggle.innerHTML = `<span class="music-icon">🔇</span> Music: Off`;
      if (audioCtx) audioCtx.suspend();
    } else {
      playMelody();
    }
  });

  // --------------------------------------------------------------------------
  // Canvas Confetti Effects
  // --------------------------------------------------------------------------
  function fireMassiveConfetti() {
    if (typeof confetti !== 'function') return;

    // Side cannons
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#ff4081', '#ffd700', '#7c4dff', '#ffffff'];

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
    // Title and Subtitle
    const titleEl = document.getElementById('bday-title');
    if (titleEl) titleEl.textContent = CONFIG.birthdayTitle;

    const subtitleEl = document.getElementById('bday-subtitle');
    if (subtitleEl) subtitleEl.textContent = CONFIG.subtitle;

    // Letter
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

    // Memories Polaroid Grid
    const polaroidGrid = document.getElementById('polaroid-grid');
    if (polaroidGrid && CONFIG.memories) {
      polaroidGrid.innerHTML = CONFIG.memories.map(mem => `
        <div class="polaroid-card">
          <div class="tape"></div>
          <div class="polaroid-img-wrapper">
            <img src="${mem.image}" alt="${mem.caption}" loading="lazy" />
          </div>
          <div class="polaroid-caption">${mem.caption}</div>
          <div class="polaroid-date">${mem.date}</div>
        </div>
      `).join('');
    }
  }
});
