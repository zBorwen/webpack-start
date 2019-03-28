module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 0,
    // allow paren-less arrow functions
    'arrow-parens': 0
    // allow async-await
    // 'generator-star-spacing': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
