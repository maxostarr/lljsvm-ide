import React, { useState } from "react";

import { createVM } from "../lljsvm/episode-10/index";

let vm: any;

export const VMContext = React.createContext({} as any);
// Create some trival VM instance to avoid undefined values before initial compilation
vm = createVM([0]);

const VMContextProvider = ({ children }: any) => {
  const stateObj = {
    memory: vm.memory,
    cpu: vm.cpu,
    ip: vm.cpu.getRegister("ip"),
    fp: vm.cpu.getRegister("fp"),
    sp: vm.cpu.getRegister("sp"),
    stepCPU: () => stepCPU(),
  };

  const [vmState, setVmState] = useState(stateObj);
  const [isRunning, setIsRunning] = useState(false);
  const initVM = (program: number[]) => {
    vm = createVM(program);
    setVmState({
      ...stateObj,
      memory: vm.memory,
      cpu: vm.cpu,
      ip: vm.cpu.getRegister("ip"),
      fp: vm.cpu.getRegister("fp"),
      sp: vm.cpu.getRegister("sp"),
    });
  };
  const stepCPU = () => {
    vm.cpu.step();

    setVmState({
      ...stateObj,
      ip: vm.cpu.getRegister("ip"),
      fp: vm.cpu.getRegister("fp"),
      sp: vm.cpu.getRegister("sp"),
    });
  };
  return (
    <VMContext.Provider value={{ ...vmState, setIsRunning, isRunning, initVM }}>
      {children}
    </VMContext.Provider>
  );
};

export default VMContextProvider;
