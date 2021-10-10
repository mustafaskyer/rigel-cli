import { findPath, gFile, appendToFile, formatFile } from '../../utils/index';
const { compile } = require('handlebars');

import { typesRnSource } from './templates/types.temp';

exports.addTypes = async (name: string, types: number[], path: string) => {
  const sourcetemplate = compile(typesRnSource);
  const content = sourcetemplate({
    name: name.toUpperCase(),
    date: new Date(),
  });
  gFile({ path: `${path}`, name, type: 'types', content });
  const { path: typesIndexPath } = findPath(`states/index.types.js`);
  await appendToFile(
    typesIndexPath,
    [';', ''],
    `export { ${types[0]}, ${types[1]}, ${types[2]} } from './${name}/${name}.types'`,
  );
  await formatFile(typesIndexPath);
};
