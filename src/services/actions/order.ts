import * as orderService from "../../api/http/order";

import { AppThunk, AppDispatch } from "../types";
import { IIngredientData } from "../types/data";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST" as const;
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS" as const;
export const GET_ORDER_FAILED = "GET_ORDER_FAILED" as const;
export const OPEN_ORDER_MODAL = "OPEN_ORDER_MODAL" as const;
export const RESET_ORDER = "CLOSE_ORDER_MODAL" as const;
export const SET_ORDER_ITEMS = "SET_ORDER_ITEMS" as const;

export interface IGetOrderRequest {
  readonly type: typeof GET_ORDER_REQUEST;
}
export interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly number: number;
}
export interface IGetOrderFailed {
  readonly type: typeof GET_ORDER_FAILED;
}

export interface IOpenOrderModal {
  readonly type: typeof OPEN_ORDER_MODAL;
}

export interface IResetOrder {
  readonly type: typeof RESET_ORDER;
}

export interface ISetOrderItems {
  readonly type: typeof SET_ORDER_ITEMS;
  readonly order: Array<IIngredientData>;
}

export type TOrderActions =
  | IGetOrderRequest
  | IGetOrderSuccess
  | IGetOrderFailed
  | IOpenOrderModal
  | IResetOrder
  | ISetOrderItems;


export const getOrder: AppThunk = (data) => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_ORDER_REQUEST,
  });

  return orderService
    .getOrder(data)
    .then((order) =>
      dispatch({ type: GET_ORDER_SUCCESS, number: order.number })
    )
    .catch(() => dispatch({ type: GET_ORDER_FAILED }));
};
