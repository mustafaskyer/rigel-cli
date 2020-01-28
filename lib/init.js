const figlet = require('figlet')
const { projectInstall } = require('pkg-install')
const execa = require('execa')
const shell = require('shelljs')
const chalk = require('chalk')
import ora from 'ora';
const { isMac, isWindows, isLinux, REPO_LINK } = require('./utils')



async function cloneRepo(name) {
  try {
    await shell.exec(`git clone ${REPO_LINK} ${name}`, { silent: true })
    return name
  } catch (e) {
    // spinner.fail(`Failed to clone into ${name} \n ${e}`)
    console.error('#Error_Clone_Repo: \n', e)
  }
}

async function installDepenencies(path) {
  try {
    await projectInstall({ cwd: path })
    return true
  } catch (err) {
    return Promise.reject(new Error(err))
  }
}

async function installingPods(name) {
  try {
    await shell.cd(`${name}/ios/`)
    await execa('pod', ['install'])
  } catch (err) {
    return Promise.reject(new Error(err))
  }
}



async function createProject(name) {

  const spin = ora(`cloning into ${name}`).start();
  const clonedApp = await cloneRepo(name)
  spin.succeed(`cloned ${name}`)

  spin.start(`Installing dependencies into ${name}/node_modules`)
  const installPkgs = await installDepenencies(name)
  spin.succeed(`dependencies installed `)

  if(isMac){
    spin.start(`Installing Pods into ${name}/ios/Pods`)
    const installedPods = await installingPods(name)
    spin.succeed('Pods Installed')
  }

  spin.start(`Moving into ${name}`)
  await shell.cd('..')
  spin.text = `Opening ${name} into code`
  try{
    await execa('code', ['.'])
  }catch(err){
    spin.fail(`Failed to open ${name} in vscode, probably not installed`,err)
  }

  try {
    spin.start(`opening ${name} `)
    await execa('open', ['.'])
    spin.succeed('Completed')
  }catch(err){
    spin.fail(`Failed to open ${name}`,err)
  }


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

  return true
}

export default createProject
