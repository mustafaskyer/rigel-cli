import jetpack from 'fs-jetpack';
import ora from 'ora';
import { findPath, append, appendToFile } from '../../helper/helper';
import handlebars from 'handlebars';
import * as changeCase from 'change-case';
import { upperCaseFirst } from 'upper-case-first';
import formatFile from '../format';

const spin = ora();
const screen = `
/** 
 * created {{name}}Screen at {{date}}
*/

import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

import { connect } from 'react-redux';

import appstyles, { rw, rh, appcolor } from 'styles'
import typography from 'styles/typography'
import { Spacer, Row } from 'components'

import styles from './{{styleName}}.styles';


function {{name}}Screen(props){
    const [state, setState] = useState(null)
    useEffect(() => {

		/** DidMount */

		return () => { /** UnMounted */ }

	},[])
	
    return(
        <View style={appstyles.container}>
            <View style={styles.container}>
                <Text>{'{{name}} Screen'}</Text>
            </View>
        </View>
    )
}


/**
 * @param {any} state 
 * @returns 
 */

const mapProps = state => {
    return {
    }
}

const actions = {

}

export default connect(mapProps, actions)({{name}}Screen)
`;

const style = `
/** 
 * created styles for {{name}} screen at {{date}}
*/

import { StyleSheet } from "react-native";

import appstyles, { rw, rh, appcolor } from 'styles'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
`;

export default async function addScreen(n, { components, actions, exprt }) {
	const screenTemplate = handlebars.compile(screen);
	const styleTemplate = handlebars.compile(style);
	/**
     * create dir under app/screens
     * create file name.screen.js
     * create file styles.js
     */
	const name = upperCaseFirst(changeCase.camelCase(n));
	spin.start(`generating new screen ${name}, ${name}.screen, ${name}.styles`);
	const res = findPath('App/screens');
	if (res.status) {
		await jetpack.dir(`${res.path}/${name}`);
		await append(
			`${res.path}/${name}/${name.toLowerCase()}.screen.js`,
			screenTemplate({ name, styleName: name.toLowerCase(), date: new Date() })
		);
		await append(
			`${res.path}/${name}/${name.toLowerCase()}.styles.js`,
			styleTemplate({ name: name.toLowerCase(), date: new Date() })
		);
		spin.succeed(`successfully created new screen /App/screens/${name}`);

		if (components) {
			spin.start(`importing {${components.join(', ')}} into App/screens/${name}/${name.toLowerCase()}.screen.js`);

			await appendToFile(
				`${res.path}/${name}/${name.toLowerCase()}.screen.js`,
				[ `'styles'`, `.styles';`, `'components'`, `;` ],
				`import { ${components.join(', ')} } from 'components'`
			);
			spin.succeed(
				`successfully imported {${components.join(
					', '
				)}} into App/screens/${name}/${name.toLowerCase()}.screen.js`
			);
		}

		/**
		 * import actions inside screen
		 */
		if (actions) {
			await appendToFile(
				`${res.path}/${name}/${name.toLowerCase()}.screen.js`,
				[ `'react-redux';`, `.styles';`, `'components'`, `;` ],
				`import { ${actions.join(', ')} } from 'redux-actions'`
			);

			await appendToFile(
				`${res.path}/${name}/${name.toLowerCase()}.screen.js`,
				[ `const actions = {` ],
				`${actions.join(',\n ')},`
			);
		}

		if(!exprt){
			spin.info(
				`import ${name}Screen from 'screens/${name}/${name.toLowerCase()}.screen' #if you want to use it as Stack Navigation inside App/navigation/AppNavigation`
			);
		}

		if(exprt){
			const resNavPath = findPath('App/navigation')
			if(resNavPath.status){
				const appNavigationPath = `${resNavPath.path}/AppNavigation.js`
				await appendToFile(
					appNavigationPath,
					[ `'react-navigation';`, `'react-navigation-stack';`, `;` ],
					`import ${name}Screen from 'screens/${name}/${name.toLowerCase()}.screen'`
				);
				spin.succeed(
					`imported ${name}Screen successfully into App/navigation/AppNavigation`
				);
			}
		}

		formatFile(`${res.path}/${name}/${name.toLowerCase()}.screen.js`)


	} else {
		spin.warn("warning: Make sure you're inside rigel app");
		spin.fail('Error: unable to find screens path');
		return;
	}
}
