import program from 'commander'
import pkg from '../package.json'
import ora from 'ora';
import opn from 'open'

import createProject from '../lib/init.js'
import { viewOptions } from '../commands/add'
import handleCreateReduxScreen from '../commands/reduxscreenOptions'
// import checkOptions from '../commands/options';


const spin = ora()
export function main () {
  program
    .version(pkg.version)
    .option('--imc', 'import components')
    .option('--imct', 'import actions')
    .option('--connect', 'Connect All Stuff together (create screen with reducer, action, saga)')
    .option('--export', 'export screen to specific path')

  program.command('init [name]')
    .description('initialize new app')
    .usage('<appname>')
    .helpOption()
    .action(name => {
      if (!name) return program.outputHelp()
      createProject(name)
    })

  program.command('add <name>')
    .description('adding new files such as components, screens, reducers, actions, sagas, types')
    .usage('<name>')
    .helpOption()
    .action(async (n, op) => {
      const name = String(program.args)

      if(/^\d/.test(name)){
        spin.fail(`name can't start with number`)
        return;
      }
      if (!name) {
        console.error('NAME REQUIRED')
        console.info('run => rigel add --help for more info')
        return program.outputHelp()
      }

      const options = program.rawArgs.slice(4)

      viewOptions(name, options)
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
