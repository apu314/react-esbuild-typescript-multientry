require('esbuild').build({
    entryPoints: ['../src/app.jsx'],
    bundle: true,
    outfile: '../dist/bundle.js',
}).catch(() => process.exit(1))