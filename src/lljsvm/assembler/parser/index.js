import * as A from "arcsecond";
import instructionsParser from "./instructions";
import { label } from "./common";

export default A.many(A.choice([instructionsParser, label]));

// const Peek = new A.Parser(state => {
//   debugger;
//   return statel
// })

// module.exports = A.coroutine(function* () {

//   const res = yield Peek;
//   debugger;
// });
