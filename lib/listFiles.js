const fs = require('fs')
const ls = (path, cb) => {
  return fs.readdir(path, function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err)
    }
    cb(files)
  })
}

export default ls
