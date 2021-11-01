import { API_URL } from "../../utils/constants";
import { ServerError } from "../../utils/ServerError";
import { refreshToken } from "../token";

function request(url, method, body) {
  return fetch(url, {
    method,
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `${localStorage.getItem("accessToken")}`,
    },
    body,
  })
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(response);
      }

      return response.json();
    })
    .catch(async (response) => {
      const error = await response.json().then((response) => response);

      if (error.message === "jwt expired") {
        if (!request.refreshPromise) {
          request.refreshPromise = refreshToken().then((response) => {
            delete request.refreshPromise;
            return response;
          });
        }

        return request.refreshPromise.then(() => request(url, method, body));
      }

      
      return Promise.reject(new ServerError(error.message, response.status));
    });
}

export function get(path) {
  return request(`${API_URL}/${path}`, "GET");
}

export function post(path, body) {
  return request(`${API_URL}/${path}`, "POST", JSON.stringify(body));
}

export function patch(path, body) {
  return request(`${API_URL}/${path}`, "PATCH", JSON.stringify(body));
}

export function del(path, body) {
  return request(`${API_URL}/${path}`, "DELETE", JSON.stringify(body));
}
