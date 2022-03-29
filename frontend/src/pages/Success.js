import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import styled from 'styled-components';
import { userRequest } from '../requestMethod';

const Button = styled.button`
  padding: 1.5rem;
  border: 2px solid teal;
  background-color: #fff;
  font-weight: 500;
  cursor: pointer;
  margin-top: 2rem;
  font-size: 2.4rem;
`;

const P = styled.p`
  font-size: 2.4rem;
  margin: 1rem 0;
`;

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();

  //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
  const data = location.state.stripeData;
  const cart = location.state.cart;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post('/orders', {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);
      } catch {}
    };
    data && createOrder();
  }, [cart, data, currentUser]);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5fafd',
      }}
    >
      {orderId ? (
        <P>
          `Order has been created successfully. Your order number is ${orderId}`
        </P>
      ) : (
        <P>Successfully Place. Your order is being prepared...</P>
      )}
      <Button onClick={() => navigate('/')}>Go to Homepage</Button>
    </div>
  );
};

export default Success;
