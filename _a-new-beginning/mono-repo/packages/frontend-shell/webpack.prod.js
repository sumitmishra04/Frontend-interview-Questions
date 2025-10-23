import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ModuleFederationPlugin from 'webpack/lib/container/ModuleFederationPlugin.js';
import { DefinePlugin } from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'production',
  entry: './src/main.jsx',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'auto',  // For CDN or server hosting
    clean: true          // Clears dist folder on each build
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false
      }),
      new CssMinimizerPlugin()
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        defaultVendors: {
          test: /node_modules/,
          name: 'vendors',
          chunks: 'all',
          priority: -10
        }
      }
    },
    runtimeChunk: 'single'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      }
    }),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.API_URL': JSON.stringify('https://api.myapp.com'), // Example env
    }),
    new ModuleFederationPlugin({
      name: 'host',
      filename: 'remoteEntry.js',
      remotes: {
        dashboardApp: 'dashboardApp@https://cdn.myapp.com/dashboard/remoteEntry.js',
        authApp: 'authApp@https://cdn.myapp.com/auth/remoteEntry.js'
      },
      shared: {
        react: { singleton: true, eager: false, requiredVersion: "^18.2.0" },
        'react-dom': { singleton: true, eager: false, requiredVersion: "^18.2.0" },
        'shared-lib': { singleton: true }
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
