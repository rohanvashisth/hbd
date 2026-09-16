// =========================================================
// Configuration file for Barbie's Birthday Website
// =========================================================

const CONFIG = {
  // Gatekeeper unlock settings (case-insensitive) - strictly "nono" only
  allowedNames: ["nono"],
  friendName: "Barbie",
  nickname: "Barbie",

  // Pre-Launch Countdown Settings (unlocks automatically at 12:00 AM on Sept 20th Central Time / Austin time)
  countdown: {
    targetTime: "2026-09-20T00:00:00-05:00",
    label: "unlocks in"
  },

  // Birthday celebration header
  birthdayTitle: "Happy Birthday, Barbie!",
  subtitle: "Today is all about celebrating you and every magical memory we share!",

  // Heartfelt Letter from Rohan
  letter: {
    title: "A Note for Barbie",
    salutation: "Happiest Birthday Barbiiiieeeeee!!!!!! 🎉",
    body: [
      "Thank you for being my best friend, you Beautiful, Funny, Smart, Pretty, Adorable, Mastikhor, Absolute gem of a person. Meeting you two years ago is genuinely one of the best things that happened to me, and I don’t think I’ll ever be able to fully explain how grateful I am that you came into my life.",
      "I still remember the first time you walked into RBS on orientation day. This tall girl walking over the boys and intimidating all of them, And then you introduced yourself in that 6th-floor room, and I heard it - Barbie Tyagi. A name no one can ever forget.",
      "We started as classmates, became project partners, went on trips, shared music, and somehow became best friends along the way. I remember working on the accounts project together and realizing how much we just jammed. You were honestly the one person I wanted to become friends with, and I’m so happy that we did.",
      "Looking back, it’s crazy to think that two years ago you were just someone I met in class, and today you’re someone I can’t imagine my USA journey, or my life, without. You’ve become such an important part of my life, and I’ll always cherish the memories we’ve made together. The trips, the random conversations, the music, the laughter, and all the little moments in between.",
      "And Barbie, I really want you to know how proud I am of you. I have so much respect for the person you are and everything you’ve achieved through your hard work. I know how much effort, dedication, and persistence it takes to get where you are, and seeing you come this far makes me genuinely happy. You deserve to be proud of yourself, because you’ve worked for every bit of it.",
      "I hope this birthday brings you everything you’ve been wishing for, and then gives you even more than you imagined. I hope you achieve every goal you’ve worked so hard for, and that life surprises you with opportunities, happiness, and moments that make you realize how far you’ve come.",
      "And whenever things get difficult, I hope you remember that you’re capable of so much more than you sometimes give yourself credit for. There will always be ups and downs, but I know you’ll keep finding your way through them. I’ll always be rooting for you, and I’ll always be happy to see you win.",
      "You’re always so full of life, and that’s one of the things I love most about you. You make life more fun, more memorable, and honestly, a lot more entertaining.",
      "We’ve come a long way since that orientation day, Barbie, and I’m so lucky I get to call you my best friend. I hope we continue making memories, going on trips, discovering new music, laughing at the most random things, and being there for each other through all the different chapters of life.",
      "You deserve the world, Barbie. I hope you get everything you’ve ever wanted, and so much more. And I hope you never forget how loved, appreciated, and special you are to the people who have you in their lives.",
      "Have the best day ever, Barbie! Have lots and lots of fun, make the most of your day, and let yourself be celebrated because you deserve it. I wish I could be there to celebrate with you, I miss you!!!!",
      'P.S. Dont forget - "Tenu pouna zidd dil di,  Mai vi vekhda kidda ni mildi 😌"'
    ],
    signoff: "Love you Barbie. Happiest birthday once again! ❤️",
    sender: "Rohan"
  },

  // Background Photo Slideshow Settings (14 pictures from Pictures/)
  slideshow: {
    intervalMs: 5000,
    fadeDurationMs: 1800,
    photos: [
      "Pictures/DSCN1980.JPG",
      "Pictures/DSCN1985.JPG",
      "Pictures/IMG-20250526-WA0040.jpg",
      "Pictures/IMG-20251123-WA0070.jpg",
      "Pictures/PXL_20250516_231118525.PORTRAIT.jpg",
      "Pictures/PXL_20250517_020808518.jpg",
      "Pictures/PXL_20250520_201619927.PORTRAIT.jpg",
      "Pictures/PXL_20251122_162536212.jpg",
      "Pictures/PXL_20251207_015924010.jpg",
      "Pictures/PXL_20260405_203720249.jpg",
      "Pictures/PXL_20260405_210634777.MP.jpg",
      "Pictures/PXL_20260405_210805156.PORTRAIT.jpg",
      "Pictures/PXL_20260509_021837870.jpg",
      "Pictures/PXL_20260519_195841736.jpg"
    ]
  },

  // Interactive Photo Memories (Preserved)
  memories: [
    {
      id: 1,
      image: "Pictures/DSCN1980.JPG",
      caption: "That unforgettable radiant smile",
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

if (typeof window !== 'undefined') {
  window.CONFIG = CONFIG;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
