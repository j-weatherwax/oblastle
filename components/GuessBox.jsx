import React, { useState, useEffect } from "react";
import { evaluateGuess } from "../utils/distanceUtils";
import { FetchNames } from "../utils/jsonUtils";
import { toast, Bounce } from "react-toastify";
import { useCombobox } from "downshift";
import { checkGameState } from "./CheckGameState";
import { Dropdown } from "./DropdownMenu";

export function GuessBox({
  target,
  setGameState,
  currentGuessIndex,
  setCurrentGuessIndex,
  guesses,
  setGuesses,
  setEmojiAnimationActive,
}) {
  const [guessedOblast, setGuessedOblast] = useState("");

  const suggestions = FetchNames();

  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.toLowerCase().startsWith(guessedOblast.toLowerCase())
  );

  const {
    isOpen,
    highlightedIndex,
    setHighlightedIndex,
    getInputProps,
    getMenuProps,
    getItemProps,
    reset,
  } = useCombobox({
    items: filteredSuggestions,
    onSelectedItemChange: ({ selectedItem }) => {
      setGuessedOblast(selectedItem || "");
    },
    itemToString: (item) => item || "",
  });

  // Set first item in dropdown as highlighted as default
  useEffect(() => {
    if (isOpen && highlightedIndex < 0) {
      setHighlightedIndex(0);
    }
  }, [isOpen, highlightedIndex, setHighlightedIndex]);

  const handleSubmission = async () => {
    if (!suggestions.includes(guessedOblast)) {
      toast.error(
        <div className="text-center font-bold w-full">Unknown oblast!</div>,
        {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        }
      );

      return;
    }
    const guessList = [...guesses];
    guessList[currentGuessIndex] = await evaluateGuess(
      guessedOblast.toLowerCase(),
      target.toLowerCase()
    );

    setGuesses(guessList);
    setEmojiAnimationActive(true);

    setCurrentGuessIndex(currentGuessIndex + 1);
    checkGameState(guessedOblast, target, currentGuessIndex, setGameState);

    setGuessedOblast("");
    reset();
  };

  // Allows user to use the Enter key to submit guess
  // !isOpen prevents submitting empty input while selecting with the enter key
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && guessedOblast && !isOpen) {
      handleSubmission();
    }
  };

  return (
    <div id="GuessBox">
      <div className="flex flex-row relative space-x-2 mb-2">
        <div className="flex-auto rounded border-2 border-gray-200 relative">
          <input
            id="input-field"
            type="text"
            className="w-full py-1 px-2"
            autoComplete="off"
            placeholder="Oblast..."
            {...getInputProps({
              value: guessedOblast,
              onChange: (e) => setGuessedOblast(e.target.value),
              onKeyDown: handleKeyDown,
            })}
          />
        </div>
        <button
          type="button"
          className="rounded border-2 border-gray-200 flex items-center justify-center py-1 px-5 space-x-2 m-0 hover:bg-gray-100 active:bg-gray-100"
          onClick={handleSubmission}
        >
          <img
            draggable="false"
            className="twemoji size-[1em] inline-block"
            alt="🌍️"
            src="https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/72x72/1f30d.png"
          />
          <p className="font-bold leading-tight">GUESS</p>
        </button>

        <Dropdown
          isOpen={isOpen}
          highlightedIndex={highlightedIndex}
          guessedOblast={guessedOblast}
          filteredSuggestions={filteredSuggestions}
          getItemProps={getItemProps}
          getMenuProps={getMenuProps}
        />
      </div>
    </div>
  );
}
