import React, { useState } from "react";

import { cpu, memory } from "../lljsvm/index";

export const VMContext = React.createContext();

const VMContextProvider = ({ children }) => {
  const stateObj = {
    memory,
    cpu,
    ip: cpu.getRegister("ip"),
    fp: cpu.getRegister("fp"),
    sp: cpu.getRegister("sp"),
    stepCPU: () => stepCPU()
  };

  const [vmState, setVmState] = useState(stateObj);
  const stepCPU = () => {
    cpu.step();

    setVmState({
      ...stateObj,
      ip: cpu.getRegister("ip"),
      fp: cpu.getRegister("fp"),
      sp: cpu.getRegister("sp")
    });
  };
  return <VMContext.Provider value={vmState}>{children}</VMContext.Provider>;
};

export default VMContextProvider;
