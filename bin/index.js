#! /usr/bin/env node

const program = require('commander');
const package = require("../package.json");
const {add} = require('./add')
const {create} = require('./create')
const {generate} = require('./generate')

// 获取版本号
const version = package.version;
program.version(version);

program
  .command('add')
  .description('添加feature')
  .action(add);

program
  .command('create')
  .description('创建项目')
  .action(create);

program
  .command('generate')
  .alias('g')
  .description('生成文件')
  .argument('<type>')
  .argument('[name]')
  .option('-d, --dry', 'not create dir')
  .action((type, name, options) => generate(type, name, options));

program.parse(process.argv);
