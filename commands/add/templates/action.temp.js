exports.actionRnSource = `
/** 
 * created {{name}} at {{date}}
*/

import { {{type}} } from './{{name}}.types';

/**
 * @param {any} payload 
 * @returns { type, payload }
 */

export const {{name}} = (payload) => {
    return {
        type: {{type}},
        payload
    }
}
`