import { findPath, checkIfExist, gFile, gDir } from '../../utils/index';
const { compile } = require('handlebars');
const jetpack = require('fs-jetpack');
import ora from 'ora';
const shell = require('shelljs');
const PrettyError = require('pretty-error');

import { sliceTempTs, sliceTempJs } from './templates/slict.temp';

const pe = new PrettyError();

export const addSlice = async (name: string) => {
  const spin = ora();
  const { status, path, typescript, mobile, web } = findPath('states');
  if (!status) {
    console.log(pe.render(`something unexpected happened!!`));
    process.exit();
  }

  const createdDir = await gDir(path, name);

  if (!createdDir) {
    console.log(pe.render(`${name} already exist, can't add ${name} directory!!`));
    process.exit();
  }

  const checkStatus = await checkIfExist(`${path}/${name}`, name, 'slice', typescript);
  if (checkStatus) {
    console.log(pe.render(`file ${name} already exist, can't add ${name}.slice!!`));
    process.exit();
  }

  const sContent = compile(typescript ? sliceTempTs : sliceTempJs);
  const cContent = sContent({ name, date: new Date() });
  const ext = typescript ? 'ts' : 'js';

  gFile({ path: `${path}/${name}`, name, type: 'slice', content: cContent, ext: ext });
  jetpack.append(`${path}/index.${ext}`, `export * from './${name}/${name}.slice';\n`);
  shell.exec(`code ${path}/${name}/${name}.slice.${ext}`, (code: string | number, _stdout: any, _stderr: any) => {
    if (code === 0) {
      spin.info('file opened at vscode ✅');
    }
  });
  spin.succeed(` - successfully added ${name} @ App/states/${name}/${name}.slice`);
  spin.info(` - usage: import { ${name} } from 'components'; `);
};
