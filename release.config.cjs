/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
  branches: ["master"],
  plugins: [
    '@semantic-release/npm',  // 发布到NPM
    '@semantic-release/github',
    [
      '@semantic-release/git',
      {
        assets: ['package.json'] // 前面说到日志记录和版本好是新增修改的，需要 push 回 Git
      }
    ]
  ]
};
