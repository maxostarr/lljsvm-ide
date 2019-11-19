import React, { useState } from "react";

import { cpu, memory } from "../lljsvm/index";

export const VMContext = React.createContext();

const VMContextProvider = ({ children }) => {
  const stateObj = {
    memory,
    cpu,
    ip: cpu
      .getRegister("ip")
      .toString(16)
      .padStart(4, "0"),
    fp: cpu
      .getRegister("fp")
      .toString(16)
      .padStart(4, "0"),
    sp: cpu
      .getRegister("sp")
      .toString(16)
      .padStart(4, "0"),
    stepCPU: () => stepCPU()
  };

  const [vmState, setVmState] = useState(stateObj);
  const stepCPU = () => {
    cpu.step();
    setVmState({ ...stateObj });
  };
  return <VMContext.Provider value={vmState}>{children}</VMContext.Provider>;
};

export default VMContextProvider;
