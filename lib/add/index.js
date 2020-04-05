import { SCREEN, COMPONENT, STYLE, REDUCER, REDUCER_ACTION, REDUCER_TYPES, REDUCER_SAGA, CONNECT_ALL } from '../types';

import addComponent from './files/component';
import list from './list';
import addScreen from './files/screen';
import addReducer from './files/reducer';
import addAction from './files/action';
import addSaga from './files/saga';
import addTypes from './files/types';
import connectAll from './files/connect-redux';

function handleSelectedOption(path, name, { components, screens, actions, exprt }) {
	switch (path) {
		case COMPONENT: {
			if (name.includes(',')) {
				return name.split(',').map((name) => addComponent(name,{components}));
			}
			addComponent(name, {components});
			break;
		}
		case SCREEN: {
            if (name.includes(',')) {
				return name.split(',').map((name) => addScreen(name,{components, actions, exprt}));
			}
            addScreen(name, {components, actions, exprt})
			break;
		}
		case REDUCER: {
			addReducer(name)
			break;
		}
		case REDUCER_ACTION: {
			addAction(name)
			break;
		}
		case REDUCER_SAGA: {
			addSaga(name)
			break;
		}
		case REDUCER_TYPES:{
			addTypes(name)
			break;
		}
		case CONNECT_ALL: {
			connectAll(name,{ components })
			break
		}
	}
}

const handleOptions = async(res, name, options) => {
    let components;
    let screens;
    let actions;
	let exprt;

	if (options.length) {
		if (options.includes(`--imc`)) {
            components = await list(name, 'App/components');
		}
		if (options.includes('--imcr')) {
			console.log('handle imscr');
		}
		if (options.includes('--imct')) {
			console.log('handle actions');
			actions = await list(name, 'App/redux/actions');
		}
		if (options.includes('--export')) {
			exprt = true
		}
    }
	handleSelectedOption(res.selected, name, { components, screens, actions, exprt  });
};

module.exports = { handleOptions };
