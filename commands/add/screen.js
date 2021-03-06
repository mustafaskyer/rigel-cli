const { findPath, checkIfExist, getLsAnswers, gDir, gFile, appendToFile } = require('../../utils/index');
const { compile } = require('handlebars');
const jetpack = require('fs-jetpack');
const ora = require('ora');
const shell = require('shelljs');
const PrettyError = require('pretty-error');

const pe = new PrettyError();

const { screenRnSource } = require('./templates/screen.temp');
const { stylesRnSources } = require('./templates/styles.temp');

exports.addScreen = async (name, options) => {
	const spin = ora();
	const opts = {};
	if (options.imc) {
		const answers = await getLsAnswers({ path: 'App/components', name, type: 'component' });
		opts.imc = answers;
		// opts.imc.push('Spacer');
		// opts.imc.push('Row');
	}

	if (options.imac) {
		opts.imac = true;
	}

	// all new options should handle from here
	const { status, path, message } = findPath('screens');
	if (!status) {
		console.log(pe.render(`something unexpected happened!!`));
		process.exit();
	}
	const checkStatus = await checkIfExist(path, name, 'screen');
	if (checkStatus) {
		console.log(pe.render(`${name} already exist, can't add ${name} directory!!`));
		process.exit();
	}

	const sourcetemplate = compile(screenRnSource);
	const sourcetemplateStyles = compile(stylesRnSources);
	const _content = sourcetemplate({ name, date: new Date() });
	const _contentStyle = sourcetemplateStyles({ name, date: new Date() });
	const dirCreated = await gDir(path, name);

	if (!dirCreated) {
		console.log(pe.render(`${name} already exist, can't add ${name} directory!!`));
		process.exit();
	}

	gFile({ path: `${path}/${name}`, name, type: 'screen', content: _content });
	gFile({ path: `${path}/${name}`, name, type: 'styles', content: _contentStyle });

	// should check opts and add imc, imac answers if exists :-
	if (opts.imc) {
		const o = opts.imc.join(', ');
		appendToFile(`${path}/${name}/${name}.screen.js`, [ ';' ], `import { ${o} } from '@components'`);
	} else {
		appendToFile(`${path}/${name}/${name}.screen.js`, [ ';' ], `import { Spacer, Row } from '@components'`);
	}

	if (opts.imac) {
		appendToFile(`${path}/${name}/${name}.screen.js`, [ ';' ], `import {} from '@actions'`);
	}

	spin.succeed(` - successfully added ${name} @ App/components/${name}.component`);
	spin.info(` - usage: import { ${name} } from '@components'; `);

	shell.exec(`code App/screens/${name}/${name}.screen.js`, (code, stdout, stderr) => {
		if (code === 0) {
			spin.info('file opened at vscode ✅');
		}
	});
};
