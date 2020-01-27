
import handle from './handle'

export const isMac = process.platform === 'darwin'
export const isWindows = process.platform === 'win32'
export const isLinux = process.platform === 'linux'

export const REPO_LINK = 'https://github.com/mustafaskyer/rigel-rn'

export async function createFile (path, name) {
  try {
    const p = handle.getPath(path)
    if (p.status) {
      const filePath = `${p.path}/${name}.js`
      const res = await handle.touchFile(filePath)
      if (res.code === 0) {
        return filePath
      } else {
        console.error(`Failed To Create file ${name}, ${p.message}`)
      }
    } else {
      console.error(`Failed To Create file ${name}, ${p.message}`)
    }
  } catch (e) {
    console.error('ERROR_createFile ', e)
  }
}

export async function createDir (path, name) {
  try {
    const p = handle.getPath(path) // 'App/screens'
    if (p.status) {
      // make dir
      await handle.mkdir(`${p.path}/${name}`)
      return `${p.path}/${name}`
    }
  } catch (error) {
    console.error('ERROR_createDir ', error)
  }
}

export async function getOnlineFileContent (url) {
  try {
    const file = await handle.getFile(url)
    return JSON.stringify(file)
  } catch (err) {
    console.error('ERROR_getOnlineFileContent')
  }
}

export async function replaceFileContentWith (onlineFileContent, replacement, name, createdFile) {
  try {
    const _fstr = await handle.replaceAll(onlineFileContent, replacement, `${name}`)
    await handle.writeFileSync(createdFile, JSON.parse(_fstr))
    return true
  } catch (err) {
    console.error('ERROR_replaceFileContentWith: \n', err)
  }
}

export async function importInto (path, imp, occ) {
  try {
    await handle.appendToFile(
      occ || 'from \'react-native\';' || ';', // occurance
      imp,
      path // path of file
    )
    return true
  } catch (error) {
    console.error('ERROR_importInto', error)
  }
}
