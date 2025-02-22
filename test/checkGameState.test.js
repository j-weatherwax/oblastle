import { checkGameState } from "../components/CheckGameState";
import { toast } from "react-toastify";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
  },
  Bounce: jest.fn(),
}));

describe("checkGameState", () => {
  const setGameState = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should set game state to "win" and show notification on correct guess', () => {
    checkGameState("Crimea", "Crimea", 0, setGameState);

    expect(setGameState).toHaveBeenCalledWith("win");
    expect(toast.success).toHaveBeenCalledWith(
      <div className="text-center font-bold w-full">Well done!</div>,
      expect.objectContaining({
        autoClose: 5000,
        theme: "light",
        transition: expect.any(Function),
      })
    );
  });

  it('Should set game state to "lose" when currentGuessIndex >= 5', () => {
    checkGameState("Crimea", "Sevastopol", 5, setGameState);

    expect(setGameState).toHaveBeenCalledWith("lose");
    expect(toast.success).not.toHaveBeenCalled();
  });

  it("Should not change game state when guess is incorrect and currentGuessIndex < 5", () => {
    checkGameState("Crimea", "Sevastopol", 2, setGameState);

    expect(setGameState).not.toHaveBeenCalled();
    expect(toast.success).not.toHaveBeenCalled();
  });
});
