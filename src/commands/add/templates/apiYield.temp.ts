export const ApiYeld: string = `
import { api } from '@apis'

export default function* apiCall(reqBody) {
    const res = yield api.get(url, {...reqBody});
    // console.log('@res', res)
    return res;
}
`;
