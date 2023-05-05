const fs = require('fs');
const path = require('path');
const { mkdir, copyFile, constants, rm } = require('node:fs/promises');


const folder = path.join(__dirname, 'styles');
fs.readdir(folder, { withFileTypes: true }, (err, files) => {
  let inf = [];
  files.forEach(file => {
    if (file.isFile() && path.extname(file.name) === '.css') {
      inf.push(fs.readFileSync(path.join(__dirname, 'styles', file.name), 'utf8'));
    }
  });
  fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'),
    inf.join('\n'),
    function (error) {
      if (error) throw error; // если возникла ошибка
      console.log('Запись файла завершена');
    });
});
