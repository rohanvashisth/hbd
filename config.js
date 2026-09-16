// =========================================================
// Configuration file for Barbie's Birthday Website
// =========================================================

const CONFIG = {
  // Gatekeeper unlock settings (case-insensitive)
  allowedNames: ["nono", "nono!", "barbie", "barbie!"],
  friendName: "Barbie",
  nickname: "Barbie",

  // Birthday celebration header
  birthdayTitle: "Happy Birthday, Barbie! 💖✨",
  subtitle: "Today is all about celebrating you and every magical memory we share! 🎂🌸",

  // Heartfelt Letter from Rohan
  letter: {
    title: "A Special Letter for Barbie 💌",
    salutation: "Dear Barbie,",
    body: [
      "Happy Birthday! 🎉 Another wonderful year of laughs, late-night talks, unforgettable moments, and having someone so genuinely special in my life.",
      "Your smile lights up every room, your kindness is endless, and you bring so much warmth and positivity everywhere you go.",
      "May this year bring you all the happiness, love, peace, and beautiful dreams you so richly deserve.",
      "Enjoy your special day to the fullest — you deserve the entire world!"
    ],
    signoff: "With all my love and best wishes,",
    sender: "Rohan"
  },

  // Interactive Photo Memories with Click-to-Read Messages
  // Loaded directly from your Pictures/ folder!
  memories: [
    {
      id: 1,
      image: "Pictures/DSCN1980.JPG",
      caption: "That unforgettable radiant smile ✨",
      date: "Cherished Moment",
      message: "Every time I see this picture, it reminds me of how naturally you bring happiness to everyone around you. Never stop smiling your genuine smile! 🌸"
    },
    {
      id: 2,
      image: "Pictures/DSCN1985.JPG",
      caption: "Pure vibes & picture perfect 📸",
      date: "Special Times",
      message: "One of my absolute favorite shots. The warmth, the joy, and the good energy you carry with you everywhere you go! 💖"
    },
    {
      id: 3,
      image: "Pictures/IMG-20250526-WA0040.jpg",
      caption: "Laughter in between the moments 😂",
      date: "Unfiltered Joy",
      message: "The candids are always the best because they show the real you — fun, spontaneous, and effortlessly wonderful! 🌟"
    },
    {
      id: 4,
      image: "Pictures/IMG-20251123-WA0070.jpg",
      caption: "A day to remember 💛",
      date: "Golden Times",
      message: "Looking back at this moment brings the biggest smile to my face. Having you around makes every day brighter! ✨"
    },
    {
      id: 5,
      image: "Pictures/PXL_20250516_231118525.PORTRAIT.jpg",
      caption: "Elegance and poise 👑",
      date: "Stunning Memory",
      message: "Truly one of a kind. Always remember how strong, graceful, and deeply appreciated you are! 💐"
    },
    {
      id: 6,
      image: "Pictures/PXL_20250517_020808518.jpg",
      caption: "Late nights & endless talks 🌙",
      date: "Midnight Memories",
      message: "The deep conversations and quiet moments are the ones that count the most. Thank you for always listening and being a true confidante! 🤝"
    },
    {
      id: 7,
      image: "Pictures/PXL_20250520_201619927.PORTRAIT.jpg",
      caption: "Glowing as always 🌸",
      date: "Sweet Moments",
      message: "Your positivity is contagious. May your upcoming year glow just as bright as you do here! 🌷"
    },
    {
      id: 8,
      image: "Pictures/PXL_20251122_162536212.jpg",
      caption: "Sunsets and good company 🌅",
      date: "Warm Horizons",
      message: "The peace and happiness of just enjoying the afternoon. Here's to making hundreds more memories like this! 🥂"
    },
    {
      id: 9,
      image: "Pictures/PXL_20251207_015924010.jpg",
      caption: "Making every moment count 🌟",
      date: "Winter Memories",
      message: "Through every season, having you as a friend is a gift. Keep shining in everything you do! ❄️✨"
    },
    {
      id: 10,
      image: "Pictures/PXL_20260405_203720249.jpg",
      caption: "Adventures and fun times 🎈",
      date: "Spring Days",
      message: "Every adventure is ten times better with you around. So grateful for all the laughs we've shared! 🚀"
    },
    {
      id: 11,
      image: "Pictures/PXL_20260405_210634777.MP.jpg",
      caption: "Unstoppable energy ⚡",
      date: "Happy Days",
      message: "Never lose that spark and fiery spirit. You have the ability to make anything exciting and fun! 💖"
    },
    {
      id: 12,
      image: "Pictures/PXL_20260405_210805156.PORTRAIT.jpg",
      caption: "Timeless portrait 🌺",
      date: "Pure Magic",
      message: "A portrait of someone truly special. I hope today brings you as much happiness as you give to the world! 🎂"
    },
    {
      id: 13,
      image: "Pictures/PXL_20260509_021837870.jpg",
      caption: "Crazy moments & pure laughs 🍕",
      date: "Late Night Fun",
      message: "These are the moments we'll talk about for years. Never change who you are! 🥳"
    },
    {
      id: 14,
      image: "Pictures/PXL_20260519_195841736.jpg",
      caption: "Cheers to the birthday star! 🥂",
      date: "Always & Forever",
      message: "No matter where life takes us, you will always be cherished and celebrated. Happy Birthday, Barbie! 🎉❤️"
    }
  ],

  // Balloon compliments for Barbie
  balloonCompliments: [
    "Most radiant smile in the universe! ✨",
    "Endlessly kind, caring, and thoughtful! 💛",
    "Brings warmth and joy wherever she goes! 🌸",
    "Incredible listener & truest friend! 🤝",
    "Unstoppable energy & gorgeous personality! 💖",
    "Makes every moment memorable! 📸",
    "Smart, fierce, and beautiful! 👑",
    "Genuinely one of a kind! 🌟"
  ],

  // Soft Background Music Settings (using local MP3 from Music/)
  music: {
    audioUrl: "Music/Gallan%204%20Karaoke.mp3",
    softVolume: 0.2, // 20% soft gentle volume
    autoPlayOnUnlock: true
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
