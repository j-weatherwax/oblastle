// Adds results of the game to the user's clipboard in order to share with others

// Example of what clipboard receives when user loses game
// #Oblastle #1 (21.02.2025) X/6 (87%)
// 🟩 🟩 🟩 🟩 ⬜ ↙️
// 🟩 🟩 🟨 ⬜ ⬜ ➡️
// 🟩 🟩 🟩 🟩 ⬜ ↘️
// 🟩 🟨 ⬜ ⬜ ⬜ ↘️
// 🟩 🟩 🟩 🟩 ⬜ ⬅️
// 🟩 🟩 🟨 ⬜ ⬜ ↘️

// {https://j-weatherwax.github.io/oblastle}

import { formatDate, daysSinceFirstPuzzle } from "./dateUtils";

export function copyToClipboard(
  currentGuessIndex,
  guesses,
  gameState,
  currentDate
) {
  let text = `#Oblastle #${daysSinceFirstPuzzle(currentDate) + 1} (${formatDate(
    currentDate
  )}) `;

  if (gameState === "win") {
    text += `${currentGuessIndex}/6 (100%)\n`;
  } else {
    // Iterates through the percents in the guesses in order to find the largest percent distance
    const maxPercent = guesses.reduce(
      (max, guess) => Math.max(max, guess.percent),
      0
    );
    text += `X/6 (${maxPercent}%)\n`;
  }

  const results = guesses
    .filter((guess) => guess !== null)
    .map((guess) => {
      const green = Math.floor(guess.percent / 20);
      const yellow = Math.floor((guess.percent % 20) / 10);
      const white = 5 - green - yellow;

      return `${"🟩 ".repeat(green)}${"🟨 ".repeat(yellow)}${"⬜ ".repeat(
        white
      )}${guess.emoji}\n`;
    })
    .join("");

  text += results + "\n{https://j-weatherwax.github.io/oblastle}";

  navigator.clipboard.writeText(text);
}
