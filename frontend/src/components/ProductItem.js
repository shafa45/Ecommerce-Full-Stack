import React from 'react';
import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from '@material-ui/icons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { addProduct } from '../redux/cartRedux';
import { useDispatch } from 'react-redux';
// import env from 'react-dotenv';

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
`;

const Image = styled.img`
  height: 75%;
  z-index: 1;
  margin-bottom: 4.5rem;
  transition: all 0.4s ease-in-out;
`;

const Container = styled.div`
  flex: 1;
  min-width: 28rem;
  height: 36rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }

  &:hover ${Image} {
    transform: scale(1.1);
  }
`;
// const Circle = styled.div`
//   width: 20rem;
//   height: 20rem;
//   border-radius: 50%;
//   background-color: #fff;
//   position: absolute;
// `;

const Icon = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  &:hover {
    background-color: #e9f5fe;
    transform: scale(1.2);
  }
`;

const ProductMetaData = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  /* background-color: red; */
  z-index: 3;
  padding: 0 1rem;
  box-sizing: border-box;
  overflow: hidden;
  margin-top: 2rem;
`;

const ProductTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 500;
  color: rgb(33, 33, 33);
  margin-bottom: 0.6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
`;

const ProductPrice = styled.h4`
  font-size: 16px;
  font-weight: 500;
  color: #212121;
  line-height: 1.5rem;
  margin: 2rem 0 0.6rem;
  white-space: nowrap;
  overflow: hidden;
`;

const ProductItem = ({ item }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    // update cart
    dispatch(
      addProduct({
        ...item,
        quantity: 1,
        color: item.color[0],
        size: item.size[0],
        price: item.price * 1,
      })
    );
  };
  return (
    <Container>
      {/* <Circle /> */}
      <Image src={item.img} alt='apparels' />

      <Info>
        <Icon>
          <ShoppingCartOutlined onClick={handleClick} />
        </Icon>
        <Icon>
          <Link to={`/product/${item._id}`}>
            <SearchOutlined />
          </Link>
        </Icon>
        <Icon>
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
      <ProductMetaData>
        <ProductTitle>{item.title}</ProductTitle>
        <ProductPrice>Rs {` ${item.price}`}</ProductPrice>
      </ProductMetaData>
    </Container>
  );
};

export default ProductItem;
