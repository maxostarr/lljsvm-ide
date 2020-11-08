export interface IFilesystemComponent {
  name: string;
  path: string;
  isDirectory: boolean;
  isFile: boolean;
}

export interface IDirectory extends IFilesystemComponent {
  isDirectory: true;
  isFile: false;
  isOpen: boolean;
  contents: DirOrFile[];
}

export interface IFile extends IFilesystemComponent {
  isDirectory: false;
  isFile: true;
}

export type DirOrFile = IFile | IDirectory;
