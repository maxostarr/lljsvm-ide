import * as A from 'arcsecond';
import F from './formats';
import {meta, instructionTypes} from '../../instructions/meta';

console.log(instructionTypes, meta)

const typeFormats = Object.entries(instructionTypes).reduce((table, [type, value]) => {
  table[value] = F[type];
  return table;
}, {});

const allInstructions = meta.map(instruction => {
  if (!(instruction.type in typeFormats)) {
    throw new Error('Unknown instruction format: ', instruction.type);
  }

  return typeFormats[instruction.type](instruction.mnemonic, instruction.instruction);
});

export default A.choice(allInstructions);