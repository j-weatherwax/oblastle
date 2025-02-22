import { toast, Bounce } from "react-toastify";
import { confetti } from "@tsparticles/confetti";

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

    setTimeout(() => {
      confetti("tsparticles", {
        count: 150,
        startVelocity: 30,
        spread: 90,
        gravity: 0.7,
      });
      setTimeout(() => {
        const confettiContainer = document.getElementById("tsparticles");
        if (confettiContainer) {
          confettiContainer.style.transition = "opacity 2s ease-out";
          confettiContainer.style.opacity = "0";
        } else {
          console.log("Confetti container not found!");
        }

        setTimeout(() => {
          if (confettiContainer) {
            confettiContainer.style.display = "none";
          }
        }, 2000);
      }, 500);
    }, 3000);
    return;
  }
}
