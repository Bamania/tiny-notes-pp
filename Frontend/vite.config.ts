import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // where your Express server runs
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // removes '/api' prefix
      }
    }
  }
})
