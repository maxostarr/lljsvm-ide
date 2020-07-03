import parser from "./parser";
import instructions from "../instructions/index.js";
import { instructionTypes as I } from "../instructions/meta";

const registerMap = {
  ip: 0,
  acc: 1,
  r1: 2,
  r2: 3,
  r3: 4,
  r4: 5,
  r5: 6,
  r6: 7,
  r7: 8,
  r8: 9,
  sp: 10,
  fp: 11,
};
export const assembleProgram = (code) => {
  const exampleProgram = code;

  const parsedOutput = parser.run(exampleProgram);

  const machineCode = [];
  const labels = {};
  let currentAddress = 0;

  // resolve the labels
  parsedOutput.result.forEach((instructionOrLabel) => {
    if (instructionOrLabel.type === "LABEL") {
      labels[instructionOrLabel.value] = currentAddress;
    } else {
      const metadata = instructions[instructionOrLabel.value.instruction];

      currentAddress += metadata.size;
    }
  });

  const encodeLitOrMem = (lit) => {
    let hexVal;

    // Assume that variables are labels for now
    if (lit.type === "VARIABLE") {
      if (!(lit.value in labels)) {
        throw new Error(`label "${lit.value}" wasn't resolved.`);
      }
      hexVal = labels[lit.value];
    } else {
      hexVal = parseInt(lit.value, 16);
    }

    const highByte = (hexVal & 0xff00) >> 8;
    const lowByte = hexVal & 0x00ff;
    machineCode.push(highByte, lowByte);
  };
  const encodeLit8 = (lit) => {
    let hexVal;

    // Assume that variables are labels for now
    if (lit.type === "VARIABLE") {
      hexVal = labels[lit.value];
    } else {
      hexVal = parseInt(lit.value, 16);
    }

    const lowByte = hexVal & 0xff;
    machineCode.push(lowByte);
  };
  const encodeReg = (reg) => {
    const mappedReg = registerMap[reg.value];
    machineCode.push(mappedReg);
  };

  parsedOutput.result.forEach((instruction) => {
    // ignore labels
    if (instruction.type !== "INSTRUCTION") {
      return;
    }

    const metadata = instructions[instruction.value.instruction];
    machineCode.push(metadata.opcode);

    if ([I.litReg, I.memReg].includes(metadata.type)) {
      encodeLitOrMem(instruction.value.args[0]);
      encodeReg(instruction.value.args[1]);
    }

    if (I.regLit8 === metadata.type) {
      encodeReg(instruction.value.args[0]);
      encodeLit8(instruction.value.args[1]);
    }

    if ([I.regLit, I.regMem].includes(metadata.type)) {
      encodeReg(instruction.value.args[0]);
      encodeLitOrMem(instruction.value.args[1]);
    }

    if (I.litMem === metadata.type) {
      encodeLitOrMem(instruction.value.args[0]);
      encodeLitOrMem(instruction.value.args[1]);
    }

    if ([I.regReg, I.regPtrReg].includes(metadata.type)) {
      encodeReg(instruction.value.args[0]);
      encodeReg(instruction.value.args[1]);
    }

    if (I.litOffReg === metadata.type) {
      encodeLitOrMem(instruction.value.args[0]);
      encodeReg(instruction.value.args[1]);
      encodeReg(instruction.value.args[2]);
    }

    if (I.singleReg === metadata.type) {
      encodeReg(instruction.value.args[0]);
    }

    if (I.singleLit === metadata.type) {
      encodeLitOrMem(instruction.value.args[0]);
    }
  });

  return machineCode;
};
