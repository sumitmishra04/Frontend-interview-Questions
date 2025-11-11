Setup Monorepo Structure

nvm install 18
nvm use 18

mkdir my-app
cd my-app
npm init -y

"private": true → Required for npm workspaces (prevents accidental publish).
"workspaces": ["packages/*"] → Tells npm to treat every folder inside packages/ as its own independent package (mini-project).


Create package.json for individual packages as well:
cd packages/frontend && npm init -y && cd ../..
cd packages/backend && npm init -y && cd ../..


Build the Express Backend
cd packages/backend
npm install express
npm install --save-dev nodemon

 "dev": "nodemon index.js",

Create the Vite React App
npm create vite@latest . -- --template react
set up viteconfig to proxy backend to fix cors issues.

Root-Level Orchestration
npm install --save-dev concurrently
"scripts": {
  "dev": "concurrently \"npm run dev --workspace=backend\" \"npm run dev --workspace=frontend\"",
  "dev:backend": "npm run dev --workspace=backend",
  "dev:frontend": "npm run dev --workspace=frontend"
}



Convert the Frontend into a Micro Frontend Host (Webpack + Module Federation)
Setup webpack:
npm install --save-dev webpack webpack-cli webpack-dev-server \
    html-webpack-plugin \
    babel-loader @babel/core @babel/preset-env @babel/preset-react \
    css-loader style-loader


Build:
npm run build --workspace=frontend-app

Add Module Federation Plugin to the Host App
We’ll modify your Webpack config to turn this frontend into a host.
npm install webpack webpack-cli webpack-dev-server html-webpack-plugin --save-dev
npm install --save-dev @module-federation/enhanced


Shared Data:
npm install zustand --workspace=shared-lib
import { create } from 'zustand';

export const useGlobalStore = create((set) => ({
  user: null,
  theme: 'light',
  setUser: (user) => set({ user }),
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' }))
}));



Set up a new app:
npm init -y
npm install --save-dev @babel/cli @babel/core @babel/preset-env @babel/preset-react webpack webpack-cli webpack-dev-server babel-loader @babel/core @babel/preset-env @babel/preset-react html-webpack-plugin
npm install react@18.2.0 react-dom@18.2.0 axios

create webpack.config.mjs
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
    port: 3003,
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
      name: 'authApp',
      filename: 'remoteEntry.js',
      exposes: {
        './Auth': './src/AuthApp.jsx'
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.2.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.2.0' },
        'shared-lib': { singleton: true }
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};



package.json:
  "scripts": {
    "dev": "webpack serve --config webpack.config.mjs --open",
    "build": "webpack --config webpack.config.mjs",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
"dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "shared-lib": "^1.0.0"
  },

create .babelrc
{
  "presets": [
    ["@babel/preset-env", { "targets": "defaults" }],
    ["@babel/preset-react", { "runtime": "automatic" }]
  ]
}


create src/
main.jsx
import('./bootstrap');


bootstrap.jsx
import { createRoot } from 'react-dom/client';
import Auth from './AuthApp';

const root = createRoot(document.getElementById('root'));
root.render(<Auth />);

auth.jsx
import { createRoot } from 'react-dom/client';
import Auth from './AuthApp';

const root = createRoot(document.getElementById('root'));
root.render(<Auth />);

public/index.html
<!DOCTYPE html>
<html>
  <head><title>Auth App</title></head>
  <body><div id="root"></div></body>
</html>



in host app:
Create a wrapper:
import React from 'react';

const RemoteAuth = React.lazy(() => import('authApp/Auth'));

export default function AuthWrapper() {
  return (
    <React.Suspense fallback={<div>Loading Auth...</div>}>
      <RemoteAuth />
    </React.Suspense>
  );
}


App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import DashboardWrapper from './RemoteDashboard';
import ProfileWrapper from './RemoteProfile';
import { SharedHeader, formatName, useGlobalStore } from 'shared-lib';
import AuthWrapper from './RemoteAuth';

function App() {
  const [message, setMessage] = useState("Loading...");

  const user = useGlobalStore((state) => state.user);
  const setUser = useGlobalStore((state) => state.setUser);

  useEffect(() => {
    axios.get('http://localhost:5000/api/hello')
      .then(res => setMessage(res.data.message))
      .catch(err => setMessage("Error connecting to backend"));
  }, []);

  return (
    <div>
       <BrowserRouter>
        <nav>
          <Link to="/">Home</Link> |
          <Link to="/auth">Auth</Link> |
          <Link to="/dashboard">Dashboard</Link> |
          <Link to="/profile">Profile</Link>
        </nav>
        <Routes>
          <Route path="/" element={<h2>🏠 Host Home</h2>} />
          <Route path="/dashboard" element={<DashboardWrapper />} />
          <Route path="/profile" element={<ProfileWrapper />} />
          <Route path="/auth" element={<AuthWrapper />} />
        </Routes>
      </BrowserRouter>
      <h1>React + Vite Frontend 2</h1>
      <p>Backend says: {message}</p>
      <SharedHeader />
      <p>Name: {formatName("app shell")}</p>
      <h1>Sharing global data</h1>
      <div>
        <button onClick={() => setUser({ name: 'Sumit', role: 'Admin' })}>
          Set User
        </button>
        <p>Current User: {user?.name || 'None'}</p>
      </div>

    </div>
  );
}

export default App;



host webpack:
remotes: {
        dashboardApp: 'dashboardApp@http://localhost:3001/remoteEntry.js',
        profileApp: 'profileApp@http://localhost:3002/remoteEntry.js',
        authApp: 'authApp@http://localhost:3003/remoteEntry.js',
       },