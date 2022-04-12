import * as privateApi from "./core/privateApi";

import { IOrderParams, IOrderResponse } from "../../services/types/data";

export function createOrder(params: IOrderParams): Promise<IOrderResponse> {
  return privateApi.post("orders", params).then((response) => response.order);
}

// export function getOrder(params: IGetOrderParams): Promise<IGetOrderResponse> {
//   return privateApi.post("orders", params).then((response) => response.data);
// }
