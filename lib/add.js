// import _ from 'lodash'
// import ora from 'ora';
// import {
//   scr,
//   comp,
//   // style,
//   reducer,
//   reducerAction,
//   reducerTypes,
//   reducerSagas
// } from './types'
// import {
//   createFile,
//   getOnlineFileContent,
//   replaceFileContentWith,
//   createDir,
//   importInto
// } from './utils'
// import handle from './handle'
// import checkOptions from '../commands/options'
// import program from 'commander'

// const add = async (path, name, obj) => {
//   const spin = ora();
//   switch (path) {
//     case scr: {
//       const res = await checkOptions(program)
//       const createdDir = await createDir('App/screens', name)
//       if (!res.Components && !res.Actions && !res.expor) spin.start(`Adding new Screen ${name}`)
//       if (createdDir) {
//         const p = `App/screens/${name}`
//         const createdScreen = await createFile(p, 'index')
//         const createdStyle = await createFile(p, 'styles')
//         const onlineScreenContent = await getOnlineFileContent('screen')
//         const onlineStyleContent = await getOnlineFileContent('style')
//         await replaceFileContentWith(onlineScreenContent, 'Screen', name, createdScreen)
//         await replaceFileContentWith(onlineStyleContent, 'Screen', name, createdStyle)
        
//         spin.succeed(`Created Succesfully App/screens/${name}`)

//         if (res.Components) {
//           spin.start(`importing components into ${name}`)
//           const sPath = handle.getPath(`App/screens/${name}/index.js`)
//           _.map(res.Components, comp => {
//             importInto(sPath.path, `import ${comp.slice(0, -3)} from 'components/${comp.slice(0, -3)}'`)
//           })
//           spin.succeed(`components imported into App/screens/${name}`)
//         }
//         if (res.Actions) {
//           const sPath = handle.getPath(`App/screens/${name}/index.js`)
//           const impAll = _.map(res.Actions, act => act.slice(0, -3)).join(', ')
//           importInto(sPath.path, `import { ${impAll} } from 'redux-actions'`)
//           await handle.appendToFile(
//             'actions = {', // occurance
//             `${impAll}`, // value to replace
//             sPath.path // path of file
//           )
//           spin.succeed(`actions imported into App/screens/${name}`)
//         }
//         if (obj && obj.export) {
//           const sPath = handle.getPath(res.export)
//           importInto(sPath.path, `import ${name} from 'screens/${name}'`, ';')
//         }
//       }
//       break
//     }
//     case comp: {
//       const res = await checkOptions(program)

//       if (!res.Components && !res.Actions && !res.expor) spin.start(`Adding new Component ${name}`)

//       const createdFile = await createFile('App/Components', name)
//       const onlineFile = await getOnlineFileContent('component')
//       await replaceFileContentWith(onlineFile, 'Component', name, createdFile)
//       if (res.Components) {
//         const sPath = handle.getPath(`App/Components/${name}.js`)
//         _.map(res.Components, comp => {
//           importInto(sPath.path, `import ${comp.slice(0, -3)} from 'components/${comp.slice(0, -3)}'`)
//         })
//         spin.succeed(`components imported into App/Components/${name}`)
//       }
//       if (res.Actions) {
//         const sPath = handle.getPath(`App/Components/${name}.js`)
//         const impAll = _.map(res.Actions, act => act.slice(0, -3)).join(', ')
//         importInto(sPath.path, `import { ${impAll} } from 'redux-actions'`)
//         spin.succeed(`actions imported into App/Components/${name}`)
//       }

//       spin.succeed(`created ${name} in App/Components/${name}.js`)

//       return
//     }
//     case reducer: {
//       spin.start(`creating new reducer ${name}Reducer`)

//       const createdReducer = await createFile('App/redux/reducers', `${name}Reducer`)
//       const onlineFile = await getOnlineFileContent('reducer')
//       await replaceFileContentWith(onlineFile, '', '', createdReducer)
//       const reducerIndexPath = await handle.getPath('App/redux/reducers/index.js')
//       spin.succeed(`created App/redux/reducers/${name}Reducer.js`)

//       spin.start(`Adding ${name}Reducer to CombineReducer in App/redux/reducers/index.js`)
//       await handle.appendToFile(
//         ';', // occurance
//         `import ${name.toLowerCase()} from './${name}Reducer';`, // value to replace
//         reducerIndexPath.path // path of file
//       )
//       await handle.appendToFile(
//         'combineReducers({', // occurance
//         `${name.toLowerCase()},`, // value to replace
//         reducerIndexPath.path // path of file
//       )
//       spin.succeed(`${name}Reducer Added Successfully to combineReducer in App/redux/reducers/index.js`)
//       return
//     }

//     case reducerAction: {

//       spin.start(`creating new ${name}`)
//       const createdAction = await createFile('App/redux/actions', `${name}`)
//       const onlineActionContent = await getOnlineFileContent('action')
//       await replaceFileContentWith(onlineActionContent, 'Action', name, createdAction)
//       const actionIndexPath = await handle.getPath('App/redux/actions/index.js')
//       spin.succeed(`created ${name} in App/redux/actions/${name}.js`)

//       spin.start(`export ${name} from App/redux/actions/index.js`)
//       await handle.appendToFile(
//         ';',
//         `export * from './${name}'`,
//         actionIndexPath.path
//       )
//       spin.succeed('exported Successfully from App/redux/actions/index.js')
//       return
//     }

//     case reducerSagas: {

//       spin.start(`creating new saga ${name}`)
//       const createdAction = await createFile('App/redux/sagas', `${name}`)
//       const onlineActionContent = await getOnlineFileContent('saga')
//       await replaceFileContentWith(onlineActionContent, 'watch()', `watch${name}() `, createdAction)
//       const sagasIndexPath = await handle.getPath('App/redux/sagas/index.js')
//       spin.succeed(`created ${name} in App/redux/sagas/${name}.js`)

//       spin.start(`import watch${name} into App/redux/sagas/index.js`)
//       spin.text = `adding watch${name} to rootSaga in App/redux/sagas/index.js`
//       await handle.appendToFile(
//         ';',
//         `import watch${name} from './${name}';`,
//         sagasIndexPath.path
//       )
//       await handle.appendToFile(
//         'yield all([',
//         `fork(watch${name}),`,
//         sagasIndexPath.path
//         )
//         spin.succeed(`imported watch${name} into App/redux/sagas/index.js & added to rootSaga`)
//       return
//     }

//     case reducerTypes: {
//       spin.start(`creating new type ${name}`)
//       const createdTypes = await createFile('App/redux/types', `${name}`)
//       const onlineTypesContent = await getOnlineFileContent('type')
//       await replaceFileContentWith(onlineTypesContent, 'REDUX_CASES', `${name.toUpperCase()} REDUX_CASES`, createdTypes)
//       await replaceFileContentWith(onlineTypesContent, 'CASE_SUCCESS', `${name.toUpperCase()}_CASE_SUCCESS`, createdTypes)
//       await replaceFileContentWith(onlineTypesContent, 'CASE_FAILED', `${name.toUpperCase()}_CASE_FAILED`, createdTypes)
//       await replaceFileContentWith(onlineTypesContent, 'CASE', `${name.toUpperCase()}_CASE`, createdTypes)
//       spin.succeed(`created ${name} in App/redux/types/${name}.js`)

//       spin.start(`export new types from App/redux/types/index.js`)
//       const typesIndexPath = await handle.getPath('App/redux/types/index.js')
//       await handle.appendToFile(
//         ';',
//         `export * from './${name}'`,
//         typesIndexPath.path
//       )
//       spin.succeed(`exported ${name} from App/redux/types/index.js`)
//     }
//   }
// }

// const handleOptions = (list, input, obj) => {
//   add(list.selected, input, obj)
// }

// module.exports = { handleOptions }
