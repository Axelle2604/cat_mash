import React from 'react';

const CatContainer = ({ img, nextCats }) => {
  return (
    <div>
      <img src={img} alt="Cat" onClick={nextCats} />
    </div>
  );
};

export default CatContainer;
