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

program.parse(process.argv);
