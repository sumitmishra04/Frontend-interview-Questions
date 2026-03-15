import { useEffect, useState } from 'react';

function Search({ onChange }) {
  const [value, setValue] = useState();
  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };
  return <input value={value} onChange={handleChange} />;
}

function WithSearch(Component) {
  return (props) => {
    const { treeData } = props;
    const [filterTree, setFilterTree] = useState([]);

    useEffect(() => {
      if (treeData) {
        setFilterTree(treeData);
      }
    }, [treeData]);

    const handleChange = (value) => {
      if (value === '') {
        setFilterTree(treeData);
        return;
      }
      const clonedTree = JSON.parse(JSON.stringify(treeData));

      function find(node) {
        const nameMatch = node.name.toLowerCase().includes(value.toLowerCase());

        let filtered = [];
        if (node.children) {
          filtered = node.children.map(find).filter(Boolean);
        }

        if (nameMatch || filtered.length) {
          node.children = filtered;
          return node;
        }

        return null;
      }
      const filteredTree = clonedTree.map(find).filter(Boolean);
      setFilterTree(filteredTree);
    };

    return (
      <>
        <Search onChange={handleChange} />
        <Component {...props} treeData={filterTree} />
      </>
    );
  };
}
export default WithSearch;
