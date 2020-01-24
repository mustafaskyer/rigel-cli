const git = require('nodegit')
const figlet = require('figlet')
const { projectInstall } = require('pkg-install')
const execa = require('execa')
const shell = require('shelljs')
const Listr = require('Listr')
const chalk = require('chalk')

const { isMac } = require('./utils')

async function cloneRepo (name) {
  try {
    return await git.Clone('https://github.com/mustafaskyer/rigel-rn', name)
  } catch (err) {
    return Promise.reject(new Error(err))
  }
}

async function installDepenencies (path) {
  try {
    await projectInstall({
      cwd: path
    })
  } catch (err) {
    return Promise.reject(new Error(err))
  }
}

async function installingPods (name) {
  try {
    await shell.cd(`${name}/ios/`)
    await execa('pod', ['install'])
  } catch (err) {
    return Promise.reject(new Error(err))
  }
}

async function startProject (name) {
  try {
    await shell.cd('..')
    await execa('code', ['.'])
    await execa('open', ['.'])
    figlet('RIGEL', function (err, data) {
      if (err) {
        return Promise.reject(new Error(err))
      }
      console.log(chalk.cyan.yellow(data))
      console.log(chalk.cyan.white(' 🎉 Congrats, Successfully Installed '))
      isMac && console.log(chalk.white(' for run in iOS [iPhoneX]'), chalk.green('npm run ix'))
      console.log(chalk.white(' for run in android [emulator] '), chalk.green('npm run android'))
      console.log(chalk.white(' access repo [github] '), chalk.blueBright('https://github.com/mustafaskyer/rigel-rn'))
      console.log(chalk.white(' contac me [twitter]] '), chalk.blueBright('@mustafaskyer'))
      console.log(chalk.white(' join slack '), chalk.blueBright('https://slack.com'))
    })
  } catch (err) {
    return Promise.reject(new Error(err))
  }
}

async function createProject (name) {
  const tasks = new Listr(
    [
      {
        title: `clonning Repo into ${name}`,
        task: () => cloneRepo(name)
      },
      {
        title: 'installing packages ...',
        task: () => installDepenencies(name)
      },
      isMac && {
        title: 'installing pods for mac users ',
        task: () => installingPods(name)
      },
      {
        title: `Start Coding ${name}`,
        task: () => startProject(name)
      }
    ],
    {
      exitOnError: false
    }
  )

  await tasks.run()
  return true
}

module.exports = { createProject }
