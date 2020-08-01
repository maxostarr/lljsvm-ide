import React, { useState } from "react";

import { createVM } from "../lljsvm/index";
import { assembleProgram } from "../lljsvm/assembler/index";
import MemoryMapper from "../lljsvm/memory-mapper";
import CPU from "../lljsvm/cpu";

let vm: { memory: MemoryMapper, cpu: CPU };

export const VMContext = React.createContext({} as any);
// Create some initial VM instance to avoid undefined values before initial compilation
vm = createVM([0, 0, 0, 0]);

const getNewVMState = (vm: any) => {
  return {
    memory: vm.memory,
    cpu: vm.cpu,
    ip: vm.cpu.getRegister("ip"),
    fp: vm.cpu.getRegister("fp"),
    sp: vm.cpu.getRegister("sp"),
  };
};

const VMContextProvider = ({ children }: any) => {
  const stateObj = {
    ...getNewVMState(vm),
    stepCPU: () => stepCPU(),
  };

  const [vmState, setVmState] = useState(stateObj);
  const [isRunning, setIsRunning] = useState(false);
  const initVM = (program: string) => {
    vm = createVM(assembleProgram(program));
    setVmState({
      ...stateObj,
      ...getNewVMState(vm),
    });
  };
  const loadIntoMemory = (address:number, data: number[]) => {
    if (!vm) {
      vm = createVM([]);
    }
    vm.memory.load(address, data);
    setVmState({
      ...stateObj,
      ...getNewVMState(vm),
    });
  }
  const stepCPU = () => {
    vm.cpu.step();

    setVmState({
      ...stateObj,
      ...getNewVMState(vm),
    });
  };
  return (
    <VMContext.Provider value={{ ...vmState, setIsRunning, isRunning, initVM, loadIntoMemory }}>
      {children}
    </VMContext.Provider>
  );
};

export default VMContextProvider;
