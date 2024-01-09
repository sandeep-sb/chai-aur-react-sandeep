import { useState } from 'react'
import './App.css'

function App() {
  const [visibility, setVisibility] = useState("hidden")

  const buttonClick = ()=>{
    setVisibility("visible")
    setTimeout(()=>{
      setVisibility("hidden")
    }, 3000);
  }

  const d = new Date();

  return (
    <div className='container'>
     <button
      onClick={buttonClick}
     >Check Time!</button>
     <div 
      className="card"
      style={{"visibility": visibility}}
      >
        <h1>{d.getDate() + "/" + d.getMonth()+1 + "/" + d.getFullYear()}</h1>
        <h1>{d.getHours() + ":" + d.getMinutes()}</h1>
     </div>
    </div>
  )
}

export default App
