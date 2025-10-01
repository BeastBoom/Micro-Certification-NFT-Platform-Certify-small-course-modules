import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './frontend/src'),
      '@components': path.resolve(__dirname, './frontend/src/components'),
      '@pages': path.resolve(__dirname, './frontend/src/pages'),
      '@hooks': path.resolve(__dirname, './frontend/src/hooks'),
      '@services': path.resolve(__dirname, './frontend/src/services'),
      '@utils': path.resolve(__dirname, './frontend/src/utils'),
      '@types': path.resolve(__dirname, './frontend/src/types'),
      '@assets': path.resolve(__dirname, './frontend/src/assets'),
    },
  },
  root: './frontend',
  publicDir: 'public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          aptos: ['@aptos-labs/ts-sdk', '@aptos-labs/wallet-adapter-react'],
          ui: ['framer-motion', 'react-hot-toast'],
        },
      },
    },
  },
  server: {
    port: 5173,
    host: true,
    open: true,
  },
  preview: {
    port: 4173,
    host: true,
  },
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@aptos-labs/ts-sdk'],
  },
})
