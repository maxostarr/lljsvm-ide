import React, { useState } from "react";

import { createVM } from "../lljsvm/index";

let vm;

export const VMContext = React.createContext();
export const initVM = program => {
  vm = createVM(program);
}

const VMContextProvider = ({ children }) => {
  const stateObj = {
    memory: vm.memory,
    cpu: vm.cpu,
    ip: vm.cpu.getRegister("ip"),
    fp: vm.cpu.getRegister("fp"),
    sp: vm.cpu.getRegister("sp"),
    stepCPU: () => stepCPU()
  };

  const [vmState, setVmState] = useState(stateObj);
  const [isRunning, setIsRunning] = useState(false);
  const stepCPU = () => {
    vm.cpu.step();

    setVmState({
      ...stateObj,
      ip: vm.cpu.getRegister("ip"),
      fp: vm.cpu.getRegister("fp"),
      sp: vm.cpu.getRegister("sp")
    });
  };
  return (
    <VMContext.Provider value={{ ...vmState, setIsRunning, isRunning }}>
      {children}
    </VMContext.Provider>
  );
};

export default VMContextProvider;
