import { order as reducer, initialState } from "./order";
import * as types from "../actions/order";

const testOrderIngredients = [
  "60d3b41abdacab0026a733cd",
  "60d3b41abdacab0026a733ce",
  "60d3b41abdacab0026a733c6",
];

const testOrder = {
  _id: "6263bee2a4b934001d58cdab",
  number: 14486,
  createdAt: "2022-04-23T08:54:58.536Z",
  updatedAt: "2022-04-23T08:54:58.801Z",
  name: "Флюоресцентный space метеоритный spicy био-марсианский бессмертный люминесцентный антарианский бургер",
  ingredients: testOrderIngredients,
  status: "done",
};

const testNumber = 999;

describe("Order reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {} as any)).toEqual(initialState);
  });

  it("should handle CREATE_ORDER_REQUEST", () => {
    expect(reducer(initialState, { type: types.CREATE_ORDER_REQUEST })).toEqual(
      {
        ...initialState,
        isLoading: true,
      }
    );
  });

  it("should handle CREATE_ORDER_SUCCESS", () => {
    expect(
      reducer(initialState, {
        type: types.CREATE_ORDER_SUCCESS,
        number: testNumber,
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      isError: false,
      ingredients: [],
      number: testNumber,
    });
  });

  it("should handle CREATE_ORDER_FAILED", () => {
    expect(reducer(initialState, { type: types.CREATE_ORDER_FAILED })).toEqual({
      ...initialState,
      ingredients: [],
      isLoading: false,
      isError: true,
    });
  });

  it("should handle SET_ORDER_ITEMS", () => {
    expect(
      reducer(initialState, {
        type: types.SET_ORDER_ITEMS,
        order: testOrderIngredients,
      })
    ).toEqual({
      ...initialState,
      ingredients: testOrderIngredients,
    });
  });

  it("should handle RESET_ORDER", () => {
    expect(reducer(initialState, { type: types.RESET_ORDER })).toEqual({
      ...initialState,
      number: 0,
    });
  });

  it("should handle SELECT_ORDER", () => {
    expect(
      reducer(initialState, { type: types.SELECT_ORDER, order: testOrder })
    ).toEqual({
      ...initialState,
      order: testOrder,
    });
  });
});
