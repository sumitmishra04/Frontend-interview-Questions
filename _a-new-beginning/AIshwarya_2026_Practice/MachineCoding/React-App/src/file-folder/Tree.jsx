import React from 'react'
import TreeNode from './Node'
import { useTreeContext } from './TreeProvider'

function Tree({treeNodes}) {
    const { searchTree } = useTreeContext()

  return <>
  <input onChange={(e) => searchTree(treeNodes, e.target.value)} placeholder='Search for a file or folder' type="search" />
  <ul className='tree-list'>
    {treeNodes.map((node) => {
      return (<TreeNode node={node} key={node.id} />)
    })}
  </ul>
  </>
}

export default Tree