import program from 'commander'
import pkg from '../package.json'

import opn from 'open'

import { createProject } from '../lib/init.js'
import { viewQuestions } from '../commands/add'
import handleCreateReduxScreen from '../commands/reduxscreenOptions'

export function main () {
  program
    .version(pkg.version)
    .option('--imc', 'import components')
  // .option('--ims', 'import screens')
    .option('--ima', 'import screens')
    .option('--reduxscreen', 'import screens')
  // .option('--imst', 'import screens')
  // .option('--imsg', 'import screens')
    .option('--export', 'import screens')

  program.command('init [name]')
    .description('initialize new app')
    .usage('<appname>')
    .helpOption()
    .action(name => {
      if (!name) return program.outputHelp()
      createProject(name)
    })

  program.command('add [name]')
    .description('adding new files such as components, screens, reducers, actions, sagas, types')
    .usage('<name>')
    .helpOption()
    .action(async (name, options) => {
      if (!name) {
        console.error('NAME REQUIRED')
        console.info('run => rigel add --help for more info')
        return program.outputHelp()
      }
      if (program.reduxscreen) {
        handleCreateReduxScreen(name, program.imc)
        return
      }
      // const res = await checkOptions(program)
      // console.log('@res', res)
      // return;
      viewQuestions(name)
    })

  program.command('issues')
    .description('open new issue in github repo')
    .action(() => opn('https://github.com/mustafaskyer/rigel-rn/issues'))

  program.parse(process.argv)

  /**
     * output help, incase no commands provide
     */
  if (!process.argv.slice(2).length) {
    program.outputHelp()
  }
}
