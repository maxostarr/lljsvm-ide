// import { monaco } from "@monaco-editor/react";
// monaco.config;

// export const lljsasm = <ILanguage>{
//   defaultToken: "",
//   tokenPostfix: ".python",

//   keywords: [
//     "import",
//     "module",
//     "constant",
//     "place_at",
//     "data_structure",
//     "routine_size",
//     "structure_size",
//   ],

//   typeKeywords: ["data16"],

//   instructions: ["mov", "add"],

//   registers: ["r1", "r2", "ip"],

//   brackets: [
//     { open: "{", close: "}", token: "delimiter.curly" },
//     { open: "[", close: "]", token: "delimiter.bracket" },
//     { open: "(", close: ")", token: "delimiter.parenthesis" },
//   ],

//   tokenizer: {
//     root: [
//       { include: "@whitespace" },
//       { include: "@strings" },
//       { include: "@numbers" },
//       [/[,:;]/, "delimiter"],
//       [/[{}\[\]()]/, "@brackets"],

//       [/[A-Z][\w\$]*/, "type.identifier"], // to show class names nicely

//       [/@[a-zA-Z]\w*/, "tag"],

//       [
//         /[a-zA-Z]\w*/,
//         {
//           cases: {
//             "@keywords": "keyword",
//             "@typeKeywords": "type",
//             "@registers": "keyword",
//             "@instructions": "keyword",
//             "@default": "identifier",
//           },
//         },
//       ],
//     ],

//     // Deal with white space, including single and multi-line comments
//     whitespace: [
//       [/\s+/, "white"],
//       [/('''.*''')|(""".*""")/, "string"],
//       [/'''.*$/, "string", "@endDocString"],
//       [/""".*$/, "string", "@endDblDocString"],
//     ],
//     endDocString: [
//       [/\\'/, "string"],
//       [/.*'''/, "string", "@popall"],
//       [/.*$/, "string"],
//     ],
//     endDblDocString: [
//       [/\\"/, "string"],
//       [/.*"""/, "string", "@popall"],
//       [/.*$/, "string"],
//     ],

//     // Recognize hex, negatives, decimals, imaginaries, longs, and scientific notation
//     numbers: [
//       [/[&\*\$#]([abcdef]|[ABCDEF]|\d)+/, "number.hex"],
//       // [/-?(\d*\.)?\d+([eE][+\-]?\d+)?[jJ]?[lL]?/, 'number'],
//     ],

//     // Recognize strings, including those broken across lines with \ (but not without)
//     strings: [
//       [/'$/, "string.escape", "@popall"],
//       [/'/, "string.escape", "@stringBody"],
//       [/"$/, "string.escape", "@popall"],
//       [/"/, "string.escape", "@dblStringBody"],
//     ],
//     stringBody: [
//       [/[^\\']+$/, "string", "@popall"],
//       [/[^\\']+/, "string"],
//       [/\\./, "string"],
//       [/'/, "string.escape", "@popall"],
//       [/\\$/, "string"],
//     ],
//     dblStringBody: [
//       [/[^\\"]+$/, "string", "@popall"],
//       [/[^\\"]+/, "string"],
//       [/\\./, "string"],
//       [/"/, "string.escape", "@popall"],
//       [/\\$/, "string"],
//     ],
//   },
// };
export default {};
