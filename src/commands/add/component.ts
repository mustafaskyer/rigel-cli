import { findPath, checkIfExist, gFile, gDir } from '../../utils/index';
const { compile } = require('handlebars');
const jetpack = require('fs-jetpack');
import ora from 'ora';
const shell = require('shelljs');
const PrettyError = require('pretty-error');

import { componentTypeScript, compRnSource } from './templates/component.temp';
import { stylesRnSources, stylesTypeScript } from './templates/styles.temp';

const pe = new PrettyError();

export const addComponent = async (name: string) => {
  const spin = ora();
  const { status, path, typescript, mobile, web } = findPath('components');
  if (!status) {
    console.log(pe.render(`something unexpected happened!!`));
    process.exit();
  }

  const createdDir = await gDir(path, name);

  if (!createdDir) {
    console.log(pe.render(`${name} already exist, can't add ${name} directory!!`));
    process.exit();
  }

  const checkStatus = await checkIfExist(`${path}/${name}`, name, 'component', typescript);
  if (checkStatus) {
    console.log(pe.render(`file ${name} already exist, can't add ${name}.component!!`));
    process.exit();
  }

  const sContent = compile(typescript ? componentTypeScript : compRnSource);
  const sStyles = compile(typescript ? stylesTypeScript : stylesRnSources);
  const cContent = sContent({ name, date: new Date() });
  const cStyle = sStyles({ name, date: new Date() });

  const extReact = typescript ? 'tsx' : 'js';
  const ext = typescript ? 'ts' : 'js';

  gFile({ path: `${path}/${name}`, name, type: 'component', content: cContent, ext: extReact });
  gFile({ path: `${path}/${name}`, name, type: 'styles', content: cStyle, ext: ext });
  jetpack.append(`${path}/index.${ext}`, `export * from './${name}/${name}.component';\n`);
  shell.exec(
    `code ${path}/${name}/${name}.component.${extReact}`,
    (code: string | number, _stdout: any, _stderr: any) => {
      if (code === 0) {
        spin.info('file opened at vscode ✅');
      }
    },
  );
  spin.succeed(` - successfully added ${name} @ App/components/${name}/${name}.component`);
  spin.info(` - usage: import { ${name} } from 'components'; `);
};
