const { MAIN_REPO_GIT } = require("../constants/index");
const { info, warning, success, error } = require("../logger/index");
import ora from "ora";
const shell = require("shelljs");
const fs = require("fs");
const chalk = require("chalk");

/**
 * Clone App & rename using react-native-rename
 *
 * @param {*} name
 * @returns (Boolean) true|false
 */
export const cloneAndRenameApp = async (name: string) => {
  return new Promise((resolve, reject) => {
    /** name !== rigel */
    if (name === "rigel") {
      warning(`it's my name :), please choose another name`);
      process.exit();
    }

    /** check if name already exist before cloning */
    if (fs.existsSync(name)) {
      error(`${name} already exists, please choose another name`);
      process.exit();
    }

    /** check if name is valid, should match this pattern =>  ^[a-zA-Zа-яА-Я0-9_!]+$ */
    const validRegexAppName = new RegExp("^[a-zA-Zа-яА-Я0-9_!]+$");
    if (!name.toString().match(validRegexAppName)) {
      error(`${name} not valid, please choose avalid name`);
      process.exit();
    }

    /**
     * - Clone
     * - rename
     * - done ✅
     */
    try {
      const cloneSpin = ora(`Cloning into ${chalk.yellow(name)} ...`).start();
      shell.exec(
        `git clone ${MAIN_REPO_GIT} ${name}`,
        { silent: true },
        (code: string | number, _stdout: any, stderr: any) => {
          if (code !== 0) {
            cloneSpin.fail(stderr);
            reject(stderr);
            process.exit();
          }
          const removeGitOrigin = shell.exec("git remote remove origin", {
            silent: true,
          });
          cloneSpin.succeed(`Cloned 'name' successfully`);
          shell.cd(name);
          cloneSpin.succeed(`moved to /${name}`);
          const renameSpin = ora(
            `Renaming ${name} using ${chalk.yellow(
              `npx react-native-rename ${name}`
            )} ...`
          ).start();
          shell.exec(
            `npx react-native-rename ${name}`,
            { silent: true },
            (code: string | number, _stdout: any, stderr: any) => {
              if (code !== 0) {
                renameSpin.fail(stderr);
                reject(stderr);
                process.exit();
              }
              renameSpin.succeed(`Renamed successfully`);
              return resolve(true);
            }
          );
        }
      );
    } catch (e) {
      error(e);
    }
  });
};
