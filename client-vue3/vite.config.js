import stdLibBrowser from 'node-stdlib-browser'
import inject from '@rollup/plugin-inject'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    {
      ...inject({
        global: [
          require.resolve('node-stdlib-browser/helpers/esbuild/shim'),
          'global'
        ],
        process: [
          require.resolve('node-stdlib-browser/helpers/esbuild/shim'),
          'process'
        ],
        Buffer: [
          require.resolve('node-stdlib-browser/helpers/esbuild/shim'),
          'Buffer'
        ]
      }),
      enforce: 'post'
    }
  ],
  resolve: {
    alias: {
      ...stdLibBrowser,
      '@': path.resolve(__dirname, 'src'),
      // path: require.resolve('path-browserify'),
    }
  },
  optimizeDeps: {
    include: [
      'buffer',
      'process'
    ]
  }
})

// source: https://github.com/niksy/node-stdlib-browser#vite
