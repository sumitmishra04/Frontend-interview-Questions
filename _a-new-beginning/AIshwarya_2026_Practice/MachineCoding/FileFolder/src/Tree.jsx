import React, { useEffect, useRef } from 'react';
import TreeNode from './TreeNode';
import { useTreeContext } from './treeProvider';
import WithSearch from './Search';

function Tree({ treeData }) {
  const { selectedNodeId, setSelectedNode } = useTreeContext();

  const treeRef = useRef();

  useEffect(() => {
    if (!selectedNodeId) {
      setSelectedNode(treeData?.[0]?.id);
    }
  }, [selectedNodeId]);

  const handleKeyDown = (e) => {
    e.stopPropagation();
    debugger;
    const root = treeRef.current;
    if (!root) return;
    const liItems = Array.from(root.querySelectorAll('button[data-node-id]'));
    if (liItems.length === 0) return;
    const activeIndex = liItems.findIndex(
      (item) => item === document.activeElement
    );
    let idx = activeIndex;
    if (idx === -1 && selectedNodeId) {
      idx = liItems.findIndex(
        (item) => item.getAttribute('data-node-id') === selectedNodeId
      );
    }
    if (idx === -1) idx = 0;

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        if (idx < liItems.length - 1) {
          const next = liItems[idx + 1];
          next.focus();
          setSelectedNode(next.getAttribute('data-node-id'));
        }
        return;
      }
      case 'ArrowUp': {
        e.preventDefault();
        if (idx > 0) {
          const prev = liItems[idx - 1];
          prev.focus();
          setSelectedId(prev.getAttribute('data-tree-item'));
        }
        return;
      }
      default: {
        break;
      }
    }
  };
  return (
    <ul ref={treeRef} role="group" onKeyDown={handleKeyDown}>
      {treeData.map((node) => (
        <TreeNode node={node} key={node.id} />
      ))}
    </ul>
  );
}

export default WithSearch(Tree);
