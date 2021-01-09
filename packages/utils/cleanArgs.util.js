const camelize = require('./toUpperCase.util')
function cleanArgs(cmd) {
	const args = {};
	cmd.options.forEach((o) => {
		const key = camelize(o.long.replace(/^--/, ''));
		// if an option is not present and Command has a method with the same name
		// it should not be copied
		if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
			args[key] = cmd[key];
		}
	});
	return args;
}

module.exports = cleanArgs
