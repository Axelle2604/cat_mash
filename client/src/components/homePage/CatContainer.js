import React from 'react';

const CatContainer = ({ img, changeCatsDisplayed }) => {
  return (
    <div>
      <img src={img} alt="Cat" />
      <button onClick={changeCatsDisplayed}>I like it !</button>
    </div>
  );
};

export default CatContainer;
