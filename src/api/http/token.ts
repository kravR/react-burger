import * as publicApi from "./core/publicApi";

export function refreshToken(): Promise<void> {
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
