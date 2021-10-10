import PrettyError from "pretty-error";
import jetpack from "fs-jetpack";
const shell = require("shelljs");
const pe = new PrettyError();

let count = 0;
export function findPath(
  path: string
): { status?: boolean; message?: string; path?: string } | any {
  try {
    if (count > 5) {
      return { status: false, message: "make sure you're inside arigel app" };
    }

    if (jetpack.exists(".rigel")) {
      return {
        status: true,
        path: `${process.cwd()}/App/${path}`,
        message: "success",
      };
    }

    shell.cd("../");
    count++;

    return findPath(path);
  } catch (e) {
    console.log(pe.render(String(e)));
  }
}
