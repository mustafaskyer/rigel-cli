const shell = require("shelljs");
const os = require("os");
const { cloneAndRenameApp } = require("../../utils/index");
const { which, checkNpmYarn } = require("../../utils/index");
const PrettyError = require("pretty-error");
const figlet = require("figlet");
const ora = require("ora");
const pe = new PrettyError();
const { success, info } = require("../../logger/index");

export async function init(name: any, options: any) {
  /**
   * check if git exist
   * clone main repo
   * rename app
   * detect platform
   * install pods
   * view instructions
   */

  /** Check if git is installed */
  try {
    await which("git", "git not installed");
    // await which('react-native', 'react native not installed');
    await which("watchman", "watchman not installed");
  } catch (e) {
    // console.log('#####################', e);
    process.exit(Number(e));
  }

  /** Clone & Rename App using react-native-rename pkg */
  try {
    const resCloned = await cloneAndRenameApp(name);
    if (!resCloned) {
      console.log(pe.render("Something not expected happened!! \n"));
      process.exit();
    }
  } catch (e) {
    console.log("@ecloneAndRenameApp", e);
    console.log(pe.render(e));
    process.exit();
  }

  /** Detect which platform */
  if (os.platform() === "darwin") {
    /** IOS
     * should check for pods if cocapods installed
     * if not, should install gem pods first, then reinstall pods
     * done here
     */
    try {
      which("xcode-select", "Xcode not installed!!"); // for mac users
      which("pod", "Pods not installed"); // for mac users
      which("java", "Java not Installed");
      which("adb", "adb not exist, check android studio install instructions");
    } catch (e) {
      console.log(pe.render(e));
    }
  } else if (os.platform() === "win32" || os.platform() === "linux") {
    /** Windows
     * no work with ios
     * should open andriod, check gradle & build
     */
    try {
      which("java", "Java not Installed");
      which("adb", "adb not exist, check android studio install instructions");
    } catch (e) {
      console.log(pe.render(e));
      process.exit();
    }
  } else {
    console.log(pe.render(new Error("Platform not suported yet!")));
    process.exit();
  }

  try {
    /**
     * run yarn or npm to install node_modules
     */
    const spin = ora("");
    spin.info("checking yarn|npm for installing node_modules");
    const resCheck = await checkNpmYarn();
    if (!resCheck) {
      console.log(pe.render("Something error not expected happened!! \n"));
      process.exit();
    }

    const spinModules = ora(
      `Installing node_modules using ${resCheck.pkg}`
    ).start();
    shell.exec(
      resCheck.command,
      { silent: true },
      (code: number, stdout: any, stderr: any) => {
        if (code !== 0) {
          spinModules.fail(`Failed to install node_modules\n ${stderr}`);
          console.log(pe.render(stdout));
          process.exit();
        }
        spinModules.succeed(`successfylly installed node_modules`);
        /**
         * Installign pods for macs
         */
        if (os.platform() === "darwin") {
          // cd into ios
          // install pods
          const resolvedPath = shell.test("-d", "ios");
          if (!resolvedPath) {
            console.log(pe.render(new Error("error moving to ios dir!!")));
            process.exit();
          }
          shell.cd("ios");
          spin.start("installing pods ...");
          shell.exec(
            `pod install`,
            { silent: true },
            async (code: number, stdout: any, stderr: any) => {
              if (code !== 0) {
                spin.fail(`Error in installing pods`);
                console.log(pe.render(stdout));
                process.exit();
              }
              spin.succeed("pods installed succefully");
              shell.cd("../");
              // check if code installed
              shell.exec(
                `code .`,
                { silent: true },
                (code: number, stdout: any, stderr: any) => {
                  if (code !== 0) {
                    return;
                  }
                  spin.succeed(`${name} opened into vscode`);
                  /**
                   * View instructions to run app in both ios & android
                   */
                  success(
                    ` - Congrats, successfully cloned and installed all modules by rigel into ${name} 🎉 🎉 🎉`
                  );
                  success(` - to run ios app use npm command`);
                  info(` - npm run ix`);
                  success(` - to run android app use npm command`);
                  info(` - npm run android`);
                  spin.frame(` - thanks for using rigel, regards`);

                  figlet("RIGEL", function (err: any, data: any) {
                    if (err) {
                      console.log("Something went wrong...");
                      console.dir(err);
                      return;
                    }
                    success(data);
                  });
                }
              );
            }
          );
        }
      }
    );
  } catch (e) {}
}
