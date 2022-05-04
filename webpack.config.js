import { ESBuildMinifyPlugin } from 'esbuild-loader'
import glob from 'glob'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ProvidePlugin from 'webpack'
import path from 'path'

import tsconfig from './tsconfig.json'

const isDev = process.env.NODE_ENV === 'development'
const mode = isDev ? 'development' : 'production'

const getEntries = (pattern) => {
  const entries = {}
  glob.sync(pattern).forEach(file => {
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
      // Use esbuild loader instead of babel-loader
      {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'es2015',
          tsconfigRaw: tsconfig
        }
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // Path to output the bundle
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
