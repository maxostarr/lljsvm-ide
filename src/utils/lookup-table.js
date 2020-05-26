const argTypes = {
  register: {
    length: 8,
    type: "register"
  },
  literal16: {
    length: 16,
    type: "literal16"
  },
  literal8: {
    length: 8,
    type: "literal8"
  },
  address: {
    length: 16,
    type: "address"
  }
};

const instructionLookupTable = [
  {
    opCode: 0x10,
    name: "MOV_LIT_REG",
    args: [argTypes.literal16, argTypes.register]
  },
  {
    opCode: 0x11,
    name: "MOV_REG_REG",
    args: [argTypes.register, argTypes.register]
  },
  {
    opCode: 0x12,
    name: "MOV_REG_MEM",
    args: [argTypes.register, argTypes.address]
  },
  {
    opCode: 0x13,
    name: "MOV_MEM_REG",
    args: [argTypes.address, argTypes.register]
  },
  {
    opCode: 0x1B,
    name: "MOV_LIT_MEM",
    args: [argTypes.literal16, argTypes.address]
  },
  {
    opCode: 0x1C,
    name: "MOV_REG_PTR_REG",
    args: [argTypes.register, argTypes.register]
  },
  {
    opCode: 0x1D,
    name: "MOV_LIT_OFF_REG",
    args: [argTypes.literal16, argTypes.register, argTypes.register]
  },

  {
    opCode: 0x14,
    name: "ADD_REG_REG",
    args: [argTypes.register, argTypes.register]
  },
  {
    opCode: 0x3F,
    name: "ADD_LIT_REG",
    args: [argTypes.literal16, argTypes.register]
  },
  {
    opCode: 0x16,
    name: "SUB_LIT_REG",
    args: [argTypes.literal16, argTypes.register]
  },
  {
    opCode: 0x1F,
    name: "SUB_REG_REG",
    args: [argTypes.register, argTypes.register]
  },
  {
    opCode: 0x35,
    name: "INC_REG",
    args: [argTypes.register]
  },
  {
    opCode: 0x36,
    name: "DEC_REG",
    args: [argTypes.register]
  },
  {
    opCode: 0x20,
    name: "MUL_LIT_REG",
    args: [argTypes.literal16, argTypes.register]
  },
  {
    opCode: 0x21,
    name: "MUL_REG_REG",
    args: [argTypes.register, argTypes.register]
  },

  {
    opCode: 0x26,
    name: "LSF_REG_LIT",
    args: [argTypes.register, argTypes.literal8]
  },
  {
    opCode: 0x27,
    name: "LSF_REG_REG",
    args: [argTypes.register, argTypes.register]
  },
  {
    opCode: 0x2A,
    name: "RSF_REG_LIT",
    args: [argTypes.register, argTypes.literal8]
  },
  {
    opCode: 0x2B,
    name: "RSF_REG_REG",
    args: [argTypes.register, argTypes.register]
  },
  {
    opCode: 0x2E,
    name: "AND_REG_LIT",
    args: [argTypes.literal16, argTypes.register]
  },
  {
    opCode: 0x2F,
    name: "AND_REG_REG",
    args: [argTypes.register, argTypes.register]
  },
  {
    opCode: 0x30,
    name: "OR_REG_LIT",
    args: [argTypes.literal16, argTypes.register]
  },
  {
    opCode: 0x31,
    name: "OR_REG_REG",
    args: [argTypes.register, argTypes.register]
  },
  {
    opCode: 0x32,
    name: "XOR_REG_LIT",
    args: [argTypes.literal16, argTypes.register]
  },
  {
    opCode: 0x33,
    name: "XOR_REG_REG",
    args: [argTypes.register, argTypes.register]
  },
  {
    opCode: 0x34,
    name: "NOT",
    args: [argTypes.register]
  },

  {
    opCode: 0x15,
    name: "JMP_NOT_EQ",
    args: [argTypes.literal16, argTypes.address]
  },
  {
    opCode: 0x40,
    name: "JNE_REG",
    args: [argTypes.register, argTypes.address]
  },
  {
    opCode: 0x3E,
    name: "JEQ_REG",
    args: [argTypes.register, argTypes.address]
  },
  {
    opCode: 0x41,
    name: "JEQ_LIT",
    args: [argTypes.literal16, argTypes.address]
  },
  {
    opCode: 0x42,
    name: "JLT_REG",
    args: [argTypes.register, argTypes.address]
  },
  {
    opCode: 0x43,
    name: "JLT_LIT",
    args: [argTypes.literal16, argTypes.address]
  },
  {
    opCode: 0x44,
    name: "JGT_REG",
    args: [argTypes.register, argTypes.address]
  },
  {
    opCode: 0x45,
    name: "JGT_LIT",
    args: [argTypes.literal16, argTypes.address]
  },
  {
    opCode: 0x46,
    name: "JLE_REG",
    args: [argTypes.register, argTypes.address]
  },
  {
    opCode: 0x47,
    name: "JLE_LIT",
    args: [argTypes.literal16, argTypes.address]
  },
  {
    opCode: 0x48,
    name: "JGE_REG",
    args: [argTypes.register, argTypes.address]
  },
  {
    opCode: 0x48,
    name: "JGE_LIT",
    args: [argTypes.literal16, argTypes.address]
  },

  {
    opCode: 0x17,
    name: "PSH_LIT",
    args: [argTypes.literal16]
  },
  {
    opCode: 0x18,
    name: "PSH_REG",
    args: [argTypes.register]
  },
  {
    opCode: 0x1a,
    name: "POP",
    args: [argTypes.register]
  },
  {
    opCode: 0x5e,
    name: "CAL_LIT",
    args: [argTypes.address]
  },
  {
    opCode: 0x5f,
    name: "CAL_REG",
    args: [argTypes.register]
  },
  {
    opCode: 0x60,
    name: "RET",
    args: []
  },
  {
    opCode: 0xFF,
    name: "HLT",
    args: []
  },
  {
    opCode: 0x00,
    name: "",
    args: []
  }
];
const registerLookupTable = [
  { name: "IP",  number: 0 },
  { name: "ACC", number: 1 },
  { name: "R1",  number: 2 },
  { name: "R2",  number: 3 },
  { name: "R3",  number: 4 },
  { name: "R4",  number: 5 },
  { name: "R5",  number: 6 },
  { name: "R6",  number: 7 },
  { name: "R7",  number: 8 },
  { name: "R8",  number: 9 },
  { name: "SP",  number: 10 },
  { name: "FP",  number: 11 }
];

module.exports = {
  instructionLookupTable,
  registerLookupTable
};
