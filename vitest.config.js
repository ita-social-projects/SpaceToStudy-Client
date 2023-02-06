
import { configDefaults, defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'
import svgrPlugin from 'vite-plugin-svgr'
const path = require('path');

export default defineConfig({
  plugins: [ react(), svgrPlugin() ],
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
        reporter: ['text', 'json', 'html'],
        exclude: ['**/*.spec.jsx', './tests/setup-tests.js']
    },
  },
});