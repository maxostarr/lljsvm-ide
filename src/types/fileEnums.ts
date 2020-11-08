import { DirOrFile } from "./files";

export enum ActionTypes {
  OPEN_DIRECTORY = "OPEN_DIRECTORY",
  CLOSE_DIRECTORY = "CLOSE_DIRECTORY",
  NEW_ROOT = "NEW_ROOT",
}

export interface Action {
  type: ActionTypes;
  payload: DirOrFile | string;
}
