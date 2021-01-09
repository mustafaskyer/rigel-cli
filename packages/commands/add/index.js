const { warning, error } = require('@rigel/logger');


const { addComponent } = require('./component');
const { addScreen } = require('./screen');
const { addRedux } = require('./redux');
const { addApi } = require('./api');

const add = async ({ type, name, options }) => {
	
	const validRegexAppName = new RegExp('^[a-zA-Zа-яА-Я0-9_!]+$');
	if (!name.toString().match(validRegexAppName)) {
		error(`${name} not valid, please choose avalid name`);
		process.exit();
	}

	const types = {
		component: 'add component into App/components',
		screen: 'add screen into App/screens',
		action: 'add action into App/redux/actions',
		reducer: 'add reducer into App/redux/reducers',
		saga: 'add saga into App/redux/sagas',
		selector: 'add selector into App/redux/selectors',
		redux: 'add reducer, action, saga, selector, type',
		api: 'add reducer, action, saga, selector, type',
	};

	if (!types[type]) {
		error(`unknow type '${type}' please select one of these types \n `);
		warning(`${JSON.stringify(types, null, 4)}`);
		process.exit();
	}

	switch (type) {
		case 'component': addComponent(name); break;
		
		case 'screen': addScreen(name, options); break;

		case 'styles': break;

		case 'redux': addRedux(name); break;

		case 'api': addApi(name, options); break;
	}
};

module.exports = add;
