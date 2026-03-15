import React from 'react';
import TreeProvider from './TreeProvider';
import './styles.css';
import Tree from './Tree';
import { data } from './data';

function FileFolder() {
  return (
    <TreeProvider>
      <div>File Folder Structure
    </div>
    <Tree treeNodes={data} />
    </TreeProvider>
  );
}

export default FileFolder
