import React from 'react';

const CatScore = ({ points, winRate }) => {
  return (
    <div>
      <div>{winRate}</div>
      <div>{points}</div>
    </div>
  );
};

export default CatScore;
