import * as authService from "../../api/auth";
import * as userService from "../../api/user";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

export const REGISTRATION_REQUEST = "REGISTRATION_USER_REQUEST";
export const REGISTRATION_SUCCESS = "REGISTRATION_USER_SUCCESS";
export const REGISTRATION_FAILED = "REGISTRATION_USER_FAILED";

export const USER_REQUEST = "USER_REQUEST";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_FAILED = "USER_FAILED";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";

export const UPDATE_TOKEN_REQUEST = "UPDATE_TOKEN_REQUEST";
export const UPDATE_TOKEN_SUCCESS = "UPDATE_TOKEN_SUCCESS";
export const UPDATE_TOKEN_FAILED = "UPDATE_TOKEN_FAILED";

export const registration = (formValues) => (dispatch) => {
  dispatch({
    type: REGISTRATION_REQUEST,
  });

  return authService
    .registration(formValues)
    .then((user) => dispatch({ type: REGISTRATION_SUCCESS, user }))
    .catch((error) => dispatch({ type: REGISTRATION_FAILED, error }));
};

export const login = (formValues) => (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST,
  });

  return authService
    .login(formValues)
    .then((user) => dispatch({ type: LOGIN_SUCCESS, user }))
    .catch((error) => dispatch({ type: LOGIN_FAILED, error }));
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT_REQUEST,
  });

  return authService
    .logout()
    .then(() => dispatch({ type: LOGOUT_SUCCESS }))
    .catch(() => dispatch({ type: LOGOUT_FAILED }));
};

export const forgotPassword = (formValues) => (dispatch) => {
  dispatch({
    type: FORGOT_PASSWORD_REQUEST,
  });

  return authService
    .forgotPassword(formValues)
    .then(() => dispatch({ type: FORGOT_PASSWORD_SUCCESS }))
    .catch(() => dispatch({ type: FORGOT_PASSWORD_FAILED }));
};

export const resetPassword = (formValues) => (dispatch) => {
  dispatch({
    type: RESET_PASSWORD_REQUEST,
  });

  return authService
    .resetPassword(formValues)
    .then(() => dispatch({ type: RESET_PASSWORD_SUCCESS }))
    .catch(() => dispatch({ type: RESET_PASSWORD_FAILED }));
};

export const getUser = () => (dispatch) => {
  dispatch({
    type: USER_REQUEST,
  });

  return userService
    .getUser()
    .then((user) => dispatch({ type: USER_SUCCESS, user }))
    .catch((error) => dispatch({ type: USER_FAILED, error }));
};

export const updateUser = (formValues) => (dispatch) => {
  dispatch({
    type: USER_REQUEST,
  });

  return userService
    .updateUser(formValues)
    .then((user) => dispatch({ type: USER_SUCCESS, user }))
    .catch((error) => dispatch({ type: USER_FAILED, error }));
};
