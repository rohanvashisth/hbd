// =========================================================
// Configuration file for Barbie's Birthday Website
// You can edit any of the text, memories, or settings below!
// =========================================================

const CONFIG = {
  // Gatekeeper unlock settings (case-insensitive)
  // "nono" is the secret passcode, and "barbie" also supported
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
  // You can easily drop your photos into 'assets/images/' or use image URLs!
  memories: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80",
      caption: "That unforgettable radiant smile ✨",
      date: "Cherished Moment",
      message: "Every time I see this picture, it reminds me of how naturally you bring happiness to everyone around you. Never stop smiling your genuine smile! 🌸"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80",
      caption: "Golden hour and pure vibes 🌅",
      date: "Sunlit Day",
      message: "One of my absolute favorite days. The conversations, the laughter, and the peace of just being in the moment. I hope this year brings us even more days like this! 💛"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&auto=format&fit=crop&q=80",
      caption: "Cake, wishes & celebrations 🎂",
      date: "Party Time",
      message: "You deserve every wish you make today to come true. Always remember how capable, strong, and deeply appreciated you are! 🍰✨"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80",
      caption: "Crazy laughs & endless talks 🌟",
      date: "Best Memories",
      message: "Having you as a friend is a true blessing. Thank you for being someone I can always count on, laugh with until my stomach hurts, and just be myself around. 💖"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=80",
      caption: "Floating high and dreaming big 🎈",
      date: "New Adventures",
      message: "Here's to the incredible journey ahead. You are destined for great things, Barbie, and I can't wait to see you conquer every one of your goals! 🚀"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80",
      caption: "Pure joy & magic moments ✨",
      date: "Always & Forever",
      message: "No matter how much time passes or how busy life gets, our bond will always remain special. Happy Birthday to the one and only Barbie! 🥂"
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

  // Music Settings
  music: {
    softVolume: 0.08, // Soft gentle background volume (0.0 to 1.0)
    autoPlayOnUnlock: true,
    // If you have a local mp3, place it in assets/music.mp3 and set the path below:
    customAudioUrl: "" // e.g. "assets/soft-piano-birthday.mp3"
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
