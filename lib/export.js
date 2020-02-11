import inquirer from 'inquirer'

const options = [
  { name: 'Routes', value: 'App/navigation/AppNavigation.js' },
  { name: 'Drawer', value: 'App/navigation/AppNavigation.js' },
  { name: 'Bottom', value: 'App/navigation/AppNavigation.js' },
]

export default async function exportSelectedPaths (cb) {
  inquirer.prompt([{
    type: 'list',
    name: 'export',
    message: 'Select Path to export',
    pageSize: 10,
    choices: options,
    highlight: true,
    searchable: true
  }]).then(function (answers) {
    cb(answers)
  })
}
