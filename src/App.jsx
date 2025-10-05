import { useState, useEffect, useRef } from 'react';
import './App.css';
import NavBar from './navBar.jsx';
import Product from './product.jsx';

function App() {
  const [score, setScore] = useState(() => Number(localStorage.getItem("score")) || 0);
  const [gameStarted, setGameStarted] = useState(false);
  const [flipping, setFlipping] = useState(false);
  const [result, setResult] = useState("Heads");
  const [message, setMessage] = useState("");
  const [shopOpen, setShopOpen] = useState(false);
  const [coinStyle, setCoinStyle] = useState(() => localStorage.getItem("coinStyle") || "black");
  const [themeStyle, setThemeStyle] = useState(() => localStorage.getItem("themeStyle") || "default");
  const [badgeStyle, setBadgeStyle] = useState(() => localStorage.getItem("badgeStyle") || "");
  const coinRef = useRef(null);

  useEffect(() => localStorage.setItem("coinStyle", coinStyle), [coinStyle]);
  useEffect(() => localStorage.setItem("themeStyle", themeStyle), [themeStyle]);
  useEffect(() => localStorage.setItem("badgeStyle", badgeStyle), [badgeStyle]);
  useEffect(() => localStorage.setItem("score", score), [score]);

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
    setResult(null);
    const coin = coinRef.current;
    if (coin) {
      coin.style.transition = "none";
      coin.style.transform = "rotateY(0deg)";
      void coin.offsetWidth;
      const baseSpins = 4 + Math.floor(Math.random() * 3);
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
        setMessage(`It was ${Outcome}, you tossed and you are fortunate enough to earn one more Fortune! :)))`);
      } else {
        setScore((prev) => prev - 1);
        setMessage(`It was ${Outcome}, you tossed and unfortunately you lose a fortune :(((`);
      }
    }, 1800);
  };

  const products = [
    { name: "Black Coin", price: 0, type: "black", category: "Coin", desc: "Classic black plastic coin. the Default coin.", image: "/black_coin.png" },
    { name: "Bronze Coin", price: 3, type: "bronze", category: "Coin", desc: "A classic old-school bronze look.", image: "/bronze_coin.png" },
    { name: "Silver Coin", price: 10, type: "silver", category: "Coin", desc: "Sleek metallic finish for your tosses.", image: "/silver_coin.png" },
    { name: "Gold Coin", price: 12, type: "gold", category: "Coin", desc: "Flip your luck with gold!", image: "/gold_coin.png" },
    { name: "Galaxy Night", price: 20, type: "galaxy-bg", category: "Theme", desc: "Dark purple space background.", image: "/galaxy.jpeg" },
    { name: "Inferno Red", price: 23, type: "inferno", category: "Theme", desc: "Fiery red background glow.", image: "/red-theme.jpg" },
    { name: "Frosted Blue", price: 25, type: "frost", category: "Theme", desc: "Cool icy blue tones.", image: "/frosted-blue.jpeg" },
    { name: "Emerald Calm", price: 30, type: "emerald", category: "Theme", desc: "Peaceful green-forest bg.", image: "/green-theme.jpg" },
    { name: "Crown Badge", price: 20, type: "crown", category: "badge", desc: "Golden crown next to your score.", image: "/crown.jpeg" },
    { name: "Trophy Icon", price: 35, type: "trophy", category: "badge", desc: "Show your wins in style.", image: "/trophy.jpg" },
    { name: "DA GOOD LUCKK BADGE", price: 100, type: "goodluck", category: "badge", desc: "BRO U R EXTREMELY FORTUNATE", image: "/good-luck.jpg" },
  ];

  const coinBg =
    coinStyle === "gold"
      ? "radial-gradient(circle at 70% 70%, #ffd700, #b8860b 80%)"
      : coinStyle === "silver"
      ? "radial-gradient(circle at 70% 70%, #d9d9d9, #7f7f7f 80%)"
      : coinStyle === "bronze"
      ? "radial-gradient(circle at 70% 70%, #cd7f32, #7c482b 80%)"
      : "radial-gradient(circle at 70% 70%, #000000, #000000 80%)";

  const themeBg =
    themeStyle === "galaxy-bg"
      ? "radial-gradient(circle at 70% 70%, #1e0033, #0a001a 80%)"
      : themeStyle === "inferno"
      ? "radial-gradient(circle at 70% 70%, #ff4500, #330000 80%)"
      : themeStyle === "frost"
      ? "radial-gradient(circle at 70% 70%, #a1c4fd, #c2e9fb 80%)"
      : themeStyle === "emerald"
      ? "radial-gradient(circle at 70% 70%, #006400, #013220 80%)"
      : "#8B5A2B";

  return (
    <>
      <NavBar score={score} currentBadge={badgeStyle} />
      {!gameStarted && !shopOpen && (
        <div className="welcomePage">
          <div className="startMenuTitles">
            <h1>HeadsUp!</h1>
            <h2>Toss the coin and earn your fortune!</h2>
          </div>
          <div className="startMenu">
            <button onClick={StartNewGame}>New game</button>
            <button onClick={ContinueGame}>Continue</button>
            <button onClick={() => setShopOpen(true)}>Shop</button>
          </div>
        </div>
      )}
      {gameStarted && (
        <div className="gamePage" style={{ background: themeBg }}>
          <div className="gamePageUp">
            <h2>{message}</h2>
            <div ref={coinRef} className="coin" >
              <div className={`coin-face front ${result === "Heads" ? "visible" : ""}`} style={{ background: coinBg }}>Heads</div>
              <div className={`coin-face back ${result === "Tails" ? "visible" : ""}`} style={{ background: coinBg }}>Tails</div>
            </div>
          </div>
          <div className="controls">
            <div className="options">
              <button disabled={flipping} onClick={() => FlipCoin("Heads")}>Heads</button>
              <button disabled={flipping} onClick={() => FlipCoin("Tails")}>Tails</button>
            </div>
            <div className="back">
              <button disabled={flipping} onClick={() => setGameStarted(false)}>Go back!</button>
            </div>
          </div>
        </div>
      )}
      {shopOpen && (
        <div className="ShopPage">
          <h1>Welcome to the shop!</h1>
          <h2>here you can level up with your HeadsUp game!</h2>
          {["Coin", "Theme", "badge"].map((cat) => (
            <div key={cat} className="shop-section">
              <h2>{cat} Items</h2>
              <div className="products">
                {products.filter((p) => p.category === cat).map((p) => (
                  <Product
                    key={p.name}
                    name={p.name}
                    price={p.price}
                    type={p.type}
                    desc={p.desc}
                    image={p.image}
                    score={score}
                    setScore={setScore}
                    currentCoinStyle={coinStyle}
                    setCoinStyle={setCoinStyle}
                    currentTheme={themeStyle}
                    setThemeStyle={setThemeStyle}
                    currentBadge={badgeStyle}
                    setBadgeStyle={setBadgeStyle}
                  />
                ))}
              </div>
            </div>
          ))}
          <button className="back" onClick={() => setShopOpen(false)}>Back</button>
        </div>
      )}
    </>
  );
}
export default App;