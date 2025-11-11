import React, { useState } from "react";
function File({name, onDelete}) {
    return <div>[File]{name}
            <span onClick={onDelete}>[Del]</span>
    </div>
}

function Folder({ data, onDelete}) {
    const [collapse, setCollapse] = useState(false)
    const handleCollapseToggle = () => {
        setCollapse(val => !val)
    }


    return <div>
        <div onClick={handleCollapseToggle}>
            [Folder] {data.name}
            <span onClick={(e) => {
                e.stopPropagation()
                onDelete(data)
            }}>[Del]</span>
            </div>
        {!collapse && <div style={{paddingLeft:'15px', paddingBottom: '10px', paddingTop: '10px'}}>
            {data.children.map(child=> {
                return <div key={child.id}>
                    { child.type === 'file' ? 
                       <File name={child.name} onDelete={(e) => {
                        e.stopPropagation() 
                        onDelete(child)
                    }
                    }/> : 
                       <Folder data={child} onDelete={onDelete}/>
                    }
                </div>
            })}
        </div>
     }
    </div>
}

function Folders({data, onDelete}) {
    const [value, setValue] = useState('')


    return <div >
        <input value={value} onChange={(e) => setValue(e.target.value)} />
        {data && <Folder data={data} onDelete={onDelete} />}
        
    </div>
}

export default Folders




import React, { useEffect, useState } from "react";
import Header from "./Header";
import RestaurantList from "./RestaurantList";
import Folders from "./folderStructure";
import { TREE_DATA, TREE_DATA1 } from "./data";

const App = () => {
  const [data, setData] = useState(TREE_DATA1)
  
  const handleDelete = (nodeToDelete, currentNode) => {
    if (!currentNode) return null;

    // 🎯 Base case: if this is the node to delete, return null
    if (currentNode.id === nodeToDelete.id) return null;

    // 🪄 If folder has children, recursively filter them
    if (currentNode.children && currentNode.children.length > 0) {
      const updatedChildren = currentNode.children
        .map(child => handleDelete(nodeToDelete, child))
        .filter(Boolean); // removes nulls (deleted nodes)
      return { ...currentNode, children: updatedChildren };
    }

    // 🔁 Otherwise, return the node as is
    return currentNode;
  };

  const onDelete = (node) => {
    const updatedTree = handleDelete(node, data);
    setData(updatedTree);
  };

  return <>
      <Header />
      <RestaurantList />
      <Folders data={data} onDelete={onDelete}/>
    </>
};

export default App;


export const TREE_DATA = {
  name: "js",
  id: 1,
  type: "folder",
  children: [
    {
      name: "node_modules",
      id: 2,
      type: "folder",
      children: [
        {
          name: "@react",
          id: 3,
          type: "folder",
          children: [
            { name: "react.js", id: 4, type: "file" },
            { name: "jsx-runtime.js", id: 5, type: "file" },
          ],
        },
        {
          name: "lodash",
          id: 6,
          type: "folder",
          children: [
            { name: "cloneDeep.js", id: 7, type: "file" },
            { name: "debounce.js", id: 8, type: "file" },
            { name: "index.js", id: 9, type: "file" },
          ],
        },
      ],
    },
    {
      name: "src",
      id: 10,
      type: "folder",
      children: [
        {
          name: "components",
          id: 11,
          type: "folder",
          children: [
            { name: "Header.jsx", id: 12, type: "file" },
            { name: "Footer.jsx", id: 13, type: "file" },
            { name: "Sidebar.jsx", id: 14, type: "file" },
          ],
        },
        {
          name: "hooks",
          id: 15,
          type: "folder",
          children: [
            { name: "useFetch.js", id: 16, type: "file" },
            { name: "useDebounce.js", id: 17, type: "file" },
          ],
        },
        {
          name: "pages",
          id: 18,
          type: "folder",
          children: [
            {
              name: "Home",
              id: 19,
              type: "folder",
              children: [
                { name: "index.jsx", id: 20, type: "file" },
                { name: "home.css", id: 21, type: "file" },
              ],
            },
            {
              name: "Profile",
              id: 22,
              type: "folder",
              children: [
                { name: "index.jsx", id: 23, type: "file" },
                { name: "profile.css", id: 24, type: "file" },
              ],
            },
          ],
        },
        { name: "App.js", id: 25, type: "file" },
        { name: "index.js", id: 26, type: "file" },
      ],
    },
    {
      name: "public",
      id: 27,
      type: "folder",
      children: [
        { name: "index.html", id: 28, type: "file" },
        { name: "favicon.ico", id: 29, type: "file" },
      ],
    },
    {
      name: "tests",
      id: 30,
      type: "folder",
      children: [
        { name: "App.test.js", id: 31, type: "file" },
        { name: "utils.test.js", id: 32, type: "file" },
      ],
    },
    { name: ".gitignore", id: 33, type: "file" },
    { name: "package.json", id: 34, type: "file" },
    { name: "README.md", id: 35, type: "file" },
  ],
};

export const TREE_DATA1 = {
  name: "js",
  id: 1,
  type: "folder",
  children: [
    {
      name: "node_modules",
      id: 2,
      type: "folder",
      children: [
        {
          name: "@react",
          id: 3,
          type: "folder",
          children: [
            { name: "react.js", id: 4, type: "file" },
            { name: "jsx-runtime.js", id: 5, type: "file" },
          ],
        },
       
      ],
    },
  ],
};
