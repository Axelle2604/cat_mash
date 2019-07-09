import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

export const SubContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const Title = styled.div`
  position: absolute;
  width: 100%;
  div {
    width: 20%;
    background-color: white;
    padding: 10px;
    text-align: center;
    margin: 0 auto;
    margin-top: 20px;
    transform: rotate(-2deg);
    font-size: 2em;
    box-shadow: 0px 0px 10px 0px;
  }
`;

export const ContainerButton = styled.div`
  position: absolute;
  width: 100%;
  bottom: 20px;
  display: flex;
  justify-content: center;
  div {
    background-color: #2ecc71;
    padding: 10px;
    text-align: center;
    margin: 0 auto;
    font-size: 1.5em;
    box-shadow: 0px 0px 10px 0px white;
    transition: 0.3s;
    :hover {
      cursor: pointer;
      box-shadow: none;
      background-color: #27ae60;
      transition: 0.3s;
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
