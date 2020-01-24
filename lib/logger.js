const ora = require('ora')

class Logger {
  constructor (defaultMessage, successMessage, errorMessage) {
    this.defaultMessage = defaultMessage
    this.successMessage = successMessage
    this.errorMessage = errorMessage

    this.spinner = ora(defaultMessage).start()
  }

  success (msg = this.successMessage) {
    this.spinner.color = 'green'
    this.spinner.text = msg
  }

  fail () {
    this.spinner.color = 'red'
    this.spinner.fail(this.errorMessage)
  }
}

module.exports = Logger
