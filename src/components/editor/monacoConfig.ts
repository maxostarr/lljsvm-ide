import { monaco } from "@monaco-editor/react";
import { lljsasmDefs } from "./monarchDef";
monaco
  .init()
  .then(monacoInstance => {
    monacoInstance.languages.register({ id: "lljsasm" });
    monacoInstance.languages.setMonarchTokensProvider("lljsasm", lljsasmDefs);
  })
  .catch(console.log);

export default { foo: "bar" };
