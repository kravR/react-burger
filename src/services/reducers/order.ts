import { IIngredientData, IOrderData } from "../types/data";

import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
  RESET_ORDER,
  SET_ORDER_ITEMS,
  SELECT_ORDER,
  TOrderActions
} from "../actions/order";

interface IOrderState {
  number: number | 0,
  ingredients: Array<IIngredientData> | [],
  isLoading: boolean,
  isError: boolean,
  order: IOrderData | {},
};

export const initialState = {
  number: 0,
  ingredients: [],
  isLoading: false,
  isError: false,
  order: {}
};

export const order = (state = initialState, action: TOrderActions): IOrderState => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        ingredients: [],
        number: action.number,
      };
    case CREATE_ORDER_FAILED:
      return {
        ...state,
        ingredients: [],
        isLoading: false,
        isError: true,
      };
    case SET_ORDER_ITEMS:
      return {
        ...state,
        ingredients: action.order,
      };
    case RESET_ORDER:
      return {
        ...state,
        number: 0
      };
    case SELECT_ORDER:
      return {
        ...state,
        order: action.order,
      };
    default:
      return state;
  }
};
