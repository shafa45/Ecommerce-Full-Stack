import {
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
  GitHub,
  MailOutline,
  Phone,
  Room,
  Favorite,
} from '@material-ui/icons';

import { Link, makeStyles } from '@material-ui/core';

import React from 'react';
import styled from 'styled-components';
import { tablet } from '../responsive';

const useStyle = makeStyles({
  link: {
    color: 'inherit',
  },
});

const Container = styled.div`
  display: flex;
  ${tablet({ flexDirection: 'column' })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const Logo = styled.img`
  height: 3.5rem;
  filter: invert(48%) sepia(13%) saturate(3207%) hue-rotate(130deg)
    brightness(95%) contrast(80%);
`;
const Desc = styled.p`
  font-size: 1.2rem;
  margin: 2rem 0;
`;
const SocialContainer = styled.div`
  display: flex;
  gap: 2rem;
`;
const SocialIcon = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  color: #fff;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Center = styled.div`
  flex: 1;
  padding: 2rem;
  ${tablet({ display: 'none' })}
`;

const Title = styled.h3`
  margin-bottom: 3rem;
  font-size: 2rem;
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const Right = styled.div`
  flex: 1;
  padding: 2rem;
  ${tablet({ backgroundColor: '#eee' })}
`;

const ContactItem = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
`;

const Payment = styled.img`
  /* width: 75%; */
  /* object-fit: contain; */
`;
const Love = styled.div`
  height: 30px;
  background-color: teal;
  color: #f8f9fa;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 300;
  word-spacing: 3px;
`;

const Footer = () => {
  const classes = useStyle();
  return (
    <>
      <Container>
        <Left>
          <Link to='/'>
            <Logo src='/logo-white.png' alt='logo' />
          </Link>
          <Desc>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable.
          </Desc>
          <SocialContainer>
            <SocialIcon color='3B5999'>
              <Link
                className={classes.link}
                href='https://www.facebook.com/md.safaullah/'
                target='_black'
                rel='noopener'
              >
                <Facebook fontSize='large' />
              </Link>
            </SocialIcon>

            <SocialIcon color='E4405F'>
              <Link
                className={classes.link}
                href='https://www.instagram.com/md__shafaullah/'
                target='_black'
                rel='noopener'
              >
                <Instagram fontSize='large' />
              </Link>
            </SocialIcon>
            <SocialIcon color='55ACEE'>
              <Link
                className={classes.link}
                href='https://twitter.com/MdSafaullah14'
                target='_black'
                rel='noopener'
              >
                <Twitter fontSize='large' />
              </Link>
            </SocialIcon>
            <SocialIcon color='0e76a8'>
              <Link
                className={classes.link}
                href='https://www.linkedin.com/in/shafaullah-mohammad-508038200/'
                target='_black'
                rel='noopener'
              >
                <LinkedIn fontSize='large' />
              </Link>
            </SocialIcon>
            <SocialIcon color='171515'>
              <Link
                className={classes.link}
                href='https://github.com/shafa45'
                target='_black'
                rel='noopener'
              >
                <GitHub fontSize='large' />
              </Link>
            </SocialIcon>
          </SocialContainer>
        </Left>
        <Center>
          <Title>Useful Links</Title>
          <List>
            <ListItem>Home</ListItem>
            <ListItem>Cart</ListItem>
            <ListItem>Men's Fashion</ListItem>
            <ListItem>Women's Fashion</ListItem>
            <ListItem>Electronics</ListItem>
            <ListItem>Accessories</ListItem>
            <ListItem>My Account</ListItem>
            <ListItem>Track Orders</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Terms & Condtions</ListItem>
          </List>
        </Center>
        <Right>
          <Title>Contact Us</Title>
          <ContactItem>
            <Room style={{ marginRight: '1rem' }} /> San Mateo, California(CA),
            94403
          </ContactItem>
          <ContactItem>
            <Phone style={{ marginRight: '1rem' }} />
            (650) 341-8775
          </ContactItem>
          <ContactItem>
            <MailOutline style={{ marginRight: '1rem' }} />
            contact@shafa.dev
          </ContactItem>
          <Payment src='https://i.ibb.co/d0S0fQw/payment.png' />
        </Right>
      </Container>
      <Love>
        Made with
        <Favorite
          fontSize='large'
          htmlColor='#FF0000'
          style={{ margin: '0.5rem' }}
        />{' '}
        by Shafaullah
      </Love>
    </>
  );
};

export default Footer;
