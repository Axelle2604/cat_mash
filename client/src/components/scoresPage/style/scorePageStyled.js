import styled, { keyframes } from 'styled-components';

import { Row } from './catScoreStyled';

export const Container = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContainerScores = styled.div`
  position: relative;
  background-color: white;
  width: 30%;
  height: 90%;
  overflow-y: scroll;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 50px;
`;

export const Header = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  div {
    font-size: 2em;
    margin: 0 auto;
  }
  i {
    transition: 0.3s;
    font-size: 2em;
    &:hover {
      cursor: pointer;
      color: grey;
      transition: 0.3s;
    }
  }
`;

export const ContainerRows = styled.div`
  height: 100%;
  width: 100%;
  ${Row}:nth-child(odd) {
    background-color: #2ecc71;
  }
  ${Row}:nth-child(even) {
    background-color: #28af60;
  }
  div {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  button {
    background-color: #2ecc71;
    color: white;
    border-style: none;
    padding: 10px;
    font-size: 2em;
    font-weight: bold;
    transition: 0.3s;
    margin-top: 10px;
    :hover {
      cursor: pointer;
      transition: 0.3s;
      background-color: #76e0a2;
    }
  }
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Loader = styled.div`
  font-size: 2em;
  i {
    cursor: pointer;
    animation: ${rotate} 1s infinite;
  }
`;
