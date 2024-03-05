module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vitest-globals/env': true
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:storybook/recommended',
    'plugin:vitest-globals/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  plugins: ['react', 'testing-library', 'react-hooks'],
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
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.eslint.json'
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
      ],
      plugins: ['@typescript-eslint'],
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
      env: {
        jest: true
      }
    },
    {
      files: ['**/*.stories.*'],
      rules: {
        'import/no-anonymous-default-export': 'off'
      }
    }
  ]
}
