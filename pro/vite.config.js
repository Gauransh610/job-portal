import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Expose on local network for mobile access
    proxy: {
      '/api': 'http://localhost:3001'
    }
  },
})
