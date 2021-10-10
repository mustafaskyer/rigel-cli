const { findPath, checkIfExist, gFile } = require('../../utils/index');
const { compile } = require('handlebars');
const jetpack = require('fs-jetpack');
import ora from 'ora';
const shell = require('shelljs');
const PrettyError = require('pretty-error');

import { compRnSource } from './templates/component.temp';

const pe = new PrettyError();

export const addComponent = async (name: string) => {
  const spin = ora();
  const { status, path } = findPath('components');
  if (!status) {
    console.log(pe.render(`something unexpected happened!!`));
    process.exit();
  }

  const checkStatus = await checkIfExist(path, name, 'component');
  if (checkStatus) {
    console.log(pe.render(`file ${name} already exist, can't add ${name}.component!!`));
    process.exit();
  }

  const sourcetemplate = compile(compRnSource);
  const _content = sourcetemplate({ name, date: new Date() });
  gFile({ path, name, type: 'component', content: _content });
  jetpack.append(`${path}/index.components.js`, `export { ${name} } from './${name}.component';\n`);
  shell.exec(`code App/components/${name}.component.js`, (code: string | number, _stdout: any, _stderr: any) => {
    if (code === 0) {
      spin.info('file opened at vscode ✅');
    }
  });
  spin.succeed(` - successfully added ${name} @ App/components/${name}.component`);
  spin.info(` - usage: import { ${name} } from '@components'; `);
};
