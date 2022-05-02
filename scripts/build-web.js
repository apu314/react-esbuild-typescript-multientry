const b = require('esbuild')
const entryPoints = require('./entry-points')

b.buildSync({
    entryPoints: entryPoints(),
    outdir: './dist',
    bundle: true,
    minify: true,
    sourcemap: true,
    target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
})
