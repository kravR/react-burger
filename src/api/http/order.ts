import * as publicApi from "./core/publicApi";

import { IOrderParams, IOrderResponse } from "../../services/types/data";

export function getOrder(params: IOrderParams): Promise<IOrderResponse> {
  return publicApi.post("orders", params).then((response) => response.order);
}
