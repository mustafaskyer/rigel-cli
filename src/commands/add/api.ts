/**
 * create api method
 * 1- select which template based on api type => [async/await, *yield]
 * should make and export func with given name
 * should condition incase method post, get or any else to send this to template
 * make an api with the name, or just append it to apis file
 * incase added new file, should export it from apis index
 * suggest to import it in saga || screen || component
 */
import { findPath, gFile, prompt, appendToFile, formatFile } from '../../utils/index';
import { apiRnSource } from './templates/api.temp';
const { compile } = require('handlebars');

const PrettyError = require('pretty-error');
const pe = new PrettyError();

export const addApi = async (name: string, options: any) => {
  for (let i = 0; i < options.exports.length; i++) {
    // const urlAnswer = await prompt({
    // 	options: options.exports,
    // 	message: `please enter a vaild url for ${options.exports[i]}`,
    // 	name,
    // 	type: 'input'
    // });
    const rgx = /^[a-z ,.'-]+$/i;
    const isMatch = String(options.exports[i]).match(rgx);
    if (isMatch === null) {
      console.log(pe.render(`invalid parameter name!! ${options.exports[i]}`));
      process.exit();
    }
    const urlAnswer = options.exports[i];

    const typeAnswer = await prompt({
      choices: ['Async/Await', '*/yield'],
      message: `select which type of func you'd export to ${options.exports[i]}`,
      name,
      type: 'list',
    });

    const methodAnswer = await prompt({
      choices: ['get', 'post', 'put', 'delete', 'patch'],
      message: `select which type of methods you'd export to ${options.exports[i]}`,
      name,
      type: 'list',
    });
    const { status, message, path } = findPath(`apis/${name}`);
    const sourcetemplate = compile(apiRnSource);
    if (typeAnswer === 'Async/Await') {
      const content = sourcetemplate({
        name: urlAnswer,
        date: new Date(),
        function: 'async function',
        url: urlAnswer,
        method: `await api.${methodAnswer}(url, {...reqBody})`,
      });
      gFile({
        path: `${path}`,
        name: options.exports[i],
        type: 'api',
        content,
      });
    } else if (typeAnswer === '*/yield') {
      const content = sourcetemplate({
        name: urlAnswer,
        date: new Date(),
        function: 'function*',
        url: urlAnswer,
        method: `yield api.${methodAnswer}(url, {...reqBody})`,
      });
      gFile({
        path: `${path}`,
        name: options.exports[i],
        type: 'api',
        content,
      });
    }
    const { path: apisIndexPath } = findPath(`apis/index.apis.js`);
    await appendToFile(apisIndexPath, [';', ''], `export { ${urlAnswer} } from './${name}/${options.exports[i]}.api'`);
    await formatFile(apisIndexPath);
  }
};
