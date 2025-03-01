import { useEffect, useRef, useState } from 'react';
import './App.css'

function App() {
  const emptyArr = ['', '', '', ''];
  const refs = [useRef(), useRef(), useRef(), useRef()];
  const [inputs, setInputs] = useState(emptyArr);

  useEffect(()=>{
    refs[0].current.focus();
  },[])

  const handleInputChange = (e, index) => {
    const val = e.target.value;
    console.log(val, index);
    if(!Number(val))
      return;
    const copyInputs = [...inputs];
    copyInputs[index] = val;
    setInputs(copyInputs)
  }

  return (
    <div className='App'>
      <div className='container'>
        <h1>Two-factor code input</h1>
        <div>{emptyArr.map((item, i)=>{
          return <input type='text'
          key={i}
          value={inputs[i]}
          ref={refs[i]}
          onChange={(e)=>handleInputChange(e,i)}
          maxLength={1}/>
        })}</div>
        <button>Submit</button>
      </div>
    </div>
  )
}

export default App
