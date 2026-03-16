import React from 'react';
import { useTreeContext } from './treeProvider';
import { renderer } from './renderer';

function TreeNode({ node }) {
  const { expandedIds, toggleNode, selectedNodeId, setSelectedNode } =
    useTreeContext();

  const hasChildren = node?.children?.length > 0;
  const isExpanded = expandedIds[node.id] === true;
  let children = null;

  if (hasChildren && isExpanded) {
    children = node.children.map((childNode) => {
      return <TreeNode node={childNode} key={childNode.id} />;
    });
  }

  const handleToggle = () => {
    toggleNode(node.id);
    setSelectedNode(node.id);
  };

  return (
    <li
      aria-selected={selectedNodeId === node.id}
      aria-expanded={isExpanded}
      role="treeitem"
      data-has-children={hasChildren}
      data-node-id={node.id}
    >
      <button
        data-has-children={hasChildren}
        data-node-id={node.id}
        role="tree"
        onClick={handleToggle}
      >
        {renderer(node, isExpanded, selectedNodeId)}
      </button>
      <ul role="group">{children}</ul>
    </li>
  );
}

export default TreeNode;
