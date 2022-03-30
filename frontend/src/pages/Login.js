import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import FormInput from '../utils/FormInput';
import { login } from '../redux/apiCalls';
import Loader from '../utils/Loader';
import { clearError } from '../redux/userRedux';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?crop=entropy&cs=srgb&dl=pexels-andrea-piacquadio-839011.jpg&fit=crop&fm=jpg&h=1279&w=1920')
      center/cover no-repeat;
`;

const Title = styled.h1`
  text-transform: uppercase;
  font-size: 2.8rem;
  color: teal;
  text-align: center;
  font-weight: bold;
  margin-bottom: 3rem;
`;

const Form = styled.form`
  background-color: #fff;
  padding: 2rem 6rem;
  max-width: 42rem;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
`;

const Button = styled.button`
  width: 100%;
  height: 5rem;
  padding: 1rem;
  border: none;
  background-color: teal;
  color: white;
  border-radius: 0.5rem;
  font-weight: bold;
  font-size: 1.8rem;
  cursor: pointer;
  margin-top: 1.5rem;
  margin-bottom: 3rem;
  text-transform: uppercase;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #007373;
  }
`;

const P = styled.p`
  /* color: rgb(85, 85, 85); */
  font-weight: 400;
  font-size: 1.4rem;
  margin-bottom: 1.2rem;
  text-align: center;
`;

const Error = styled.span`
  color: red;
  font-size: 1.6rem;
  margin: 1rem 0;
  display: block;
  text-align: center;
`;

const inputs = [
  {
    id: 1,
    name: 'username',
    label: 'Username',
    type: 'text',
    placeholder: 'Username',
    errorMessage:
      "Username should be 3-16 characters and shouldn't include any special character!",
    pattern: '^[A-Za-z0-9]{3,16}$',
    required: true,
  },

  {
    id: 2,
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Password',
    errorMessage:
      'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!',
    pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
    required: true,
  },
];
const Login = () => {
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    dispatch(clearError());
  }, []);

  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const handleLogin = (e) => {
    e.preventDefault();
    login(dispatch, values, '/login');
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <Wrapper>
      <Form onSubmit={handleLogin}>
        <Title>Login</Title>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <Button type='submit'>Login</Button>
        {error && !isFetching && <Error>{error}</Error>}
        {isFetching && <Loader />}
        <P>Don't have an account?</P>
        <Link to='/register' style={{ textDecoration: 'underline teal' }}>
          <P>REGISTER</P>
        </Link>
      </Form>
    </Wrapper>
  );
};

export default Login;
