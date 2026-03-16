import React, { useEffect, useState } from 'react';
import '../progress-bars/styles.css';

export function ProgressBars({ progressBarList }) {
  return (
    <div>
      {progressBarList.map(({ id }) => (
        <div className='progress-bar-outer' key={id}>
          <div style={{ width: '100%' }} className='progress-bar-inner'></div>
        </div>
      ))}
    </div>
  );
}

function ProgressBarContainer() {
  const [progressBarList, setProgressBarList] = useState([]);
  function addBtnHandler() {
    const updatedProgressBarList = [
      ...progressBarList,
      { id: progressBarList.length },
    ];
    setProgressBarList(updatedProgressBarList);
  }
  return (
    <>
      <div onClick={addBtnHandler} className='add-btn'>
        +Add
      </div>
      {progressBarList.length > 0 && (
        <ProgressBars progressBarList={progressBarList} />
      )}
    </>
  );
}

export default ProgressBarContainer;
