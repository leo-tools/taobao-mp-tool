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

module.exports = {
  copyFiles
}
