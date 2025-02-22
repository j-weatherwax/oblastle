export const getDate = () => new Date();

export const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

export const daysSinceFirstPuzzle = (currentDate) => {
  const firstPuzzleDate = new Date("2025-02-21T00:00:00");
  const daysSinceFirstPuzzle = Math.floor(
    (currentDate - firstPuzzleDate) / (1000 * 60 * 60 * 24)
  );

  return daysSinceFirstPuzzle;
};
