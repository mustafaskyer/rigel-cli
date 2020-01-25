const figlet = require('figlet')
const { projectInstall } = require('pkg-install')
const execa = require('execa')
const shell = require('shelljs')
const Listr = require('Listr')
const chalk = require('chalk')

const { isMac, REPO_LINK } = require('./utils')

async function cloneRepo (name) {
  try {
    await shell.exec(`git clone ${REPO_LINK} ${name}`, { silent: true })
  } catch (e) {
    console.log('#Error_Clone_Repo: \n', e)
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
      console.log(chalk.cyan.white(' Congrats'))
      isMac && console.log(chalk.white(' run iOS'), chalk.green('npm run ix'))
      console.log(chalk.white(' run android [emulator] '), chalk.green('npm run android'))
      console.log(chalk.white(' [github] '), chalk.blueBright('https://github.com/mustafaskyer/rigel-rn'))
      console.log(chalk.white(' [twitter]] '), chalk.blueBright('@mustafaskyer'))
      console.log(chalk.white(' Slack '), chalk.blueBright('https://slack.com'))
    })
  } catch (err) {
    return Promise.reject(new Error(err))
  }
}

async function createProject (name) {
  const tasks = new Listr(
    [
      {
        title: `Creating new ${name}`,
        task: () => cloneRepo(name)
      },
      {
        title: 'Install package dependencies',
        task: () => installDepenencies(name)
      },
      isMac && {
        title: 'installing pods',
        task: () => installingPods(name)
      },
      {
        title: `Created ${name}`,
        task: () => startProject(name)
      }
    ],
    {
      exitOnError: true
    }
  )

  await tasks.run()
  return true
}

module.exports = { createProject }
