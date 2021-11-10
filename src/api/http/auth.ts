import * as publicApi from "./core/publicApi";

import {
  IForgotPasswordParams,
  ILoginParams,
  IRegistrationParams,
  IResetPasswordParams,
  IUserResponse,
} from "../../utils/types";

export function registration(params: IRegistrationParams): Promise<IUserResponse> {
  return publicApi.post("auth/register", params).then((response) => {
    localStorage.setItem("refreshToken", response.refreshToken);
    localStorage.setItem("accessToken", response.accessToken);

    return response.user;
  });
}

export function login(params: ILoginParams): Promise<IUserResponse> {
  return publicApi.post("auth/login", params).then((response) => {
    localStorage.setItem("refreshToken", response.refreshToken);
    localStorage.setItem("accessToken", response.accessToken);

    return response.user;
  });
}

export function logout(): Promise<void> {
  const refreshToken = localStorage.getItem("refreshToken") ?? "";

  return publicApi.post("auth/logout", { token: refreshToken }).then(() => {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
  });
}

export function forgotPassword(params: IForgotPasswordParams): Promise<void> {
  return publicApi.post("password-reset", params);
}

export function resetPassword(params: IResetPasswordParams): Promise<void> {
  return publicApi.post("password-reset/reset", params);
}
