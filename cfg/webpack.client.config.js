const path = require('path')
const { HotModuleReplacementPlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV === 'development';
const IS_PROD = NODE_ENV === 'production';

const filename = (ext) => IS_DEV ? `[name].${ext}` : `[contenthash].${ext}`

function setupDevtool() {
  if (IS_DEV) return 'eval';
  if (IS_PROD) return false;
}
module.exports = {
  resolve: {
    extensions: [
      '.js', '.jsx', '.ts', 'tsx', 'json'
    ],
    alias: {
      'react-dom': IS_DEV ? '@hot-loader/react-dom' : 'react-dom'
    }
  },
  mode: NODE_ENV ? NODE_ENV : 'development',
  entry:
    [path.resolve(__dirname, '../src/client/index.jsx'),
      'webpack-hot-middleware/client?path=http://localhost:3001/static/__webpack_hmr',
    ],
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: 'client.js',
    publicPath: '/static/',
    assetModuleFilename: `./${filename("[ext]")}`
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          }
        }
      },
      {
        test: /\.s?css$/i,
        use: [
          'style-loader',
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
              },
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          }
        ]
      },
      {
        test: /\.(png|svg|jpe?g|gif|mp4)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/i,
        type: 'asset/resource'
      },
    ]
  },
  devtool: setupDevtool(),

  plugins: IS_DEV ? [
    new CleanWebpackPlugin(),
    new HotModuleReplacementPlugin(),
  ] :
    [],
}