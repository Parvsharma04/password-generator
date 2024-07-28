import React, { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numAllowed, setnumAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);

  const generateRandomPass = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let char = "";
    numAllowed ? (str += "1234567890") : (str += "");
    charAllowed ? (str += "!@#$%^&*(){}<>?/") : (str += "");

    for (let i = 0; i < length; i++) {
      char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, charAllowed, numAllowed]);

  useEffect(()=>{
    generateRandomPass()
  },  [length, charAllowed, numAllowed, generateRandomPass])

  const passwordRef = useRef()

  function copyPasswordToClipboard(){
    passwordRef.current?.select()
  window.navigator.clipboard.writeText(password)
} 
return (
  <div className="mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500 w-[80%]">
    <h1 className="text-white text-center my-3 text-3xl p-[1rem]">Password generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4 ">
      <input
        type="text"
        value={password}
        className="outline-none w-full py-1 px-3 pt-2 pb-2"
        placeholder="Password"
        readOnly
        ref={passwordRef}
      />
      <button
        onClick={copyPasswordToClipboard}
        className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
        >
          copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numAllowed}
            id="numberInput"
            onChange={() => {
              setnumAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => {
              setcharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
