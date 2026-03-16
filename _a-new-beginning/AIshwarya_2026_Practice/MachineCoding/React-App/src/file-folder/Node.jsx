import React from 'react'
import { useTreeContext } from './TreeProvider'
import renderer from './Renderer'

function TreeNode({ node }) {
  const {expandedIds, setToggle} = useTreeContext()
  const hasChildren = node?.children?.length > 0
  const isExpanded = expandedIds[node.id]
  let children = null
  if(hasChildren && isExpanded) {
    children = node.children.map(child => {
      return (<TreeNode node={child} key={child.id} />)
    })
  }
  return <>
  <li className='tree-node-item'>
    <button className='tree-node-btn' onClick={() => setToggle(node.id)}>
      {renderer(node, isExpanded)}
    </button>
    {children && <ul className='tree-list'>{children}</ul>}
  </li>
  </>
}

export default TreeNode