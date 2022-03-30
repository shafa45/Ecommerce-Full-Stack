import { Add, Remove } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import { publicRequest } from '../requestMethod';
import { mobile, tablet, landscape, sm } from '../responsive';
import Loading from 'react-fullscreen-loading';
import { addProduct } from '../redux/cartRedux';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 5rem;
  display: flex;
  ${sm({ padding: '1rem', flexDirection: 'column' })};
`;
const ImgContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${landscape({ height: '80%' })};
  ${tablet({ height: '90%' })};
  ${mobile({ height: '40vh' })}
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0 5rem;
  ${mobile({ padding: '1rem' })}
`;
const Title = styled.h1`
  font-weight: 300;
  font-size: 2.4rem;
`;
const Desc = styled.p`
  margin: 2rem 0;
  font-size: 1.6rem;
  line-height: 2.4rem;
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 4rem;
`;

const FilterContainer = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
  margin: 3rem 0;
  ${mobile({ width: '100%' })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 2rem;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0 0.5rem;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 1rem;
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #f5f5f5;
  font-size: 1.4rem;
  font-weight: 200;
  cursor: pointer;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* ${tablet({ width: '85%' })}; */
  /* ${mobile({ width: '100%' })} */
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  gap: 0.5rem;
`;

const Amount = styled.span`
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 1rem;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
`;

const Button = styled.button`
  padding: 1.5rem;
  min-width: 13.6rem;
  border: 2px solid teal;
  background-color: #fff;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/products/find/${id}`);
        setProduct(res.data.product);
        setSize(res.data.product.size[0]);
        setColor(res.data.product.color[0]);
        console.log(res);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === 'dec') {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    // update cart
    toast.success('Item Added To Cart!', {
      position: 'bottom-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch(addProduct({ ...product, quantity, color, size }));
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      {loading ? (
        <Loading loading={loading} background='#fff5f5' loaderColor='#008080' />
      ) : (
        <Wrapper>
          <ImgContainer>
            {/* <Image src='https://i.ibb.co/L66k1cK/Jantour-Brand-Skinny-jeans-men-Slim-Fit-Denim-Joggers-Stretch-Male-Jean-Pencil-Pants-Blue-Men.jpg'></Image> */}
            <Image src={product.img}></Image>
          </ImgContainer>

          <InfoContainer>
            <Title>{product.title}</Title>
            <Desc>{product.desc}</Desc>
            {/* <Price>Rs. 1,613.87</Price> */}
            <Price>{`Rs. ${product.price}`}</Price>
            <FilterContainer>
              <Filter>
                <FilterTitle>Color</FilterTitle>
                {product.color.map((c) => (
                  <FilterColor
                    color={c}
                    key={c}
                    onClick={() => setColor(c)}
                  ></FilterColor>
                ))}
              </Filter>
              <Filter>
                <FilterTitle>Size</FilterTitle>
                <FilterSize onChange={(e) => setSize(e.target.value)}>
                  {product.size.map((s) => (
                    <FilterSizeOption key={s}>
                      {s.toUpperCase()}
                    </FilterSizeOption>
                  ))}
                  {/* <FilterSizeOption>XS</FilterSizeOption>
                <FilterSizeOption>S</FilterSizeOption>
                <FilterSizeOption>M</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                <FilterSizeOption>XL</FilterSizeOption> */}
                </FilterSize>
              </Filter>
            </FilterContainer>

            <AddContainer>
              <AmountContainer>
                <Remove
                  fontSize='large'
                  onClick={() => handleQuantity('dec')}
                />
                <Amount>{quantity}</Amount>
                <Add fontSize='large' onClick={() => handleQuantity('inc')} />
              </AmountContainer>
              <Button onClick={handleClick}>ADD TO CART</Button>
              <ToastContainer
                position='bottom-center'
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </AddContainer>
          </InfoContainer>
        </Wrapper>
      )}

      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
