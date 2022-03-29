import React, { useEffect, useState } from 'react';
import { sliderItems } from '../dev-data';

import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons';

import styled from 'styled-components';
import { mobile, tablet } from '../responsive';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  /* background-color: #f8f9fa; */
  position: relative;
  overflow: hidden;
  ${mobile({ display: 'none' })};
`;

const Arrow = styled.div`
  width: 5rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #fff7f7;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${(props) => props.direction === 'left' && `10px`};
  right: ${(props) => props.direction === 'right' && `10px`};
  cursor: pointer;
  opacity: 0.5;
  z-index: 999;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease-in-out;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #${(props) => props.bg};
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  height: 80%;
  /* padding-left: 50px; */
  ${tablet({ height: '60%' })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 5rem;
  ${tablet({ padding: '3rem' })}
`;

const Title = styled.h1`
  font-size: 7rem;
  text-transform: uppercase;
  ${tablet({ fontSize: '4.8rem' })}
`;
const Desc = styled.p`
  margin: 5rem 0;
  font-size: 2rem;
  font-weight: 500;
  letter-spacing: 0.3rem;
  word-spacing: 0.2rem;
`;
const Button = styled.button`
  padding: 1rem;
  font-size: 2rem;
  background-color: transparent;
  cursor: pointer;
`;

// auto slide after 2.5s
const delay = 5000;

const Slider = () => {
  const [slideIndex, setSlideslideIndex] = useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setSlideslideIndex(
          slideIndex < sliderItems.length - 1 ? slideIndex + 1 : 0
        ),

      delay
    );
    return () => {
      resetTimeout();
    };
  }, [slideIndex]);
  const handleClick = (direction) => {
    if (direction === 'left') {
      setSlideslideIndex(
        slideIndex > 0 ? slideIndex - 1 : sliderItems.length - 1
      );
    } else {
      setSlideslideIndex(
        slideIndex < sliderItems.length - 1 ? slideIndex + 1 : 0
      );
    }
  };
  return (
    <Container>
      <Arrow direction='left' onClick={() => handleClick('left')}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} alt='Apparel'></Image>
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Button>Buy Now</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction='right' onClick={() => handleClick('right')}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;
