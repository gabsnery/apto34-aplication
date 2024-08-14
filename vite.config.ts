import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: 'pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: 'store', replacement: path.resolve(__dirname, 'src/store') },
      { find: 'components', replacement: path.resolve(__dirname, 'src/components') },
      { find: 'middlewares', replacement: path.resolve(__dirname, 'src/middlewares') },
      { find: 'hooks', replacement: path.resolve(__dirname, 'src/hooks') },
      { find: 'utils', replacement: path.resolve(__dirname, 'src/utils') },
      { find: 'assets', replacement: path.resolve(__dirname, 'src/assets') },
      { find: 'i18n', replacement: path.resolve(__dirname, 'src/i18n') },
      { find: 'ui-layout', replacement: path.resolve(__dirname, 'src/ui-layout') },
      { find: '@types', replacement: path.resolve(__dirname, 'src/@types') },
  ],
  },
  server: {
    open: false,
  },
  build:{
    outDir: "build"
  }
});