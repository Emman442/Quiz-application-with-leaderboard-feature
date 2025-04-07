import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import rollupNodePolyFill from 'rollup-plugin-polyfill-node';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
// import nodeGlobals from 'vite-plugin-node-globals';
import {nodePolyfills} from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [react(), 
    nodePolyfills(),],
  resolve: {
    alias: {
      buffer: 'buffer', // 👈 explicitly polyfill Buffer
      process: 'process/browser',
    },
  },
  define: {
    global: 'globalThis',
    'process.env': {}, // 👈 avoid other env-related errors
  },
  optimizeDeps: {
    include: ['buffer', 'process'],
    esbuildOptions: {
            // Node.js global to browser globalThis
            define: {
                global: 'globalThis'
            },
            // Enable esbuild polyfill plugins
            plugins: [
                NodeGlobalsPolyfillPlugin({
                    buffer: true
                })
            ]
        }
  },
  build: {
    rollupOptions: {
      plugins: [rollupNodePolyFill()],
    },
  },
});
