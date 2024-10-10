import { fixupPluginRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import testingLibrary from 'eslint-plugin-testing-library'
import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

export default [
  {
    ignores: ['src/assets/*', 'src/stories/assets/*']
  },
  ...compat.extends(
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:storybook/recommended',
    'plugin:vitest-globals/recommended'
  ),
  {
    plugins: {
      react,
      'testing-library': testingLibrary,
      'react-hooks': fixupPluginRules(reactHooks)
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        'vitest-globals/env': true
      },
      ecmaVersion: 2021,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      'prefer-arrow-callback': ['error'],
      'react/jsx-boolean-value': 'error',
      'react/jsx-closing-bracket-location': 'error',
      'react/jsx-equals-spacing': 'error',
      'react/jsx-first-prop-new-line': 'error',
      'react/jsx-handler-names': 'error',
      'react/jsx-key': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-pascal-case': 'error',
      'react/jsx-sort-props': 'error',
      'react/jsx-no-useless-fragment': [
        'error',
        {
          allowExpressions: true
        }
      ],
      'react/jsx-max-depth': [
        'error',
        {
          max: 6
        }
      ],
      'react/jsx-wrap-multilines': [
        'error',
        {
          declaration: 'parens',
          assignment: 'parens',
          return: 'parens-new-line',
          arrow: 'parens',
          condition: 'parens',
          logical: 'parens',
          prop: 'ignore'
        }
      ],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/prop-types': 'off'
    }
  },
  ...compat
    .extends(
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking'
    )
    .map((config) => ({
      ...config,
      files: ['**/*.ts', '**/*.tsx']
    })),
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': typescriptEslint
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'script',
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.eslint.json'
      }
    },
    rules: {
      '@typescript-eslint/no-restricted-imports': [
        'warn',
        {
          name: 'react-redux',
          importNames: ['useSelector', 'useDispatch'],
          message:
            'Use typed hooks `useAppDispatch` and `useAppSelector` instead.'
        }
      ]
    }
  },
  {
    files: ['**/tests/**/*.*.js', '**/tests/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.jest
      }
    }
  },
  {
    files: ['**/*.stories.*'],
    rules: {
      'import/no-anonymous-default-export': 'off'
    }
  }
]
