module.exports = {
  plugins: ['commitlint-plugin-jira-rules'],
  extends: ['jira'],
  rules: {
    'jira-task-id-project-key': [2, 'always', ['CNTMALL']],
    'jira-task-id-max-length': [0],
  },
}
