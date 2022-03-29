import React from 'react';
import styled from 'styled-components';
import { categories } from '../dev-data';
import { mobile } from '../responsive';
import CategoryItem from './CategoryItem';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  ${mobile({ padding: '0', flexDirection: 'column' })};
`;

const Catergories = () => {
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem key={item.id} item={item} />
      ))}
    </Container>
  );
};

export default Catergories;
