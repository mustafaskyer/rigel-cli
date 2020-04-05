import { append, appendToFile, findPath } from "../../helper/helper";
import * as changeCase from 'change-case';
import {lowerCaseFirst} from 'lower-case-first';
const Handlebars = require('handlebars')
import ora from 'ora';

import formatFile from "../format";

const reducer = `
/**
 * created {{name}}Reducer at {{date}}
 */
import produce from 'immer';
import {{types}} from 'redux-types';

const INITIAL_STATE = {
    /** initial state */
};

export default (state = INITIAL_STATE, { type, payload }) => {
  return produce(state, draft => {
    switch (type) {
      case {{type1}}:
        draft = payload;
        return draft
      case {{type2}}:
        draft.success = payload;
        return draft
      case {{type3}}:
        draft.error = payload;
        return draft
    }
  });
};
`;

export default async function addReducer(n, types='{SUCCESS,FAILED}', type1='PING', type2='SUCCESS', type3='FAILED'){
    const name = lowerCaseFirst(changeCase.camelCase(n));
    const spin = ora()
    spin.start(`generating new Reducer ${name}.reducer`);
    const template = Handlebars.compile(reducer);
    const res = await findPath('App/redux/reducers');
    const reducerIndexPath = `${res.path}/index.js`
	if (res.status) {
        await append(`${res.path}/${name}.reducer.js`, template({ name, date: new Date(), types, type1, type2, type3 }));
        await appendToFile(
            reducerIndexPath,
            [ `'redux';`, ';' ],
            `import ${name} from './${name}.reducer'`
        )
        await appendToFile(
            reducerIndexPath,
            [ `combineReducers({`,],
            `${name},`
        )
        spin.succeed(`created App/redux/reducers/${name}.reducer`)
        spin.succeed(`imported ${name} into App/redux/reducers/index`)
        spin.info(`connect component with new reducer name '${name}' eg: mapStateToProps = state => { ${name}: state.${name} }`)
    }
    formatFile(reducerIndexPath)
    formatFile(`${res.path}/${name}.reducer.js`)

}
