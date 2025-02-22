import "../src/styles.css";

const GuessAnimation = ({ percent, setEmojiAnimationActive }) => {
  setTimeout(() => {
    setEmojiAnimationActive(false);
  }, 1700);

  const greenNum = Math.floor(percent / 20);
  const yellowNum = Math.floor((percent % 20) / 10);
  const whiteNum = 5 - greenNum - yellowNum;

  const squares = [
    ...Array(greenNum).fill("green"),
    ...Array(yellowNum).fill("yellow"),
    ...Array(whiteNum).fill("white"),
  ];

  const renderSquare = (color, index) => {
    const srcMap = {
      green: "1f7e9",
      yellow: "1f7e8",
      white: "2b1c",
    };

    return (
      <img
        draggable="false"
        key={index}
        className={`twemoji size-[1.4em] inline-block emoji-${index + 1}`}
        alt={color === "green" ? "🟩" : color === "yellow" ? "🟨" : "⬜"}
        src={`https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/72x72/${srcMap[color]}.png`}
      />
    );
  };

  return (
    <div
      key={"squareinfo"}
      className="col-span-6 grid grid-cols-5 gap-1 border-2 border-gray-200 rounded h-8 items-center justify-items-center animate-reveal "
    >
      {squares.map((color, index) => renderSquare(color, index))}
    </div>
  );
};

export default GuessAnimation;
