const prettier = require('prettier');
const jetpack = require('fs-jetpack');
const formatFile = async(p) => {
	const text = await jetpack.readAsync(p, 'utf8');
	prettier.resolveConfigFile().then((filePath) => {
		prettier.resolveConfig(filePath).then((options) => {
			const formatted = prettier.format(text, { parser: 'babel-flow' });
			jetpack.write(p, formatted);
		});
	});
}

module.exports = {formatFile}