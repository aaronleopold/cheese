import glob from 'glob';
// import fs from 'fs';
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
  return await fs.readFileSync(filePath, { encoding: 'utf8' });
}

export async function readIas(filePath: string) {
  return await fs.readFileSync(filePath, { encoding: 'utf8' });
}

export async function getDirectoryFiles(dir: string) {
  return await glob
    .sync(`${dir}/*.jpg`, { nocase: true, absolute: true })
    .map((file) => file);
}
