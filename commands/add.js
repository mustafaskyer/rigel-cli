const inquirer = require('inquirer');

// const { handleOptions } = require('../lib/add')
const { handleOptions } = require('../lib/add/index');
const { CONNECT_ALL, REDUX } = require('../lib/types');

const types = [
	{ name: 'screen', value: 'scr' },
	{ name: 'component', value: 'comp' },
	// { name: 'style', value: 'style' },
	{ name: 'reducer', value: 'reducer' },
	{ name: 'reducer action', value: 'reducer_action' },
	{ name: 'reducer types', value: 'reducer_types' },
	{ name: 'reducer sagas', value: 'reducer_sagas' }
];

function validate(answer) {
	if (answer.length < 1) {
		return 'You must choose at least one topping.';
	}

	return true;
}
const viewOptions = (name, options, programm) => {
	if (programm.connect) {
		handleOptions({ selected: CONNECT_ALL }, name, options, programm);
		return;
	}else if(programm.redux){
		handleOptions({ selected: REDUX }, name, options, programm);
		return;
	}
	inquirer
		.prompt([
			{
				type: 'list',
				message: 'Choose File Type',
				name: 'selected',
				choices: types,
				validate
			}
		])
		.then((selected) => {
			handleOptions(selected, name, options, programm);
		});
};

module.exports = { viewOptions };
