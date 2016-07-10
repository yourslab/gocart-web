import axios from 'axios';
import cookie from 'app/cookie';
import history from 'app/history'
import lang from 'app/lang';
import config from 'app/config';
import facebook from 'app/utils/facebook';
import isServerError from 'app/utils/isServerError';
import formatValidationErrors from 'app/utils/formatValidationErrors';

const LOGOUT = 'authentication:logout';
const AUTHENTICATE = 'authentication:start';
const AUTHENTICATE_SUCCESS = 'authentication:success';
const AUTHENTICATE_ERROR = 'authentication:error';
const AUTH_GET_DATA = 'user:get';
const FACEBOOK_AUTHENTICATE = 'authentication:facebook';
const FACEBOOK_AUTHENTICATE_SUCCESS = 'authentication:facebook-success';
const FACEBOOK_AUTHENTICATE_ERROR = 'authentication:facebook-error';
const FACEBOOK_AUTHENTICATE_CANCEL = 'authentication:facebook-error';
const FACEBOOK_NEW = 'authentication:facebook-new';
const FACEBOOK_NEW_REQUEST = 'authentication:facebook-new-request';
const FACEBOOK_NEW_SUCCESS = 'authentication:facebook-new-success';
const FACEBOOK_NEW_ERROR = 'authentication:facebook-new-error';
const AUTH_UPDATE = 'authentication:update';
const AUTH_UPDATE_SUCCESS = 'authentication:update-success';
const AUTH_UPDATE_ERROR = 'authentication:update-error';

const initialState = {
  user: {},
  token: null,

  authentication: {
    loading: false,
    message: '',
  },

  facebook: {
    loading: false,
    message: '',
  },

  ['facebook.register']: {
    active: false,
    loading: false,
    errors: {},
    message: '',
  },

  update: {
    loading: false,
    message: '',
    error: false,
    errors: {}
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

    case FACEBOOK_AUTHENTICATE:
      return {
        ...state,
        facebook: {
          loading: true,
          message: ''
        }
      };

    case FACEBOOK_AUTHENTICATE_SUCCESS:
      return {
        ...state,

        facebook: {
          ...state.facebook,
          loading: false
        },

        user: action.payload.user,
        token: action.payload.token
      };


    case FACEBOOK_AUTHENTICATE_ERROR:
      return {
        ...state,

        facebook: {
          ...state.facebook,
          loading: false,
          message: action.payload
        }
      };

    // When the user "cancels" his login
    case FACEBOOK_AUTHENTICATE_CANCEL:
      return {
        ...state,

        facebook: {
          ...state.facebook,
          loading: false
        }
      };

    case FACEBOOK_NEW:
      return {
        ...state,

        facebook: {
          ...state.facebook,
          loading: false
        },

        ['facebook.register']: {
          ...state['facebook.register'],
          active: true
        }
      };

    case FACEBOOK_NEW_REQUEST:
      return {
        ...state,

        ['facebook.register']: {
          ...state['facebook.register'],
          loading: true,
          errors: {},
          message: ''
        }
      };

    case FACEBOOK_NEW_SUCCESS:
      return {
        ...state,

        ['facebook.register']: {
          ...state['facebook.register'],
          active: false,
          loading: false
        }
      };

    case FACEBOOK_NEW_ERROR:
      return {
        ...state,

        ['facebook.register']: {
          ...state['facebook.register'],
          loading: false,
          errors: action.payload.errors,
          message: action.payload.message
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

    case AUTH_UPDATE:
      return {
        ...state,
        update: {
          ...state.update,
          loading: true,
          error: false,
          errors: {}
        }
      };

    case AUTH_UPDATE_SUCCESS:
      return {
        ...state,

        user: {
          ...state.user,
          ...action.payload
        },

        update: {
          ...state.update,
          loading: false,
          error: false,
          errors: {}
        }
      }

    case AUTH_UPDATE_ERROR:
      return {
        ...state,
        update: {
          ...state.update,
          loading: false,
          error: true,
          errors: action.payload.errors
        }
      }

    default:
      return state;
  }
}

export function login({username, password}, redirect = '/') {
  return (dispatch, getState) => {
    const {auth} = getState();

    if ( auth.authentication.loading ) {
      return;
    }

    dispatch({ type: AUTHENTICATE });

    let token; // Cache the token from the response

    return axios.get(`user/email_token?identity=${username}&password=${password}`)
      .then((res) => {
        token = res.data.auth_token;

        // You're probably not wondering why this is placed here.
        // It's a good place. While we also need to override
        // the current token stored in the cookie before the request
        // takes place.
        cookie.set(config.auth.key, {
          token: res.data.auth_token,
          id: res.data.id
        });

        // We're using an axios interceptor which
        // includes the auth token from the cookie for us.
        return axios.get(`user/${res.data.id}`, {
          headers: {
            'auth-token': res.data.auth_token
          }
        });
      })
      .then((res) => {
        dispatch({
          type: AUTHENTICATE_SUCCESS,
          payload: {
            user: res.data,
            token
          }
        });

        history.push(redirect);

        return res;
      })
      .catch((res) => {
        dispatch({
          type: AUTHENTICATE_ERROR,
          // We have 3 kinds of error here:
          // Server Error, Invalid Account Error,
          // and Credentials Error
          payload: isServerError(res.status)
            ? lang.errors.server
            : (res.data.errors.length
              // Error for inactive accounts
              // "Your account is not yet activated"
              ? res.data.errors[0].description
              : lang.errors.authentication)
        });

        return Promise.reject(res);
      });
  }
}

export function loginWithFacebook(redirect = '/') {
  return (dispatch, getState) => {
    if ( getState().auth.facebook.loading ) {
      return;
    }

    dispatch({ type: FACEBOOK_AUTHENTICATE });

    // 1. Login with FB
    // 2. Fetch FB Data
    // 3. Check if user exists
    // 3.1 If user exists, authenticate
    // 3.2 Otherwise, show username input
    //     (by of course, set state to "non-existing")
    return facebook.login()
      .then(facebook.fetch)
      .then((res) => {
        return axios.get(`user/fb_token/${facebook.token()}`)
      })
      .catch((res) => {
        if ( isServerError(res.status) ) {
          dispatch({
            type: FACEBOOK_AUTHENTICATE_ERROR,
            payload: lang.errors.server
          });
        // A 404: Indicating that the facebook
        // account doesn't have an account with
        // our applicationyet.
        } else if ( res.status === 404 ) {
          dispatch({ type: FACEBOOK_NEW });
        // Catch for when `facebook.login` fails;
        // when the user "cancels" his login.
        // It responds with: { authResponse: undefined, status: undefined }
        } else {
          dispatch({
            type: FACEBOOK_AUTHENTICATE_CANCEL,
            payload: lang.errors.server
          });
        }

        return Promise.reject(res);
      })
      .then((res) => {
        dispatch({
          type: FACEBOOK_AUTHENTICATE_SUCCESS,
          payload: res.data
        });

        cookie.set(config.auth.key, {
          token: res.data.auth_token,
          id: res.data.id
        });

        history.push(redirect);

        return res;
      });
  }
}

// In `loginWithFacebook`, if the user doesn't exist
// yet, we ask for his username. This action
// registers that user with the input username
export function registerWithFacebook(username, redirect = '/') {
  return (dispatch, getState) => {
    if ( getState().auth['facebook.register'].loading ) {
      return;
    }

    dispatch({ type: FACEBOOK_NEW_REQUEST });

    return axios.post('user', {
        username,
        fb_token: facebook.token(),
        user_type: 0
      })
      .then((res) => {
        dispatch({
          type: FACEBOOK_NEW_SUCCESS,
          payload: {
            token: res.data.auth_token,
            user: res.data
          }
        });

        cookie.set(config.auth.key, {
          token: res.data.auth_token,
          id: res.data.id
        });

        history.push(redirect);

        return res;
      })
      .catch((res) => {
        dispatch({
          type: FACEBOOK_NEW_ERROR,
          payload: isServerError(res.status)
            ? {
              message: lang.errors.server,
              errors: {}
            } : {
              message: lang.errors.input,
              errors: res.data.errors
            }
        });

        return Promise.reject(res);
      });
  }
}

export function logout() {
  return (dispatch) => {
    dispatch({ type: LOGOUT });
    cookie.remove(config.auth.key);
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

    const auth = cookie.get(config.auth.key);

    if ( auth == null ) {
      return;
    }

    return axios.get(`/user/${auth.id}`, {
        headers: {
          'auth-token': auth.token
        }
      })
      .then((res) => {
        dispatch({
          type: AUTH_GET_DATA,
          payload: {
            token: auth.token,
            data: res.data
          }
        });

        return res;
      });
  }
}

export function update(data) {
  return (dispatch, getState) => {
    const {auth} = getState();

    if ( auth.update.loading ) {
      return;
    }

    dispatch({ type: AUTH_UPDATE });

    return axios.put(`/user/${auth.user.id}`, data)
      .then((res) => {
        dispatch({
          type: AUTH_UPDATE_SUCCESS,
          payload: data
        })

        history.push(`/@${auth.user.username}`);

        return res;
      })
      .catch((res) => {
        dispatch({
          type: AUTH_UPDATE_ERROR,
          payload: {
            errors: formatValidationErrors(res.data.errors)
          }
        })

        return Promise.reject(res);
      });
  }
}
