/**
 * create api method
 * 1- select which template based on api type => [async/await, *yield]
 * should make and export func with given name
 * should condition incase method post, get or any else to send this to template
 * make an api with the name, or just append it to apis file
 * incase added new file, should export it from apis index
 * suggest to import it in saga || screen || component
 */
import { findPath, gFile, checkIfExist } from '../../utils/index';
import { apiTempJs, apiTempTs } from './templates/api.temp';
const { compile } = require('handlebars');
const jetpack = require('fs-jetpack');
const PrettyError = require('pretty-error');
const pe = new PrettyError();

export const addApi = async (name: string, options: any) => {
  const { dir, url, method = 'GET', type = 'async' } = options;
  if (!dir) {
    console.log(pe.render(`please specify --dir=dirName`));
    process.exit();
  }

  if (!url) {
    console.log(pe.render(`please specify --url=urlName`));
    process.exit();
  }

  const { status, path, typescript, mobile, web } = findPath(`services/apis`);
  if (!status) {
    console.log(pe.render(`something unexpected happened!!`));
    process.exit();
  }

  const checkStatus = await checkIfExist(`${path}/${dir}`, name, 'api', typescript);
  if (checkStatus) {
    console.log(pe.render(`file ${name} already exist, can't add ${name}.component!!`));
    process.exit();
  }

  const sContent = compile(typescript ? apiTempTs : apiTempJs);
  const cContent = sContent({
    interface: name.charAt(0).toUpperCase() + name.slice(1),
    name: name,
    date: new Date(),
    method: String(method).toLowerCase(),
    url,
  });
  const ext = typescript ? 'ts' : 'js';
  gFile({ path: `${path}/${dir}`, name, type: 'api', content: cContent, ext: ext });
  jetpack.append(`${path}/index.${ext}`, `export * from './${dir}/${name}.api';\n`);
};
