import React from 'react';
import styled from 'styled-components';
import { mobile, tablet } from '../responsive';
import { Link } from 'react-router-dom';

const Container = styled.div`
  flex: 1;
  margin: 0.3rem;
  height: 70vh;
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  ${mobile({ height: '40vh' })};
`;
const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
  font-size: 3.2rem;
  color: #fff;
  margin-bottom: 2rem;
  text-align: center;
  ${tablet({ fontSize: '2.4rem' })};
  opacity: 0.75;
`;
const Button = styled.button`
  padding: 1rem;
  border: none;
  font-size: 1.5rem;
  background-color: #fff;
  color: #495057;
  font-weight: 500;
  cursor: pointer;
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Link to={`/products/${item.cat}`}>
        <Image src={item.img} />
        <Info>
          <Title>{item.title}</Title>
          <Button>Shop Now</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
