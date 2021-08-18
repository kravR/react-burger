import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  OPEN_ORDER_MODAL,
  RESET_ORDER,
  SET_ORDER_ITEMS,
} from "../actions/order";

export const initialState = {
  number: 0,
  ingredients: [],
  isLoading: false,
  isError: false,
  visibleModal: false,
};

export const order = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        ingredients: [],
        number: action.number,
      };

    case GET_ORDER_FAILED:
      return {
        ...state,
        data: [],
        isLoading: false,
        isError: true,
      };
    case OPEN_ORDER_MODAL:
      return {
        ...state,
        visibleModal: true,
      };
    case SET_ORDER_ITEMS:
      return {
        ...state,
        ingredients: action.order,
      };
    case RESET_ORDER:
      return initialState;
    default:
      return state;
  }
};
