import { ingredient as reducer, initialState } from "./ingredient-details";
import * as types from "../actions/ingredient-details";
import { IIngredientData } from "../../services/types/data";

const testIngredient: IIngredientData = {
  _id: "60666c42cc7b410027a1a9b1",
  name: "Краторная булка N-200i",
  type: "bun",
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  qty: 0,
  uuid: "0",
};

describe("Ingredient details reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {} as any)).toEqual(initialState);
  });

  it("should handle SELECT_INGREDIENT", () => {
    expect(
      reducer(initialState, {
        type: types.SELECT_INGREDIENT,
        ingredient: testIngredient,
      })
    ).toEqual({
      ...initialState,
      ingredient: testIngredient,
    });
  });
});
