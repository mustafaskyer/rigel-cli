import prettier from 'prettier';
import jetpack from 'fs-jetpack';
const fs = require('fs');

export default async function formatFile(p) {
	const text = await jetpack.readAsync(p, 'utf8');
	prettier.resolveConfigFile().then((filePath) => {
		prettier.resolveConfig(filePath).then((options) => {
			const formatted = prettier.format(text, { parser: 'babel-flow' });
			jetpack.write(p, formatted);
		});
	});
}
