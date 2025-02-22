import React, { useState, useEffect } from "react";
import { getDate } from "../utils/dateUtils";
import { AreaInfo } from "../components/AreaInfo";
import { FetchTarget } from "../utils/jsonUtils";
import { GuessBox } from "../components/GuessBox";
import { ToastContainer } from "react-toastify";
import { ResultField } from "../components/ResultField";
import "./styles.css";

function App() {
  const currentDate = getDate();
  const [gameState, setGameState] = useState(null);

  const [target, setTarget] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await FetchTarget(currentDate);
      setTarget(data);
    };
    fetchData();
  }, [currentDate]);

  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);

  // example of guess within guesses array:
  //   {
  //     "name": "chernihiv",
  //     "distance": 142.0056759685954,
  //     "emoji": "↙️",
  //     "emojiCode": "2199",
  //     "percent": 89
  // }
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [emojiAnimationActive, setEmojiAnimationActive] = useState(false);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-shrink w-full h-full flex-col max-w-lg box-content px-12 lg:bg-white lg:shadow-2xl">
        <div className="flex flex-row w-full justify-center items-center">
          <header className="flex w-full border-b-2 px-3 py-2 border-gray-200 justify-center items-center space-x-2">
            <img
              draggable="false"
              className="twemoji size-[30px]"
              alt="🇺🇦"
              src="https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/72x72/1f1fa-1f1e6.png"
            ></img>

            <p className="font-bold text-3xl">OBLASTLE</p>
          </header>
        </div>

        <div id="gameContent" className="px-1 py-[30px]">
          <ToastContainer />
          <div>
            <img
              alt="oblast to guess"
              fetchpriority="high"
              width="208"
              height="208"
              decoding="async"
              className="pointer-events-all max-h-52 m-auto h-full min-h-52 min-w-52 brightness-0 mb-[18px]"
              src={`./assets/oblasts/${target}.svg`}
            />
          </div>
          {gameState && (
            <div className="flex items-center justify-center mb-3">
              <div
                className={`my-1 py-1 px-2 justify-center items-center text-md text-center rounded animate-slide-out 
                  ${
                    gameState === "win"
                      ? "bg-[#9eeaa7] text-[#0a4811]"
                      : "bg-[#c0dffb] text-[#094073]"
                  }`}
              >
                Oblast:&nbsp;
                <span className="font-semibold">{target.toUpperCase()}</span>
              </div>
            </div>
          )}
          {/* Renders the input field with dropdown menu and guess button */}
          <div id="GuessBox">
            <div id="input" className="flex flex-col mb-2">
              {gameState === null && (
                <GuessBox
                  target={target}
                  setGameState={setGameState}
                  currentGuessIndex={currentGuessIndex}
                  setCurrentGuessIndex={setCurrentGuessIndex}
                  guesses={guesses}
                  setGuesses={setGuesses}
                  setEmojiAnimationActive={setEmojiAnimationActive}
                />
              )}
              {/* Displays results based on user's guess and shows how many guesses are remaining */}
              <ResultField
                guesses={guesses}
                currentGuessIndex={currentGuessIndex}
                gameState={gameState}
                emojiAnimationActive={emojiAnimationActive}
                setEmojiAnimationActive={setEmojiAnimationActive}
              />
            </div>
          </div>
          {/* On game completion, links to wikipedia and google maps for the 
          oblast are provided. User can also copy results to clipboard*/}
          {gameState && (
            <AreaInfo
              target={target}
              currentGuessIndex={currentGuessIndex}
              guesses={guesses}
              gameState={gameState}
              currentDate={currentDate}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
