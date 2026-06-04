import { base } from '../eslint.config.mjs';
import vue from 'eslint-plugin-vue';
import ts from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';

export default [
  ...base,
  ...vue.configs['flat/recommended'],
  ...ts.configs.recommended,
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: ts.parser,
      },
      globals: {
        window: 'readonly',
        navigator: 'readonly',
      },
    },
    rules: {
      'no-console': 'error',
    },
  },
];
