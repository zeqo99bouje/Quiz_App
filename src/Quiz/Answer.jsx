import React from 'react';

const Answer = ({ answer, onClick }) => {
  return (
    <button onClick={() => onClick(answer)}>
      {answer.text}
    </button>
  );
};

export default Answer;
