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
    opCode: 0x14,
    name: "ADD_REG_REG",
    args: [argTypes.register, argTypes.register]
  },
  {
    opCode: 0x15,
    name: "JMP_NOT_EQ",
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
    opCode: 0x00,
    name: "",
    args: []
  }
];
const registerLookupTable = [
  { name: "IP", number: 0 },
  { name: "ACC", number: 1 },
  { name: "R1", number: 2 },
  { name: "R2", number: 3 },
  { name: "R3", number: 4 },
  { name: "R4", number: 5 },
  { name: "R5", number: 6 },
  { name: "R6", number: 7 },
  { name: "R7", number: 8 },
  { name: "R8", number: 9 },
  { name: "SP", number: 10 },
  { name: "FP", number: 11 }
];

module.exports = {
  instructionLookupTable,
  registerLookupTable
};
