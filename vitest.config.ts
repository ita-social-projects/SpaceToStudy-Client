import { configDefaults, defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import svgrPlugin from 'vite-plugin-svgr'
import path from 'path'

export default defineConfig({
  plugins: [react(), svgrPlugin()],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src/'),
      '~tests': path.resolve(__dirname, 'tests/')
    }
  },
  test: {
    environment: 'jsdom',
    watch: false,
    setupFiles: './tests/setup-tests.js',
    globals: true,
    exclude: [...configDefaults.exclude, 'packages/template/*'],
    coverage: {
      all: true,
      reporter: ['lcov', 'text'],
      include: [
        'src/**/*.jsx',
        'src/**/*.tsx',
        'src/utils/**/*.ts',
        'src/utils/**/*.js',
        'src/redux/**/*.ts'
      ],
      exclude: ['src/stories', './tests/setup-tests.js'],
      reportsDirectory: './tests/coverage'
    },
    reporters: ['vitest-sonar-reporter', 'default'],
    outputFile: 'test-report.xml'
  }
})
