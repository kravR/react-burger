import { API_URL_ORDERS } from "../../utils/constants";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const OPEN_ORDER_MODAL = "OPEN_ORDER_MODAL";
export const RESET_ORDER = "CLOSE_ORDER_MODAL";
export const SET_ORDER_ITEMS = "SET_ORDER_ITEMS";

export const getOrder = (payload) => (dispatch) => {
  dispatch({
    type: GET_ORDER_REQUEST,
  });

  fetch(API_URL_ORDERS, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Что-то пошло не так.");
      }
      return response.json();
    })
    .then((response) => {
      if (response && response.success) {
        dispatch({
          type: GET_ORDER_SUCCESS,
          number: response.order.number,
        });
      }
    })
    .catch(() => {
      dispatch({
        type: GET_ORDER_FAILED,
      });
    });
};
