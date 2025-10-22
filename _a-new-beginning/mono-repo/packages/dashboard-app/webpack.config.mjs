import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ModuleFederationPlugin from 'webpack/lib/container/ModuleFederationPlugin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './src/main.jsx',
  mode: 'development',
  devServer: {
    port: 3001,
    historyApiFallback: true,
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'auto'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new ModuleFederationPlugin({
      name: 'dashboardApp',
      filename: 'remoteEntry.js',
      exposes: {
        './Dashboard': './src/Dashboard.jsx'
      },
      shared: {
        react: { singleton: true, requiredVersion: "^18.2.0" },
        'react-dom': { singleton: true, requiredVersion: "^18.2.0" },
        'react-router-dom': { singleton: true, requiredVersion: "^6.22.3" }
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
