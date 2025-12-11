import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: false, // Disable PostCSS processing
  },
  server: {
    host: '0.0.0.0', // Allow access from network
    port: 5173, // Default Vite port
    strictPort: false, // Allow other ports if 5173 is taken
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})