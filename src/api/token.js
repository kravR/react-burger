import * as publicApi from "./common/publicApi";

export function refreshToken() {
  return publicApi
    .post("auth/token", { token: localStorage.getItem("refreshToken") })
    .then((response) => {
      localStorage.setItem("refreshToken", response.refreshToken);
      localStorage.setItem("accessToken", response.accessToken);
    })
    .catch(() => {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
    });
}
