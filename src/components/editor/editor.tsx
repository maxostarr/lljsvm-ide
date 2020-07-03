import React from "react";

import Editor from "@monaco-editor/react";
import Example from "./exampleCode";
import initLanguageConfig from "./monacoConfig";

initLanguageConfig();

interface PropTypes {
  valueGetter: React.MutableRefObject<any>;
}

export const EditorComponent = ({ valueGetter }: PropTypes) => {
  function handleEditorDidMount(_valueGetter: any) {
    valueGetter.current = _valueGetter;
  }
  return (
    <Editor
      theme="lljsasm"
      language="lljsasm"
      value={Example}
      editorDidMount={handleEditorDidMount}
    />
  );
};
