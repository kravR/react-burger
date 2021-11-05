import * as publicApi from "./common/publicApi";

export function getOrder(data) {
  return publicApi.post("orders", data).then((response) => response.order);
}