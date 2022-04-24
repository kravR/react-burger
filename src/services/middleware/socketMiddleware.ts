import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState } from "../types";

export const socketMiddleware = (wsUrl, wsActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { onInit, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === onInit) {
        socket = new WebSocket(`${wsUrl}/${payload}`);
      }
      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onOpen });
        };

        socket.onerror = () => {
          dispatch({ type: onError });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          dispatch({ type: onMessage, payload: JSON.parse(data) });
        };

        socket.onclose = () => {
          dispatch({ type: onClose });
        };
      }

      next(action);
    };
  }) as Middleware;
};
