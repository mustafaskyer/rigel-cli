
const inquirer = require('inquirer')

const { getAnswers } = require('../lib/add')

const types = [
  { name: 'screen', value: 'scr' },
  { name: 'component', value: 'comp' },
  // { name: 'style', value: 'style' },
  { name: 'reducer', value: 'reducer' },
  { name: 'reducer action', value: 'reducer_action' },
  { name: 'reducer types', value: 'reducer_types' },
  { name: 'reducer sagas', value: 'reducer_sagas' }
]

function validate (answer) {
  if (answer.length < 1) {
    return 'You must choose at least one topping.'
  }

  return true
}
const viewQuestions = (name, res) => {
  inquirer.prompt([{
    type: 'list',
    message: 'Choose File Type',
    name: 'selected',
    choices: types,
    validate
  }]).then(listAnswers => {
    getAnswers(listAnswers, name, res)
  })
}

module.exports = { viewQuestions }
