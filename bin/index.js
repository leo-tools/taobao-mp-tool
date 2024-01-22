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
    const name = await select({
      message: '请选择:',
      choices: [
        {
          name: 'lint',
          value: 'lint'
        },
      ]
    })
    console.log("feature", name)
    if (name === 'lint') {
      addLint()
    }
  });

program.parse(process.argv);
