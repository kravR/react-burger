import { ingredients as reducer, initialState } from "./burger-ingredients";
import * as types from "../actions/burger-ingredients";
import { IIngredientData } from "../types/data";

const testOtherIngrediensOrder: Array<IIngredientData> = [
  {
    _id: "60666c42cc7b410027a1a9b5",
    name: "Говяжий метеорит (отбивная)",
    type: "main",
    proteins: 800,
    fat: 800,
    carbohydrates: 300,
    calories: 2674,
    price: 3000,
    image: "https://code.s3.yandex.net/react/code/meat-04.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-04-large.png",
    qty: 0,
    uuid: "0",
  },
  {
    _id: "60666c42cc7b410027a1a9b7",
    name: "Соус Spicy-X",
    type: "sauce",
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: "https://code.s3.yandex.net/react/code/sauce-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
    qty: 0,
    uuid: "0",
  },
];

describe("Ingredient details reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {} as any)).toEqual(initialState);
  });

  it("should handle GET_INGREDIENTS_REQUEST", () => {
    expect(
      reducer(initialState, {
        type: types.GET_INGREDIENTS_REQUEST,
      })
    ).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it("should handle GET_INGREDIENTS_SUCCESS", () => {
    expect(
      reducer(initialState, {
        type: types.GET_INGREDIENTS_SUCCESS,
        ingredients: testOtherIngrediensOrder,
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      isError: false,
      ingredients: [
        ...(testOtherIngrediensOrder as Array<IIngredientData>),
      ].map((item) => ({ ...item, qty: 0 })),
    });
  });

  it("should handle GET_INGREDIENTS_FAILED", () => {
    expect(
      reducer(initialState, {
        type: types.GET_INGREDIENTS_FAILED,
      })
    ).toEqual({
      ...initialState,
      ingredients: [],
      isLoading: false,
      isError: true,
    });
  });

  it("should handle INCREASE_INGREDIENT_COUNT", () => {
    const idIngredient = "60666c42cc7b410027a1a9b5";
    const qtyIngredient = 1;
    expect(
      reducer(initialState, {
        type: types.INCREASE_INGREDIENT_COUNT,
        id: idIngredient,
        qty: qtyIngredient,
      })
    ).toEqual({
      ...initialState,
      ingredients: [
        ...(initialState.ingredients as Array<IIngredientData>),
      ].map((item) => {
        const qty = item.qty ? item.qty : 0;
        return item._id === idIngredient
          ? { ...item, qty: qty + qtyIngredient }
          : item;
      }),
    });
  });

  it("should handle DECREASE_INGREDIENT_COUNT", () => {
    const idIngredient = "60666c42cc7b410027a1a9b5";
    const qtyIngredient = 1;
    expect(
      reducer(initialState, {
        type: types.DECREASE_INGREDIENT_COUNT,
        id: idIngredient,
        qty: qtyIngredient,
      })
    ).toEqual({
      ...initialState,
      ingredients: [
        ...(initialState.ingredients as Array<IIngredientData>),
      ].map((item) => {
        const qty = item.qty ? item.qty : 0;
        return item._id === idIngredient
          ? { ...item, qty: qty - qtyIngredient }
          : item;
      }),
    });
  });

  it("should handle CLEAR_BUN_COUNT", () => {
    expect(
      reducer(initialState, {
        type: types.CLEAR_BUN_COUNT,
      })
    ).toEqual({
      ...initialState,
      ingredients: [
        ...(initialState.ingredients as Array<IIngredientData>),
      ].map((item) => (item.type === "bun" ? { ...item, qty: 0 } : item)),
    });
  });

  it("should handle CLEAR_INGREDIENTS_COUNT", () => {
    expect(
      reducer(initialState, {
        type: types.CLEAR_INGREDIENTS_COUNT,
      })
    ).toEqual({
      ...initialState,
      ingredients: [
        ...(initialState.ingredients as Array<IIngredientData>),
      ].map((item) => (item.qty ? { ...item, qty: 0 } : item)),
    });
  });
});
