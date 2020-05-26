// const readline = require("readline");
import createMemory from "./create-memory";
import CPU from "./cpu";

const IP = 0;
const ACC = 1;
const R1 = 2;
const R2 = 3;

export const createVM = (program) => {
  const memory = createMemory(256 * 256);
  const writableBytes = new Uint8Array(memory.buffer);
  const cpu = new CPU(memory);

  // Load the program into memory
  for (let i = 0; i < program.length; i++) {
    writableBytes[i] = program[i];
  }

  return { memory, writableBytes, cpu, IP, ACC, R1, R2 };
}
