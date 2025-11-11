import { useState, useRef, useEffect } from "react";

export default VirtualizedList = ({ items, itemHeight, containerHeight }) => {
  const [startIndex, setStartIndex] = useState(0);
  const containerRef = useRef(null);

  const totalItems = items.length;
  const visibleCount = Math.ceil(containerHeight / itemHeight); // Number of items visible at a time

  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollTop = containerRef.current.scrollTop;
    const newIndex = Math.floor(scrollTop / itemHeight);
    setStartIndex(newIndex);
  };

  useEffect(() => {
    containerRef.current?.addEventListener("scroll", handleScroll);
    return () =>
      containerRef.current?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        height: containerHeight,
        overflowY: "auto",
        position: "relative",
        border: "1px solid black",
      }}
    >
      <div
        style={{
          height: totalItems * itemHeight,
          position: "relative",
        }}
      >
        {items
          .slice(startIndex, startIndex + visibleCount)
          .map((item, index) => (
            <div
              key={startIndex + index}
              style={{
                position: "absolute",
                top: (startIndex + index) * itemHeight,
                height: itemHeight,
                width: "100%",
                background: index % 2 === 0 ? "#f0f0f0" : "#fff",
                display: "flex",
                alignItems: "center",
                padding: "5px",
                boxSizing: "border-box",
              }}
            >
              {item}
            </div>
          ))}
      </div>
    </div>
  );
};

export function App() {
  const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);
  return (
    <div className="App">
      <VirtualisedList items={items} itemHeight={40} containerHeight={400} />
    </div>
  );
}
