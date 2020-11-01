export const instructionTypes = {
  litReg: 0,
  regLit: 1,
  regLit8: 2,
  regReg: 3,
  regMem: 4,
  memReg: 5,
  litMem: 6,
  regPtrReg: 7,
  litOffReg: 8,
  noArgs: 9,
  singleReg: 10,
  singleLit: 11,
};

const instructionTypeSizes = {
  litReg: 4,
  regLit: 4,
  regLit8: 3,
  regReg: 3,
  regMem: 4,
  memReg: 4,
  litMem: 5,
  regPtrReg: 3,
  litOffReg: 5,
  noArgs: 1,
  singleReg: 2,
  singleLit: 3,
};

export const meta = [
  {
    instruction: 'RET_INT',
    opcode: 0xFC,
    type: instructionTypes.noArgs,
    size: instructionTypeSizes.noArgs,
    mnemonic: 'rti',
  },
  {
    instruction: 'INT',
    opcode: 0xFD,
    type: instructionTypes.singleLit,
    size: instructionTypeSizes.singleLit,
    mnemonic: 'int',
  },
  {
    instruction: 'MOV_LIT_REG',
    opcode: 0x10,
    type: instructionTypes.litReg,
    size: instructionTypeSizes.litReg,
    mnemonic: 'mov',
  },
  {
    instruction: 'MOV_REG_REG',
    opcode: 0x11,
    type: instructionTypes.regReg,
    size: instructionTypeSizes.regReg,
    mnemonic: 'mov',
  },
  {
    instruction: 'MOV_REG_MEM',
    opcode: 0x12,
    type: instructionTypes.regMem,
    size: instructionTypeSizes.regMem,
    mnemonic: 'mov',
  },
  {
    instruction: 'MOV_MEM_REG',
    opcode: 0x13,
    type: instructionTypes.memReg,
    size: instructionTypeSizes.memReg,
    mnemonic: 'mov',
  },
  {
    instruction: 'MOV_LIT_MEM',
    opcode: 0x1B,
    type: instructionTypes.litMem,
    size: instructionTypeSizes.litMem,
    mnemonic: 'mov',
  },
  {
    instruction: 'MOV_REG_PTR_REG',
    opcode: 0x1C,
    type: instructionTypes.regPtrReg,
    size: instructionTypeSizes.regPtrReg,
    mnemonic: 'mov',
  },
  {
    instruction: 'MOV_LIT_OFF_REG',
    opcode: 0x1D,
    type: instructionTypes.litOffReg,
    size: instructionTypeSizes.litOffReg,
    mnemonic: 'mov',
  },
  {
    instruction: 'ADD_REG_REG',
    opcode: 0x14,
    type: instructionTypes.regReg,
    size: instructionTypeSizes.regReg,
    mnemonic: 'add',
  },
  {
    instruction: 'ADD_LIT_REG',
    opcode: 0x3F,
    type: instructionTypes.litReg,
    size: instructionTypeSizes.litReg,
    mnemonic: 'add',
  },
  {
    instruction: 'SUB_LIT_REG',
    opcode: 0x16,
    type: instructionTypes.litReg,
    size: instructionTypeSizes.litReg,
    mnemonic: 'sub',
  },
  {
    instruction: 'SUB_REG_LIT',
    opcode: 0x1E,
    type: instructionTypes.regLit,
    size: instructionTypeSizes.regLit,
    mnemonic: 'sub',
  },
  {
    instruction: 'SUB_REG_REG',
    opcode: 0x1F,
    type: instructionTypes.regReg,
    size: instructionTypeSizes.regReg,
    mnemonic: 'sub',
  },
  {
    instruction: 'INC_REG',
    opcode: 0x35,
    type: instructionTypes.singleReg,
    size: instructionTypeSizes.singleReg,
    mnemonic: 'inc',
  },
  {
    instruction: 'DEC_REG',
    opcode: 0x36,
    type: instructionTypes.singleReg,
    size: instructionTypeSizes.singleReg,
    mnemonic: 'dec',
  },
  {
    instruction: 'MUL_LIT_REG',
    opcode: 0x20,
    type: instructionTypes.litReg,
    size: instructionTypeSizes.litReg,
    mnemonic: 'mul',
  },
  {
    instruction: 'MUL_REG_REG',
    opcode: 0x21,
    type: instructionTypes.regReg,
    size: instructionTypeSizes.regReg,
    mnemonic: 'mul',
  },
  {
    instruction: 'LSF_REG_LIT',
    opcode: 0x26,
    type: instructionTypes.regLit8,
    size: instructionTypeSizes.regLit8,
    mnemonic: 'lsf',
  },
  {
    instruction: 'LSF_REG_REG',
    opcode: 0x27,
    type: instructionTypes.regReg,
    size: instructionTypeSizes.regReg,
    mnemonic: 'lsf',
  },
  {
    instruction: 'RSF_REG_LIT',
    opcode: 0x2A,
    type: instructionTypes.regLit8,
    size: instructionTypeSizes.regLit8,
    mnemonic: 'rsf',
  },
  {
    instruction: 'RSF_REG_REG',
    opcode: 0x2B,
    type: instructionTypes.regReg,
    size: instructionTypeSizes.regReg,
    mnemonic: 'rsf',
  },
  {
    instruction: 'AND_REG_LIT',
    opcode: 0x2E,
    type: instructionTypes.regLit,
    size: instructionTypeSizes.regLit,
    mnemonic: 'and',
  },
  {
    instruction: 'AND_REG_REG',
    opcode: 0x2F,
    type: instructionTypes.regReg,
    size: instructionTypeSizes.regReg,
    mnemonic: 'and',
  },
  {
    instruction: 'OR_REG_LIT',
    opcode: 0x30,
    type: instructionTypes.regLit,
    size: instructionTypeSizes.regLit,
    mnemonic: 'or',
  },
  {
    instruction: 'OR_REG_REG',
    opcode: 0x31,
    type: instructionTypes.regReg,
    size: instructionTypeSizes.regReg,
    mnemonic: 'or',
  },
  {
    instruction: 'XOR_REG_LIT',
    opcode: 0x32,
    type: instructionTypes.regLit,
    size: instructionTypeSizes.regLit,
    mnemonic: 'xor',
  },
  {
    instruction: 'XOR_REG_REG',
    opcode: 0x33,
    type: instructionTypes.regReg,
    size: instructionTypeSizes.regReg,
    mnemonic: 'xor',
  },
  {
    instruction: 'NOT',
    opcode: 0x34,
    type: instructionTypes.singleReg,
    size: instructionTypeSizes.singleReg,
    mnemonic: 'not',
  },
  {
    instruction: 'JMP_NOT_EQ',
    opcode: 0x15,
    type: instructionTypes.litMem,
    size: instructionTypeSizes.litMem,
    mnemonic: 'jne',
  },
  {
    instruction: 'JNE_REG',
    opcode: 0x40,
    type: instructionTypes.regMem,
    size: instructionTypeSizes.regMem,
    mnemonic: 'jne',
  },
  {
    instruction: 'JEQ_REG',
    opcode: 0x3E,
    type: instructionTypes.regMem,
    size: instructionTypeSizes.regMem,
    mnemonic: 'jeq',
  },
  {
    instruction: 'JEQ_LIT',
    opcode: 0x41,
    type: instructionTypes.litMem,
    size: instructionTypeSizes.litMem,
    mnemonic: 'jeq',
  },
  {
    instruction: 'JLT_REG',
    opcode: 0x42,
    type: instructionTypes.regMem,
    size: instructionTypeSizes.regMem,
    mnemonic: 'jlt',
  },
  {
    instruction: 'JLT_LIT',
    opcode: 0x43,
    type: instructionTypes.litMem,
    size: instructionTypeSizes.litMem,
    mnemonic: 'jlt',
  },
  {
    instruction: 'JGT_REG',
    opcode: 0x44,
    type: instructionTypes.regMem,
    size: instructionTypeSizes.regMem,
    mnemonic: 'jgt',
  },
  {
    instruction: 'JGT_LIT',
    opcode: 0x45,
    type: instructionTypes.litMem,
    size: instructionTypeSizes.litMem,
    mnemonic: 'jgt',
  },
  {
    instruction: 'JLE_REG',
    opcode: 0x46,
    type: instructionTypes.regMem,
    size: instructionTypeSizes.regMem,
    mnemonic: 'jle',
  },
  {
    instruction: 'JLE_LIT',
    opcode: 0x47,
    type: instructionTypes.litMem,
    size: instructionTypeSizes.litMem,
    mnemonic: 'jle',
  },
  {
    instruction: 'JGE_REG',
    opcode: 0x48,type: instructionTypes.regMem,
    size: instructionTypeSizes.regMem,
    mnemonic: 'jge',
  },
  {
    instruction: 'JGE_LIT',
    opcode: 0x49,
    type: instructionTypes.litMem,
    size: instructionTypeSizes.litMem,
    mnemonic: 'jge',
  },
  {
    instruction: 'PSH_LIT',
    opcode: 0x17,
    type: instructionTypes.singleLit,
    size: instructionTypeSizes.singleLit,
    mnemonic: 'psh',
  },
  {
    instruction: 'PSH_REG',
    opcode: 0x18,
    type: instructionTypes.singleReg,
    size: instructionTypeSizes.singleReg,
    mnemonic: 'psh',
  },
  {
    instruction: 'POP',
    opcode: 0x1A,
    type: instructionTypes.singleReg,
    size: instructionTypeSizes.singleReg,
    mnemonic: 'pop',
  },
  {
    instruction: 'CAL_LIT',
    opcode: 0x5E,
    type: instructionTypes.singleLit,
    size: instructionTypeSizes.singleLit,
    mnemonic: 'cal',
  },
  {
    instruction: 'CAL_REG',
    opcode: 0x5F,
    type: instructionTypes.singleReg,
    size: instructionTypeSizes.singleReg,
    mnemonic: 'cal',
  },
  {
    instruction: 'RET',
    opcode: 0x60,
    type: instructionTypes.noArgs,
    size: instructionTypeSizes.noArgs,
    mnemonic: 'ret',
  },
  {
    instruction: 'HLT',
    opcode: 0xFF,
    type: instructionTypes.noArgs,
    size: instructionTypeSizes.noArgs,
    mnemonic: 'hlt',
  },
];
