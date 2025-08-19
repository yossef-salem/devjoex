import { defineConfig } from 'vite'

export default defineConfig({
  base: '/devjoex-portfolio/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined,
        assetFileNames: 'assets/[name].[hash].[ext]',
        chunkFileNames: 'js/[name].[hash].js',
        entryFileNames: 'js/[name].[hash].js'
      }
    },
    // Use default esbuild minifier (no terser)
    sourcemap: false
  },
  server: {
    port: 3000,
    open: true
  }
})
