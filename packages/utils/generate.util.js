// file
// dir

const shell = require('shelljs')
const jetpack = require('fs-jetpack')
const { warning } = require('@rigel/logger')
const PrettyError = require('pretty-error')
const pe = new PrettyError()

exports.gFile = ({path, name, type, content}) => {
    const pathExist = jetpack.exists(`${path}/${name}.${type}.js`)
    if(pathExist) {
        warning(`file name exist, can't create file with ${name}.${type}`)
        process.exit()
    }

    try {
        jetpack.file(`${path}/${name}.${type}.js`, { content })
        return true
    } catch (e) {
        console.log(pe.render(e))
    }
}

exports.gDir = (path,name) => {
    const pathExist = jetpack.exists(`${path}/${name}`)
    if(pathExist) {
        warning(`directory exist, can't create directory with ${name}`)
        process.exit()
    }

    try {
        jetpack.dir(`${path}/${name}`)
        return true
    } catch (e) {
        console.log(pe.render(e))
    }
}