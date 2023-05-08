const { mkdir, copyFile, rm } = require('node:fs/promises');
const { join } = require('node:path');
const fs = require('fs');
const path = require('path');

const projectFolder = join(__dirname, 'files-copy');
const folder = path.join(__dirname, 'files');

async function copyDir(folder, projectFolder) {
  async function cleanFolder(folder) {
    await fs.readdir(folder, { withFileTypes: true }, (err, files) => {
      if (files) {
        files.forEach(file => {
          if (file.isFile()) {
            console.log(file, 'delete')
            rm(path.join(folder, file.name));
          }
          else {
            cleanFolder(path.join(folder, file.name))
          }
        });
      }
    });
  }
  const dirCreation = await mkdir(projectFolder, { recursive: true });

  async function copyFiles(folder, folderResult) {
    await fs.readdir(folder, { withFileTypes: true }, (err, files) => {
      if (files) {
        files.forEach(file => {
          if (file.isFile()) {
            copyFile(path.join(folder, file.name), path.join(folderResult, file.name));
          } else {
            mkdir(path.join(projectFolder, file.name), { recursive: true })
            copyFiles(path.join(folder, file.name), path.join(projectFolder, file.name),)
          }
        });
      }
    });
  }

  cleanFolder(projectFolder)
    .then(data => copyFiles(folder, projectFolder))
    .catch(err => console.log(err))

  return dirCreation;
}

copyDir(folder, projectFolder).catch(console.error);

module.exports = { copyDir };
