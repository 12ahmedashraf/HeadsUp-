import { useState, useEffect, useRef } from 'react';
import './App.css';
import NavBar from './navBar.jsx';

function App() {
  const [score, setScore] = useState(() => Number(localStorage.getItem("score")) || 0);
  const [gameStarted, setGameStarted] = useState(false);
  const [flipping, setFlipping] = useState(false);
  const [result, setResult] = useState("Heads"); // ✅ default so coin is visible at start
  const [message, setMessage] = useState("");
  const coinRef = useRef(null);
  useEffect(() => {
    localStorage.setItem("score", score);
  }, [score]);

  const StartNewGame = () => {
    setScore(0);
    setGameStarted(true);
    setResult("Heads");
    setMessage("");
    localStorage.removeItem("score");
  };

  const ContinueGame = () => {
    setGameStarted(true);
    setMessage("");
  };

  const FlipCoin = (guess) => {
  if (flipping) return;
  setFlipping(true);
  setMessage("Flipping...");

  const Outcome = Math.random() < 0.5 ? "Heads" : "Tails";
  setResult(null); // hide until end

  const coin = coinRef.current;
  if (coin) {
    coin.style.transition = "none";
    coin.style.transform = "rotateY(0deg)";
    void coin.offsetWidth;
    const baseSpins = 4 + Math.floor(Math.random() * 3); // 4–6 spins
    const finalAngle = Outcome === "Heads" ? 0 : 180;
    const totalRotation = baseSpins * 360 + finalAngle;

    coin.style.transition = "transform 1.8s cubic-bezier(0.33, 1, 0.68, 1)";
    coin.style.transform = `rotateY(${totalRotation}deg)`;
  }

  setTimeout(() => {
    setResult(Outcome);
    setFlipping(false);

    if (guess === Outcome) {
      setScore((prev) => prev + 1);
      setMessage(`It was ${Outcome}, you tossed and you are fortunate enough to earn one more coin :)))`);
    } else {
      setScore((prev) => prev - 1);
      setMessage(`It was ${Outcome}, you tossed and unfortunately you lose a coin :(((`);
    }
  }, 1800);
};


  return (
    <>
      <NavBar score={score} />

      {!gameStarted ? (
        <div className="welcomePage">
          <div className="startMenuTitles">
            <h1>HeadsUp!</h1>
            <h2>Toss the coin and earn your fortune!</h2>
          </div>
          <div className="startMenu">
            <button onClick={StartNewGame}>New game</button>
            <button onClick={ContinueGame}>Continue</button>
            <button>Shop</button>
          </div>
        </div>
      ) : (
        <div className="gamePage">
          <div className="gamePageUp">
            <h2>{message}</h2>
            <div ref={coinRef} className="coin">
              <div className={`coin-face front ${result === "Heads" ? "visible" : ""}`}>Heads</div>
              <div className={`coin-face back ${result === "Tails" ? "visible" : ""}`}>Tails</div>
            </div>
          </div>

          <div className="controls">
            <div className="options">
              <button disabled={flipping} onClick={() => FlipCoin("Heads")}>
                Heads
              </button>
              <button disabled={flipping} onClick={() => FlipCoin("Tails")}>
                Tails
              </button>
            </div>
            <div className="back">
              <button disabled={flipping} onClick={() => setGameStarted(false)}>
                Go back!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
