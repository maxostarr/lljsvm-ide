import { Tab, Tabs } from "@material-ui/core";
import React, { useContext } from "react";
import { EditorContext } from "../../utils/editorContext";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
const EditorTabs = () => {
  const { openFiles, editorPath, openFile } = useContext(EditorContext);
  const openFileTabs = openFiles.map(({ path, modified }) => {
    return (
      <Tab
        value={path}
        label={path.replace(/^.*[\\/]/, "") + (modified ? " ●" : "")}
        key={path}
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
