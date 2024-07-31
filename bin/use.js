const ora = require('ora')
const {mkdirSync} = require('fs')
const { copyFiles} = require('./utils')
const use =  async (name, options) => {
  const root = process.cwd()
  const loading = ora('正在安装中...')
  const [prefix, componentName] = name.split('/')
  loading.start()

  mkdirSync(`${root}/${componentName}`, { recursive: true });
  copyFiles(`${__dirname}/.template/components/${name}`, `${root}/${componentName}`)

  loading.succeed('安装成功')
}

module.exports = {
  use
}
