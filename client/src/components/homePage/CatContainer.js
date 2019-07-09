import React from 'react';
import { Container } from './style/catContainerStyled';

const CatContainer = ({ img, name, nextCats }) => {
  return <Container img={img} onClick={nextCats.bind(null, name)} />;
};

export default CatContainer;
