import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/cyber-portal/',
  build: {
    outDir: 'dist'
  }
})
