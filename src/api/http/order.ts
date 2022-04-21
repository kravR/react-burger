import * as privateApi from "./core/privateApi";

import { IOrderParams, IOrderResponse } from "../../services/types/data";

export function createOrder(params: IOrderParams): Promise<IOrderResponse> {
  return privateApi.post("orders", params).then((response) => response.order);
}

