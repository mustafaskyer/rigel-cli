// file
// dir
import jetpack from 'fs-jetpack';
const { warning } = require('../logger/index');
const PrettyError = require('pretty-error');

const pe = new PrettyError();

export const gFile = ({
  path,
  name,
  type,
  content,
  ext = 'js',
}: {
  path: string;
  name: string;
  type: string;
  content: string;
  ext?: string;
}) => {
  console.log('@ext-from-gFile => ', ext);
  const pathExist = jetpack.exists(`${path}/${name}.${type}.${ext}`);
  if (pathExist) {
    warning(`file name exist, can't create file with ${name}.${type}`);
    process.exit();
  }

  try {
    jetpack.file(`${path}/${name}.${type}.${ext}`, { content });
    return true;
  } catch (e) {
    console.log(pe.render(e));
  }
};

export const gDir = (path: string, name: string) => {
  const pathExist = jetpack.exists(`${path}/${name}`);
  if (pathExist) {
    warning(`directory exist, can't create directory with ${name}`);
    process.exit();
  }

  try {
    jetpack.dir(`${path}/${name}`);
    return true;
  } catch (e) {
    console.log(pe.render(e));
  }
};
