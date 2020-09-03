import * as api from '../../api';

export const signupUser = (userData) => ({
    type:'AUTH_USER',
    payload: api.signupUser(userData)
})