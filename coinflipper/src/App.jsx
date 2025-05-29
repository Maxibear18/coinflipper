import { useState } from "react";
import "./App.css";

function App() {
  const [result, setResult] = useState(null);
  const [headsCount, setHeadsCount] = useState(0);
  const [tailsCount, setTailsCount] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [animationName, setAnimationName] = useState("");
  const [showResult, setShowResult] = useState(false);

  const flipCoin = () => {
  const isHeads = Math.random() < 0.5;
  const outcome = isHeads ? "Heads" : "Tails";
  const baseRotation = 1440;
  const offset = isHeads ? 0 : 180;
  const totalRotation = baseRotation + offset;

  const newAnim = `flip-${totalRotation}`;
  setAnimationName(newAnim);
  setFlipping(true);
  setShowResult(false);
  setResult(null);

  const styleSheet = document.styleSheets[0];
  const rule = `
    @keyframes ${newAnim} {
      0% {
        transform: translateY(0px) rotateX(0deg);
      }
      50% {
        transform: translateY(-150px) rotateX(${totalRotation / 2}deg);
      }
      100% {
        transform: translateY(0px) rotateX(${totalRotation}deg);
      }
    }
  `;

  // Clean up old animations
  Array.from(styleSheet.cssRules).forEach((r, i) => {
    if (r.name && r.name.startsWith("flip-")) {
      styleSheet.deleteRule(i);
    }
  });

  styleSheet.insertRule(rule, styleSheet.cssRules.length);

  setTimeout(() => {
    setResult(outcome);
    setHeadsCount(c => isHeads ? c + 1 : c);
    setTailsCount(c => !isHeads ? c + 1 : c);
    setTimeout(() => {
      setFlipping(false);
      setShowResult(true);
    }, 1600);
  }, 100);
};


  return (
    <div className="app-container">
      <div className="header-bar">
        <h1 className="fixed-title"> Coin Flipper</h1>
      </div>
      <div className="app">
        {/* Coin */}
        <div className={`coin-container ${!flipping ? "hidden" : ""}`}>
          <div
            className="coin3d"
            style={flipping ? { animation: `${animationName} 1.6s ease-in-out forwards` } : {}}
          >
            <div className="coin-face front">
              <img src="/images/heads.png" alt="Heads" />
            </div>
            <div className="coin-face back">
              <img src="/images/tails.png" alt="Tails" />
            </div>
          </div>
        </div>

        {/* Result */}
        {showResult && result && (
          <>
            <img
              src={result === "Heads" ? "/images/heads.png" : "/images/tails.png"}
              alt={result}
              className="coin-img-final"
            />
            <p className="result-text">{result}</p>
          </>
        )}

        <button onClick={flipCoin} disabled={flipping}>Flip Coin</button>
        <p>Heads: {headsCount}</p>
        <p>Tails: {tailsCount}</p>
      </div>
      <div className="version-label">v1.1</div>
    </div>
  );
}

export default App;
