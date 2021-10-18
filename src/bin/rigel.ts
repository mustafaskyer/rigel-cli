#!/usr/bin/env node

import program from 'commander';
const minimist = require('minimist');

import { add, init } from '../commands/index';

const nodeV = require('../../package.json').engines.node;
const { checkNodeV, cleanArgs } = require('../utils/index');
const { warning } = require('../logger/index');

/**
 * First of All, check node version (incase out of date)
 */
checkNodeV(nodeV);

/**
 * Program Main Commands
 */

// #Version
program.version(`@rigel-cli ${require('../../package.json').version}`).usage('<command> [options]');

// #Commands

program
  .command('init <name>')
  .description('initialize new app')
  // .option('-v, --version <version-name>', 'Specify a version to install') // no options now
  .action((name: string, cmd: string) => {
    const options = cleanArgs(cmd);
    if (minimist(process.argv.slice(3))._.length > 1) {
      warning(
        "\n Info: You provided more than one argument. The first one will be used as the app's name, the rest are ignored.",
      );
    }
    // if (process.argv.includes('-g') || process.argv.includes('--git')) {}
    // init(name, options);
  });

/**
 * Add Files
 * - component => (component, action,styles,selectors)
 * - screen => (component, action, styles,selectors)
 * - styles => (srtles)
 * - reducer => (type)
 * - action => (type)
 * - saga => (type,apis)
 * - selector => (type)
 * - image
 * - svg
 * - hook
 * - api
 * - navigation
 * - drawer
 * - lang
 * - module
 */
program
  .command('add <type> <name>')
  .description('Adding new files')
  /**
   * imc => import component from App/Components
   */
  .option('--imc', 'import components onto the new file')
  /**
   * ims => import screen from App/Screen
   */
  .option('--imac', 'import redux-actions onto the new file')
  .option('--imtyp', 'import redux-types onto the new file')
  .option('--imsg', 'import redux-sagas onto the new file')
  .option('--imsg, --redux-saga <saga-name>', 'import redux-sagas onto the new file')
  .option('--imnav', 'import file in the main app navigation')
  .option('--case, --redux-case <case-name>', 'import file in the main app navigation')
  .option('--imact, --redux-action <action-name>', 'import action from redux-actions')
  .option('--se, --redux-action <action-name>', 'import file in the main app navigation')
  .option('--path <path-to-file>', 'import file in the main app navigation')
  .option('--dir <dir-name>', 'select dir name to create insides, otherwise will create it')
  .option('--url <ur>', 'import file in the main app navigation')
  .option('--types <type_name>', 'import file in the main app navigation', (v: string) => v.split(','))
  .option('--actions <action>', 'import file in the main app navigation', (v: string) => v.split(','))

  .option('--url <url>', 'import file in the main app navigation') // url after base api
  .option('--method <method>', 'import file in the main app navigation') // get, post, put, delete, ...etc
  .option('--type <type>', 'import file in the main app navigation') // async || yield
  .option('--exports <exports>', 'import file in the main app navigation', (v: string) => v.split(',')) // async || yield
  .action((type: any, name: any, cmd: any) => {
    const options = cleanArgs(cmd);
    if (options.actions || options.types) {
    } else {
      if (minimist(process.argv.slice(3))._.length > 2) {
        warning('\n Info: Multi arguments!. only consider first two args');
      }
    }

    console.log('@add', typeof add);
    add({ type, name, options });
  });

program.parse(process.argv);
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
