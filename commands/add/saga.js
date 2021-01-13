const { findPath, checkIfExist, gFile, appendToFile, formatFile } = require('@mustafaskyer/rigel-utils');
const { compile } = require('handlebars');

const { sagaRnSource } = require('./templates/saga.temp');

exports.addSaga = async (name, types, path) => {
	const sourcetemplate = compile(sagaRnSource);
	const content = sourcetemplate({
		name,
		date: new Date(),
		type1: types[0],
		type2: types[1],
		type3: types[2]
	});
	gFile({ path: `${path}`, name, type: 'saga', content });
	const { path: sagasIndexPath } = findPath(`states/index.sagas.js`);
	await appendToFile(sagasIndexPath, [ 'yield all([' ], `fork(${name}),`);
	await appendToFile(sagasIndexPath, [ ';', '' ], `import ${name} from './${name}/${name}.saga'`);
	await formatFile(sagasIndexPath);
};
