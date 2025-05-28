// React example
import { useState } from "react";
import "./App.css";

function App() {
  const [result, setResult] = useState(null);
  const [headsCount, setHeadsCount] = useState(0);
  const [tailsCount, setTailsCount] = useState(0);
  const [flipping, setFlipping] = useState(false);

  const flipCoin = () => {
    setFlipping(true);
    setTimeout(() => {
      const isHeads = Math.random() < 0.5;
      setResult(isHeads ? "Heads" : "Tails");
      setHeadsCount(c => isHeads ? c + 1 : c);
      setTailsCount(c => !isHeads ? c + 1 : c);
      setFlipping(false);
    }, 1000); // 1s flip animation
  };

  return (
  <div className="app-container">
    <div className="app">
      <h1>🪙 Coin Flipper</h1>
      <div className={`coin ${flipping ? "flip" : ""}`}>
        {result && <p>{result}</p>}
      </div>
      <button onClick={flipCoin} disabled={flipping}>Flip Coin</button>
      <p>Heads: {headsCount}</p>
      <p>Tails: {tailsCount}</p>
    </div>
    <div className="version-label">v1.0</div>
  </div>
);
}

export default App;