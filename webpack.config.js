import { resolve } from 'path'
import CopyPlugin from 'copy-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HtmlMinimizerPlugin from 'html-minimizer-webpack-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'

const baseConfig = {
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: getAliases()
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        resolve: {
          fullySpecified: false
        },
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [['babel-plugin-inferno', { imports: true }]]
          }
        }
      }
    ]
  },
  watch: getWatch()
}

const serverConfig = {
  ...baseConfig,
  target: 'node18',
  entry: resolve('src/server.js'),
  output: {
    path: resolve('./dist'),
    publicPath: '/',
    filename: 'server.js',
    chunkFormat: 'module'
  },
  experiments: {
    outputModule: true
  }
}

const clientConfig = {
  ...baseConfig,
  entry: resolve('src/client.js'),
  output: {
    path: resolve('./dist/static'),
    publicPath: '/',
    filename: 'client.js'
  },
  module: {
    ...baseConfig.module,
    rules: [
      ...baseConfig.module.rules,
      {
        test: /\.(css|less)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      '...',
      new HtmlMinimizerPlugin(),
      new CssMinimizerPlugin()
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
      chunkFilename: '[name].css'
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/static' }
      ]
    })
  ]
}

function getAliases () {
  const mode = process.env.INFERNO_ENV

  if (mode === 'production') {
    return {
      inferno: 'inferno/dist/index.esm.js',
      "inferno-server": 'inferno-server/dist/index.esm.js'
    }
  }
  if (mode === 'development') {
    return {
      inferno: 'inferno/dist/index.dev.esm.js',
      "inferno-server": 'inferno-server/dist/index.dev.esm.js'
    }
  }

  throw new Error('INFERNO_ENV must be either "production" or "development"')
}

function getWatch () {
  const mode = process.env.INFERNO_ENV

  if (mode === 'production') {
    return false
  }
  if (mode === 'development') {
    return true
  }
}

export default function config () {
  const target = process.env.WEBPACK_ENV

  if (target === 'server') {
    return serverConfig
  }
  if (target === 'client') {
    return clientConfig
  }

  throw new Error('WEBPACK_ENV must be either "server" or "client"')
}
