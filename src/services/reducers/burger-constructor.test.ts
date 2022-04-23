import { burger as reducer, initialState } from "./burger-constructor";
import * as types from "../actions/burger-constructor";
import { IIngredientData } from "../../services/types/data";

const testIngredien: IIngredientData = {
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
    uuid: "165071481615460666c42cc7b410027a1a9b7",
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
    uuid: "165071481615460666c42cc7b410027a1a9b5",
  },
];

describe("Ingredient details reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {} as any)).toEqual(initialState);
  });

  it("should handle ADD_BUN", () => {
    expect(
      reducer(initialState, {
        type: types.ADD_BUN,
        bun: testIngredien,
      })
    ).toEqual({
      ...initialState,
      bun: testIngredien,
    });
  });

  it("should handle DELETE_BUN", () => {
    expect(
      reducer(initialState, {
        type: types.DELETE_BUN,
      })
    ).toEqual({
      ...initialState,
      bun: null,
    });
  });

  it("should handle ADD_INGREDIENT", () => {
    expect(
      reducer(initialState, {
        type: types.ADD_INGREDIENT,
        item: testIngredien,
      })
    ).toEqual({
      ...initialState,
      filling: [
        ...initialState.filling,
        { ...testIngredien, uuid: new Date().getTime() + testIngredien._id },
      ],
    });
  });

  it("should handle DELETE_INGREDIENT", () => {
    expect(
      reducer(initialState, {
        type: types.DELETE_INGREDIENT,
        id: new Date().getTime() + testIngredien._id,
      })
    ).toEqual({
      ...initialState,
      filling: [...(initialState.filling as Array<IIngredientData>)].filter(
        (item) => item.uuid !== new Date().getTime() + testIngredien._id
      ),
    });
  });

  it("should handle SORT_INGREDIENTS", () => {
    const dragIndex = 0;
    const hoverIndex = 1;
    expect(
      reducer({
        ...initialState,
        filling: [
          {...testOtherIngrediensOrder[dragIndex]},
          {...testOtherIngrediensOrder[hoverIndex]},
        ]
      }, {
        type: types.SORT_INGREDIENTS,
        dragIndex: dragIndex,
        hoverIndex: hoverIndex,
      })
    ).toEqual({
      ...initialState,
      filling: [
        {...testOtherIngrediensOrder[hoverIndex]},
        {...testOtherIngrediensOrder[dragIndex]},
      ]
    });
  });
});
