import { API_URL } from "../utils/constants";

class PublicApi {
  apiUrl = API_URL;

  _request(url, method, body) {
    return fetch(url, {
      method,
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
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
}

export default new PublicApi();
