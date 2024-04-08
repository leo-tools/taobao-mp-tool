const fs = require('fs');
const path = require('path');

const copyFiles = function(src, dest) {

  fs.readdirSync(src).forEach(file => {
    let srcFile = path.join(src, file);
    let destFile = path.join(dest, file);

    let stat = fs.statSync(srcFile);

    if (stat && stat.isDirectory()) {
      try { fs.mkdirSync(destFile); } catch(e) { /* 可能已经存在 */ }
      copyFiles(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
    }
  });
}

const copyFileContent = (sourceFile, destinationFile) => new Promise((resolve, reject) => {
  fs.readFile(sourceFile, 'utf8', function(err, data){
    if (err) {
      reject(err)
    }
    fs.writeFile(destinationFile, data, 'utf8', function(err){
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    });
  });
})

module.exports = {
  copyFiles,
  copyFileContent
}
