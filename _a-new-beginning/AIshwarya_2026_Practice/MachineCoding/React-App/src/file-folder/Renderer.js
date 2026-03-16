import { TYPES } from "./data";

export default function renderer(node, isExpanded) {
  if(node.type === TYPES.FILE) {
    return <span>{node.name}</span>
  }
  if(node.type === TYPES.FOLDER) {
    return <><span className="node-style">{isExpanded ? 'V' : '>'}</span><span className="node-name">{node.name}</span></>
  }
}