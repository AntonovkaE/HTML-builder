const fs = require('fs');
const path = require('path');
const { mkdir, rm, copyFile } = require('node:fs/promises');
const { join } = require('node:path');
const { copyDir } = require('../04-copy-directory/index');
const { mergeStyle } = require('../05-merge-styles/index');

const templatePath = join(__dirname, 'template.html');
const projectFolder = join(__dirname, 'project-dist');

// Прочтение и сохранение в переменной файла-шаблона
const componentFolder = join(__dirname, 'components');
const components = {};

async function read(file) {
  const data = await fs.promises.readFile(join(__dirname, 'components', file), 'utf-8');
  const fileName = file.split('.')[0];
  components[fileName] = data;
}

async function readFolder(componentFolder) {
  let filesArr = await fs.promises.readdir(componentFolder);
  await Promise.all(
    filesArr.map(async (file) => await read(file)),
  );
}

async function buildPage() {
  await copyDir(join(__dirname, 'assets'), projectFolder)
  await mergeStyle(join(__dirname, 'styles'), join(projectFolder, 'bundle.css'))
  const htmlFile = await fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
  await readFolder(componentFolder);
  // Нахождение всех имён тегов в файле шаблона
// Замена шаблонных тегов содержимым файлов-компонентов
  await fs.readFile(templatePath, 'utf8', function (error, data) {
    htmlFile.write(data.replace(/\{{([^}]+)\}}/gm, (key) => {
      const componentKey = key.substring(2, key.length - 2);
      return components[componentKey];
    }));
  });
}

buildPage().catch(console.error);

// Использовать скрипт написанный в задании 05-merge-styles для создания файла style.css

// Использовать скрипт из задания 04-copy-directory для переноса папки assets в папку project-dist
