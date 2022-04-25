import * as ingredientService from "../../api/http/ingredient";

import { AppThunk, AppDispatch } from "../types";
import { IIngredientData } from "../types/data";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST" as const;
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS" as const;
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED" as const;

export const INCREASE_INGREDIENT_COUNT = "INCREASE_INGREDIENT_COUNT" as const;
export const DECREASE_INGREDIENT_COUNT = "DECREASE_INGREDIENT_COUNT" as const;

export const CLEAR_BUN_COUNT = "CLEAR_BUN_COUNT" as const;
export const CLEAR_INGREDIENTS_COUNT = "CLEAR_INGREDIENTS_COUNT" as const;

export interface IIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: Array<IIngredientData>;
}
export interface IIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IIncreaseIngredientCount {
  readonly type: typeof INCREASE_INGREDIENT_COUNT;
  qty: number;
  id: string;
}
export interface IDecreaseIngredientCount {
  readonly type: typeof DECREASE_INGREDIENT_COUNT;
  qty: number;
  id: string;
}

export interface IClearBunCount {
  readonly type: typeof CLEAR_BUN_COUNT;
}

export interface IClearIngredientsCount {
  readonly type: typeof CLEAR_INGREDIENTS_COUNT;
}

export type TBurgerIngredientsActions =
  | IIngredientsRequest
  | IIngredientsSuccess
  | IIngredientsFailed
  | IIncreaseIngredientCount
  | IDecreaseIngredientCount
  | IClearBunCount
  | IClearIngredientsCount;

export const getIngredientsData: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_INGREDIENTS_REQUEST,
  });

  return ingredientService
    .getIngredients()
    .then((ingredients) =>
      dispatch({ type: GET_INGREDIENTS_SUCCESS, ingredients })
    )
    .catch(() => dispatch({ type: GET_INGREDIENTS_FAILED }));
};
