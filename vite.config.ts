import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgrPlugin from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'
import eslintPlugin from 'vite-plugin-eslint'

import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    svgrPlugin(),
    tsconfigPaths(),
    eslintPlugin({
      cache: true,
      failOnError: false
    })
  ],
  server: {
    port: 3000,
    open: true,
    host: true
  },
  esbuild: {
    loader: 'tsx'
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src/'),
      '~tests': path.resolve(__dirname, 'tests/')
    }
  }
})
