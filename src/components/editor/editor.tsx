import React from "react";

import Editor from "@monaco-editor/react";
import Example from "./exampleCode";
import initLanguageConfig from "./monacoConfig";

initLanguageConfig();

export const EditorComponent = () => {
  return <Editor theme="lljsasm" language="lljsasm" value={Example} />;
};
