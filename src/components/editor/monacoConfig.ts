import { monaco } from "@monaco-editor/react";
import { lljsasmDefs } from "./monarchDef";
import { theme } from "./lljsasmTheme";
export default () => {
  monaco
    .init()
    .then(monacoInstance => {
      monacoInstance.languages.register({ id: "lljsasm" });
      monacoInstance.languages.setMonarchTokensProvider("lljsasm", lljsasmDefs);
      monacoInstance.editor.defineTheme("lljsasm", theme);
    })
    .catch(console.log);
};

// export default { foo: "bar" };
