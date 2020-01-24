import _ from 'lodash'
import {
  scr,
  comp,
  // style,
  reducer,
  reducerAction,
  reducerTypes,
  reducerSagas
} from './types'
import {
  createFile,
  getOnlineFileContent,
  replaceFileContentWith,
  createDir,
  importInto
} from './utils'
import handle from './handle'

const add = async (path, name, res) => {
  switch (path) {
    case scr: {
      const createdDir = await createDir('App/screens', name)
      if (createdDir) {
        const p = `App/screens/${name}`
        const createdScreen = await createFile(p, 'index')
        const createdStyle = await createFile(p, 'styles')
        const onlineScreenContent = await getOnlineFileContent('screen')
        const onlineStyleContent = await getOnlineFileContent('style')
        await replaceFileContentWith(onlineScreenContent, 'Screen', name, createdScreen)
        await replaceFileContentWith(onlineStyleContent, 'Screen', name, createdStyle)

        if (res.Components) {
          const sPath = handle.getPath(`App/screens/${name}/index.js`)
          _.map(res.Components, comp => {
            importInto(sPath.path, `import ${comp.slice(0, -3)} from 'components/${comp.slice(0, -3)}'`)
          })
        }
        if (res.Actions) {
          const sPath = handle.getPath(`App/screens/${name}/index.js`)
          const impAll = _.map(res.Actions, act => act.slice(0, -3)).join(', ')
          importInto(sPath.path, `import { ${impAll} } from 'redux-actions'`)
          await handle.appendToFile(
            'actions = {', // occurance
                        `${impAll}`, // value to replace
                        sPath.path // path of file
          )
        }
        if (res.export) {
          const sPath = handle.getPath(res.export)
          importInto(sPath.path, `import ${name} from 'screens/${name}'`, ';')
        }
      }
      break
    }
    case comp: {
      const createdFile = await createFile('App/Components', name)
      const onlineFile = await getOnlineFileContent('component')
      await replaceFileContentWith(onlineFile, 'Component', name, createdFile)
      if (res.Components) {
        const sPath = handle.getPath(`App/Components/${name}.js`)
        _.map(res.Components, comp => {
          importInto(sPath.path, `import ${comp.slice(0, -3)} from 'components/${comp.slice(0, -3)}'`)
        })
      }
      if (res.Actions) {
        const sPath = handle.getPath(`App/Components/${name}.js`)
        const impAll = _.map(res.Actions, act => act.slice(0, -3)).join(', ')
        importInto(sPath.path, `import { ${impAll} } from 'redux-actions'`)
      }

      return
    }
    case reducer: {
      const createdReducer = await createFile('App/redux/reducers', `${name}Reducer`)
      const onlineFile = await getOnlineFileContent('reducer')
      await replaceFileContentWith(onlineFile, '', '', createdReducer)
      const reducerIndexPath = await handle.getPath('App/redux/reducers/index.js')

      await handle.appendToFile(
        'from "redux";', // occurance
                `import ${name.toLowerCase()} from './${name}Reducer';`, // value to replace
                reducerIndexPath.path // path of file
      )

      await handle.appendToFile(
        'combineReducers({', // occurance
        name.toLowerCase(), // value to replace
        reducerIndexPath.path // path of file
      )
      return
    }

    case reducerAction: {
      const createdAction = await createFile('App/redux/actions', `${name}`)
      const onlineActionContent = await getOnlineFileContent('action')
      await replaceFileContentWith(onlineActionContent, 'Action', name, createdAction)
      const actionIndexPath = await handle.getPath('App/redux/actions/index.js')
      await handle.appendToFile(
        ';',
                `export * from './${name}'`,
                actionIndexPath.path
      )
      return
    }

    case reducerSagas: {
      const createdAction = await createFile('App/redux/sagas', `${name}`)
      const onlineActionContent = await getOnlineFileContent('saga')
      await replaceFileContentWith(onlineActionContent, 'watch()', `watch${name}() `, createdAction)
      const sagasIndexPath = await handle.getPath('App/redux/sagas/index.js')
      await handle.appendToFile(
        ';',
                `import { watch${name} } from './${name}'`,
                sagasIndexPath.path
      )
      await handle.appendToFile(
        'yield all([',
                `fork(watch${name})`,
                sagasIndexPath.path
      )
      return
    }

    case reducerTypes: {
      const createdTypes = await createFile('App/redux/types', `${name}`)
      const onlineTypesContent = await getOnlineFileContent('type')
      await replaceFileContentWith(onlineTypesContent, 'REDUX_CASES', `${name.toUpperCase()} REDUX_CASES`, createdTypes)
      await replaceFileContentWith(onlineTypesContent, 'CASE_SUCCESS', `${name.toUpperCase()}_CASE_SUCCESS`, createdTypes)
      await replaceFileContentWith(onlineTypesContent, 'CASE_FAILED', `${name.toUpperCase()}_CASE_FAILED`, createdTypes)
      await replaceFileContentWith(onlineTypesContent, 'CASE', `${name.toUpperCase()}_CASE`, createdTypes)
      const typesIndexPath = await handle.getPath('App/redux/types/index.js')
      await handle.appendToFile(
        ';',
                `export * from './${name}'`,
                typesIndexPath.path
      )
    }
  }
}

const getAnswers = (list, input, res) => {
  add(list.selected, input, res)
}

module.exports = { getAnswers }
