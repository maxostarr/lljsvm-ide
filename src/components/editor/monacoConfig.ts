import { monaco } from "@monaco-editor/react";
import { lljsasmDefs } from "./monarchDef";
import { theme } from "./lljsasmTheme";
import { completionProvidor } from "./lljsasmCompletions";

export default () => {
  monaco
    .init()
    .then((monacoInstance) => {
      monacoInstance.languages.register({ id: "lljsasm" });
      monacoInstance.languages.setMonarchTokensProvider("lljsasm", lljsasmDefs);
      monacoInstance.editor.defineTheme("lljsasm", theme);
      monacoInstance.languages.registerCompletionItemProvider(
        "lljsasm",
        completionProvidor,
      );
    })
    .catch(console.log);
};
