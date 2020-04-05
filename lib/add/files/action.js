import { append, appendToFile, findPath } from "../../helper/helper";
import * as changeCase from 'change-case';
import {lowerCaseFirst} from 'lower-case-first';
const Handlebars = require('handlebars')
import ora from 'ora';

import formatFile from "../format";
const action = `
/** 
 * created {{name}} at {{date}}
*/

import {{types}} from 'redux-types';

/**
 * @param {any} payload 
 * @returns { type, payload }
 */

export const {{name}} = (payload) => {
    return {
        type: {{type1}},
        payload
    }
}
`

export default async function addAction(n,types='{ SUCCESS /** add you types */ }', type1='SUCCESS'){
    const name = lowerCaseFirst(changeCase.camelCase(n));
    const spin = ora()
    spin.start(`generating new Redux Action ${name}.action`);
    const template = Handlebars.compile(action);

    const res = await findPath('App/redux/actions');
    const actionsIndexPath = `${res.path}/index.js`
	if (res.status) {
        await append(`${res.path}/${name}.action.js`, template({ name, date: new Date(), types, type1 }));
        await appendToFile(
            actionsIndexPath,
            [ ';' ],
            `export { ${name} } from './${name}.action'`
        )
        spin.succeed(`created App/redux/actions/${name}.action`)
        spin.succeed(`exported ${name} from App/redux/actions/${name}.action`)
        spin.info(`connect component with new action '${name}' eg: connect(mapStateToProps, {${name}})`)
    }
    formatFile(actionsIndexPath)
    formatFile(`${res.path}/${name}.action.js`)
}