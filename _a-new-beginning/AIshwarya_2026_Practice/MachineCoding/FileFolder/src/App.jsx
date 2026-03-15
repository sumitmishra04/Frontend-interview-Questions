import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import useData from './data.js';
import TreeProvider from './treeProvider';
import Tree from './Tree';

function App() {
  const { loading, error, treeData } = useData();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (!treeData) return null;

  return (
    <TreeProvider>
      <Tree treeData={treeData} />
    </TreeProvider>
  );
}

export default App;
