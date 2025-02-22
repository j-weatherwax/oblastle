import { copyToClipboard } from "../utils/clipboard";
import { toast, Bounce } from "react-toastify";

const wikiLink = (target) => {
  const area =
    target.toLowerCase() == "crimea"
      ? `Autonomous_Republic_of_Crimea`
      : ["sevastopol", "kyiv", "kyiv oblast"].includes(target.toLowerCase())
      ? target
      : target + "_Oblast";

  return `https://en.wikipedia.org/wiki/${area}`;
};

const gmapLink = (target) => {
  const area = ["crimea", "sevastopol", "kyiv", "kyiv oblast"].includes(
    target.toLowerCase()
  )
    ? target
    : target + " Oblast";

  return `https://www.google.com/maps?q=${area}`;
};

export const AreaInfo = ({
  target,
  currentGuessIndex,
  guesses,
  gameState,
  currentDate,
}) => {
  const handleSharing = () => {
    copyToClipboard(currentGuessIndex, guesses, gameState, currentDate);
    toast(
      <div className="text-center font-bold w-full">
        Copied results to clipboard
      </div>,
      {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      }
    );
  };

  return (
    <div className="flex flex-col w-full px-2">
      <div className="my-2 flex flex-col space-y-3 text-center font-semibold">
        {gameState === "win" ? (
          <>
            You guessed correctly
            {currentGuessIndex === 1
              ? " on the first try"
              : ` in ${currentGuessIndex} guesses`}{" "}
            out of 6 tries.
          </>
        ) : (
          ""
        )}
      </div>
      <div className="flex w-full gap-4">
        <a
          className="flex w-full h-10 border border-gray-200 rounded-lg px-2 py-1 text-center items-center justify-center font-semibold whitespace-nowrap hover:bg-gray-200"
          href={wikiLink(target)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>
            <img
              alt="📚"
              src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/1f4da.png"
              className="twemoji size-[1em] inline-block"
            />
            {" Wikipedia"}
          </span>
        </a>
        <a
          className="flex w-full h-10 border border-gray-200 rounded-lg px-2 py-1 text-center items-center justify-center font-semibold whitespace-nowrap hover:bg-gray-200"
          href={gmapLink(target)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>
            <img
              alt="🗺️"
              src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/1f5fa.png"
              className="twemoji size-[1em] inline-block"
            />
            {" Google Maps"}
          </span>
        </a>

        <button
          className="flex w-full h-10 border border-gray-200 rounded-lg px-2 py-1 text-center justify-center font-semibold whitespace-nowrap hover:bg-gray-200 items-center gap-2 overflow-ellipsis"
          onClick={() => handleSharing()}
        >
          <svg
            className="size-[20px]"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
          >
            <path d="M18 8h-2c-.55 0-1 .45-1 1s.45 1 1 1h2v11H6V10h2c.55 0 1-.45 1-1s-.45-1-1-1H6c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2"></path>
            <path d="M12 16c.55 0 1-.45 1-1V5h1.79c.45 0 .67-.54.35-.85l-2.79-2.79c-.2-.2-.51-.2-.71 0L8.85 4.15c-.31.31-.09.85.36.85H11v10c0 .55.45 1 1 1"></path>
          </svg>
          {" Share results"}
        </button>
      </div>
    </div>
  );
};
