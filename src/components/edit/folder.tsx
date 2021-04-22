import { Input, makeStyles, TextField } from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import InputBase from "@material-ui/core/InputBase";
import React, { useContext, useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { DirOrFile, IDirectory, IFile } from "../../types/files";
import { EditorContext } from "../../utils/editorContext";
import File from "./file";

const useStyles = makeStyles((theme) => ({
  nameContainer: {
    display: "flex",
    cursor: "pointer",
    alignItems: "center",
  },
  name: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  files: {
    paddingLeft: "1em",
    borderLeftWidth: "1px",
    borderLeftStyle: "solid",
    borderLeftColor: theme.palette.grey[500],
  },
  input: {
    backgroundColor: theme.palette.grey[900],
  },
}));

const initialState = {
  x: null,
  y: null,
};

interface PropTypes {
  name: string;
  path: string;
  contents: DirOrFile[];
  isOpen: boolean;
  className: string;
}

type MousePosition = {
  x: number | null;
  y: number | null;
};

const Folder = ({ name, path, contents, isOpen, className }: PropTypes) => {
  const {
    openDirectory,
    closeDirectory,
    createNewDirectory,
    createNewFile,
  } = useContext(EditorContext);
  const [mousePos, setMousePos] = useState(initialState as MousePosition);
  const [newItem, setNewItem] = useState("");
  const classes = useStyles();

  const makeFile = (file: IFile, i: number) => (
    <File
      className={className}
      name={file.name}
      path={file.path}
      key={`${i}${file.name}`}
    />
  );

  const newItemInput = (newItem: string) => {
    if (newItem !== "")
      return (
        <Input
          className={classes.input}
          name="new item"
          defaultValue=""
          autoFocus
          disableUnderline={true}
          inputProps={{ autoFocus: true }}
        />
      );
  };

  const makeFolder = (folder: IDirectory, i: number) => (
    <Folder
      key={`${i}${folder.name}`}
      className={className}
      name={folder.name}
      path={folder.path}
      isOpen={folder.isOpen}
      contents={folder.contents}
    />
  );

  const filesAndFolders = contents
    ?.sort((a, _) => (a.isDirectory ? -1 : 1))
    .map((item, i) => {
      if (item.isDirectory) {
        return makeFolder(item, i);
      } else {
        return makeFile(item, i);
      }
    });

  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setMousePos({
      x: e.clientX - 2,
      y: e.clientY - 4,
    });
  };

  const newFile = (path: string) => {
    setNewItem("file");
  };
  const newFolder = (path: string) => {
    setNewItem("folder");
  };

  const handleClose = (then: (...args: any[]) => any, ...args: any[]) => (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setMousePos(initialState as MousePosition);
    then(...args);
  };

  return (
    <div className={`${className}`}>
      <div
        className={classes.nameContainer}
        onClick={(e) => {
          e.preventDefault();
          if (!isOpen) {
            openDirectory(path);
          } else {
            closeDirectory(path);
          }
        }}
        onContextMenu={handleContextMenu}
      >
        {isOpen ? <FolderOpenIcon /> : <FolderIcon />}
        <div className={classes.name}>{name}</div>
        <Menu
          keepMounted
          open={mousePos.y !== null}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={
            mousePos.y !== null && mousePos.x !== null
              ? { top: mousePos.y, left: mousePos.x }
              : undefined
          }
        >
          <MenuItem onClick={handleClose(newFolder, path)}>New Folder</MenuItem>
          <MenuItem onClick={handleClose(newFile, path)}>New File</MenuItem>
        </Menu>
      </div>
      <div className={classes.files}>
        {isOpen && (
          <div>
            {filesAndFolders}
            {newItemInput(newItem)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Folder;
