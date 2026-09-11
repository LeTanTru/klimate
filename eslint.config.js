import js from '@eslint/js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),

  {
    files: ['**/*.{js,jsx,ts,tsx}'],

    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite
    ],

    languageOptions: {
      globals: globals.browser
    },

    plugins: {
      react
    },

    settings: {
      react: {
        version: 'detect'
      }
    },

    rules: {
      'react/jsx-uses-react': 'error',
      'react/react-in-jsx-scope': 'error',

      // TypeScript
      'no-unused-vars': 'off',

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],

      '@typescript-eslint/no-explicit-any': 'warn',

      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',

      // React
      'react/jsx-no-target-blank': 'error',
      'react/prop-types': 'off',
      'react/display-name': 'off',

      // Code quality
      'no-console': 'warn',
      'no-debugger': 'warn',
      'no-duplicate-imports': 'warn',
      'no-multi-spaces': 'warn',
      'no-unexpected-multiline': 'warn',

      'no-empty-function': 'off',
      'prefer-const': 'off',

      // Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    }
  }
])
