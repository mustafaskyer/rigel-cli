const chalk = require('chalk')

exports.error = (msg) => {
    console.log(chalk.red(msg))
}

exports.info = (msg) => {
    console.log(chalk.blueBright(msg))
}

exports.success = (msg) => {
    console.log(chalk.greenBright(msg))
}

exports.warning = (msg) => {
    console.log(chalk.magenta(msg))
}