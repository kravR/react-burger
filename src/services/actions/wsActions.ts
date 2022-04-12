export const WS_CONNECTION_START = "WS_CONNECTION_START" as const;
export const WS_CONNECTION_SUCCESS = "WS_CONNECTION_SUCCESS" as const;
export const WS_CONNECTION_ERROR = "WS_CONNECTION_ERROR" as const;
export const WS_CONNECTION_CLOSED = "WS_CONNECTION_CLOSED" as const;
export const WS_GET_MESSAGE = "WS_GET_MESSAGE" as const;
export const WS_SEND_MESSAGE = "WS_SEND_MESSAGE" as const;

export interface IWSConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: any;
}

export interface IWSConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
  readonly payload: any;
}

export interface IWSConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: any;
}

export interface IWSConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
  readonly payload: any;
}

export interface IWSGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: any;
}

export type TWSActions =
  | IWSConnectionStart
  | IWSConnectionSuccess
  | IWSConnectionError
  | IWSConnectionClosed
  | IWSGetMessage;