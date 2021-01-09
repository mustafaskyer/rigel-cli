const checkNodeV = require('./check_version.util');
const toUpperCase = require('./toUpperCase.util');
const cleanArgs = require('./cleanArgs.util');
const { whichPkg, checkNpmYarn } = require('./which');
const findPath = require('./find_path.util');
const checkIfExist = require('./check_if_exist.util');
const { gFile, gDir } = require('./generate.util');
const { ls, getLsAnswers } = require('./ls');
const { prompt } = require('./inqurier.util')
const appendToFile = require('./append.util')
const { formatFile } = require('./format.util')

module.exports = {
	checkNodeV,
	toUpperCase,
	cleanArgs,
	which: whichPkg,
	checkNpmYarn,
	// add utils
	findPath,
	checkIfExist,
	gFile, // create file
	gDir, // create directory
	ls, // list all files in a specific dir
	getLsAnswers, // get answers of selected list of files
    prompt, //
	appendToFile,
	formatFile
};
