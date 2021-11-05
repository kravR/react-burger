import * as privateApi from "./common/privateApi";

export function getUser() {
  return privateApi.get("auth/user").then((response) => response.user);
}

export const updateUser = (formValues) => {
  return privateApi.patch("auth/user", formValues).then((response) => response.user);
};
