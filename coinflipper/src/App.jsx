import { useState } from "react";
import "./App.css";

function App() {
  const [result, setResult] = useState(null);
  const [headsCount, setHeadsCount] = useState(0);
  const [tailsCount, setTailsCount] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [finalRotation, setFinalRotation] = useState(0);

 const flipCoin = () => {
  const coinSound = new Audio("/sounds/coin-flip.mp3");
  coinSound.play();

  const baseRotation = 1440;
  const extraRotation = Math.random() < 0.5 ? 0 : 180; // 0 = heads, 180 = tails
  const totalRotation = baseRotation + extraRotation;
  const newFinalRotation = finalRotation + totalRotation;
  const animationName = `flip-${Date.now()}`;

  setFlipping(true);
  setResult(null);

  const styleSheet = document.styleSheets[0];
  const rule = `
    @keyframes ${animationName} {
      0% {
        transform: translateY(0) rotateX(${finalRotation % 360}deg);
      }
      50% {
        transform: translateY(-180px) rotateX(${finalRotation + totalRotation / 2}deg);
      }
      100% {
        transform: translateY(0) rotateX(${newFinalRotation}deg);
      }
    }
  `;

  Array.from(styleSheet.cssRules).forEach((r, i) => {
    if (r.name && r.name.startsWith("flip-")) {
      styleSheet.deleteRule(i);
    }
  });
  styleSheet.insertRule(rule, styleSheet.cssRules.length);

  const coinEl = document.querySelector(".coin3d");
  coinEl.style.animation = `${animationName} 1.6s ease-in-out forwards`;

  setTimeout(() => {
    // Calculate final result from rotation
    const finalDeg = newFinalRotation % 360;
    const outcome = finalDeg % 360 === 0 ? "Heads" : "Tails";

    setResult(outcome);
    setHeadsCount(c => outcome === "Heads" ? c + 1 : c);
    setTailsCount(c => outcome === "Tails" ? c + 1 : c);

    coinEl.style.animation = "";
    coinEl.style.transform = `rotateX(${newFinalRotation}deg)`;
    setFinalRotation(newFinalRotation);

    setFlipping(false);
  }, 1600);
};



  return (
    <div className="app-container">
      <div className="header-bar">
        <h1 className="fixed-title">Coin Flipper</h1>
      </div>

      <div className="app">
        {/* Tappable coin */}
        <div
          className="coin-container"
          onClick={() => !flipping && flipCoin()}
          style={{ cursor: flipping ? "default" : "pointer" }}
        >
          <div className="coin3d" style={{ transform: `rotateX(${finalRotation}deg)` }}>
            <div className="coin-face front">
              <img src="/images/heads.png" alt="Heads" />
            </div>
            <div className="coin-face back">
              <img src="/images/tails.png" alt="Tails" />
            </div>
          </div>
        </div>

        {/* Show result */}
        {result && <p className="result-text">{result}</p>}

        {/* Counters */}
        <div className="counter-row">
          <div className="counter heads-counter">Heads: {headsCount}</div>
          <div className="counter tails-counter">Tails: {tailsCount}</div>
        </div>
      </div>

      <div className="version-label">v1.2</div>
    </div>
  );
}

export default App;
