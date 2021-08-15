module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/base'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'quotes': ['error', 'single', { avoidEscape: true }],
  }
}
