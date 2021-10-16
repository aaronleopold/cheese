import os from 'os';
import path from 'path';

export default interface MediaStorage {
  videoDirectory: string;
  pictureDirectory: string;

  setVideoDirectory(dir: string): void;
  setPictureDirectory(dir: string): void;
}

export const defaultMediaStorage = {
  videoDirectory: path.resolve(os.homedir(), 'Videos'),
  pictureDirectory: path.resolve(os.homedir(), 'Pictures'),
};
