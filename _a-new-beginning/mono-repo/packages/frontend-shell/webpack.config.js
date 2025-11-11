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
    port: 3000,
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
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new ModuleFederationPlugin({
      name: 'host',            // Name of this container
       remotes: {
        dashboardApp: 'dashboardApp@http://localhost:3001/remoteEntry.js',
        profileApp: 'profileApp@http://localhost:3002/remoteEntry.js',
        authApp: 'authApp@http://localhost:3003/remoteEntry.js',
       },            // Will add micro frontends here later
       shared: {
        react: { singleton: true, requiredVersion: "^18.2.0" },
        'react-dom': { singleton: true, requiredVersion: "^18.2.0" },
        'react-router-dom': { singleton: true, requiredVersion: "^6.22.3" },
        'shared-lib': { singleton: true }
      }
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
