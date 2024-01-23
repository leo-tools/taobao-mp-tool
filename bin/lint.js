const ora = require('ora')
const fs = require('fs')
const { execSync } = require('child_process')
const {copyFiles} = require('./utils')
const {input} = require('@inquirer/prompts')

const addLintStaged = (package) => {
  if (!package["lint-staged"]) {
    package["lint-staged"] = {
      "*.{js}": [
        "eslint --fix",
        "prettier --write"
      ]
    }
  } else {
    package["lint-staged"]["*.{js}"] = [
      "eslint --fix",
      "prettier --write"
    ]
  }
}

const addDevDependencies = (package) => {
  if (!package.devDependencies) {
    package.devDependencies = {
      "@commitlint/cli": "^18.4.4",
      "commitlint-config-jira": "^1.6.4",
      "commitlint-plugin-jira-rules": "^1.6.4",
      "eslint": "^8.56.0",
      "eslint-config-prettier": "^9.1.0",
      "husky": "^8.0.0",
      "lint-staged": "^15.2.0",
      "prettier": "3.2.4"
    }
  } else {
    package.devDependencies["@commitlint/cli"] ="^18.4.4",
    package.devDependencies["commitlint-config-jira"]= "^1.6.4",
    package.devDependencies["commitlint-plugin-jira-rules"]= "^1.6.4",
    package.devDependencies["eslint"]= "^8.56.0",
    package.devDependencies["eslint-config-prettier"]= "^9.1.0",
    package.devDependencies["husky"]= "^8.0.0",
    package.devDependencies["lint-staged"]= "^15.2.0",
    package.devDependencies["prettir"] = "3.2.4"
  }
}
const addLint  = async () =>  {
  const loading = ora('正在添加 lint 模板...')
  loading.start()
  const root = process.cwd()

  if (fs.existsSync(`${root}/package.json`)) {
    let packageJSON = require(`${root}/package.json`)

    addDevDependencies(packageJSON)

    addLintStaged(packageJSON)

    fs.writeFileSync(`${root}/package.json`, JSON.stringify(packageJSON, null, 2))
  } else {
    loading.stop()
    const projectName = await input({
      message: '请输入项目名称:',
      default: 'mp-project'
    })
    loading.start()
    fs.writeFileSync(`${root}/package.json`, '{\n' +
      `  "name": "${projectName}",
` +
      '  "version": "1.0.0",\n' +
      '  "main": "",\n' +
      '  "scripts": {\n' +
      '    "lint": "eslint --ext .js --fix ./client",\n' +
      '    "prettier": "prettier --write ./client --ext .js",\n' +
      '    "prepare": "husky install"\n' +
      '  },\n' +
      '  "devDependencies": {\n' +
      '    "@commitlint/cli": "^18.4.4",\n' +
      '    "commitlint-config-jira": "^1.6.4",\n' +
      '    "commitlint-plugin-jira-rules": "^1.6.4",\n' +
      '    "eslint": "^8.56.0",\n' +
      '    "eslint-config-prettier": "^9.1.0",\n' +
      '    "husky": "^8.0.0",\n' +
      '    "lint-staged": "^15.2.0",\n' +
      '    "prettier": "3.2.4"\n' +
      '  },\n' +
      '  "lint-staged": {\n' +
      '    "*.{js}": [\n' +
      '      "eslint --fix",\n' +
      '      "prettier --write"\n' +
      '    ]\n' +
      '  }\n' +
      '}\n')
  }

  copyFiles(`${__dirname}/.template/lint`, root)

  try {
    execSync('npm install', { stdio: 'inherit' });
    loading.succeed('添加 lint 成功!')
  } catch (error) {
    console.error(`Error executing npm install: ${error}`);
    loading.fail('添加 lint 失败!')
  }
}

module.exports = {
  addLint
}
