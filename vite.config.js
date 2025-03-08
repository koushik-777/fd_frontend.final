import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // Make sure this is correct for relative paths
  server: {
    proxy: {
      '/api': {
        target: 'https://foodelivery-backend-final.onrender.com',
        changeOrigin: true,
      }
    }
  }
})
