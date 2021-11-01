import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAILED,
  UPDATE_TOKEN_REQUEST,
  UPDATE_TOKEN_SUCCESS,
  UPDATE_TOKEN_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
} from "../actions/auth";

export const initialState = {
  user: null,
  error: null,
  isLoading: false,
  isError: false,
  isAuthorized: Boolean(localStorage.getItem("accessToken")),
  isReset: false,
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        error: null,
        user: action.user,
        isAuthorized: true,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        user: {},
        error: action.error,
        isLoading: false,
        isError: true,
        isAuthorized: false,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        isLoading: false,
        isError: false,
        isAuthorized: false,
      };
    case LOGOUT_FAILED:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case REGISTRATION_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case REGISTRATION_SUCCESS:
      return {
        error: null,
        user: action.user,
        isLoading: false,
        isError: false,
        isAuthorized: true,
      };
    case REGISTRATION_FAILED:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isError: true,
        isAuthorized: false,
      };
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isReset: true,
      };
    case FORGOT_PASSWORD_FAILED:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isReset: false,
      };
    case RESET_PASSWORD_FAILED:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case USER_SUCCESS:
      return {
        error: null,
        user: action.user,
        isLoading: false,
        isError: false,
        isAuthorized: true,
      };
    case USER_FAILED:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isError: true,
      };
    case UPDATE_TOKEN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_TOKEN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isAuthorized: true,
      };
    case UPDATE_TOKEN_FAILED:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};
