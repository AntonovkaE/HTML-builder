const fs = require('fs');
const path = require('path');

const folder = path.join(__dirname, 'secret-folder')
fs.readdir(folder, { withFileTypes: true }, (err, files) => {
  files.forEach(file => {
    let inf = ''
    if (file.isFile()) {
      fs.stat(path.join(__dirname, 'secret-folder', file.name), (err, stats) => {
        inf = `${file.name.split('.')[0]} - ${path.extname(file.name).split('.')[1]} - ${stats.size.toString()}b`
        console.log(inf);
      })
    }
  });
});

