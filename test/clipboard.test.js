import { copyToClipboard } from "../utils/clipboard";
import { formatDate, daysSinceFirstPuzzle } from "../utils/dateUtils";

// Mocking the clipboard API and utility functions
global.navigator.clipboard = {
  writeText: jest.fn(),
};

jest.mock("../utils/dateUtils", () => ({
  formatDate: jest.fn(),
  daysSinceFirstPuzzle: jest.fn(),
}));

describe("copyToClipboard", () => {
  const currentDate = new Date("2025-02-22");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should copy the correct text to clipboard when user wins", () => {
    const currentGuessIndex = 4;
    const guesses = [
      { percent: 40, emoji: "➡️" },
      { percent: 67, emoji: "⬇️" },
      { percent: 90, emoji: "↘️" },
      { percent: 100, emoji: "🎉" },
    ];

    const gameState = "win";

    formatDate.mockReturnValue("22.02.2025");
    daysSinceFirstPuzzle.mockReturnValue(1);

    copyToClipboard(currentGuessIndex, guesses, gameState, currentDate);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      "#Oblastle #2 (22.02.2025) 4/6 (100%)\n🟩 🟩 ⬜ ⬜ ⬜ ➡️\n🟩 🟩 🟩 ⬜ ⬜ ⬇️\n🟩 🟩 🟩 🟩 🟨 ↘️\n🟩 🟩 🟩 🟩 🟩 🎉\n\nhttps://j-weatherwax.github.io/oblastle"
    );
  });

  it("Should copy the correct text to clipboard when user loses", () => {
    const currentGuessIndex = 6;
    const guesses = [
      { percent: 32, emoji: "➡️" },
      { percent: 60, emoji: "↘️" },
      { percent: 77, emoji: "↘️" },
      { percent: 77, emoji: "➡️" },
      { percent: 87, emoji: "➡️" },
      { percent: 90, emoji: "↘️" },
    ];

    const gameState = "lose";

    formatDate.mockReturnValue("22.02.2025");
    daysSinceFirstPuzzle.mockReturnValue(1);

    copyToClipboard(currentGuessIndex, guesses, gameState, currentDate);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      "#Oblastle #2 (22.02.2025) X/6 (90%)\n🟩 🟨 ⬜ ⬜ ⬜ ➡️\n🟩 🟩 🟩 ⬜ ⬜ ↘️\n🟩 🟩 🟩 🟨 ⬜ ↘️\n🟩 🟩 🟩 🟨 ⬜ ➡️\n🟩 🟩 🟩 🟩 ⬜ ➡️\n🟩 🟩 🟩 🟩 🟨 ↘️\n\nhttps://j-weatherwax.github.io/oblastle"
    );
  });
});
