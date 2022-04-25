import { wsReducer as reducer, initialState } from "./wsReducer";
import * as types from "../actions/wsActions";
import { WSS_API_ORDERS } from "../../utils/constants";
import { IOrderData } from "../../services/types/data";

const testOrderIngredients: Array<string> = [
  "60d3b41abdacab0026a733cd",
  "60d3b41abdacab0026a733ce",
  "60d3b41abdacab0026a733c6",
];

const testOrder: IOrderData = {
  _id: "6263bee2a4b934001d58cdab",
  number: 14486,
  createdAt: "2022-04-23T08:54:58.536Z",
  updatedAt: "2022-04-23T08:54:58.801Z",
  name: "Флюоресцентный space метеоритный spicy био-марсианский бессмертный люминесцентный антарианский бургер",
  ingredients: testOrderIngredients,
  status: "done",
};

const testWSPayload = {
  orders: [testOrder],
  total: 1111,
  totalToday: 123
};

describe("Ingredient details reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {} as any)).toEqual(initialState);
  });

  it("should handle WS_CONNECTION_START", () => {
    expect(
      reducer(initialState, {
        type: types.WS_CONNECTION_START,
        payload: WSS_API_ORDERS,
      })
    ).toEqual({
      ...initialState,
      wsConnected: true,
    });
  });

  it("should handle WS_CONNECTION_SUCCESS", () => {
    expect(
      reducer(initialState, {
        type: types.WS_CONNECTION_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      wsConnected: true,
    });
  });

  it("should handle WS_CONNECTION_ERROR", () => {
    expect(
      reducer(initialState, {
        type: types.WS_CONNECTION_ERROR,
      })
    ).toEqual({
      ...initialState,
      orders: [],
      total: 0,
      totalToday: 0,
      wsConnected: false,
      wsError: true,
    });
  });

  it("should handle WS_CONNECTION_CLOSED", () => {
    expect(
      reducer(initialState, {
        type: types.WS_CONNECTION_CLOSED,
      })
    ).toEqual({
      ...initialState,
      orders: [],
      total: 0,
      totalToday: 0,
      wsConnected: false,
      wsError: false,
    });
  });

  it("should handle WS_GET_MESSAGE", () => {
    expect(
      reducer(initialState, {
        type: types.WS_GET_MESSAGE,
        payload: testWSPayload
      })
    ).toEqual({
      ...initialState,
      orders: testWSPayload.orders,
      total: testWSPayload.total,
      totalToday: testWSPayload.totalToday,
      wsConnected: true,
      wsError: false,
    });
  });
});
