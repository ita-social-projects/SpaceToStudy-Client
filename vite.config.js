import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgrPlugin from 'vite-plugin-svgr'
const path = require('path')

export default defineConfig({
  plugins: [react(), svgrPlugin()],
  base: './',
  server: {
    port: 3000,
    open: true,
    host: true
  },
  esbuild: {
    loader: 'jsx'
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src/'),
      '~tests': path.resolve(__dirname, 'tests/')
    }
  }
})
