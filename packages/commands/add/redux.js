const { findPath, checkIfExist, gFile, prompt } = require('@rigel/utils');
const { compile } = require('handlebars');
const jetpack = require('fs-jetpack');
const ora = require('ora');
const _ = require('lodash');
const shell = require('shelljs');
const PrettyError = require('pretty-error');

const { compRnSource } = require('./templates/component.temp');
const { reducerRnSource } = require('./templates/reducer.temp');

const pe = new PrettyError();

const { addReducer } = require('./reducer')
const { addAction } = require('./action')
const { addSelector } = require('./selector')
const { addSaga } = require('./saga')
const { addTypes } = require('./types')

exports.addRedux = async (name) => {
    
	const answers = await prompt({
		options: [ 'reducer', 'action', 'saga', 'selector', 'types', 'all' ],
		message: `select what would you like to add into ${name}`,
		name
	});

    const { status, path, message } = findPath(`redux/${name}`);
	const types = [
		String(name).toUpperCase(),
		String(name + '_success').toUpperCase(),
		String(name + '_failed').toUpperCase()
    ];
    
    _.map(answers, async (option) => {
        if (option === 'reducer' || option === 'all') {
            addReducer(name, types, path)
        }

        if (option === 'action' || option === 'all') {
            addAction(name, types, path)
        }
        
        if (option === 'selector' || option === 'all') {
            addSelector(name, path)
        }

        if (option === 'saga' || option === 'all') {
            addSaga(name, types, path)
        }

        if (option === 'types' || option === 'all') {
            addTypes(name, types, path)
        }
    })
};
