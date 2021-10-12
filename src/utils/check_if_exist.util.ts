const jetpack = require('fs-jetpack');
const PrettyError = require('pretty-error');
const pe = new PrettyError();
export function checkIfExist(path: string, name: string, type: string, typescript?: boolean) {
  /**
   * types
   * -d => dir
   * -f => file
   * -e => exists
   */
  try {
    if (typescript) {
      return Promise.resolve(jetpack.existsAsync(`${path}/${name}.${type}.tsx`));
    } else {
      return Promise.resolve(jetpack.existsAsync(`${path}/${name}.${type}.js`));
    }
  } catch (e) {
    console.log(pe.render(e));
  }
}
