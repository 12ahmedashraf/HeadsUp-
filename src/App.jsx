import { useState ,useEffect} from 'react'
import './App.css'
import NavBar from './navBar.jsx'
function App() {
    const [score, setScore] = useState(() => Number(localStorage.getItem("score")) || 0);
    useEffect(() => {
      const saved = localStorage.getItem("score");
      
      if (saved) setScore(Number(saved));
    }, []);
    useEffect(() => {
      localStorage.setItem("score", score);
    }, [score]);
    
  return (
    <>
    <NavBar score={score}/>
    <div className="welcomePage">
      <div className="startMenuTitles">
     <h1>HeadsUp!</h1>
     <h2>Toss the coin and earn your fortune!</h2>
     </div>
     <div className="startMenu">
      <button>New game</button>
      <button>Continue</button>
      <button>Shop</button>
     </div>
    </div>
    </>
  )
}

export default App
