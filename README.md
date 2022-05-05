# React - webpack - esbuild - Typescript - multientry

🚧 WORK IN PROGRESS...

### Auto-import for JSX

<https://esbuild.github.io/content-types/#jsx>

----

- webpack
- esbuild-loader (instead on ts-loader/babel-loader)
- frokTsCheckerWebpackPlugin (To do typeCheckig)
  ```
  new ForkTsCheckerWebpackPlugin({
    typescript: {
      diagnosticOptions: {
        semantic: true,
        syntactic: true,
      },
    },
  })
  ```

- mini-css-extract-plugin
