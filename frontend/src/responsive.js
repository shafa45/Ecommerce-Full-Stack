import { css } from 'styled-components';

export const landscape = (props) => {
  return css`
    @media only screen and (max-width: 960px) {
      ${props}
    }
  `;
};

export const tablet = (props) => {
  return css`
    @media only screen and (max-width: 768px) {
      ${props}
    }
  `;
};

export const sm = (props) => {
  return css`
    @media only screen and (max-width: 600px) {
      ${props}
    }
  `;
};

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 450px) {
      ${props}
    }
  `;
};
