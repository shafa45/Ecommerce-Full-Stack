import { Add, Remove } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { tablet } from '../responsive';
import StripeCheckout from 'react-stripe-checkout';
import env from 'react-dotenv';
import { userRequest } from '../requestMethod';
import { useNavigate } from 'react-router';
import Loading from 'react-fullscreen-loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 2rem;
  ${tablet({ padding: '1rem' })}
`;

const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TopButton = styled.button`
  padding: 1rem;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === 'filled' && 'none'};
  background-color: ${(props) =>
    props.type === 'filled' ? 'black' : 'transparent'};
  color: ${(props) => props.type === 'filled' && '#fff'};
  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

const TopTexts = styled.div`
  ${tablet({ display: 'none' })}
`;

const TopText = styled.span`
  font-size: 1.6rem;
  text-decoration: underline;
  cursor: pointer;
  margin: 0 1rem;
`;

const Bottom = styled.div`
  display: flex;
  font-size: 1.6rem;
  justify-content: space-between;
  ${tablet({ flexDirection: 'column' })}
`;
const Info = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${tablet({ flexDirection: 'column' })}
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 20rem;
`;
const Details = styled.div`
  padding: 2rem;
  display: flex;
  font-size: 1.4rem;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;
const ProductAmount = styled.div`
  font-size: 2.2rem;
  margin: 0.5rem;
  ${tablet({ margin: '0.5rem 1.5rem' })}
`;
const ProductPrice = styled.div`
  font-size: 2.6rem;
  font-weight: 200;
  ${tablet({ margin: '2rem' })}
`;

// const Hr = styled.hr`
//   border: none;
//   background-color: #ddd;
//   height: 1px;
// `;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 1rem;
  padding: 2rem;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-size: 2.4rem;
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 3rem 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === 'total' && '500'};
  font-size: ${(props) => props.type === 'total' && '2.4rem'};
`;
const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #000;
  color: #fff;
  font-weight: 600;
  font-size: 1.6rem;
  cursor: pointer;
  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

const Cart = () => {
  const KEY = env.STRIPE_KEY;
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // console.log(user);
  // console.log(cart);

  const onToken = (token) => {
    setStripeToken(token);
  };

  // const makeRequest = async (token) => {
  //   try {
  //     const res = await userRequest.post('/checkout/payment', {
  //       tokenId: token.id,
  //       amount: 500,
  //     });
  //     navigate('/success', { state: { data: res.data } });
  //     console.log(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // // console.log(stripeToken);

  useEffect(() => {
    showToast();
  }, []);

  useEffect(() => {
    const makeRequest = async () => {
      setLoading(true);
      try {
        const res = await userRequest.post('/checkout/payment', {
          tokenId: stripeToken.id,
          amount: cart.total,
        });
        setLoading(false);
        navigate('/success', { state: { data: res.data } });
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };

    stripeToken && makeRequest();
  }, [stripeToken]);

  const showToast = () => {
    if (!user) {
      toast.error('Please Login to Continue...', {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (cart.products.length === 0) {
      toast.error('Please Add Product to Continue...', {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      {loading ? (
        <Loading loading={loading} background='#fff5f5' loaderColor='#008080' />
      ) : (
        <Wrapper>
          <Title>YOUR BAG</Title>
          <Top>
            <Link to='/'>
              <TopButton>CONTINUE SHOPPING</TopButton>
            </Link>
            <TopTexts>
              <TopText>Shopping Bag({cart.products.length})</TopText>
              <TopText>Your Wishlist(0)</TopText>
            </TopTexts>
            <StripeCheckout
              name='Shafa Store'
              image='https://i.ibb.co/88gCS75/273247665-614705359605866-2060530288860326840-n.jpg'
              billingAddress
              shippingAddress
              description={`Your total is Rs ${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
              currency='INR'
            >
              <TopButton
                type='filled'
                disabled={!user || cart.products.length === 0}
              >
                CHECKOUT NOW
              </TopButton>
            </StripeCheckout>
          </Top>
          <Bottom>
            <Info>
              {cart.products.map((product) => (
                <Product key={product._id}>
                  <ProductDetail>
                    {/* <Image src='https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1614188818-TD1MTHU_SHOE_ANGLE_GLOBAL_MENS_TREE_DASHERS_THUNDER_b01b1013-cd8d-48e7-bed9-52db26515dc4.png?crop=1xw:1.00xh;center,top&resize=480%3A%2A' /> */}
                    <Image src={product.img} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {product.title}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {product._id}
                      </ProductId>
                      <ProductColor color={product.color} />
                      <ProductSize>
                        <b>Size:</b> {product.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <Remove fontSize='large' />
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <Add fontSize='large' />
                    </ProductAmountContainer>
                    <ProductPrice>
                      Rs {(product.quantity * product.price).toLocaleString()}
                    </ProductPrice>
                  </PriceDetail>
                </Product>
              ))}
              {/*<Product>
            <Hr />
              <ProductDetail>
                <Image src='https://i.pinimg.com/originals/2d/af/f8/2daff8e0823e51dd752704a47d5b795c.png' />
                <Details>
                  <ProductName>
                    <b>Product:</b> HAKURA T-SHIRT
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> 93813718293
                  </ProductId>
                  <ProductColor color='gray' />
                  <ProductSize>
                    <b>Size:</b> M
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <Remove fontSize='large' />
                  <ProductAmount>2</ProductAmount>
                  <Add fontSize='large' />
                </ProductAmountContainer>
                <ProductPrice>Rs {number.toLocaleString()}</ProductPrice>
              </PriceDetail>
            </Product> */}
            </Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>
                  Rs {cart.total.toLocaleString()}
                </SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>Rs 500</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>-Rs 500</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type='total'>
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>
                  Rs {cart.total.toLocaleString()}
                </SummaryItemPrice>
              </SummaryItem>
              <StripeCheckout
                name='Shafa Store'
                image='https://i.ibb.co/88gCS75/273247665-614705359605866-2060530288860326840-n.jpg'
                billingAddress
                shippingAddress
                description={`Your total is Rs ${cart.total}`}
                amount={cart.total * 100}
                token={onToken}
                stripeKey={KEY}
                currency='INR'
              >
                <Button disabled={!user || cart.products.length === 0}>
                  CHECKOUT NOW
                </Button>
                {/* {!user && showToast} */}
                {/* {cart.products.length === 0 && showToast()} */}
                <ToastContainer
                  position='bottom-center'
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
              </StripeCheckout>
            </Summary>
          </Bottom>
        </Wrapper>
      )}

      <Footer />
    </Container>
  );
};

export default Cart;
