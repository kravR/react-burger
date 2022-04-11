import { IOrderData } from "../types/data";
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  TWSActions,
} from "../actions/wsActions";

export interface IWSState {
  orders: Array<IOrderData>;
  success: boolean;
  total: number;
  totalToday: number;
  wsConnected: boolean;
}

const initialState: IWSState = {
  orders: [],
  success: false,
  total: 0,
  totalToday: 0,
  wsConnected: false,
};

export const wsReducer = (
  state = initialState,
  action: TWSActions
): IWSState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        orders: [],
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        orders: [],
        wsConnected: false,
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
