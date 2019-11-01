import React, { useState } from "react";
import Memory from "./componenets/memory";
import Registers from "./componenets/registers";
import { cpu, memory } from "./lljsvm/index";

import "./App.css";

function App() {
  const [memoryState, setMemoryState] = useState(memory);
  const [step, setStep] = useState(0);
  const [ip, setIp] = useState(cpu.getRegister("ip"));
  return (
    <div className="App">
      <h1>Code</h1>
      <h3>Step: {step}</h3>
      <button
        onClick={e => {
          cpu.step();
          setMemoryState(memory);
          setStep(step + 1);
          setIp(cpu.getRegister("ip"));
        }}
      >
        Step
      </button>
      <Memory memory={memoryState} ip={ip} />
      <Registers cpu={cpu} />
    </div>
  );
}

export default App;
