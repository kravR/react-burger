import { auth as reducer, initialState } from "./auth";
import * as types from "../actions/auth";
import { IErrorResponse, IUserResponse } from "../../services/types/data";

const testUser: IUserResponse = {
  email: "user@test.com",
  name: "Test name",
};

const testError: IErrorResponse = {
  message: "Test error message",
};

describe("Auth reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {} as any)).toEqual(initialState);
  });

  it("should handle LOGIN_REQUEST", () => {
    expect(reducer(initialState, { type: types.LOGIN_REQUEST })).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it("should handle LOGIN_SUCCESS", () => {
    expect(
      reducer(initialState, { type: types.LOGIN_SUCCESS, user: testUser })
    ).toEqual({
      ...initialState,
      isLoading: false,
      isError: false,
      error: null,
      user: testUser,
      isAuthorized: true,
    });
  });

  it("should handle LOGIN_FAILED", () => {
    expect(
      reducer(initialState, { type: types.LOGIN_FAILED, error: testError })
    ).toEqual({
      ...initialState,
      user: null,
      error: testError,
      isLoading: false,
      isError: true,
      isAuthorized: false,
    });
  });

  it("should handle LOGOUT_REQUEST", () => {
    expect(reducer(initialState, { type: types.LOGOUT_REQUEST })).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it("should handle LOGOUT_SUCCESS", () => {
    expect(reducer(initialState, { type: types.LOGOUT_SUCCESS })).toEqual({
      ...initialState,
      user: null,
      isLoading: false,
      isError: false,
      isAuthorized: false,
    });
  });

  it("should handle LOGOUT_FAILED", () => {
    expect(reducer(initialState, { type: types.LOGOUT_FAILED })).toEqual({
      ...initialState,
      isLoading: false,
      isError: true,
    });
  });

  it("should handle REGISTRATION_REQUEST", () => {
    expect(reducer(initialState, { type: types.REGISTRATION_REQUEST })).toEqual(
      {
        ...initialState,
        isLoading: true,
      }
    );
  });

  it("should handle REGISTRATION_SUCCESS", () => {
    expect(
      reducer(initialState, {
        type: types.REGISTRATION_SUCCESS,
        user: testUser,
      })
    ).toEqual({
      ...initialState,
      error: null,
      user: testUser,
      isLoading: false,
      isError: false,
      isAuthorized: true,
    });
  });

  it("should handle REGISTRATION_FAILED", () => {
    expect(
      reducer(initialState, {
        type: types.REGISTRATION_FAILED,
        error: testError,
      })
    ).toEqual({
      ...initialState,
      error: testError,
      isLoading: false,
      isError: true,
      isAuthorized: false,
    });
  });

  it("should handle FORGOT_PASSWORD_REQUEST", () => {
    expect(
      reducer(initialState, {
        type: types.FORGOT_PASSWORD_REQUEST,
      })
    ).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it("should handle FORGOT_PASSWORD_SUCCESS", () => {
    expect(
      reducer(initialState, {
        type: types.FORGOT_PASSWORD_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      isError: false,
      isReset: true,
    });
  });

  it("should handle FORGOT_PASSWORD_FAILED", () => {
    expect(
      reducer(initialState, {
        type: types.FORGOT_PASSWORD_FAILED,
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      isError: true,
    });
  });

  it("should handle RESET_PASSWORD_REQUEST", () => {
    expect(
      reducer(initialState, {
        type: types.RESET_PASSWORD_REQUEST,
      })
    ).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it("should handle RESET_PASSWORD_SUCCESS", () => {
    expect(
      reducer(initialState, {
        type: types.RESET_PASSWORD_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      isError: false,
      isReset: false,
    });
  });

  it("should handle RESET_PASSWORD_FAILED", () => {
    expect(
      reducer(initialState, {
        type: types.RESET_PASSWORD_FAILED,
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      isError: true,
    });
  });

  it("should handle USER_REQUEST", () => {
    expect(
      reducer(initialState, {
        type: types.USER_REQUEST,
      })
    ).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it("should handle USER_SUCCESS", () => {
    expect(
      reducer(initialState, {
        type: types.USER_SUCCESS,
        user: testUser,
      })
    ).toEqual({
      ...initialState,
      error: null,
      user: testUser,
      isLoading: false,
      isError: false,
      isAuthorized: true,
    });
  });

  it("should handle USER_FAILED", () => {
    expect(
      reducer(initialState, {
        type: types.USER_FAILED,
        error: testError,
      })
    ).toEqual({
      ...initialState,
      error: testError,
      isLoading: false,
      isError: true,
    });
  });

  it("should handle UPDATE_TOKEN_REQUEST", () => {
    expect(
      reducer(initialState, {
        type: types.UPDATE_TOKEN_REQUEST,
      })
    ).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it("should handle UPDATE_TOKEN_SUCCESS", () => {
    expect(
      reducer(initialState, {
        type: types.UPDATE_TOKEN_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      isError: false,
      isAuthorized: true,
    });
  });

  it("should handle UPDATE_TOKEN_FAILED", () => {
    expect(
      reducer(initialState, {
        type: types.UPDATE_TOKEN_FAILED,
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      isError: true,
    });
  });
});
