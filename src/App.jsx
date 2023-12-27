import { useState } from 'react'
import './App.css'
import Header from './Components/Header';
import CardGrid from './Components/CardGrid';

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [reset, setReset] = useState(true);

  const endCurrentStage = () => {
    if(score > bestScore){
      setBestScore(score);
    }
    setScore(0);
    setReset(true);
  };

  const incrementScore = () => {
    setScore(score + 1);
    setReset(false);
  }

  return(
    <div className='App'>
      <Header score={score} bestScore={bestScore} />
      <CardGrid
        reset={reset}
        endCurrentStage={endCurrentStage}
        incrementScore={incrementScore}
      />
    </div>
  )
};

export default App
