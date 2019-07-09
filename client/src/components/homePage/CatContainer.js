import React from 'react';

const CatContainer = ({ img, name, nextCats }) => {
  return (
    <div>
      <img src={img} alt="Cat" onClick={nextCats.bind(null, name)} />
    </div>
  );
};

export default CatContainer;
