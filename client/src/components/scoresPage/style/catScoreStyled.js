import styled from 'styled-components';

export const Row = styled.div`
  width: 100%;
  height: 9%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: solid 1px white;
  div {
    height: 100%;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2em;
    color: white;
  }
`;

export const ContainerImg = styled.div`
  background-image: url(${({ imgUrl }) => imgUrl});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;
