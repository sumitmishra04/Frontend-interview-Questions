import { useState } from "react";

const itemHeight = 35;
const windowHeight = 500;
const overscan = 10;

const ListItems = ({ startIndex, endIndex }) => {
  return new Array(endIndex - startIndex + 1).fill(0).map((_, index) => {
    return (
      <div
        style={{
          height: `${itemHeight}px`,
          backgroundColor:
            (index + startIndex) % 2 === 0 ? "lightgray" : "white",
          color: "black",
          width: "500px",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
        key={index}
      >
        List Item number - {index + startIndex}
      </div>
    );
  });
};

export default OptimisedVirtualisedList = ({ numberOfItems }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const renderedNodes = Math.min(
    numberOfItems - startIndex,
    Math.floor(windowHeight / itemHeight) + 2 * overscan
  );
  console.log(scrollTop, startIndex, renderedNodes);
  return (
    <div
      style={{
        border: "1px solid black",
        marginTop: "50px",
        width: "500px",
        overflowY: "scroll",
        height: `${windowHeight}px`,
      }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div
        style={{
          height: `${numberOfItems * itemHeight}px`,
        }}
      >
        <div
          style={{
            transform: `translateY(${startIndex * itemHeight}px)`,
          }}
        >
          <ListItems
            startIndex={startIndex}
            endIndex={startIndex + renderedNodes}
          />
        </div>
      </div>
    </div>
  );
};
