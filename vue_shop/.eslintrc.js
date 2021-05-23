module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "vue/no-unused-components": "off",
    'template-curly-spacing': 'off',
    'vue/no-unused-vars': 'off',
    'no-useless-escape': 'off',
    'no-unused-vars': 'off'
  }
}