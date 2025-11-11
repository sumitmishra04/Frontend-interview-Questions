import React, { useState, useMemo, useRef, useEffect } from 'react';

function BoxShape({ data }) {
  const [map, setMap] = useState(new Set());
  const [disable, setDisable] = useState(false);
  let timer = useRef(null);

  const totalValidCells = useMemo(
    () => data.flat(1).filter((data) => data === 1).length,
    [data]
  );

  useEffect(() => {
    return () => clearInterval(timer.current);
  }, []);

  const handleClick = (ri, ci) => {
    if (data[ri][ci] === 0 || disable) return;
    const clone = new Set(map);
    clone.add(`${ri}-${ci}`);
    console.log('clone', ri, ci, clone);
    setMap(clone);
    const isEqual = clone.size === totalValidCells;
    if (isEqual) {
      setDisable(true);
      rollback();
    }
  };

  const rollback = () => {
    timer.current = setInterval(() => {
      setMap((prevData) => {
        const cloneArray = Array.from(prevData);
        cloneArray.pop();
        const newData = new Set(cloneArray);
        if (cloneArray.length === 0) {
          setDisable(false);
          clearInterval(timer.current);
        }
        return newData;
      });
    }, 1000);
  };

  console.log(map);
  console.log(disable);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '50vw',
        height: '50vw',
      }}
    >
      {data.map((row, ri) => {
        return (
          <div
            style={{
              display: 'flex',
              gap: '10px',
              width: '100%',
              height: '100%',
            }}
            key={ri}
          >
            {row.map((col, ci) => {
              const key = `${ri}-${ci}`;
              const selected = map.has(key);
              return (
                <div
                  onClick={() => handleClick(ri, ci)}
                  key={key}
                  style={{
                    border: '1px solid',
                    width: '100%',
                    height: '100%',
                    background: selected ? 'green' : 'white',
                    opacity: col === 0 ? '0' : '1',
                  }}
                ></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default BoxShape;
