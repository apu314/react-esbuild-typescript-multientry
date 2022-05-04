import { buildSync } from 'esbuild'
import { entryPoints } from './entry-points'

buildSync({
  entryPoints: entryPoints(),
  bundle: true,
  outdir: '../dist',
  // minify: true,
  sourcemap: true,
  target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
})
