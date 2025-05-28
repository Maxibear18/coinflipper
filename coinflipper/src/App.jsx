import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [result, setResult] = useState(null);
  const [headsCount, setHeadsCount] = useState(0);
  const [tailsCount, setTailsCount] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const flipCoin = () => {
    setFlipping(true);
    setShowResult(false);

    setTimeout(() => {
      const isHeads = Math.random() < 0.5;
      const outcome = isHeads ? "Heads" : "Tails";
      setResult(outcome);
      setHeadsCount(c => isHeads ? c + 1 : c);
      setTailsCount(c => !isHeads ? c + 1 : c);

      setTimeout(() => {
        setFlipping(false);
        setShowResult(true);
      }, 800);
    }, 100);
  };

  return (
    <div className="app-container">
      <div className="app">
        <h1>🪙 Coin Flipper</h1>
        <div className={`coin-container ${flipping ? "flipping" : ""}`}>
          {result && (
            <img
              src={result === "Heads" ? "/images/heads.png" : "/images/tails.png"}
              alt={result}
              className="coin-img"
            />
          )}
        </div>
        {showResult && <p className="result-text">{result}</p>}
        <button onClick={flipCoin} disabled={flipping}>Flip Coin</button>
        <p>Heads: {headsCount}</p>
        <p>Tails: {tailsCount}</p>
      </div>
      <div className="version-label">v1.0</div>
    </div>
  );
}

export default App;
