import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import neostandard, { plugins, resolveIgnoresFromGitignore } from 'neostandard';

/**
 * neostandard is exporting plugins: n, promise, @stylistic & typescript-eslint
 */
export default [
  {
    ignores: ['.DS_Store', 'coverage', 'dist', 'node_modules', 'storybook-static', '!.*'],
  },
  js.configs.recommended,
  ...neostandard({ ignores: resolveIgnoresFromGitignore() }),
  prettierConfig,
  ...plugins['typescript-eslint'].configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.mjs', '.ts', '.mts', '.d.ts'],
        },
      },
    },
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      'no-useless-constructor': 'off',
    },
  },
];
