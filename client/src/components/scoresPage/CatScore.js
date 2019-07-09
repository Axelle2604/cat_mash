import React from 'react';
import { Row, ContainerImg } from './style/catScoreStyled';

const CatScore = ({ points, winRate, imgUrl }) => {
  return (
    <Row>
      <div>
        <ContainerImg imgUrl={imgUrl} />
      </div>
      <div>{winRate}%</div>
      <div>{points}w</div>
    </Row>
  );
};

export default CatScore;
