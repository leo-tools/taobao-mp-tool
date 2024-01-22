const ora = require('ora')
const fs = require('fs')
const { execSync } = require('child_process')
const {copyFiles} = require('./utils')

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
const addLint  = () =>  {
  const loading = ora('正在添加 lint 模板...')
  loading.start()
  const root = process.cwd()
  let packageJSON = require(`${root}/package.json`)

  addDevDependencies(packageJSON)

  addLintStaged(packageJSON)

  fs.writeFileSync(`${root}/package.json`, JSON.stringify(packageJSON, null, 2))

  copyFiles(`${root}/.template/lint`, root)

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
