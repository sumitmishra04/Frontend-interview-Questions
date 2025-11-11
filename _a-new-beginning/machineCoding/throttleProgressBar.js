import React, { useState, useRef, useEffect } from 'react';
import ProgressBar from './progressBar';

const STATUS = {
  NOT_STARTED: '-1',
  RUNNING: '0',
  FINISHED: '1',
};

function QueuedProgressBar({ completionTimeInSec = 3, maxRunningItems = 3 }) {
  const ref = useRef(null);
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    ref.current = setInterval(() => {
      setQueue((queue) => {
        return queue.map((item) => {
          if (item.status === STATUS.RUNNING && item.width < 100) {
            return { ...item, width: item.width + 1 };
          } else if (item.status === STATUS.RUNNING && item.width >= 100) {
            return { ...item, status: STATUS.FINISHED };
          }
          return item;
        });
      });
    }, completionTimeInSec * 10);
    return () => {
      clearInterval(ref.current);
    };
  }, [queue]);

  useEffect(() => {
    const notRunningItems = queue.filter(
      (items) => items.status === STATUS.NOT_STARTED
    );
    const runningItems = queue.filter(
      (items) => items.status === STATUS.RUNNING
    );
    if (runningItems.length < maxRunningItems && notRunningItems.length > 0) {
      const nextItem = notRunningItems[0];
      setQueue((queue) => {
        return queue.map((item) => {
          if (item.id === nextItem.id) {
            return { ...item, status: STATUS.RUNNING };
          }
          return item;
        });
      });
    }
  });

  const startProgress = () => {
    setQueue((list) => {
      return [
        ...list,
        { width: 0, id: list.length, status: STATUS.NOT_STARTED },
      ];
    });
  };

  return (
    <div>
      <button onClick={startProgress}>Start</button>
      {queue.map((item, index) => {
        return <ProgressBar width={item.width} key={index} />;
      })}
    </div>
  );
}

export default QueuedProgressBar;



import React from 'react';

function ProgressBar({ width = 0 }) {
  return (
    <div
      style={{
        height: '20px',
        width: '100%',
        border: '1px solid black',
        borderRadius: '20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          backgroundColor: 'green',
          height: '100%',
          width: `${width}%`,
        }}
      >
        <span
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {width} %
        </span>
      </div>
    </div>
  );
}

export default ProgressBar;
