const ora = require('ora')
const addLint  = () =>  {
  const loading = ora('正在下载模版...')
  loading.start()
  setTimeout(() => {
    loading.succeed('创建模版成功!')
  }, 5000)
}

module.exports = {
  addLint
}
