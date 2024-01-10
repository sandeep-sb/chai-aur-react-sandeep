import { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  const [length, setLength] = useState(6);
  const [allowCharacters, setAllowCharacters] = useState(false);
  const [allowNumbers, setAllowNumbers] = useState(false);
  const [password, setPassword] = useState("");

  // useRef Hook
  const passwordRef = useRef(null);

  // useCallback Hook
  const randomPasswordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    // if character tick box is checked i.e., true
    if(allowCharacters) str += "!@#$%^&*()_{}[]<>?+=-`~";
    // if number tickbox is checked i.e., true
    if(allowNumbers) str += "1234567890";

    for(let i=0; i<length; i++){
      let randomIndex = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(randomIndex);
    }
    setPassword(pass);
  }, [length, allowCharacters, allowNumbers, setPassword]);

  // useCallback Hook
  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
    document.getElementById("acknwlgmntText").style.visibility = "visible";
    setTimeout(()=>{
      document.getElementById("acknwlgmntText").style.visibility = "hidden";
    }, 2000)
  }, [password])

  useEffect(()=>{
    randomPasswordGenerator();
  }, [length, allowCharacters, allowNumbers])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input 
            type="text" 
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder='Password'
            readOnly
            ref={passwordRef}
            />
          <button
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
            onClick={copyPasswordToClipboard}
          >Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
              type="range"
              min={6}
              max={100}
              className='cursor-pointer'
              onChange={(e)=>setLength(e.target.value)}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input 
              type="checkbox" 
              defaultChecked={allowNumbers}
              id='numberInput'
              onChange={()=>setAllowNumbers(prev=>!prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={allowCharacters}
              id='charInput'
              onChange={()=>setAllowCharacters(prev=>!prev)}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
      <div>
        <h3 id='acknwlgmntText' 
            className='text-white text-center my-3'  
            style={{"visibility" : 'hidden'}}>Text copied!</h3>
      </div>
    </>
  )
}

export default App
