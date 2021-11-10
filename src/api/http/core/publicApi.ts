import { API_URL } from "../../../utils/constants";
import { ServerError } from "../../ServerError";

function request(url: string, method: string, body?: any) {
  return fetch(url, {
    method,
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body,
  })
    .then((response: Response) => {
      if (!response.ok) {
        return Promise.reject(response);
      }
      return response.json();
    })
    .catch(async (response: Response) => {
      const error = await response.json().then((response) => response);
      return Promise.reject(new ServerError(error.message, response.status));
    });
}

export function get(path) {
  return request(`${API_URL}/${path}`, "GET");
}

export function post(path, body) {
  return request(`${API_URL}/${path}`, "POST", JSON.stringify(body));
}
