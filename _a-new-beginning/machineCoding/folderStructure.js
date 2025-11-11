// https://codesandbox.io/p/sandbox/github/kk-1590/file-explorer-react

import React, { useState, useMemo } from "react";

export default function App() {
  const [tree, setTree] = useState([
    {
      name: "src",
      type: "folder",
      children: [
        {
          name: "components",
          type: "folder",
          children: Array.from({ length: 12 }, (_, i) => ({
            name: `File_${i + 1}.jsx`,
            type: "file",
          })),
        },
        {
          name: "utils",
          type: "folder",
          children: [
            { name: "helpers.js", type: "file" },
            { name: "formatDate.js", type: "file" },
          ],
        },
      ],
    },
  ]);

  const [query, setQuery] = useState("");

  // ───────────────────────────────────────────────
  // 🔧 Search Filter Logic
  const handleSearch = (e) => setQuery(e.target.value.toLowerCase());

  const filterTree = (nodes, q) => {
    if (!q) return nodes;
    return nodes
      .map((node) => {
        if (node.type === "folder") {
          const filteredChildren = filterTree(node.children || [], q);
          if (
            node.name.toLowerCase().includes(q) ||
            filteredChildren.length > 0
          ) {
            return { ...node, children: filteredChildren };
          }
        } else if (node.name.toLowerCase().includes(q)) {
          return node;
        }
        return null;
      })
      .filter(Boolean);
  };

  const filteredTree = useMemo(() => filterTree(tree, query), [tree, query]);

  // ───────────────────────────────────────────────
  // ⚙️ Add / Delete Logic (immutable tree updates)
  const addNodeAtPath = (nodes, path, newNode) => {
    if (path.length === 0) return [...nodes, newNode];
    return nodes.map((node) => {
      if (node.name === path[0] && node.type === "folder") {
        return {
          ...node,
          children: addNodeAtPath(node.children || [], path.slice(1), newNode),
        };
      }
      return node;
    });
  };

  const deleteNodeAtPath = (nodes, path, targetName) => {
    if (path.length === 0) return nodes.filter((n) => n.name !== targetName);
    return nodes.map((node) => {
      if (node.name === path[0] && node.type === "folder") {
        return {
          ...node,
          children: deleteNodeAtPath(
            node.children || [],
            path.slice(1),
            targetName
          ),
        };
      }
      return node;
    });
  };

  const handleAddNode = (path, newNode) => {
    setTree((prev) => addNodeAtPath(prev, path, newNode));
  };

  const handleDeleteNode = (path, name) => {
    setTree((prev) => deleteNodeAtPath(prev, path, name));
  };

  // ───────────────────────────────────────────────
  // 🧠 Render
  return (
    <div style={{ padding: "15px", fontFamily: "monospace" }}>
      <h2>📂 Interactive Folder Tree</h2>

      <input
        type="text"
        placeholder="Search files or folders..."
        value={query}
        onChange={handleSearch}
        style={{
          marginBottom: "12px",
          padding: "6px",
          width: "320px",
          fontFamily: "inherit",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />

      <FolderStructure
        data={filteredTree}
        onAddNode={handleAddNode}
        onDeleteNode={handleDeleteNode}
        path={[]}
        query={query}
      />

      <pre
        style={{
          marginTop: "25px",
          background: "#f9f9f9",
          padding: "10px",
          borderRadius: "6px",
          fontSize: "12px",
          color: "#444",
        }}
      >
        {JSON.stringify(tree, null, 2)}
      </pre>
    </div>
  );
}

// ───────────────────────────────────────────────
// 🌳 Recursive Folder Renderer
function FolderStructure({ data, onAddNode, onDeleteNode, path, query }) {
  return (
    <div>
      {data.map((item) =>
        item.type === "folder" ? (
          <Folder
            key={item.name}
            data={item}
            onAddNode={onAddNode}
            onDeleteNode={onDeleteNode}
            path={[...path, item.name]}
            query={query}
          />
        ) : (
          <File
            key={item.name}
            data={item}
            onDeleteNode={onDeleteNode}
            path={path}
            query={query}
          />
        )
      )}
    </div>
  );
}

// ───────────────────────────────────────────────
// 📁 Folder Component
function Folder({ data, onAddNode, onDeleteNode, path, query }) {
  const [open, setOpen] = useState(true);
  const [visibleCount, setVisibleCount] = useState(5); // Pagination
  const match = data.name.toLowerCase().includes(query);

  const toggleOpen = (e) => {
    e.stopPropagation();
    setOpen((prev) => !prev);
  };

  const handleAddFile = (e) => {
    e.stopPropagation();
    const name = prompt("Enter new file name:");
    if (!name) return;
    const newNode = { name, type: "file" };
    onAddNode(path, newNode);
  };

  const handleAddFolder = (e) => {
    e.stopPropagation();
    const name = prompt("Enter new folder name:");
    if (!name) return;
    const newNode = { name, type: "folder", children: [] };
    onAddNode(path, newNode);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    const confirmed = window.confirm(
      `Delete folder "${data.name}" and all its contents?`
    );
    if (!confirmed) return;
    onDeleteNode(path.slice(0, -1), data.name);
  };

  const hasMore = data.children?.length > visibleCount;

  return (
    <div style={{ padding: "5px 0" }}>
      <div onClick={toggleOpen} style={{ cursor: "pointer" }}>
        <span
          style={{
            display: "inline-block",
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
            marginRight: "5px",
          }}
        >
          ▶
        </span>
        <strong
          style={{
            backgroundColor: match && query ? "yellow" : "transparent",
          }}
        >
          {data.name}
        </strong>
        <button
          onClick={handleAddFile}
          style={{
            marginLeft: "10px",
            fontSize: "0.8rem",
            background: "#eaf6ff",
            border: "1px solid #0077cc",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          +File
        </button>
        <button
          onClick={handleAddFolder}
          style={{
            fontSize: "0.8rem",
            background: "#eaf6ff",
            border: "1px solid #0077cc",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          +Folder
        </button>
        <button
          onClick={handleDelete}
          style={{
            marginLeft: "5px",
            color: "red",
            border: "none",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          🗑️
        </button>
      </div>

      {open && (
        <div style={{ paddingLeft: "20px" }}>
          <FolderStructure
            data={(data.children || []).slice(0, visibleCount)}
            onAddNode={onAddNode}
            onDeleteNode={onDeleteNode}
            path={[...path, data.name]}
            query={query}
          />

          {hasMore && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setVisibleCount((prev) => prev + 5);
              }}
              style={{
                marginTop: "5px",
                background: "#f0f0f0",
                border: "1px solid #ccc",
                padding: "2px 6px",
                fontSize: "0.8rem",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Load More...
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ───────────────────────────────────────────────
// 📄 File Component
function File({ data, onDeleteNode, path, query }) {
  const handleDelete = (e) => {
    e.stopPropagation();
    const confirmed = window.confirm(`Delete file "${data.name}"?`);
    if (!confirmed) return;
    onDeleteNode(path, data.name);
  };

  const match = data.name.toLowerCase().includes(query);

  return (
    <div
      style={{
        padding: "3px 0 3px 25px",
        backgroundColor: match && query ? "yellow" : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "240px",
      }}
    >
      <span>📄 {data.name}</span>
      <button
        onClick={handleDelete}
        style={{
          color: "red",
          border: "none",
          background: "transparent",
          cursor: "pointer",
        }}
      >
        🗑️
      </button>
    </div>
  );
}
