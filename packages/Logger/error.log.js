const chalk = require('chalk')
exports.error = (msg) => {
    console.log(chalk`red ${msg}`)
}