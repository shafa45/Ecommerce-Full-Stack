import { Send } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 7rem;
  margin-bottom: 2rem;
  font-weight: 500;
`;
const Description = styled.div`
  font-size: 2.4rem;
  font-weight: 300;
  margin-bottom: 2rem;
  ${mobile({ textAlign: 'center' })};
`;
const InputContainer = styled.div`
  width: 50%;
  height: 4rem;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;

  ${mobile({ width: '80%' })};
`;
const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 2rem;
`;
const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Newsletter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>
        Get timely updates from your favourite products.
      </Description>
      <InputContainer>
        <Input placeholder='Your email' type='email' />
        <Button>
          <Send fontSize='large' />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
