import axios from 'axios';
import cookie from 'cookie-machine';
import history from 'app/history'
import lang from 'app/lang';
import config from 'app/config';
import isServerError from 'app/utils/isServerError';

const LOGOUT = 'authentication:logout';
const AUTHENTICATE = 'authentication:start';
const AUTHENTICATE_SUCCESS = 'authentication:success';
const AUTHENTICATE_ERROR = 'authentication:error';
const AUTH_GET_DATA = 'user:get';

const initialState = {
  user: {},
  token: null,

  authentication: {
    loading: false,
    message: '',
  }
};

export default function authReducer(state = initialState, action) {
  switch(action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        authentication: {
          loading: true,
          message: ''
        }
      };

    case AUTHENTICATE_SUCCESS:
      return {
        ...state,
        authentication: {
          ...state.authentication,
          loading: false
        },

        user: action.payload.user,
        token: action.payload.token
      };

    case AUTHENTICATE_ERROR:
      return {
        ...state,
        authentication: {
          loading: false,
          message: action.payload
        }
      };

    case LOGOUT:
      return {
        ...state,
        token: null,
        user: {}
      };

    case AUTH_GET_DATA:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.data
      };

    default:
      return state;
  }
}

export function login(data, redirect = '/') {
  return (dispatch, getState) => {
    const {auth} = getState();

    if ( auth.authentication.loading ) {
      return;
    }

    dispatch({ type: AUTHENTICATE });

    const payload = {
      ...data,
      grant_type: config.oauth.grantType,
      client_id: config.oauth.clientId,
      client_secret: config.oauth.clientSecret
    };

    let token; // Cache the token from the response

    return axios.post('oauth/access_token', payload)
      .then((res) => {
        token = res.data.data.access_token;

        // You're probably not wondering why this is placed here.
        // It's a good place. While we also need to override
        // the current token stored in the cookie before the request
        // takes place.
        cookie.set(config.oauth.key, res.data.data.access_token);

        // We're using an axios interceptor which
        // includes the oauth token from the cookie for us.
        return axios.get('me');
      })
      .then((res) => {
        dispatch({
          type: AUTHENTICATE_SUCCESS,
          payload: {
            user: res.data.data,
            token
          }
        });

        history.push(redirect);

        return res;
      })
      .catch((res) => {
        dispatch({
          type: AUTHENTICATE_ERROR,
          payload: isServerError(res.status)
            ? lang.errors.server
            : lang.errors.authentication
        });

        return Promise.reject(res);
      });
  }
}

export function logout() {
  return (dispatch) => {
    dispatch({ type: LOGOUT });
    cookie.remove(config.oauth.key);
    history.replace('/login');
  }
}

export function getData() {
  return (dispatch, getState) => {
    // Just so we avoid the current flickring.
    // Seems to be an issue with react-router 2.0
    if ( getState().auth.token != null ) {
      return;
    }

    const token = cookie.get(config.oauth.key);

    if ( token == null ) {
      return;
    }

    return axios.get('me')
      .then((res) => {
        dispatch({
          type: AUTH_GET_DATA,
          payload: {
            token,
            data: res.data.data
          }
        });

        return res.data.data;
      });
  }
}
