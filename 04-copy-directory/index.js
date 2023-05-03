const { mkdir, copyFile, constants, rm } = require('node:fs/promises');
const { join } = require('node:path');
const fs = require('fs');
const path = require('path');

async function copyDir() {
  const projectFolder = join(__dirname, 'files-copy');
  fs.readdir(projectFolder, { withFileTypes: true }, (err, files) => {
    if (files) {
      files.forEach(file => {
        rm(path.join(__dirname, 'files-copy', file.name));
      });
    }
  });
  const dirCreation = await mkdir(projectFolder, { recursive: true });
  const folder = path.join(__dirname, 'files');
  fs.readdir(folder, { withFileTypes: true }, (err, files) => {
    if (files) {
      files.forEach(file => {
        copyFile(path.join(__dirname, 'files', file.name), path.join(__dirname, 'files-copy', file.name));
      });
    }
  });
  return dirCreation;
}

copyDir().catch(console.error);
