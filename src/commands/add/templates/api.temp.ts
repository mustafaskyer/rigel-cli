export const apiTempJs: string = `
/** 
 * created {{name}} at {{date}}
*/

import { api } from '@apis'

export {{function}} {{name}}(reqBody) {
    const url = '{{url}}'
    const res = {{method}}
    return res
}
`;
export const apiTempTs: string = `
/** 
 * created {{name}} at {{date}}
*/

import {handleResponse} from "./apis.utils";
import api from "./index";

interface I{{interface}} {}
export const {{name}}Api = async (payload: I{{interface}}) => {
    const res = await api.{{method}}('{{url}}', payload);
    return handleResponse(res);
}

`;
