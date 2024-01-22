#! /usr/bin/env node

const program = require('commander');
const { select } = require('@inquirer/prompts');
const package = require("../package.json");

// 获取版本号
const version = package.version;
program.version(version);

// 初始化项目
program
  .command('init')
  .description('初始化项目')
  .action(async () => {
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
  });

program.parse(process.argv);
