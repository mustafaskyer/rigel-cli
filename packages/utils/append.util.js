const jetpack = require('fs-jetpack');
const ora = require('ora')
const appendToFile = async (path, occurances, content) => {
	const spin = ora()
    const file = await jetpack.readAsync(path, 'utf8');
	const index = occurances.findIndex((occr, i) => file.indexOf(occr) !== -1);
	if (index !== -1) {
		const _file = file.replace(occurances[index], `${occurances[index]}\n${content}`);
		await jetpack.writeAsync(path, _file, { jsonIndent: 0, atomic: true });
	} else {
		spin.warn(`make sure you're importing react-native there`);
		spin.fail(`Can't append to file: ${path}`);
	}
	return;
};

module.exports = appendToFile
