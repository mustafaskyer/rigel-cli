import { findPath, gFile, appendToFile, formatFile } from '../../utils/index';
const { compile } = require('handlebars');
const PrettyError = require('pretty-error');

import { reducerRnSource } from './templates/reducer.temp';

exports.addReducer = async (name: string, types: number[], path: string) => {
  const sourcetemplate = compile(reducerRnSource);
  const content = sourcetemplate({
    name,
    date: new Date(),
    type1: types[0],
    type2: types[1],
    type3: types[2],
  });
  gFile({ path: `${path}`, name, type: 'reducer', content });
  const { path: reducerIndexPath } = findPath(`states/index.reducers.js`);
  await appendToFile(reducerIndexPath, ['combineReducers({'], `${String(name).toLowerCase()},`);
  await appendToFile(reducerIndexPath, [';'], `import ${String(name).toLowerCase()} from './${name}/${name}.reducer'`);
  await formatFile(reducerIndexPath);
};
