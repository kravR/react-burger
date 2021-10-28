import publicApi from "../../services/publicApi.service";
import privateApi from "../../services/privateApi.service";
import { API_ENDPOINTS } from "../../utils/constants";

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

  if (formValues) {
    publicApi
      .post(API_ENDPOINTS.REGISTRATION, JSON.stringify(formValues))
      .then((response) => {
        localStorage.setItem("refreshToken", response.refreshToken);
        localStorage.setItem("accessToken", response.accessToken);

        dispatch({
          type: REGISTRATION_SUCCESS,
          user: response.user,
        });
      })
      .catch(() => dispatch({ type: REGISTRATION_FAILED }));
  }
};

export const login = (formValues) => (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST,
  });

  if (formValues) {
    publicApi
      .post(API_ENDPOINTS.LOGIN, JSON.stringify(formValues))
      .then((response) => {
        localStorage.setItem("refreshToken", response.refreshToken);
        localStorage.setItem("accessToken", response.accessToken);
        dispatch({
          type: LOGIN_SUCCESS,
          user: response.user,
        });
      })
      .catch(() => {
        dispatch({ type: LOGIN_FAILED });
      });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT_REQUEST,
  });

  const refreshToken = localStorage.getItem("refreshToken") ?? "";

  publicApi
    .post(API_ENDPOINTS.LOGOUT, JSON.stringify({ token: refreshToken }))
    .then((response) => {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      dispatch({ type: LOGOUT_SUCCESS });
    })
    .catch(() => {
      dispatch({ type: LOGOUT_FAILED });
    });
};

export const getUser = () => (dispatch) => {
  dispatch({
    type: USER_REQUEST,
  });
  refreshToken();
  privateApi
    .get(API_ENDPOINTS.USER_INFO)
    .then((response) => {
      dispatch({
        type: USER_SUCCESS,
        user: response.user,
      });
    })
    .catch(() => {
      dispatch({ type: USER_FAILED });
    });
};

export const updateUser = (formValues) => (dispatch) => {
  dispatch({
    type: USER_REQUEST,
  });

  if (formValues) {
    refreshToken();
    privateApi
      .patch(API_ENDPOINTS.USER_INFO, JSON.stringify(formValues))
      .then((response) => {
        dispatch({
          type: USER_SUCCESS,
          user: response.user,
        });
      })
      .catch(() => {
        dispatch({ type: USER_FAILED });
      });
  }
};

export const refreshToken = () => (dispatch) => {
  dispatch({
    type: UPDATE_TOKEN_REQUEST,
  });

  privateApi
    .post(
      API_ENDPOINTS.UPDATE_TOKEN,
      JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      })
    )
    .then((response) => {
      localStorage.setItem("refreshToken", response.refreshToken);
      localStorage.setItem("accessToken", response.accessToken);
      dispatch({ type: UPDATE_TOKEN_SUCCESS });
    })
    .catch(() => {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      dispatch({ type: UPDATE_TOKEN_FAILED });
    });
};

export const forgotPassword = (formValues) => (dispatch) => {
  dispatch({
    type: FORGOT_PASSWORD_REQUEST,
  });

  if (formValues) {
    publicApi
      .post(API_ENDPOINTS.FORGOT_PASSWORD, JSON.stringify(formValues))
      .then(() => {
        dispatch({ type: FORGOT_PASSWORD_SUCCESS });
      })
      .catch(() => {
        dispatch({ type: FORGOT_PASSWORD_FAILED });
      });
  }
};

export const resetPassword = (formValues) => (dispatch) => {
  dispatch({
    type: RESET_PASSWORD_REQUEST,
  });

  if (formValues) {
    publicApi
      .post(API_ENDPOINTS.RESET_PASSWORD, JSON.stringify(formValues))
      .then(() => {
        dispatch({ type: RESET_PASSWORD_SUCCESS });
      })
      .catch(() => {
        dispatch({ type: RESET_PASSWORD_FAILED });
      });
  }
};
