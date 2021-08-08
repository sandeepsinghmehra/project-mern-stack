const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const outputDirectory = 'dist';


module.exports = {
    entry: {
      index: './frontend/src/index.js',
      admin: './admin-site/src/index.js'
    },
    
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime']
            }
          }
        },
        {
          test: /\.s?css$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 100000,
              },
            },
          ],
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
    devServer: {
      host: 'localhost',
      port: 3000,
      open: true,
      proxy: {
        '/api/': 'http://localhost:8000'
      },
      historyApiFallback: {
        disableDotRule: true,
        rewrites: [{ from: /^\/admin.html/, to: '/build/admin.html' }]
      }
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './frontend/public/index.html',
        filename: 'index.html',
        chunks: ['index']
      }),
      new HtmlWebpackPlugin({
        template: './admin-site/public/index.html',
        filename: 'admin/index.html',
        chunks: ['admin']
      })
    ],
    output: {
      path: path.join(__dirname, outputDirectory),
      filename: 'static/js/[name].bundle.js'
    },
  };
