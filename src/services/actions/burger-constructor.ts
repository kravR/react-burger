import { IIngredientData } from "../types/data";

export const ADD_BUN = "ADD_BUN" as const;
export const DELETE_BUN = "DELETE_BUN" as const;
export const ADD_INGREDIENT = "ADD_INGREDIENT" as const;
export const DELETE_INGREDIENT = "DELETE_INGREDIENT" as const;
export const SORT_INGREDIENTS = "SORT_INGREDIENTS" as const;
export const RESET_CONSTRUCTOR = "RESET_CONSTRUCTOR" as const;

export interface IAddBun {
  readonly type: typeof ADD_BUN;
  readonly bun: IIngredientData;
}
export interface IDeleteBun {
  readonly type: typeof DELETE_BUN;
}

export interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENT;
  readonly item: IIngredientData;
}
export interface IDeleteIngredient {
  readonly type: typeof DELETE_INGREDIENT;
  readonly id: string;
}

export interface ISortIngredients {
  readonly type: typeof SORT_INGREDIENTS;
  readonly dragIndex: number;
  readonly hoverIndex: number;
}

export interface IResetConstructor {
  readonly type: typeof RESET_CONSTRUCTOR;
}

export type TBurgerConstructorActions =
  | IAddBun
  | IDeleteBun
  | IAddIngredient
  | IDeleteIngredient
  | ISortIngredients
  | IResetConstructor;
