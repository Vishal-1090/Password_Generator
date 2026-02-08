import { useState, useCallback,useEffect,useRef} from 'react'

import './App.css'

function App() {

  const[length,setLength]=useState(8);
  const[numberAllowed,setNumberAllowed]=useState(false);
  const[charAllowed,setCharAllowed]=useState(false);
  const[password,setPassword]=useState("");
  const passwordRef=useRef(null);

  const PasswordGenerator=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz";
    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="~!@#$%^&*_+[]{}"
    for(let i=1;i<=length;i++){
        let char=Math.floor(Math.random()*str.length+1);
        pass+=str.charAt(char);
    }
     setPassword(pass);
  },[length,numberAllowed,charAllowed,setPassword]
  )
  useEffect(()=>{
    PasswordGenerator()
  },[length,numberAllowed,charAllowed,PasswordGenerator])
  
    const copyPasswordtoclipBoard=useCallback(()=>{
           passwordRef.current?.select()
           passwordRef.current?.setSelectionRange(0,100)
           window.navigator.clipboard.writeText(password)
    },[password])
    
  return (
  <>
   <div className='bg-blue-300 w-full max-w-screen-sm mx-auto px-4 my-4 h-96 rounded-3xl shadow-md'>
    <h1 className='text-center text-5xl my-6 py-6 '>Password Generator</h1>
    <div className='flex justify-center my-8 p-5 w-auto mx-8 rounded-3xl overflow-hidden'>
      <div className='flex overflow-hidden rounded-lg justify-center w-full mb-4 '>
        <input type="text" 
        value={password} 
        placeholder='Password'
         className='outline-none w-full '
         readOnly
         ref={passwordRef}
         />
        <button 
         onClick={()=>{
          copyPasswordtoclipBoard()
         }}
        className='bg-orange-400  
        outline-none px-3 py-0.5  
        shrink-0'>
          Copy</button>
      </div></div>
      <div className='flex  text-lg gap-x-8'>
        <div className='flex ml-12 items-center gap-x-3'>
          <input type="range" 
          min={8}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{
            setLength(e.target.value)
          }}
          />
          <label htmlFor="length">Length:{length}</label>
        </div>
        <div className='flex items-center gap-x-3'>
          <input type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={()=>{
            setNumberAllowed((prev=>!prev));
          }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className='flex items-center gap-x-3'>
          <input type="checkbox"
          defaultChecked={charAllowed}
          id="charInput"
          onChange={()=>{
            setCharAllowed((prev=>!prev))
          }} />
          <label htmlFor="charInput">Character</label>
        </div>
      
      
      </div>
    
     
     
   </div>
  </>
  )
}

export default App