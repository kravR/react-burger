import { IIngredientData } from "../types/data";

export const SELECT_INGREDIENT = "SELECT_INGREDIENT" as const;
export const OPEN_INGREDIENT_DETAILS = "OPEN_INGREDIENT_DETAILS" as const;
export const CLOSE_INGREDIENT_DETAILS = "CLOSE_INGREDIENT_DETAILS" as const;

export interface ISelectIngredient {
  readonly type: typeof SELECT_INGREDIENT;
  readonly ingredient: IIngredientData;
}

export interface IOpenIngredientDetails {
  readonly type: typeof OPEN_INGREDIENT_DETAILS;
}

export interface ICloseIngredientDetails {
  readonly type: typeof CLOSE_INGREDIENT_DETAILS;
}

export type TIngredientDetailsActions =
  | ISelectIngredient
  | IOpenIngredientDetails
  | ICloseIngredientDetails;
