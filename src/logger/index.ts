const chalk = require("chalk");

export const error = (msg: string) => {
  console.log(chalk.red(msg));
};

export const info = (msg: string) => {
  console.log(chalk.blueBright(msg));
};

export const success = (msg: string) => {
  console.log(chalk.greenBright(msg));
};

export const warning = (msg: string) => {
  console.log(chalk.magenta(msg));
};
