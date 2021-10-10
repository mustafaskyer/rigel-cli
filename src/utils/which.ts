import PrettyError from "pretty-error";
const pe = new PrettyError();
const which = require("which");
const { error } = require("../logger/index");
import ora from "ora";

export const whichPkg = (name: string, message: string) => {
  return new Promise((resolve, reject) => {
    which(name.toString(), function (er: string, _resolvedPath: any) {
      // er is returned if no "node" is found on the PATH
      // if it is found, then the absolute path to the exec is returned
      // console.log('@err', er);
      // console.log('@resolvedPath', resolvedPath);
      if (er) {
        console.log(`- ${error(message)} \n${pe.render(er)}`);
        reject(`An Error occured, ${name} not installed`);
      } else {
        resolve(true);
      }
    });
  });
};

export const checkNpmYarn = () => {
  return new Promise((resolve, reject) => {
    const spin = ora("");
    // spin.info('Looking for yarn if installed!!')
    const resolvedYarn = which.sync("yarn", { nothrow: true });
    if (resolvedYarn) {
      spin.info("install using yarn");
      resolve({ command: "yarn", pkg: "yarn" });
      return;
    }
    // spin.info('yarn not exist, Looking for npm if installed!!')
    const resolvedNpm = which.sync("npm", { nothrow: true });
    if (resolvedNpm) {
      spin.info("install using npm");
      resolve({ command: "npm i", pkg: "npm" });
      return;
    }
    spin.fail("not yarn neither npm are installed!!, proccess failed!!");
    reject(false);
  });
};
