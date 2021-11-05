import * as orderService from "../../api/order";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const OPEN_ORDER_MODAL = "OPEN_ORDER_MODAL";
export const RESET_ORDER = "CLOSE_ORDER_MODAL";
export const SET_ORDER_ITEMS = "SET_ORDER_ITEMS";

export const getOrder = (data) => (dispatch) => {
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
