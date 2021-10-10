/**
 * https://medium.com/@adambisek/how-to-check-minimum-required-node-js-version-4a78a8855a0f
 */
import chalk from "chalk";
const semver = require("semver");

const outOfDateV = "9.x";
export function checkNodeV(v: string) {
  if (!semver.satisfies(process.version, v, { includePrerelease: true })) {
    console.log(
      chalk.red(
        "You are using Node " +
          process.version +
          ", but this version of @rigelcli" +
          " requires Node " +
          v +
          ".\nPlease upgrade your Node version."
      )
    );
    process.exit(1);
    return;
  }

  if (semver.satisfies(process.version, outOfDateV)) {
    console.log(
      chalk.yellowBright(
        `Cuurent Node Version ${process.version}.\n` +
          `Node.js ${outOfDateV} is out of date, and will not be supported in future versions.\n` +
          `It's strongly recommended to use an active LTS version instead. \n`
      )
    );
  }
}
