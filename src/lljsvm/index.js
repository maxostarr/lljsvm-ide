import CPU from "./cpu";
import createMemory from "./create-memory";
import MemoryMapper from './memory-mapper';

const dataViewMethods = [
  'getUint8',
  'getUint16',
  'setUint8',
  'setUint16',
];
const createBankedMemory = (n, bankSize, cpu) => {
  const bankBuffers = Array.from({length: n}, () => new ArrayBuffer(bankSize));
  const banks = bankBuffers.map(ab => new DataView(ab));

  const forwardToDataView = name => (...args) => {
    const bankIndex = cpu.getRegister('mb') % n;
    const memoryBankToUse = banks[bankIndex];
    return memoryBankToUse[name](...args);
  };

  const memoryInterface = dataViewMethods.reduce((dvOut, fnName) => {
    dvOut[fnName] = forwardToDataView(fnName);
    return dvOut;
  }, {});

  return memoryInterface;
}

const bankSize = 0xff;
const nBanks = 8;

export const createVM = (program) => {
  const MM = new MemoryMapper();
  const cpu = new CPU(MM);

  const memoryBankDevice = createBankedMemory(nBanks, bankSize, cpu);
  MM.map(memoryBankDevice, 0, bankSize);

  const regularMemory = createMemory(0xff01);
  MM.map(regularMemory, bankSize, 0xffff, true);

  MM.load(0, program);

  return {
    memory: MM,
    cpu,
  };
};
