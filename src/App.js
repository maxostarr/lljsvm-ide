import React, { useState } from "react";
import Memory from "./componenets/memory";
import Registers from "./componenets/registers";
import { cpu, memory } from "./lljsvm/index";

import "./App.css";

function App() {
  const [memoryState, setMemoryState] = useState(memory);
  const [step, setStep] = useState(0);
  return (
    <div className="App">
      <h1>Code</h1>
      <h3>Step: {step}</h3>
      <button
        onClick={e => {
          cpu.step();
          setMemoryState(memory);
          setStep(step + 1);
        }}
      >
        Step
      </button>
      <Memory memory={memoryState} />
      <Registers cpu={cpu} />
    </div>
  );
}

export default App;
