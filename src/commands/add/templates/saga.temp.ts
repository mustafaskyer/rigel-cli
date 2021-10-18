export const sagaRnSource: string = `
/** 
 * created {{name}} saga at {{date}}
*/
import { {{type1}}, {{type2}}, {{type3}} } from './{{name}}.types';
import { takeLatest, put } from 'redux-saga/effects';

import api from 'api';

function* watch{{name}}({payload}) {
  try {
    // const res = yield api.get('/');
    // yield put({type: {{type2}}, payload: res});
  } catch (err) {
    yield put({type: {{type3}}, payload: err});
  }
}

export default function* watch() {
  yield takeLatest(
    {{type1}}, 
    watch{{name}}
  );
}
`;
