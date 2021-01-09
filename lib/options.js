import inquirer from 'inquirer'
import _ from 'lodash'
import fuzzy from 'fuzzy'

inquirer.registerPrompt('checkbox-plus', require('inquirer-checkbox-plus-prompt/index'))

export default async function getComponentsList (comps, name, cb) {
  inquirer.prompt([{
    type: 'checkbox-plus',
    name,
    message: `type a letter to search ${name} `,
    pageSize: 10,
    highlight: true,
    searchable: true,
    default: ['yellow', 'red'],
    source: (answersSoFar, input) => {
      input = input || ''
      return new Promise(function (resolve) {
        const res = fuzzy.filter(input, comps)
        const data = _.map(res, item => item.original)
        resolve(data)
      })
    }
  }]).then(function (answers) {
    cb(answers[name])
  })
}
