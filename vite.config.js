import react from '@vitejs/plugin-react'
import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), reactRefresh()],
  resolve: {
    alias: {
      '@api': path.resolve(__dirname, 'src/api'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@screens': path.resolve(__dirname, 'src/screens'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@untils': path.resolve(__dirname, 'src/untils'),
      '@modals': path.resolve(__dirname, 'src//components/modals'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/scss/app.scss";`,
      },
    },
  },
})
