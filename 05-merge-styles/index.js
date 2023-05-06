const fs = require('fs');
const path = require('path');
const { mkdir, copyFile, constants, rm } = require('node:fs/promises');
const { join } = require('node:path');

// После завершения работы скрипта в папке project-dist должен находиться файл bundle.css содержащий стили из всех файлов папки styles.
const folder = path.join(__dirname, 'styles');
const projectDistFolder = path.join(__dirname, 'project-dist', 'bundle.css');

async function readFolder(componentFolder) {
  let filesArr = await fs.promises.readdir(componentFolder);
  await Promise.all(
    filesArr.map(async (file) => await read(file)),
  );
}

async function read(file) {
  const data = await fs.promises.readFile(join(__dirname, 'components', file), 'utf-8');
}

async function mergeStyle(startFolder, finishFolder) {
  let inf = [];
  await fs.readdir(startFolder, { withFileTypes: true }, async (err, files) => {
    await Promise.all(
      files.map(async (file) => {

      if (file.isFile() && path.extname(file.name) === '.css') {
        const data = await fs.promises.readFile(join(startFolder, file.name), 'utf-8');
        inf.push(data);
      }
    }));
    fs.appendFile(finishFolder,
      inf.join('\n'),
      function (error) {
        if (error) throw error; // если возникла ошибка
        console.log('Запись файла завершена');
      });
  });
}

mergeStyle(folder, projectDistFolder).catch(error => console.log(error));

module.exports = { mergeStyle };


