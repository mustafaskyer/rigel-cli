import ls from '../lib/listFiles'
import handle from '../lib/handle'
import getFilesList from '../lib/options'
import getSelectedPath from '../lib/export'
export default async function checkOptions (progrm) {
  const componentsPath = await handle.getPath('App/Components')
  const actionsPath = await handle.getPath('App/redux/actions')
  return new Promise((resolve, reject) => {

    if (progrm.imc) {
      ls(componentsPath.path, (files) => {
        getFilesList(files, 'Components', (selectedComps) => resolve(selectedComps))
      })
      return
    } else if (progrm.ima) {
      ls(actionsPath.path, (files) => {
        getFilesList(files, 'Actions', (selectedActions) => resolve(selectedActions))
      })
    }else if (progrm.export) {
      getSelectedPath((selectedPaths) => resolve(selectedPaths))
    }else {
      resolve(true)
    }

  })
}
