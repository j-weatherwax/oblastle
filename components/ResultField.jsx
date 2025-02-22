import React, { Fragment } from "react";
import CountUp from "react-countup";
import GuessAnimation from "./GuessAnimation";
import "../src/styles.css";

export const ResultField = ({
  guesses,
  currentGuessIndex,
  gameState,
  emojiAnimationActive,
  setEmojiAnimationActive,
}) => {
  return (
    <div id="ResultField" className="grid grid-cols-7 gap-1">
      {guesses.map((guess, i) => {
        return guess != null ? (
          <Fragment key={`info-row-${i}`}>
            {emojiAnimationActive && i + 1 == currentGuessIndex ? (
              <GuessAnimation
                percent={guess.percent}
                setEmojiAnimationActive={setEmojiAnimationActive}
              />
            ) : (
              // Render information from previous and current guesses
              <Fragment key={`info${i}`}>
                <div
                  key={`info${i}_0`}
                  className="flex col-span-3 border-2 border-gray-200 rounded h-8 items-center justify-center animate-reveal"
                >
                  {guess.name.toUpperCase()}
                </div>
                <div
                  key={`info${i}_1`}
                  className="flex col-span-2 border-2 border-gray-200 rounded h-8 items-center justify-center animate-reveal"
                >
                  {Math.round(guess.distance) + "km"}
                </div>
                <div
                  key={`info${i}_2`}
                  className="flex col-span-1 border-2 border-gray-200 rounded h-8 items-center justify-center animate-reveal"
                >
                  <img
                    draggable="false"
                    className="twemoji size-[1em] inline-block"
                    alt={guess.emoji}
                    src={`https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/72x72/${guess.emojiCode}.png`}
                  />
                </div>
              </Fragment>
            )}

            <div
              key={`info${i}_3`}
              className="flex col-span-1 border-2 border-gray-200 rounded h-8 items-center justify-center animate-reveal"
            >
              <CountUp end={guess.percent} duration={3} />%
            </div>
          </Fragment>
        ) : (
          // Render rows for remaining guesses
          gameState === null && (
            <div
              key={`guess${i}`}
              className={`col-span-7 flex justify-center items-center rounded ${
                i === currentGuessIndex
                  ? "h-8 font-bold text-sm bg-gray-200 hover:bg-gray-300 cursor-pointer"
                  : "h-6 border border-dashed bg-gray-200/50 border-slate-300"
              } `}
            >
              {i === currentGuessIndex && (
                <span className="opacity-70">GUESS {i + 1}/6</span>
              )}
            </div>
          )
        );
      })}
    </div>
  );
};
