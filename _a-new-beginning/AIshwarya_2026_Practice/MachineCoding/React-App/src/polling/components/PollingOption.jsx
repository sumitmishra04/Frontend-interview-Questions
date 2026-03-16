import React from 'react';

function PollingOption({
  optionId,
  label,
  percentValue,
  voteCount,
  colorCode,
  pollHandler,
}) {
  function PollingOptionProgressBar({ percentValue, colorCode }) {
    return (
      <>
        <div className='progress-bar-container'>
          <div
            style={{
              width: `${percentValue}%`,
              backgroundColor: percentValue > 0 ? `${colorCode}` : '#FFFFFF',
            }}
            className='progress-bar'
          ></div>
        </div>
      </>
    );
  }

  function PollingOptionCountPercent({
    optionId,
    label,
    percentValue,
    voteCount,
  }) {
    return (
      <>
        <div className='count-percent'>
          <div>{voteCount}</div>
          <div>{percentValue}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className='option-container'>
        <div onClick={() => pollHandler(optionId)} className='option-btn'>
          {label}
        </div>
        <div>
          <PollingOptionCountPercent
            voteCount={voteCount}
            percentValue={percentValue}
          />
          <PollingOptionProgressBar
            percentValue={percentValue}
            colorCode={colorCode}
          />
        </div>
      </div>
    </>
  );
}

export default PollingOption;
