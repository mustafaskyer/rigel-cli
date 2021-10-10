const inquirer = require("inquirer");
const fuzzy = require("fuzzy");
const _ = require("lodash");
inquirer.registerPrompt(
  "checkbox-plus",
  require("inquirer-checkbox-plus-prompt/index")
);

// const Prompt = inquirer.createPromptModule();

export const prompt = async ({
  options,
  name,
  message,
  type,
  choices,
}: {
  options?: any;
  name: string;
  message?: string;
  type?: string;
  choices?: any;
}) => {
  const answer = await inquirer.prompt([
    {
      type: type || "checkbox-plus",
      name,
      message: `- ${message}`,
      pageSize: 10,
      highlight: true,
      searchable: true,
      choices,
      // default: ['yellow', 'red'],
      source: (_answersSoFar: any, input: string) => {
        input = input || "";
        return new Promise(function (resolve) {
          const res = fuzzy.filter(input, options);
          const data = _.map(res, (item: any) => item.original);
          resolve(data);
        });
      },
    },
  ]);
  return answer[name];
};
