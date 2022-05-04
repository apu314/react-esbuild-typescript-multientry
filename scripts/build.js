import { build } from 'esbuild'
import { globPlugin } from 'esbuild-plugin-glob'
import { jsxImportSourcePlugin } from 'esbuild-plugin-jsximportsource'

build({
  entryPoints: ['src/**/index.ts'],
  bundle: true,
  sourcemap: true,
  write: true,
  outdir: 'dist',
  tsconfig: './tsconfig.json',
  // outfile: '../dist/bundle.js',
  plugins: [
    globPlugin({
      silent: false,
    }),
    jsxImportSourcePlugin({ filter: /.(js|ts|jsx|tsx)/ })
  ],
}).catch(() => process.exit(1))
