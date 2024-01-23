const {input, select} = require('@inquirer/prompts')
const {copyFiles} = require('./utils')
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
    copyFiles(`${root}/.template/${projectType}`, root)
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
