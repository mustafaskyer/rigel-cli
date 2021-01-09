const PrettyError = require('pretty-error');
const jetpack = require('fs-jetpack')
const pe = new PrettyError();

const count = 0;
function findPath(path) {
	try {
		if (count > 5) {
			return { status: false, message: "make sure you're inside arigel app" };
		}

		if (jetpack.exists('.rigel')) {
			return { status: true, path: `${process.cwd()}/App/${path}`, message: 'success' };
		}

		shell.cd('../');
		count++;

		return findPath(path);
	} catch (e) {
		console.log(pe.render(e))
	}
}

module.exports = findPath;
