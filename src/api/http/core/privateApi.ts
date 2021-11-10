import { API_URL } from "../../../utils/constants";
import { ServerError } from "../../ServerError";
import { refreshToken } from "../token";

function request(url: string, method: string, body?: any): Promise<any> {
  return fetch(url, {
    method,
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `${localStorage.getItem("accessToken")}`,
    },
    body,
  })
    .then((response: Response) => {
      if (!response.ok) {
        return Promise.reject(response);
      }

      return response.json();
    })
    .catch(async (response: Response): Promise<void> => {
      const error = await response.json().then((response) => response);

      if (error.message === "jwt expired") {
        const requestWithRefresh = request as unknown as {
          refreshPromise: Promise<any> | undefined;
        };

        if (!requestWithRefresh.refreshPromise) {
          requestWithRefresh.refreshPromise = refreshToken().then(
            (response) => {
              delete requestWithRefresh.refreshPromise;
              return response;
            }
          );
        }

        return requestWithRefresh.refreshPromise.then(() =>
          request(url, method, body)
        );
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
