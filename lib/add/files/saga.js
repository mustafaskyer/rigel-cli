import { append, appendToFile, findPath } from "../../helper/helper";
import * as changeCase from 'change-case';
import {lowerCaseFirst} from 'lower-case-first';
const Handlebars = require('handlebars')
import ora from 'ora';
import formatFile from "../format";

const saga = `
/** 
 * created {{name}} saga at {{date}}
*/
import {{types}} from 'redux-types';
import { takeLatest, put } from 'redux-saga/effects';

import api from 'api';

// API funcs

function* post(url,payload) {
  return yield api.post(url, payload)
}

function* get(url){
    return yield api.get(url)
}

function* watch{{name}}({payload}) {
  try {
    const res = yield get('/');
    yield put({type: {{type1}}, payload: res});
  } catch (err) {
    yield put({type: {{type2}}, payload: err});
  }
}

export default function* watch() {
  yield takeLatest(
    {{type1}}, 
    watch{{name}}
  );
}
`

export default async function addSaga(n,types='{ SUCCESS, FAILED }', type1='SUCCESS', type2='FAILED'){
    const name = lowerCaseFirst(changeCase.camelCase(n));
    const spin = ora()
    spin.start(`generating new Redux Saga ${name}.saga`);
    const template = Handlebars.compile(saga);

    const res = await findPath('App/redux/sagas');
    const sagasIndexPath = `${res.path}/index.js`
	if (res.status) {
        await append(`${res.path}/${name}.saga.js`, template({ name, date: new Date(), types, type1, type2 }));
        await appendToFile(
            sagasIndexPath,
            [ ';' ],
            `import ${name} from './${name}.saga'`
        )
        await appendToFile(
            sagasIndexPath,
            [ 'yield all([' ],
            `fork(${name}),`
        )
        spin.succeed(`created App/redux/sagas/${name}.saga`)
        spin.succeed(`imported ${name} into App/redux/sagas/index`)
    }
    formatFile(sagasIndexPath)
    formatFile(`${res.path}/${name}.saga.js`)
}