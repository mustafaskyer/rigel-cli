const fs = require('fs')
const ls = (path, cb) => {
  return fs.readdir(path, function (err, files) {
    if (err) {
      return console.error('Unable to scan directory: ' + err)
    }
    cb(files.filter(file => file !== 'index.js'))
  })
}

export default ls
