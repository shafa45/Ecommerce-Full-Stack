import { Badge } from '@material-ui/core';
import { Search, ShoppingCartOutlined } from '@material-ui/icons';
// import React, { useEffect } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { logOutUser } from '../redux/userRedux';
import { resetCart } from '../redux/cartRedux';

import { mobile, tablet } from '../responsive';

const Container = styled.div`
  height: 6rem;
  ${mobile({ height: '5rem' })};
`;

const Wrapper = styled.div`
  padding: 1rem 10vmax;

  display: flex;
  justify-content: space-between;
  align-items: center;

  ${tablet({ padding: '1rem 2rem' })};
  ${mobile({ padding: '1rem 0' })};
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 2.5rem;
  ${mobile({ justifyContent: 'center' })};
`;

const Language = styled.span`
  font-size: 1.4rem;
  color: #343a40;
  cursor: pointer;
  ${mobile({ display: 'none' })};
`;

const SearchContainer = styled.div`
  border: 1px solid #ced4da;
  display: flex;
  align-items: center;
  padding: 0.5rem;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: '5rem' })};
  &:focus {
    outline: none;
  }
`;

const Mid = styled.div`
  flex: 1;
  text-align: center;
  /* background-color: black; */
`;

const Logo = styled.img`
  height: 3.5rem;
  filter: invert(48%) sepia(13%) saturate(3207%) hue-rotate(130deg)
    brightness(95%) contrast(80%);
  ${mobile({ height: '2.5rem' })};
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 2.5rem;

  ${mobile({ flex: 2, justifyContent: 'center', gap: '1rem' })};
`;

const MenuItem = styled.div`
  font-size: 1.4rem;
  cursor: pointer;
  text-transform: uppercase;
  ${mobile({ fontSize: '1.2rem' })};
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    if (e.target.innerHTML === 'Sign Out') {
      dispatch(logOutUser());
      dispatch(resetCart());
      navigate('/login');
    } else navigate('/login');
  };
  // console.log(quantity);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder='Search' />
            <Search style={{ color: 'gray', fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Mid>
          <Link to='/'>
            <Logo src='/logo-white.png' alt='logo' />
          </Link>
        </Mid>
        <Right>
          <Link to='/register'>
            <MenuItem>{user ? '' : 'Register'}</MenuItem>
          </Link>
          {/* <Link to='/login'> */}
          <MenuItem onClick={handleLogout}>
            {user ? 'Sign Out' : 'Sign In'}
          </MenuItem>
          {/* </Link> */}
          <Link to='/cart'>
            <MenuItem>
              <Badge badgeContent={quantity} color='primary'>
                <ShoppingCartOutlined color='action' fontSize='large' />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
