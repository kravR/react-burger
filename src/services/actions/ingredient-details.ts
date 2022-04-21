import { IIngredientData } from "../types/data";

export const SELECT_INGREDIENT = "SELECT_INGREDIENT" as const;

export interface ISelectIngredient {
  readonly type: typeof SELECT_INGREDIENT;
  readonly ingredient: IIngredientData;
}

export type TIngredientDetailsActions = ISelectIngredient;
