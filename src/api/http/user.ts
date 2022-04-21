import * as privateApi from "./core/privateApi";

import {
  IUserResponse,
  IUserUpdateParams
} from "../../services/types/data";

export function getUser(): Promise<IUserResponse> {
  return privateApi.get("auth/user").then((response) => response.user);
}

export function updateUser(params: IUserUpdateParams): Promise<IUserResponse> {
  return privateApi.patch("auth/user", params).then((response) => response.user);
};
