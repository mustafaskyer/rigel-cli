import { findPath, checkIfExist, getLsAnswers, gDir, gFile, appendToFile } from '../../utils/index';
import { componentTypeScript, compRnSource } from './templates/component.temp';
const { compile } = require('handlebars');
const ora = require('ora');
const shell = require('shelljs');
const PrettyError = require('pretty-error');

const pe = new PrettyError();

import { stylesRnSources, stylesTypeScript } from './templates/styles.temp';

export const addScreen = async (
  name: string,
  options:
    | {
        imc?: string;
        imac?: string;
      }
    | any,
) => {
  const spin = ora();
  const opts: any = {};
  if (options.imc) {
    const answers = await getLsAnswers({
      path: 'App/components',
      name,
      type: 'component',
    });
    opts.imc = answers;
    // opts.imc.push('Spacer');
    // opts.imc.push('Row');
  }

  if (options.imac) {
    opts.imac = true;
  }

  // all new options should handle from here
  const { status, path, typescript, mobile, web } = findPath('screens');
  if (!status) {
    console.log(pe.render(`something unexpected happened!!`));
    process.exit();
  }
  const checkStatus = await checkIfExist(path, name, 'screen', typescript);
  if (checkStatus) {
    console.log(pe.render(`${name} already exist, can't add ${name} directory!!`));
    process.exit();
  }

  const sContent = compile(typescript ? componentTypeScript : compRnSource);
  const sStyles = compile(typescript ? stylesTypeScript : stylesRnSources);
  const _content = sContent({ name, date: new Date() });
  const _contentStyle = sStyles({ name, date: new Date() });
  const dirCreated = await gDir(path, name);

  const extReact = typescript ? 'tsx' : 'js';
  const ext = typescript ? 'ts' : 'js';

  if (!dirCreated) {
    console.log(pe.render(`${name} already exist, can't add ${name} directory!!`));
    process.exit();
  }

  gFile({ path: `${path}/${name}`, name, type: 'screen', content: _content, ext: extReact });
  gFile({
    path: `${path}/${name}`,
    name,
    type: 'styles',
    content: _contentStyle,
    ext: ext,
  });

  // should check opts and add imc, imac answers if exists :-
  if (opts.imc) {
    const o = opts.imc.join(', ');
    appendToFile(`${path}/${name}/${name}.screen.${extReact}`, [';'], `import { ${o} } from 'components'`);
  } else {
    appendToFile(`${path}/${name}/${name}.screen.${extReact}`, [';'], `import { Spacer, Row } from 'components'`);
  }

  if (opts.imac) {
    appendToFile(`${path}/${name}/${name}.screen.${extReact}`, [';'], `import {} from 'actions'`);
  }

  spin.succeed(` - successfully added ${name} @ App/components/${name}.component`);
  spin.info(` - usage: import { ${name} } from 'components'; `);

  shell.exec(
    `code App/screens/${name}/${name}.screen.${extReact}`,
    (code: string | number, _stdout: any, _stderr: any) => {
      if (code === 0) {
        spin.info('file opened at vscode ✅');
      }
    },
  );
};
