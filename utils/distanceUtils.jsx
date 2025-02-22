import { FetchData } from "./jsonUtils";

export async function evaluateGuess(guess, target) {
  if (guess == "") {
    return;
  }

  const guessedJSON = await FetchData(guess);
  const targetJSON = await FetchData(target);

  const distance = haversine(guessedJSON, targetJSON);
  const directionInfo = direction(guessedJSON, targetJSON);
  const percent = percentage(distance);

  return {
    name: guess,
    distance: distance,
    emoji: directionInfo[1],
    emojiCode: directionInfo[0],
    percent: percent,
  };
}

function degrees_to_radians(degrees) {
  return degrees * (Math.PI / 180.0);
}

function radians_to_degrees(radians) {
  return radians * (180.0 / Math.PI);
}

function haversine(guess, target) {
  const dLat = degrees_to_radians(target.latitude - guess.latitude);
  const dLon = degrees_to_radians(target.longitude - guess.longitude);

  const lat1 = degrees_to_radians(guess.latitude);
  const lat2 = degrees_to_radians(target.latitude);

  const a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
  const radius = 6371;
  const c = 2 * Math.asin(Math.sqrt(a));
  return radius * c;
}

function direction(guess, target) {
  if (guess.name.toLowerCase() === target.name.toLowerCase()) {
    return ["1f389", "🎉"];
  }
  const directionEmojis = [
    ["2b06", "⬆️"],
    ["2197", "↗️"],
    ["27a1", "➡️"],
    ["2198", "↘️"],
    ["2b07", "⬇️"],
    ["2199", "↙️"],
    ["2b05", "⬅️"],
    ["2196", "↖️"],
  ];

  const dLon = target.longitude - guess.longitude;
  const dLat = target.latitude - guess.latitude;

  let angle = radians_to_degrees(Math.atan2(dLon, dLat));
  angle = (angle + 360) % 360;

  const index = Math.round((angle / 45) % 8);

  return directionEmojis[index];
}

// Percent similarity. The closer the guess is to the target, the higher the percent
function percentage(distance) {
  const longestDistance = 1324.1;
  const percentage = 100 * (1 - distance / longestDistance);
  return Math.round(percentage);
}
