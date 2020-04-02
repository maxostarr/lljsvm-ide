// import { monaco } from "@monaco-editor/react";
// monaco.config;
import monaco from "monaco-editor";
interface MonarchLanguageConfiguration
  extends monaco.languages.IMonarchLanguage {
  keywords: string[];
  moduleKeywords: string[];
  typeKeywords: string[];
  instructions: string[];
  registers: string[];
}

export const lljsasmDefs: MonarchLanguageConfiguration = {
  defaultToken: "",
  tokenPostfix: ".python",

  brackets: [
    { open: "{", close: "}", token: "delimiter.curly" },
    { open: "[", close: "]", token: "delimiter.bracket" },
    { open: "(", close: ")", token: "delimiter.parenthesis" },
  ],
  keywords: [
    "import",
    "structure",
    "constant",
    "place_at",
    "data_structure",
    "routine_size",
    "structure_size",
  ],

  moduleKeywords: ["module", "parameters"],

  typeKeywords: ["data16"],

  instructions: ["mov", "add"],

  registers: ["r1", "r2", "ip"],

  tokenizer: {
    root: [
      { include: "@whitespace" },
      { include: "@strings" },
      { include: "@numbers" },
      [/[,:;]/, "delimiter"],
      [/[{}[\]()]/, "@brackets"],

      // [/[A-Z][\w\$]*/, "type.identifier"], // to show class names nicely

      // [/@[a-zA-Z]\w*/, "tag"],
      [/(\w+)(:$)/, ["routine", "identifier"]],
      [/!\w+/, "helper"],

      [
        /[a-zA-Z]\w*/,
        {
          cases: {
            "@moduleKeywords": "keyword.module",
            "@keywords": "keyword",
            "@typeKeywords": "type",
            "@registers": "register",
            "@instructions": "instruction",
            "@default": "identifier",
          },
        },
      ],
    ],

    // Deal with white space, including single and multi-line comments
    whitespace: [
      [/\s+/, "white"],
      [/('''.*''')|(""".*""")/, "string"],
      [/'''.*$/, "string", "@endDocString"],
      [/""".*$/, "string", "@endDblDocString"],
    ],
    endDocString: [
      [/\\'/, "string"],
      [/.*'''/, "string", "@popall"],
      [/.*$/, "string"],
    ],
    endDblDocString: [
      [/\\"/, "string"],
      [/.*"""/, "string", "@popall"],
      [/.*$/, "string"],
    ],

    // Recognize hex, negatives, decimals, imaginaries, longs, and scientific notation
    numbers: [
      [/[&\*\$#]([abcdef]|[ABCDEF]|\d)+/, "number"],
      // [/-?(\d*\.)?\d+([eE][+\-]?\d+)?[jJ]?[lL]?/, 'number'],
    ],

    // Recognize strings, including those broken across lines with \ (but not without)
    strings: [
      [/'$/, "string.escape", "@popall"],
      [/'/, "string.escape", "@stringBody"],
      [/"$/, "string.escape", "@popall"],
      [/"/, "string.escape", "@dblStringBody"],
    ],
    stringBody: [
      [/[^\\']+$/, "string", "@popall"],
      [/[^\\']+/, "string"],
      [/\\./, "string"],
      [/'/, "string.escape", "@popall"],
      [/\\$/, "string"],
    ],
    dblStringBody: [
      [/[^\\"]+$/, "string", "@popall"],
      [/[^\\"]+/, "string"],
      [/\\./, "string"],
      [/"/, "string.escape", "@popall"],
      [/\\$/, "string"],
    ],
  },
};
