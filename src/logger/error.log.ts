const chalk = require("chalk");
export const error = (msg: string) => {
  console.log(chalk`red ${msg}`);
};
