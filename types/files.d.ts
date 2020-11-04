export interface IFilesystemComponent {
  name: string;
  isDirectory: boolean;
  isFile: boolean;
}

export interface IDirectory extends IFilesystemComponent {
  isDirectory: true;
  isFile: false;
  isOpen: boolean;
  contents: DirorFile[];
}

export interface IFile extends IFilesystemComponent {
  isDirectory: false;
  isFile: true;
}

export type DirorFile = IFile | IDirectory;
