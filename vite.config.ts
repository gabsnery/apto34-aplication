import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { configDefaults } from "vitest/config";
import { sentryVitePlugin } from "@sentry/vite-plugin";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  // expose .env as process.env instead of import.meta since jest does not import meta yet
  const envWithProcessPrefix = Object.entries(env).reduce(
    (prev, [key, val]) => {
      return {
        ...prev,
        ['process.env.' + key]: `"${val}"`
      }
    },
    {},
  )

  return {
    define: envWithProcessPrefix,
    plugins: [react(),
      sentryVitePlugin({
        org: "pessoal-3u",
        project: "apto34",
        authToken: process.env.SENTRY_AUTH_TOKEN,
      })
    ],
    resolve: {
      alias: [
        { find: "@", replacement: path.resolve(__dirname, "src") },
        { find: "pages", replacement: path.resolve(__dirname, "src/pages") },
        { find: "store", replacement: path.resolve(__dirname, "src/store") },
        {
          find: "components",
          replacement: path.resolve(__dirname, "src/components"),
        },
        {
          find: "middlewares",
          replacement: path.resolve(__dirname, "src/middlewares"),
        },
        { find: "hooks", replacement: path.resolve(__dirname, "src/hooks") },
        { find: "utils", replacement: path.resolve(__dirname, "src/utils") },
        { find: "assets", replacement: path.resolve(__dirname, "src/assets") },
        { find: "i18n", replacement: path.resolve(__dirname, "src/i18n") },
        {
          find: "ui-layout",
          replacement: path.resolve(__dirname, "src/ui-layout"),
        },
        { find: "@types", replacement: path.resolve(__dirname, "src/@types") },
      ],
    },
    server: {
      open: false,
    },
    build: {
      outDir: "build",
      sourcemap: true,
    },
    test: {
      globals: true, // Permite usar variáveis globais de teste como "describe" e "it"
      environment: "jsdom", // Define o ambiente de teste como jsdom para simular o DOM
      setupFiles: "./vitest.setup.ts", // Arquivo para configurações e mocks globais
      exclude: [...configDefaults.exclude, "e2e/*"], // Exclui diretórios específicos dos testes
      coverage: {
        provider: "v8", // Usar o provedor de cobertura "v8"
        reporter: ["text", "json", "html"], // Tipos de relatórios de cobertura gerados
      },
    },
  };
});
