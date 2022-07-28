const path = require('path')

module.exports = {
  webpack: {
    alias: {
      '~': path.resolve(__dirname, 'src/'),
      '~tests': path.resolve(__dirname, 'tests/')
    }
  },
  jest: {
    configure: {
      roots: ['<rootDir>/tests'],
      moduleNameMapper: {
        '^~/(.*)$': '<rootDir>/src/$1',
        '^~tests/(.*)$': '<rootDir>/tests/$1'
      },
      testMatch: [
        '<rootDir>/tests/unit/**/*.spec.js',
      ],
      setupFilesAfterEnv: ['<rootDir>/tests/setup-tests.js'],
      collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!<rootDir>/node_modules/',
        '!<rootDir>/path/to/dir/',
        '!src/*.js',
        '!src/constants/**/*.js',
        '!src/plugins/**/*.js',
        '!src/services/setup-interceptors.js',
        '!src/stories/**/*.{js,jsx,css}'
      ],
      coverageThreshold: {
        'global': {
          'branches': 80,
          'functions': 80,
          'lines': 80,
          'statements': 80
        }
      },
      coverageReporters: ['html', 'lcov'],
      coverageDirectory: 'tests/coverage'
    }
  }
}