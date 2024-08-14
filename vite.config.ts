import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Alias para a pasta `src`
      'pages': path.resolve(__dirname, 'src/pages'),
      'components': path.resolve(__dirname, 'src/components'),
      'i18n': path.resolve(__dirname, 'src/i18n'),
      'store': path.resolve(__dirname, 'src/store'),
      'middlewares': path.resolve(__dirname, 'src/middlewares'),
      'ui-layout': path.resolve(__dirname, 'src/ui-layout'),
      'hooks': path.resolve(__dirname, 'src/hooks'),
      'utils': path.resolve(__dirname, 'src/utils'),
      'assets': path.resolve(__dirname, 'src/assets'),
    },
  },
  server: {
    open: true,
  },
  build:{
    outDir: "build"
  }
});