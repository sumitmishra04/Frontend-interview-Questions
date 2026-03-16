import React, { useState } from 'react';
import { HEADER_TEXT, OPTIONS } from './PollingConstants';
import PollingOption from './components/PollingOption';
import './styles.css';
function PollingContainer() {
  const [options, setOptions] = useState(OPTIONS);
  const [totalVotes, setTotalVotes] = useState(0);

  function PollingHeader({ text }) {
    return (
      <>
        <div className='header'>{text}</div>
      </>
    );
  }

  function resetVotes() {
    const updatedTotalVote = 0;
    const updatedOptions = options.map((option) => {
      const currentVote = 0;
      return {
        ...option,
        voteCount: currentVote,
        percentValue: 0,
      };
    });
    setOptions(updatedOptions);
    setTotalVotes(updatedTotalVote);
  }

  function pollHandler(optionId) {
    const updatedTotalVote = totalVotes + 1;
    const updatedOptions = options.map((option) => {
      if (option.optionId === optionId) {
        const currentVote = (option.voteCount || 0) + 1;
        return {
          ...option,
          voteCount: currentVote,
          percentValue: (currentVote / updatedTotalVote) * 100,
        };
      } else {
        return {
          ...option,
          percentValue: (option.voteCount / updatedTotalVote) * 100,
        };
      }
    });
    setOptions(updatedOptions);
    setTotalVotes(updatedTotalVote);
  }

  function ResetBtn({ resetVotes }) {
    return (
      <>
        <div onClick={resetVotes} className='reset-btn'>
          ResetBtn
        </div>
      </>
    );
  }

  function VotesCount({ totalVotes }) {
    return (
      <>
        <div className='total-votes'>
          <div>VotesCount</div>
          <div>{totalVotes}</div>
        </div>
      </>
    );
  }

  function PollingContent({ options, pollHandler }) {
    function getOptions() {
      return options.map((option) => {
        return <PollingOption pollHandler={pollHandler} {...option} />;
      });
    }
    return (
      <>
        <div className='polling-content'>{getOptions()}</div>
      </>
    );
  }

  console.log(options);

  return (
    <div className='polling-container'>
      <PollingHeader text={HEADER_TEXT} />
      <PollingContent pollHandler={pollHandler} options={options} />
      <VotesCount totalVotes={totalVotes} />
      <ResetBtn resetVotes={resetVotes} />
    </div>
  );
}

export default PollingContainer;
