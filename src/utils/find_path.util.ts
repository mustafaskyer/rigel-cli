import PrettyError from 'pretty-error';
import jetpack from 'fs-jetpack';
const shell = require('shelljs');
const pe = new PrettyError();

let count = 0;
export function findPath(path: string): { status?: boolean; message?: string; path?: string } | any {
  try {
    if (count > 5) {
      return { status: false, message: "make sure you're inside a react-native app with the rigel structure" };
    }

    if (jetpack.exists('.rigel')) {
      let typescript: boolean = false;
      let mobile: boolean = false;
      let web: boolean = false;
      if (jetpack.exists('tsconfig.json')) {
        typescript = true;
      }
      if (jetpack.exists('android') && jetpack.exists('ios')) {
        mobile = true;
      } else {
        if (jetpack.exists('public/index.html')) {
          web = true;
        }
      }
      return {
        status: true,
        typescript,
        mobile,
        web,
        path: `${process.cwd()}/${web ? 'src' : 'App'}/${path}`,
        message: 'success',
      };
    }

    shell.cd('../');
    count++;

    return findPath(path);
  } catch (e) {
    console.log(pe.render(String(e)));
  }
}
