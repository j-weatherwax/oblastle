import { toast, Bounce } from "react-toastify";

export function checkGameState(guess, target, currentGuessIndex, setGameState) {
  if (currentGuessIndex >= 5) {
    setGameState("lose");
    return;
  }
  if (guess.toLowerCase() === target.toLowerCase()) {
    setGameState("win");
    toast.success(
      <div className="text-center font-bold w-full">Well done!</div>,
      {
        position: "top-center",
        autoClose: 5000,
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
}
