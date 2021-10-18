import glob from 'glob';
import { VideoFormat } from '../../store';
const fs = window.require('fs');
const remote = window.require('electron').remote;

type FilePickerConfig = {
  name: string;
  extensions: string[];
  dir?: boolean;
};

export default function pickFile({ name, extensions, dir }: FilePickerConfig) {
  let options: any = dir
    ? { properties: ['openDirectory'] }
    : { filters: [{ name, extensions }] };

  const result = remote.dialog.showOpenDialog(
    remote.getCurrentWindow(),
    options
  );

  return result.then(({ canceled, filePaths }: any) => {
    if (!canceled && filePaths.length > 0) {
      // const base64 = fs.readFileSync(filePaths[0]).toString('base64');
      // return base64;
      return filePaths[0];
    } else {
      return null;
    }
  });
}

export async function readImage(filePath: string) {
  return fs.readFileSync(filePath, { encoding: 'utf8' });
}

export async function getDirectoryFiles(dir: string) {
  return glob
    .sync(`${dir}/*.jpg`, { nocase: true, absolute: true })
    .map((file) => file);
}

function convertWebmToMp4(chunks: any) {
  return chunks;
}

export function converWebmToFormat(
  format: Omit<VideoFormat, 'video/webm'>,
  chunks: any
) {
  switch (format) {
    case 'video/mp4': {
      return convertWebmToMp4(chunks);
    }

    default:
      throw new Error(`I can't convert webm to ${format} yet!`);
  }
}
