const {input, select} = require('@inquirer/prompts')
const {copyFiles} = require('./utils')
const ora = require('ora')
const create = async () => {
  const root = process.cwd()
  let projectName, projectType
  try {
    projectName = await input({
      message: '请输入项目名称:',
      default: 'mp-project'
    })
    projectType = await select({
      message: '请输入项目类型:',
      choices: [
        {
          name: '淘宝小程序(taobao-miniapp)',
          value: 'taobao-miniapp'
        },
        {
          name: '淘宝小部件(taobao-livecard)',
          value: 'taobao-livecard'
        },
        {
          name: '千牛小程序(qianniu-miniapp)',
          value: 'qianniu-miniapp'
        }
      ]
    })
    console.log("项目名称", projectName)
    console.log("项目类型", projectType)
    const loading = ora('正在添加生成中...')
    loading.start()
    const dirPath = `${root}/${projectName}`
    try {
      fs.mkdirSync(dirPath, { recursive: true });
      copyFiles(`${__dirname}/.template/${projectType}`, dirPath)
      loading.succeed('项目创建成功!')
    } catch (error) {
      console.error('目录创建失败', error);
      return
    }
  } catch (error) {
    if(error.isTtyError) {
      console.error('Inquirer cannot run in this environment');
    } else {
      // User force closed
      console.log('Bye!')
    }
    return
  }
}

module.exports = {
  create
}
