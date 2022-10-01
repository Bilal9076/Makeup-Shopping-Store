export const CUSTOMER_AUTHENTICATE = 'CUSTOMER_AUTHENTICATE';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const DID_TRY_AUTO_LOGIN = 'DID_TRY_AUTO_LOGIN';
export const LOGOUT = ' LOGOUT';

let timer;
export const DidTryAutoLogin = () => {
  return {
    type: 'DID_TRY_AUTO_LOGIN'
  }
}

export const CustomerAuthenticate = (userId, token, expiryTime) => {
  return dispatch => {
    dispatch(SetLogoutTimer(expiryTime));
    dispatch({
      type: CUSTOMER_AUTHENTICATE,
      userId: userId,
      token: token
    });
  };
};

export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAR7Ac-Grx96TK3l_Ir53hbjp0Uq0F_qLg',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );
    console.log(email)
    if (!response.ok) {
      const ResErrData = await response.json();
      const ErrorId = ResErrData.error.message;
      let message = 'Something went wrong!'
      if (ErrorId === 'EMAIL_EXISTS') {
          message = 'This email is already exist!'
      } else if (ErrorId === 'OPERATION_NOT_ALLOWED') {
          message = 'Password sign-in is disabled!'
      } else if (ErrorId === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
          message = "Try again later!"
      }
      throw new Error(message);
  }
    const resData = await response.json();
    // dispatch(CustomerAuthenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000));
    const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAR7Ac-Grx96TK3l_Ir53hbjp0Uq0F_qLg',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const ResErrData = await response.json();
      const ErrorId = ResErrData.error.message;
      let message = 'Something went wrong!'
      if (ErrorId === 'EMAIL_NOT_FOUND') {
          message = 'This Email can not be found!'
      } else if (ErrorId === 'INVALID_PASSWORD') {
          message = 'This password is not valid!'
      } else if (ErrorId === 'USER_DISABLED') {
          message = "This account is disabled by administrator"
      }
      throw new Error(message);
  }
    const resData = await response.json();
    dispatch(CustomerAuthenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000));
    const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const Logout = () => {
  ClearLogoutTimer();
  AsyncStorage.removeItem('CustomerData');
  return {
    type: LOGOUT
  }
};

const ClearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const SetLogoutTimer = expirationTime=> {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(Logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'StudentData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString()
    })
  )

};

