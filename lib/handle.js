
const baseUrl = 'https://raw.githubusercontent.com/mustafaskyer/rigel-lib/master/lib/'

const fs = require('fs')
const shell = require('shelljs')
var request = require('request')
/**
 * @returns
 */
const handle = (function () {
  String.prototype.replaceAll = function (search, replacement) {
    var target = this
    return target.split(search).join(replacement)
  }
  String.prototype.insert = function (index, string) {
    if (index > 0) { return this.substring(0, index) + string + this.substring(index, this.length) }

    return string + this
  }
  var count = 0
  function getPath (p) {
    if (count > 5) { return { status: false, message: "make sure you're inside arigel app" } }
    if (fs.existsSync('.rigel')) {
      return {
        status: true,
        path: `${process.cwd()}/${p}`,
        message: 'success'
      }
    }
    shell.cd('../')
    count++
    return getPath(p)
  }

  /**
     * @param {any} path
     * @returns
     */
  async function touchFile (path) {
    return shell.touch(path)
  }

  /**
     * @param {any} file
     * @returns
     */
  async function getFile (file) {
    return new Promise((resolve, reject) => {
      request.get(`${baseUrl}${file}.js`, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          return resolve(body)
        } else {
          return reject(error)
        }
      })
    })
  }

  /**
     * @param {any} str
     * @returns
     */
  function replaceAll (str, occur, replace) {
    const _str = String(str)
    return _str.replaceAll(occur, replace)
  }

  /**
     * @param {any} path
     * @param {any} file
     * @returns
     */
  function writeFileSync (path, file) {
    return fs.writeFileSync(path, file)
  }

  /**
     * @param {any} path
     * @returns
     */
  function mkdir (path) {
    const exist = fs.existsSync(path)
    if (!exist) {
      return shell.mkdir(path)
    }
  }

  async function appendToFile (search, newVal, path) {
    const file = fs.readFileSync(path, 'utf8')
    const position = file.indexOf(search)
    const _str = file.toString()
    if (position > 0) {
      const inc = position + search.length + 1
      const newStr = _str.insert(inc, `\t${newVal}\n`)
      fs.writeFileSync(path, newStr)
    }
  }

  return {
    getPath,
    touchFile,
    getFile,
    replaceAll,
    writeFileSync,
    mkdir,
    appendToFile
  }
})()

export default handle
