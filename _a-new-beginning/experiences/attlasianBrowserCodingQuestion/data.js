export const secondsToMMSS = (seconds) => {
  // Ensure the input is a non-negative number
  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
  }
  // Calculate minutes and remaining seconds
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  // Pad with leading zeros if necessary
  const paddedMinutes = String(minutes).padStart(2, "0");
  const paddedSeconds = String(remainingSeconds).padStart(2, "0");
  // Return the formatted string
  return `${paddedMinutes}:${paddedSeconds}`;
};

export const getSongs = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "The Trooper",
          duration: 170, // in seconds
        },
        {
          id: 2,
          name: "Wonderwall",
          duration: 230,
        },
        {
          id: 3,
          name: "Under the Bridge",
          duration: 410,
        },
        {
          id: 4,
          name: "In The End",
          duration: 334,
        },
        {
          id: 5,
          name: "Shape of You",
          duration: 193,
        },
        {
          id: 6,
          name: "The Scientist",
          duration: 223,
        },
        {
          id: 7,
          name: "Stan",
          duration: 432,
        },
        {
          id: 8,
          name: "Love Story",
          duration: 156,
        },
        {
          id: 9,
          name: "Bohemian Rhapsody",
          duration: 354,
        },
        {
          id: 10,
          name: "Smells Like Teen Spirit",
          duration: 301,
        },
        {
          id: 11,
          name: "Hotel California",
          duration: 391,
        },
        {
          id: 12,
          name: "Stairway to Heaven",
          duration: 482,
        },
        {
          id: 13,
          name: "Billie Jean",
          duration: 294,
        },
        {
          id: 14,
          name: "Imagine",
          duration: 183,
        },
        {
          id: 15,
          name: "Hey Jude",
          duration: 431,
        },
        {
          id: 16,
          name: "Rolling in the Deep",
          duration: 228,
        },
        {
          id: 17,
          name: "Sweet Child o' Mine",
          duration: 356,
        },
        {
          id: 18,
          name: "Gangsta's Paradise",
          duration: 239,
        },
        {
          id: 19,
          name: "Like a Rolling Stone",
          duration: 369,
        },
        {
          id: 20,
          name: "Rolling in the Deep",
          duration: 228,
        },
        {
          id: 21,
          name: "Superstition",
          duration: 279,
        },
        {
          id: 22,
          name: "With or Without You",
          duration: 296,
        },
        {
          id: 23,
          name: "Uptown Funk",
          duration: 269,
        },
        {
          id: 24,
          name: "I Will Always Love You",
          duration: 271,
        },
        {
          id: 25,
          name: "Poker Face",
          duration: 235,
        },
        {
          id: 26,
          name: "Lose Yourself",
          duration: 326,
        },
        {
          id: 27,
          name: "Respect",
          duration: 148,
        },
        {
          id: 28,
          name: "I Want to Break Free",
          duration: 259,
        },
      ]);
    }, 1000);
  });
};
