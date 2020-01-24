import program from 'commander'
import pkg from '../package.json'

export function main () {
  program
    .version(pkg.version)

  program.command('init [name]')
    .description('creating new app')
    .action(name => console.log('@name', name))
}
