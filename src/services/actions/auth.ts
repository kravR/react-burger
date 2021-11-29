import * as authService from "../../api/http/auth";
import * as userService from "../../api/http/user";

import { AppThunk, AppDispatch } from "../types";
import { IErrorResponse, IUserResponse } from "../types/data";

export const LOGIN_REQUEST = "LOGIN_REQUEST" as const;
export const LOGIN_SUCCESS = "LOGIN_SUCCESS" as const;
export const LOGIN_FAILED = "LOGIN_FAILED" as const;

export const LOGOUT_REQUEST = "LOGOUT_REQUEST" as const;
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS" as const;
export const LOGOUT_FAILED = "LOGOUT_FAILED" as const;

export const REGISTRATION_REQUEST = "REGISTRATION_USER_REQUEST" as const;
export const REGISTRATION_SUCCESS = "REGISTRATION_USER_SUCCESS" as const;
export const REGISTRATION_FAILED = "REGISTRATION_USER_FAILED" as const;

export const USER_REQUEST = "USER_REQUEST" as const;
export const USER_SUCCESS = "USER_SUCCESS" as const;
export const USER_FAILED = "USER_FAILED" as const;

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST" as const;
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS" as const;
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED" as const;

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST" as const;
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS" as const;
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED" as const;

export const UPDATE_TOKEN_REQUEST = "UPDATE_TOKEN_REQUEST" as const;
export const UPDATE_TOKEN_SUCCESS = "UPDATE_TOKEN_SUCCESS" as const;
export const UPDATE_TOKEN_FAILED = "UPDATE_TOKEN_FAILED" as const;

export interface ILoginRequest {
  readonly type: typeof LOGIN_REQUEST;
}
export interface ILoginSuccess {
  readonly type: typeof LOGIN_SUCCESS;
  readonly user: IUserResponse;
}
export interface ILoginFailed {
  readonly type: typeof LOGIN_FAILED;
  readonly error: IErrorResponse;
}

export interface ILogoutRequest {
  readonly type: typeof LOGOUT_REQUEST;
}
export interface ILogoutSuccess {
  readonly type: typeof LOGOUT_SUCCESS;
}
export interface ILogoutFailed {
  readonly type: typeof LOGOUT_FAILED;
}

export interface IRegistartionRequest {
  readonly type: typeof REGISTRATION_REQUEST;
}
export interface IRegistartionSuccess {
  readonly type: typeof REGISTRATION_SUCCESS;
  readonly user: IUserResponse;
}
export interface IRegistartionFailed {
  readonly type: typeof REGISTRATION_FAILED;
  readonly error: IErrorResponse;
}

export interface IUserRequest {
  readonly type: typeof USER_REQUEST;
}
export interface IUserSuccess {
  readonly type: typeof USER_SUCCESS;
  readonly user: IUserResponse;
}
export interface IUserFailed {
  readonly type: typeof USER_FAILED;
  readonly error: IErrorResponse;
}

export interface IForgotPasswordRequest {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
}
export interface IForgotPasswordSuccess {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}
export interface IForgotPasswordFailed {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
}

export interface IResetPasswordRequest {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}
export interface IResetPasswordSuccess {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}
export interface IResetPasswordFailed {
  readonly type: typeof RESET_PASSWORD_FAILED;
}

export interface IUpdateTokenRequest {
  readonly type: typeof UPDATE_TOKEN_REQUEST;
}
export interface IUpdateTokenSuccess {
  readonly type: typeof UPDATE_TOKEN_SUCCESS;
}
export interface IUpdateTokenFailed {
  readonly type: typeof UPDATE_TOKEN_FAILED;
}

export type TAuthActions =
  | ILoginRequest
  | ILoginSuccess
  | ILoginFailed
  | ILogoutRequest
  | ILogoutSuccess
  | ILogoutFailed
  | IRegistartionRequest
  | IRegistartionSuccess
  | IRegistartionFailed
  | IUserRequest
  | IUserSuccess
  | IUserFailed
  | IForgotPasswordRequest
  | IForgotPasswordSuccess
  | IForgotPasswordFailed
  | IResetPasswordRequest
  | IResetPasswordSuccess
  | IResetPasswordFailed
  | IUpdateTokenRequest
  | IUpdateTokenSuccess
  | IUpdateTokenFailed;

export const registration: AppThunk =
  (formValues) => (dispatch: AppDispatch) => {
    dispatch({
      type: REGISTRATION_REQUEST,
    });

    return authService
      .registration(formValues)
      .then((user) => dispatch({ type: REGISTRATION_SUCCESS, user }))
      .catch((error) => dispatch({ type: REGISTRATION_FAILED, error }));
  };

export const login: AppThunk = (formValues) => (dispatch: AppDispatch) => {
  dispatch({
    type: LOGIN_REQUEST,
  });

  return authService
    .login(formValues)
    .then((user) => dispatch({ type: LOGIN_SUCCESS, user }))
    .catch((error) => dispatch({ type: LOGIN_FAILED, error }));
};

export const logout: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch({
    type: LOGOUT_REQUEST,
  });

  return authService
    .logout()
    .then(() => dispatch({ type: LOGOUT_SUCCESS }))
    .catch(() => dispatch({ type: LOGOUT_FAILED }));
};

export const forgotPassword: AppThunk =
  (formValues) => (dispatch: AppDispatch) => {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });

    return authService
      .forgotPassword(formValues)
      .then(() => dispatch({ type: FORGOT_PASSWORD_SUCCESS }))
      .catch(() => dispatch({ type: FORGOT_PASSWORD_FAILED }));
  };

export const resetPassword: AppThunk =
  (formValues) => (dispatch: AppDispatch) => {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });

    return authService
      .resetPassword(formValues)
      .then(() => dispatch({ type: RESET_PASSWORD_SUCCESS }))
      .catch(() => dispatch({ type: RESET_PASSWORD_FAILED }));
  };

export const getUser: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch({
    type: USER_REQUEST,
  });

  return userService
    .getUser()
    .then((user) => dispatch({ type: USER_SUCCESS, user }))
    .catch((error) => dispatch({ type: USER_FAILED, error }));
};

export const updateUser: AppThunk = (formValues) => (dispatch: AppDispatch) => {
  dispatch({
    type: USER_REQUEST,
  });

  return userService
    .updateUser(formValues)
    .then((user) => dispatch({ type: USER_SUCCESS, user }))
    .catch((error) => dispatch({ type: USER_FAILED, error }));
};
