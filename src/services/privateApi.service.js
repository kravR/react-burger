import { API_URL } from "../utils/constants";

class PrivateApiService {
  apiUrl = API_URL;

  _request(url, method, body) {
    return fetch(url, {
      method,
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `${localStorage.getItem("accessToken")}`,
      },
      body,
    }).then((response) => {
      if (!response.ok) {
        throw new Error(response.message);
      }
      return response.json();
    });
  }

  get(path) {
    return this._request(`${this.apiUrl}/${path}`, "GET");
  }

  post(path, body) {
    return this._request(`${this.apiUrl}/${path}`, "POST", body);
  }

  patch(path, body) {
    return this._request(`${this.apiUrl}/${path}`, "PATCH", body);
  }

  delete(path, body) {
    return this._request(`${this.apiUrl}/${path}`, "DELETE", body);
  }
}

export default new PrivateApiService();
