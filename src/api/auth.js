import * as publicApi from "./common/publicApi";

export function registration(formValues) {
  return publicApi.post("auth/register", formValues).then((response) => {
    localStorage.setItem("refreshToken", response.refreshToken);
    localStorage.setItem("accessToken", response.accessToken);

    return response.user;
  });
}

export function login(values) {
  return publicApi.post("auth/login", values).then((response) => {
    localStorage.setItem("refreshToken", response.refreshToken);
    localStorage.setItem("accessToken", response.accessToken);

    return response.user;    
  });
}

export function logout() {
  const refreshToken = localStorage.getItem("refreshToken") ?? "";

  return publicApi
    .post("auth/logout", { token: refreshToken })
    .then(() => {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
    });
}

export function forgotPassword(formValues) {
  return publicApi.post("password-reset", formValues);
}

export function resetPassword(formValues) {
  return publicApi.post("password-reset/reset", formValues);
}
