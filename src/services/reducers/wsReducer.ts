import { IOrderData } from "../types/data";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  TWSActions,
} from "../actions/wsActions";

export interface IWSState {
  orders: Array<IOrderData>;
  total: number;
  totalToday: number;
  wsConnected: boolean;
  wsError: boolean;
}

const initialState: IWSState = {
  orders: [],
  total: 0,
  totalToday: 0,
  wsConnected: false,
  wsError: false,
};

export const wsReducer = (
  state = initialState,
  action: TWSActions
): IWSState => {
  switch (action.type) {
    case WS_CONNECTION_START:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        orders: [],
        total: 0,
        totalToday: 0,
        wsConnected: false,
        wsError: true,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        orders: [],
        total: 0,
        totalToday: 0,
        wsConnected: false,
        wsError: false,
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
        wsConnected: true,
        wsError: false,
      };
    default:
      return state;
  }
};
