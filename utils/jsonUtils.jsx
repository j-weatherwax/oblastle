import { useState, useEffect } from "react";
import { daysSinceFirstPuzzle } from "./dateUtils";

export async function FetchTarget(currentDate) {
  const targetNumber = daysSinceFirstPuzzle(currentDate);

  return await fetch("./assets/targetList.json")
    .then((response) => response.json())
    .then((json) => {
      return json[targetNumber % json.length];
    })
    .catch((error) => {
      console.error("Error fetching today's target: ", error);
    });
}

// Returns object of data associated with a given oblast from oblastData.json
export async function FetchData(query) {
  if (query === "") return;
  return await fetch("./assets/oblastData.json")
    .then((response) => response.json())
    .then((json) => {
      const retrievedData = json.find(
        (oblast) => oblast.name.toLowerCase() === query
      );
      return retrievedData;
    })
    .catch((error) => {
      console.error("Error fetching oblast data: ", error);
    });
}

// Returns list of oblast names from oblastData.json
export function FetchNames() {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch("./assets/oblastData.json")
      .then((response) => response.json())
      .then((json) => {
        const oblastList = [];
        json.forEach((oblast) => {
          oblastList.push(oblast.name);
        });
        setSuggestions(oblastList);
      })
      .catch((error) => {
        console.error("Error fetching names: ", error);
      });
  }, []);

  return suggestions;
}
