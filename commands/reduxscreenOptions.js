import ls from '../lib/listFiles'
import handle from '../lib/handle'
import getFilesList from '../lib/options'
import ora from 'ora';
import {
  createFile,
  getOnlineFileContent,
  replaceFileContentWith,
  createDir,
  importInto
} from '../lib/utils'
import { map } from 'lodash'

async function createScreen(name, comps) {
  const spin = ora()
  if (!comps) spin.start(`creating screen ${name}`)
  const createdDir = await createDir('App/screens', name)
  if (createdDir) {
    const p = `App/screens/${name}`
    const createdScreen = await createFile(p, 'index')
    const createdStyle = await createFile(p, 'styles')
    const onlineScreenContent = await getOnlineFileContent('screen')
    const onlineStyleContent = await getOnlineFileContent('style')
    await replaceFileContentWith(onlineScreenContent, 'Screen', name, createdScreen)
    await replaceFileContentWith(onlineStyleContent, 'Screen', name, createdStyle)

    const sPath = handle.getPath(`App/screens/${name}/index.js`)

    importInto(sPath.path, `import { ${name.toLowerCase()} } from 'redux-actions'`)
    await handle.appendToFile(
      'actions = {', // occurance
      `${name.toLowerCase()}`, // value to replace
      sPath.path // path of file
    )

    if (comps) {
      map(comps.Components, comp => {
        importInto(sPath.path, `import ${comp.slice(0, -3)} from 'components/${comp.slice(0, -3)}'`)
      })
    }
    spin.succeed(`created ${name} with components in App/screens/${name}`)
    return
  }
  spin.succeed(`created ${name} in App/screens/${name}`)
}

async function createAction(name, casses) {
  const impCasesStmt = casses.join(', ')
  const createdAction = await createFile('App/redux/actions', `${name.toLowerCase()}`)
  const onlineActionContent = await getOnlineFileContent('action')
  await replaceFileContentWith(onlineActionContent, 'Action', name.toLowerCase(), createdAction)
  const actionIndexPath = await handle.getPath('App/redux/actions/index.js')
  await importInto(`App/redux/actions/${name.toLowerCase()}.js`, `import { ${impCasesStmt} } from 'redux-types'`, ';')
  await handle.appendToFile(
    ';',
    `export * from './${name.toLowerCase()}'`,
    actionIndexPath.path,
  )
}

async function createSaga(name, casses) {
  const impCasesStmt = casses.join(', ')
  const onlineActionContent = await getOnlineFileContent('saga')
  const wUpdated = await onlineActionContent.replace('watch()', `watch${name.toLowerCase()}()`)
  const sUpdated = await wUpdated.replace('SUCCESS', casses[0])
  const fUpdated = await sUpdated.replace('FAILED', casses[1])
  const tUpdated = await fUpdated.replace(`'TYPE'`, casses[2])
  // const weUpdated = await tUpdated.replace('//handle', `handle`)
  await handle.writeFileSync(`App/redux/sagas/${name.toLowerCase()}.js`, JSON.parse(tUpdated))
  const sagasIndexPath = await handle.getPath('App/redux/sagas/index.js')
  await importInto(`App/redux/sagas/${name.toLowerCase()}.js`, `import { ${impCasesStmt} } from 'redux-types'`, ';')
  await handle.appendToFile(
    ';',
    `import watch${name.toLowerCase()} from './${name.toLowerCase()}'`,
    sagasIndexPath.path
  )
  await handle.appendToFile(
    'yield all([',
    `fork(watch${name.toLowerCase()}),`,
    sagasIndexPath.path
  )
}

async function createReducer(name, casses) {
  const impCasesStmt = casses.join(', ')
  const createdReducer = await createFile('App/redux/reducers', `${name.toLowerCase()}Reducer`)
  const onlineFile = await getOnlineFileContent('reducer')
  await replaceFileContentWith(onlineFile, '', '', createdReducer)
  const reducerIndexPath = await handle.getPath('App/redux/reducers/index.js')
  await importInto(`App/redux/reducers/${name.toLowerCase()}Reducer.js`, `import { ${impCasesStmt} } from 'redux-types'`, ';')
  await handle.appendToFile(
    ';', // occurance
    `import ${name.toLowerCase()} from './${name.toLowerCase()}Reducer';`, // value to replace
    reducerIndexPath.path // path of file
  )
  await handle.appendToFile(
    'combineReducers({', // occurance
    `${name.toLowerCase()},`, // value to replace
    reducerIndexPath.path // path of file
  )
}

async function createTypes(name) {
  const createdTypes = await createFile('App/redux/types', name)
  const onlineTypesContent = await getOnlineFileContent('type')
  const cmnt = await onlineTypesContent.replace('REDUX_CASES', `${name.toUpperCase()}`)
  const rCase = await cmnt.replaceAll('CASE', `${name.toUpperCase()}_CASE`)
  await handle.writeFileSync(`App/redux/types/${name}.js`, JSON.parse(rCase))
  const typesIndexPath = await handle.getPath('App/redux/types/index.js')
  await handle.appendToFile(
    ';',
    `\n export * from './${name}';`,
    typesIndexPath.path
  )
  return [
    `${name.toUpperCase()}_CASE_SUCCESS`,
    `${name.toUpperCase()}_CASE_FAILED`,
    `${name.toUpperCase()}_CASE`
  ]
}

export default async function handleCreateReduxScreen(name, shouldImportComponents) {
  /**
     * - should create screen with index, style files
     * - should create action & export from index
     * - should create saga and export from index
     * - should add types and export from index
     * - should enable add components
     */

  const spin = ora();

  spin.start(`creating types ${name}`)
  const createdTypes = await createTypes(name) // return three types [success,failed, normal]
  spin.succeed(`created ${name} in App/redux/types/${name}.js`)

  spin.start(`creating action ${name}`)
  await createAction(name, createdTypes)
  spin.succeed(`created ${name} in App/redux/actions/${name}.js`)


  spin.start(`creating reducer ${name}`)
  await createReducer(name, createdTypes)
  spin.succeed(`created ${name}Reducer in App/redux/reducers/${name}Reducer.js`)

  spin.start(`creating saga ${name}`)
  await createSaga(name, createdTypes)
  spin.succeed(`created ${name} in App/redux/sagas/${name}.js`)


  if (shouldImportComponents) {
    const componentsPath = await handle.getPath('App/Components')
    ls(componentsPath.path, (files) => {
      getFilesList(files, 'Components', comps => createScreen(name, comps))
      spin.succeed(`components imported`)
    })
  } else {
    createScreen(name)
  }
}
