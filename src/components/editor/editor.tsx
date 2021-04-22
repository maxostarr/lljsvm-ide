import React, { useContext } from "react";

import Editor from "@monaco-editor/react";
// import Example from "./exampleCode";
import initLanguageConfig from "./monacoConfig";
import { makeStyles } from "@material-ui/core";
import { EditorContext } from "../../utils/editorContext";

initLanguageConfig();

// const useStyles = makeStyles((theme) => ({
//   wrapper: {
//     height: "20px",
//   },
//   editor: {
//     height: "50%",
//   },
// }));

interface PropTypes {
  valueGetter: React.MutableRefObject<any>;
  initialValue: string;
}

export const EditorComponent = ({ valueGetter, initialValue }: PropTypes) => {
  // const classes = useStyles();
  const { editorInitialContent } = useContext(EditorContext);

  function handleEditorDidMount(_valueGetter: any) {
    valueGetter.current = _valueGetter;
  }
  return (
    <Editor
      theme="lljsasm"
      language="lljsasm"
      // value={editorInitialContent}
      editorDidMount={handleEditorDidMount}

      // wrapperClassName={classes.wrapper}
      // className={classes.editor}
    />
  );
};
