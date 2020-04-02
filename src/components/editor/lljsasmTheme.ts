import monaco from "monaco-editor";

export const theme: monaco.editor.IStandaloneThemeData = {
  base: "vs-dark",
  inherit: true,
  rules: [
    { token: "keyword.module", foreground: "FF85BC" },
    { token: "keyword", foreground: "31B5A9" },
    { token: "helper", foreground: "31B5A9" },
    { token: "number", foreground: "E2E621" },
    { token: "instruction", foreground: "f0f0f0" },
    { token: "identifier", foreground: "f0f0f0" },
    { token: "register", foreground: "f0f0f0" },
    { token: "string", foreground: "6C67CF" },
    { token: "routine", foreground: "10E606" },
  ],
  colors: {},
};
