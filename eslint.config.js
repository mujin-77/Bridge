import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import globals from 'globals'

export default [
  js.configs.recommended,
  ...vue.configs['flat/recommended'],

  {
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'vue/multi-word-component-names': 'off',
      'indent': ['error', 2],       // 缩进 2 空格
      'quotes': ['error', 'single'], // 单引号
      'semi': ['error', 'never'],
    },
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  }
]