import { useEffect, useRef, useState } from 'react';
import './App.css'

function App() {
  const emptyArr = ['', '', '', ''];
  const refs = [useRef(), useRef(), useRef(), useRef()];
  const [inputs, setInputs] = useState(emptyArr);
  const [missing, setMissing] = useState(emptyArr);
  const CODE = '1234';

  useEffect(()=>{
    refs[0].current.focus();
  },[])

  const handleSubmit = () => {
    const missed = inputs.map((item, i)=>{
      if (item === '')
        return i;
    }).filter((item)=> (item || item === 0));
    console.log("missed item", missed)
    setMissing(missed);

    if(missed.length){
      return
    }

    const userInput = inputs.join('');
    const isMatch = userInput === CODE;
    const msg = isMatch ? 'Code is valid' : 'Code is not valid'
    alert(msg);
  }

  const handleInputChange = (e, index) => {
    const val = e.target.value;
    console.log(val, index);
    if(!Number(val))
      return;
    if(index < inputs.length-1)
      refs[index + 1].current.focus();
    
    const copyInputs = [...inputs];
    copyInputs[index] = val;
    setInputs(copyInputs)
  }

  console.log('inputs', inputs);
  

  const handleKeyDown = (e, index) =>{
    console.log(e.keyCode, index);
    if(e.keyCode === 8){
      const copyInputs = [...inputs];
      copyInputs[index] = ''
      setInputs(copyInputs)
    }

    if(index > 0){
      refs[index - 1].current.focus();
    }
    
  }

  const handlePaste = (e) => {
    const data = e.clipboardData.getData('text');
    console.log('Pasted data', data);
    if(!Number(data) || data.length !== inputs.length)
      return;
    const pasteCode = data.split('');
    setInputs (pasteCode);
    refs[inputs.length-1].current.focus()
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
          onKeyDown={(e)=>handleKeyDown(e,i)}
          onPaste={handlePaste}
          maxLength={1}
          className={missing.includes(i) ? 'error' : ''}
          />
        })}</div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default App
