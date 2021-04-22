import { Tab, Tabs } from "@material-ui/core";
import React, { useContext } from "react";
import { EditorContext } from "../../utils/editorContext";

const EditorTabs = () => {
  const { openFiles, editorPath, openFile } = useContext(EditorContext);
  const openFileTabs = openFiles.map((filename) => {
    return (
      <Tab
        value={filename}
        label={filename.replace(/^.*[\\/]/, "")}
        key={filename}
      />
    );
  });
  return (
    <div>
      <Tabs value={editorPath} onChange={(_, path) => openFile(path)}>
        {openFileTabs}
      </Tabs>
    </div>
  );
};

export default EditorTabs;
