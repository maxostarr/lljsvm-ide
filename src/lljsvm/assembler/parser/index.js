import * as A from 'arcsecond';
import instructionsParser from './instructions';
import {label} from './common';

export default A.many (A.choice([
  instructionsParser,
  label
])).chain(res => A.endOfInput.map(() => res));
