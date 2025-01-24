import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'
import vuePlugin from '@vitejs/plugin-vue'

export default mergeConfig(
  defineConfig({
    base: '/blog-management-task/',
    plugins: [vuePlugin()],
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      transformMode: {
        web: [/\.[jt]sx$/],
      },
    },
  }),
)
