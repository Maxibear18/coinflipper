import { useState } from "react";
import "./App.css";

function App() {
  const [result, setResult] = useState(null);
  const [headsCount, setHeadsCount] = useState(0);
  const [tailsCount, setTailsCount] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [finalRotation, setFinalRotation] = useState(0);

  const flipCoin = () => {
    const isHeads = Math.random() < 0.5;
    const outcome = isHeads ? "Heads" : "Tails";
    const baseRotation = 1440;
    const offset = isHeads ? 0 : 180;
    const totalRotation = baseRotation + offset;

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
          transform: translateY(0) rotateX(${finalRotation + totalRotation}deg);
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
      setResult(outcome);
      setHeadsCount(c => isHeads ? c + 1 : c);
      setTailsCount(c => !isHeads ? c + 1 : c);

      setFinalRotation(prev => prev + totalRotation);
      coinEl.style.animation = ""; 
      coinEl.style.transform = `rotateX(${finalRotation + totalRotation}deg)`;

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
