import { findPath, gFile, appendToFile, formatFile } from '../../utils/index';
const { compile } = require('handlebars');

import { selectorRnSource } from './templates/selector.temp';

exports.addSelector = async (name: string, path: string) => {
  const sourcetemplate = compile(selectorRnSource);
  const content = sourcetemplate({ name, date: new Date() });
  gFile({ path: `${path}`, name, type: 'selector', content });
  const { path: selectorsIndexPath } = findPath(`states/index.selectors.js`);
  await appendToFile(selectorsIndexPath, [';', ''], `export { ${name} } from './${name}/${name}.selector'`);
  await formatFile(selectorsIndexPath);
};
