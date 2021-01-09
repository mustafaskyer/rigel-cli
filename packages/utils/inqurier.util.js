const inquirer = require('inquirer');
const fuzzy = require('fuzzy');
const _ = require('lodash');
inquirer.registerPrompt('checkbox-plus', require('inquirer-checkbox-plus-prompt/index'));

const Prompt = inquirer.createPromptModule();

exports.prompt = async ({ options, name, message, type, choices }) => {
	const answer = await inquirer.prompt([
		{
			type: type || 'checkbox-plus',
			name,
			message: `- ${message}`,
			pageSize: 10,
			highlight: true,
      searchable: true,
      choices,
			// default: ['yellow', 'red'],
			source: (answersSoFar, input) => {
				input = input || '';
				return new Promise(function(resolve) {
					const res = fuzzy.filter(input, options);
					const data = _.map(res, (item) => item.original);
					resolve(data);
				});
			}
		}
	]);
	return answer[name];
};
