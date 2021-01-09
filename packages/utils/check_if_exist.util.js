const jetpack = require('fs-jetpack');
const PrettyError = require('pretty-error');
const pe = new PrettyError()
function checkIfExist(path, name, type) {
    /**
     * types
     * -d => dir
     * -f => file
     * -e => exists
     */
    try {
        return Promise.resolve(jetpack.existsAsync(`${path}/${name}.${type}.js`))
    } catch (e) {
        console.log(pe.render(e))
    }
    
}

module.exports = checkIfExist