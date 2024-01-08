import {useState} from "react";
import './App.css'

function App() {

  const [counter, setCounter] = useState(0);

  function increaseValue(){
    setCounter(counter => counter+1 > 20 ? 20 : counter+1);
    console.log(counter);
  }

  function decreaseValue(){
    setCounter(counter => counter-1 < 0 ? 0 : counter-1);
    console.log(counter);
  }

  return (
    <>
      <h1>Chai aur react</h1>
      <h3>Counter value: {counter}</h3>
      <button onClick={increaseValue}>Add value</button>
      <br />
      <button onClick={decreaseValue}>Remove value</button>
    </>
  )
}

export default App
