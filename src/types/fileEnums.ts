import { DirOrFile } from "./files";

export enum ActionTypes {
  OPEN_DIRECTORY = "OPEN_DIRECTORY",
  CLOSE_DIRECTORY = "CLOSE_DIRECTORY",
  OPEN_FILE = "OPEN_FILE",
  NEW_ROOT = "NEW_ROOT",
  NEW_FILE = "NEW_FILE",
  NEW_DIRECTORY = "NEW_DIRECTORY",
}

export interface Action {
  type: ActionTypes;
  payload: DirOrFile | string;
}
