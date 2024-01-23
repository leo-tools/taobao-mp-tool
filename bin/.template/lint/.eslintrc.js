module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    indent: ['error', 4],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'no-undef': 0,
    'no-dupe-args': 2,
    'no-dupe-keys': 2,
    'no-extra-semi': 2,
    eqeqeq: [2, 'always'],
    'no-extra-label': 2,
    'block-spacing': 2,
    'func-names': 0,
    'arrow-body-style': [2, 'as-needed'],
    'import/no-unresolved': 0,
    'import/no-commonjs': 'off',
    'no-param-reassign': 2,
    'no-return-assign': [2, 'always'],
    'no-unused-vars': [0],
    'no-shadow': 'off',
    'no-mixed-operators': [
      0,
      {
        groups: [
          ['&', '|', '^', '~', '<<', '>>', '>>>'],
          ['&&', '||'],
        ],
        allowSamePrecedence: true,
      },
    ],
    'max-len': [
      2,
      {
        code: 230,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
  },
}
