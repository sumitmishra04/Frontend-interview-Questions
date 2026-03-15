import React, { useEffect, useMemo, useState } from 'react';
import '../grid-lights/styles.css';
const BOX_DATA = [
  [1, 1, 1],
  [1, 0, 0],
  [1, 1, 1],
];
const STATUS = {
  HIDDEN: 'hidden',
  VISIBLE: 'visible',
  SELECTED: 'selected',
};
function GridLights({ data = BOX_DATA }) {
  // [1,1,1,1,0,0,1,1,1]
  const boxes = useMemo(() => data.flat(Infinity), [data]);
  const [selected, setSelected] = useState(new Set());
  const [isUnloading, setIsUnloading] = useState(false);
  const countOfVisibleBoxes = useMemo(() => {
    return boxes.reduce((acc, box) => {
      if (box === 1) {
        acc += 1;
      }
      return acc;
    }, 0);
  }, [boxes]);

  function clickHandler(e) {
    const { target } = e;
    const idx = target.getAttribute('data-index');
    const status = target.getAttribute('data-status');
    if (
      idx === null ||
      status === STATUS.HIDDEN ||
      selected.has(idx) ||
      isUnloading
    ) {
      return;
    }
    const updated = new Set([...selected]).add(idx);
    setSelected(updated);
    console.log('selected', selected);
  }
  useEffect(() => {
    if (selected.size >= countOfVisibleBoxes) {
      unloading();
    }
  }, [selected]);

  function unloading() {
    //remove 500ms
    setIsUnloading(true);
    const keys = Array.from(selected.keys());
    const removeNextKey = () => {
      if (keys.length) {
        const currentKey = keys.shift();
        setSelected((prev) => {
          const updatedKeys = new Set(prev);
          updatedKeys.delete(currentKey);
          return updatedKeys;
        });
        setTimeout(removeNextKey, 500);
      } else {
        setIsUnloading(false);
      }
    };
    setTimeout(removeNextKey, 100);
  }
  return (
    <div onClick={clickHandler} className='boxes'>
      {boxes.map((box, index) => {
        const status = box === 1 ? STATUS.VISIBLE : STATUS.HIDDEN;
        const isSelectedClass = selected.has(index.toString())
          ? STATUS.SELECTED
          : '';
        console.log('isSelectedClass', isSelectedClass);
        return (
          <div
            className={`box ${status} ${isSelectedClass}`}
            key={`${box}-${index}`}
            data-index={index}
            data-status={status}
          ></div>
        );
      })}
    </div>
  );
}

export default GridLights;
