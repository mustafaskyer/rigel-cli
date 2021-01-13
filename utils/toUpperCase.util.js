function toUpperCaseFn(str) {
	return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''));
}

module.exports = toUpperCaseFn