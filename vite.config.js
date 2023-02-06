import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgrPlugin from 'vite-plugin-svgr'
const path = require('path')

export default defineConfig({
  plugins: [react(), svgrPlugin()],
  server: {
    port: 3000,
    open: true,
    host: true
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './jest.config.js',
    coverage: {
      reporter: ['text', 'html'],
      exclude: ['node_modules/', './jest.config.js']
    }
  },
  build: {
    outDir: 'build'
  },
  base: './',
  esbuild: {
    loader: 'jsx'
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
        '.ts': 'tsx'
      }
    }
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src/'),
      '~tests': path.resolve(__dirname, 'tests/')
    }
  }
})
