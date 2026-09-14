// =========================================================
// Configuration file for Nono's Birthday Website
// You can edit any of the text, memories, or settings below!
// =========================================================

const CONFIG = {
  // Gatekeeper unlock settings (case-insensitive, whitespace-trimmed)
  allowedNames: ["nono", "nono!", "no-no", "nonu"],
  friendName: "Nono",
  nickname: "Nono",

  // Birthday details
  birthdayTitle: "Happy Birthday, Nono!",
  subtitle: "Today is all about celebrating the most awesome person ever! 🎂✨",

  // Heartfelt Letter from Rohan
  letter: {
    title: "A Special Letter for You 💌",
    salutation: "Dear Nono,",
    body: [
      "Happy Birthday! 🎉 Another fantastic year of laughs, unforgettable memories, and being completely irreplaceable.",
      "Thank you for always bringing your incredible energy, warmth, and laughter wherever you go. Life is so much brighter and more fun with you around.",
      "May this upcoming year be filled with exciting new adventures, big dreams coming true, endless happiness, and lots of cake!",
      "Cheers to you today and always!"
    ],
    signoff: "Best wishes always,",
    sender: "Rohan"
  },

  // Memory Lane (Polaroid Cards)
  // You can replace image URLs with your own photo paths (e.g., 'assets/photo1.jpg')
  memories: [
    {
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80",
      caption: "Unfiltered smiles & golden times ✨",
      date: "Good Times"
    },
    {
      image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&auto=format&fit=crop&q=80",
      caption: "The annual cake celebration 🎂",
      date: "Party Mode"
    },
    {
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80",
      caption: "Best laughs and crazy adventures 🌟",
      date: "Adventure"
    },
    {
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&auto=format&fit=crop&q=80",
      caption: "Making every moment count 🎈",
      date: "Memories"
    }
  ],

  // Reasons / Compliments for the Balloon Pop Game
  balloonCompliments: [
    "Most infectious laugh! 😂",
    "Heart of pure gold! 💛",
    "Always there when it matters! 🤝",
    "Supreme snack connoisseur! 🍕",
    "Unmatched energy and good vibes! ⚡",
    "The life of every party! 🥳",
    "Master of creating great memories! 📸",
    "Genuinely one of a kind! 🌟"
  ]
};

// Export for usage in script.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
