import { SCREEN, COMPONENT, STYLE, REDUCER, REDUCER_ACTION, REDUCER_TYPES, REDUCER_SAGA, CONNECT_ALL, REDUX } from '../types';

import addComponent from './files/component';
import list from './list';
import addScreen from './files/screen';
import addReducer from './files/reducer';
import addAction from './files/action';
import addSaga from './files/saga';
import addTypes from './files/types';
import connectAll from './files/connect-redux';
import createReduxFiles from './files/create-redux-files';

function handleSelectedOption(path, name, { components, screens, actions, exprt, redux_case }) {
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
			addReducer(name, redux_case)
			break;
		}
		case REDUCER_ACTION: {
			addAction(name, redux_case)
			break;
		}
		case REDUCER_SAGA: {
			addSaga(name, redux_case)
			break;
		}
		case REDUCER_TYPES:{
			addTypes(name, redux_case)
			break;
		}
		case CONNECT_ALL: {
			connectAll(name,{ components, redux_case })
			break
		}
		case REDUX: {
			createReduxFiles(name,{ redux_case })
			break
		}
	}
}

const handleOptions = async(res, name, options, programm) => {
    let components;
    let screens;
    let actions;
	let exprt;
	let redux_case;
	let redux;

	if (options.length) {
		if (programm.imc) {
            components = await list(name, 'App/components');
		}
		if (programm.imct) {
			console.log('handle actions');
			actions = await list(name, 'App/redux/actions');
		}
		if (programm.export) {
			exprt = true
		}
		if(programm.case){
			redux_case = programm.case
		}
		if(programm.redux){
			redux = programm.redux
		}
    }
	handleSelectedOption(res.selected, name, { components, screens, actions, exprt, redux_case, redux  });
};

module.exports = { handleOptions };
