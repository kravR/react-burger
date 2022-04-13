import { IOrderData } from "../types/data";

export const WS_CONNECTION_START = "WS_CONNECTION_START" as const;
export const WS_CONNECTION_SUCCESS = "WS_CONNECTION_SUCCESS" as const;
export const WS_CONNECTION_ERROR = "WS_CONNECTION_ERROR" as const;
export const WS_CONNECTION_CLOSED = "WS_CONNECTION_CLOSED" as const;
export const WS_GET_MESSAGE = "WS_GET_MESSAGE" as const;

export interface IWSConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: string;
}

export interface IWSConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWSConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
}

export interface IWSConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWSGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: {
    orders: Array<IOrderData>;
    total: number;
    totalToday: number;
  };
}

export type TWSActions =
  | IWSConnectionStart
  | IWSConnectionSuccess
  | IWSConnectionError
  | IWSConnectionClosed
  | IWSGetMessage;
