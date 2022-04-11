import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState } from "../types";
import { TWSActions } from "../actions/wsActions";

export const socketMiddleware = (wsUrl, wsActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next: AppDispatch) => (action: TWSActions) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { onInit, onOpen, onClose, onError, onMessage, onSendMessage } =
        wsActions;

      if (type === onInit) {
        socket = new WebSocket(`${wsUrl}/${payload}`);
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          dispatch({ type: onMessage, payload: JSON.parse(data) });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };
        
        if (type === onClose) {
          socket?.close();
        }

        if (type === onSendMessage) {
          const message = payload;
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  }) as Middleware;
};
