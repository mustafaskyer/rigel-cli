import ora from 'ora';
const Handlebars = require('handlebars');
import * as changeCase from 'change-case';
import { upperCaseFirst } from 'upper-case-first';
import jetpack from 'fs-jetpack';
const fs = require('fs');

import { findPath, append, appendToFile } from '../../helper/helper';
import formatFile from '../format';

const spin = ora();
const txt = `/**
* created {{name}} component at {{date}} */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function {{name}}(props){
   return(
       <View style={styles.container}>
           <Text>{'{{name}} Component'}</Text>
       </View>
   )
}

const styles = StyleSheet.create({
   container: {
       flex:1,
       justifyContent: 'center',
       alignItems: 'center'
   }
})
`;

export default async function addComponent(n, {components}) {
	const name = upperCaseFirst(changeCase.camelCase(n));

	spin.start(`generating new Component ${name}.component`);
	const template = Handlebars.compile(txt);

	const res = await findPath('App/components');
	console.log('@res', res)
	if (res.status) {
		await append(`${res.path}/${name}.component.js`, template({ name, date: new Date() }));

		spin.start('append to App/components/index');
		await append(`${res.path}/index.js`, `\nexport { ${name} } from './${name}.component';`);

		spin.succeed(`created /App/components/${name}.component.js`);
		if (components) {
			await appendToFile(
				`${res.path}/${name}.component.js`,
				[ `'react-native';`, ';' ],
				`import { ${components.join(', ')} } from 'components'`
			);
			spin.succeed(`successfully imported { ${components.join(', ')} } into ${name}.component`);
		}
		spin.info(`import { ${name} } from 'components'`);

		formatFile(`${res.path}/${name}.component.js`);
	} else {
		spin.warn("warning: Make sure you're inside rigel app");
		spin.fail('Error: unable to find components path');
		return;
	}
}
