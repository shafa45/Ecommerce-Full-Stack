import React from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: #f8f9fa;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 300;
  word-spacing: 3px;

  ${mobile({ fontSize: '1.2rem', wordSpacing: 0 })}
`;

const Announcement = () => {
  return (
    <Container>
      Super Deal ! Free Shipping For New Users All Over the World.
    </Container>
  );
};

export default Announcement;
