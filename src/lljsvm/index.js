// const readline = require("readline");
import createMemory from "./create-memory";
import CPU from "./cpu";
import {
  MOV_MEM_REG,
  MOV_LIT_REG,
  ADD_REG_REG,
  MOV_REG_MEM,
  JMP_NOT_EQ
} from "./instructions";

const IP = 0;
const ACC = 1;
const R1 = 2;
const R2 = 3;

const memory = createMemory(256 * 256);
const writableBytes = new Uint8Array(memory.buffer);

const cpu = new CPU(memory);

let i = 0;

writableBytes[i++] = MOV_MEM_REG;
writableBytes[i++] = 0x01;
writableBytes[i++] = 0x00; // 0x0100
writableBytes[i++] = R1;

writableBytes[i++] = MOV_LIT_REG;
writableBytes[i++] = 0x00;
writableBytes[i++] = 0x01; // 0x0001
writableBytes[i++] = R2;

writableBytes[i++] = ADD_REG_REG;
writableBytes[i++] = R1;
writableBytes[i++] = R2;

writableBytes[i++] = MOV_REG_MEM;
writableBytes[i++] = ACC;
writableBytes[i++] = 0x01;
writableBytes[i++] = 0x00; // 0x0100

writableBytes[i++] = JMP_NOT_EQ;
writableBytes[i++] = 0x00;
writableBytes[i++] = 0x03; // 0x0003
writableBytes[i++] = 0x00;
writableBytes[i++] = 0x00; // 0x0000

cpu.debug();
cpu.viewMemoryAt(cpu.getRegister("ip"));
cpu.viewMemoryAt(0x0100);

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// rl.on("line", () => {
//   cpu.step();
//   cpu.debug();
//   cpu.viewMemoryAt(cpu.getRegister("ip"));
//   cpu.viewMemoryAt(0x0100);
// });

export { memory, writableBytes, cpu, IP, ACC, R1, R2 };
