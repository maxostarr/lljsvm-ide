import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import EditorSidebar from "../components/edit/editorSidebar";

import { EditorContextProvider } from "../utils/editorContext";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    display: "grid",
    gridTemplateColumns: "15em 7fr",
    gridTemplateRows: "5em 7fr",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Edit = () => {
  const classes = useStyles();
  return (
    <EditorContextProvider>
      <div className={classes.container}>
        <div className={classes.buttonContainer}>
          <Button variant="contained" color="primary" size="large">
            Assemble
          </Button>
        </div>
        <div>b</div>
        <div>
          <EditorSidebar />
        </div>
        <div>d</div>
      </div>
    </EditorContextProvider>
  );
};

export default Edit;
