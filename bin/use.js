const ora = require('ora')
const {mkdirSync} = require('fs')
const { copyFiles} = require('./utils')
const use =  async (name, options) => {
  const root = process.cwd()
  const loading = ora('正在安装中...')
  loading.start()
  console.log("**************************")
  console.log(name, "name")
  console.log("**************************")

  mkdirSync(`${root}/${name}`, { recursive: true });
  copyFiles(`${__dirname}/.template/components/${name}`, `${root}/${name}`)

  loading.succeed('安装成功')
}

module.exports = {
  use
}
