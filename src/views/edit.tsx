import { Button, makeStyles } from "@material-ui/core";
import React, { useRef } from "react";
import { EditorComponent } from "../components/editor/editor";
import EditorSidebar from "../components/edit/editorSidebar";
import { EditorContextProvider } from "../utils/editorContext";
import EditorTabs from "../components/edit/editorTabs";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    display: "grid",
    gridTemplateColumns: "15em 7fr",
    gridTemplateRows: "5em 7fr",
    overflow: "hidden",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Edit = () => {
  const classes = useStyles();
  const valueGetter = useRef("");
  return (
    <EditorContextProvider>
      <div className={classes.container}>
        <div className={classes.buttonContainer}>
          <Button variant="contained" color="primary" size="large">
            Assemble
          </Button>
        </div>
        <div>
          <EditorTabs />
        </div>
        <div>
          <EditorSidebar />
        </div>
        <div>
          <EditorComponent valueGetter={valueGetter} initialValue={""} />
        </div>
      </div>
    </EditorContextProvider>
  );
};

export default Edit;
