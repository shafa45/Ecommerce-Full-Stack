import { publicRequest } from '../requestMethod';
import { loginFailure, loginStart, loginSuccess } from './userRedux';

export const login = async (dispatch, user, path) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post(`/auth/${path}`, user);
    dispatch(loginSuccess({ ...res.data.user, token: res.data.token }));
    console.log(res);
  } catch (err) {
    // console.log(err);
    dispatch(loginFailure(err.response.data.message));
  }
};
