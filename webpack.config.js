const { ESBuildMinifyPlugin } = require('esbuild-loader')
const glob = require('glob')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ProvidePlugin = require('webpack')
const path = require('path')

const isDev = process.env.NODE_ENV === 'development'
const mode = isDev ? 'development' : 'production'

const getEntries = (pattern) => {
  const entries = {}
  glob.sync(pattern).forEach((file) => {
    const outputFileKey = file.replace('src/', '')

    if (!fileIsOnIgnoreList(outputFileKey)) {
      entries[outputFileKey] = path.join(__dirname, file)
    }
  })

  return entries
}


module.exports = {
  mode: mode,
  devtool: isDev ? 'inline-source-map' : false,
  entry: getEntries('./src/**/*.@(ts|js|tsx|jsx)'),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'es2015',
          tsconfigRaw: require('./tsconfig.json')
        }
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // Path for the bundle
              publicPath: (resourcePath, context) =>
                `${path.relative(path.dirname(resourcePath), context)}/`
            }
          },
          'css-loader',
          // 'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    // Automatically load react module instead of require it everywhere
    new ProvidePlugin({
      React: 'react'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkfilename: '[name].css'
    })
  ],
  optimization: {
    minimizer: [
      // Alternative to babel. Parsing the js for the browsers
      new ESBuildMinifyPlugin({
        target: 'es2015',
        css: true
      })
    ],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          type: 'css/mini-extract',
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
}
