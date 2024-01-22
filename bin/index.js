#! /usr/bin/env node

const program = require('commander');
const { select } = require('@inquirer/prompts');
const package = require("../package.json");
const { addLint } = require('./lint')

// 获取版本号
const version = package.version;
program.version(version);

// 初始化项目
program
  .command('add')
  .description('添加feature')
  .action(async () => {
    let name
    try {
      name = await select({
        message: '请选择:',
        choices: [
          {
            name: 'lint',
            value: 'lint'
          },
        ]
      })
    } catch (error) {
      if(error.isTtyError) {
        console.error('Inquirer cannot run in this environment');
      } else {
        // User force closed
        console.log('Bye!')
      }
      return
    }

    console.log("添加的feature为", name)
    if (name === 'lint') {
      addLint()
    }
  });

program
  .command('create')
  .description('创建项目')
  .action(async () => {
    let name
    try {
      const name = await select({
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
      console.log("项目类型", name)
    } catch (error) {
      if(error.isTtyError) {
        console.error('Inquirer cannot run in this environment');
      } else {
        // User force closed
        console.log('Bye!')
      }
      return
    }
  });

program.parse(process.argv);
