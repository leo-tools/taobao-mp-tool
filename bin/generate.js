const ora = require('ora')
const {copyFileContent} = require('./utils')
const {mkdirSync} = require('fs')

const generate = async (type, name, options) => {
  const root = process.cwd()
  const path = `${root}/${name}`
  let destinationFilePrePath
  const loading = ora('正在生成中...')
  loading.start()

  let templatePath = `${__dirname}/.template`

  if (type === 'c' || type === 'component') {
    templatePath = `${__dirname}/.template/component`
  }

  if (type === 'p' || type === 'page') {
    templatePath = `${__dirname}/.template/page`
  }

  if (options.dry) {
    destinationFilePrePath = root
  } else {
    mkdirSync(path)
    destinationFilePrePath = path
  }

  await copyFileContent(`${templatePath}/index.js`, `${destinationFilePrePath}/${name}.js`)
  await copyFileContent(`${templatePath}/index.json`, `${destinationFilePrePath}/${name}.json`)
  await copyFileContent(`${templatePath}/index.axml`, `${destinationFilePrePath}/${name}.axml`)
  await copyFileContent(`${templatePath}/index.acss`, `${destinationFilePrePath}/${name}.acss`)

  loading.succeed('生成成功')
}

module.exports = {
  generate
}
