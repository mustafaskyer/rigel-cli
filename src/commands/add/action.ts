import { findPath, gFile, appendToFile, formatFile } from '../../utils/index';
const { compile } = require('handlebars');

const { actionRnSource } = require('./templates/action.temp');

export const addAction = async (name: string, types: any, path: string) => {
  const sourcetemplate = compile(actionRnSource);
  const content = sourcetemplate({ name, date: new Date(), type: types[0] });
  gFile({ path: `${path}`, name, type: 'action', content });
  const { path: actionsIndexPath } = findPath(`states/index.actions.js`);
  await appendToFile(actionsIndexPath, [';', ''], `export { ${name} } from './${name}/${name}.action'`);
  await formatFile(actionsIndexPath);
};
