import styled from 'styled-components';

export const Container = styled.div`
  width: 50%;
  height: 100%;
  background-image: url(${({ img }) => img});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  transition: 0.2s;
  :hover {
    cursor: pointer;
    transition: 0.2s;
  }
`;
