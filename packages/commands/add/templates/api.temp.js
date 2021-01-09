exports.apiRnSource = `
/** 
 * created {{name}} at {{date}}
*/

import { api } from '@apis'

export {{function}} {{name}}(reqBody) {
    const url = '{{url}}'
    const res = {{method}}
    // console.log('@res', res)
    return res
}
`